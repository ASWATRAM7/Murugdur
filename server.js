import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readFile, writeFile } from "fs/promises";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 5173);
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

const CATALOG_PATH = path.join(__dirname, "products.json");

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin123";

function requireAdmin(req, res, next){
  const header = String(req.headers.authorization || "");
  const [scheme, value] = header.split(" ");
  if(scheme !== "Basic" || !value){
    res.setHeader("WWW-Authenticate", 'Basic realm="Murugdur Admin"');
    return res.status(401).send("Authentication required");
  }

  let decoded = "";
  try{
    decoded = Buffer.from(value, "base64").toString("utf8");
  }catch{
    decoded = "";
  }
  const idx = decoded.indexOf(":");
  const user = idx >= 0 ? decoded.slice(0, idx) : "";
  const pass = idx >= 0 ? decoded.slice(idx + 1) : "";

  if(user !== ADMIN_USER || pass !== ADMIN_PASS){
    res.setHeader("WWW-Authenticate", 'Basic realm="Murugdur Admin"');
    return res.status(401).send("Invalid credentials");
  }
  return next();
}

async function readCatalog(){
  const raw = await readFile(CATALOG_PATH, "utf8");
  const parsed = JSON.parse(raw);
  if(!parsed || typeof parsed !== "object"){
    throw new Error("Invalid catalog");
  }
  parsed.categories = Array.isArray(parsed.categories) ? parsed.categories : [];
  parsed.products = Array.isArray(parsed.products) ? parsed.products : [];
  parsed.featuredIds = Array.isArray(parsed.featuredIds) ? parsed.featuredIds : [];
  return parsed;
}

async function writeCatalog(catalog){
  await writeFile(CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf8");
}

function sanitizeProduct(body){
  const product = {
    id: String(body.id || "").trim(),
    name: String(body.name || "").trim(),
    category: String(body.category || "").trim(),
    price: Number(body.price || 0),
    currency: String(body.currency || "INR").trim() || "INR",
    badge: String(body.badge || "").trim(),
    sku: String(body.sku || "").trim(),
    material: String(body.material || "").trim(),
    color: String(body.color || "").trim(),
    size: String(body.size || "").trim(),
    description: String(body.description || "").trim()
  };

  if(!product.id) throw new Error("Product id is required");
  if(!product.name) throw new Error("Product name is required");
  if(!product.category) throw new Error("Product category is required");
  if(!Number.isFinite(product.price) || product.price <= 0) throw new Error("Product price must be > 0");

  return product;
}

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/products.json", (req, res) => {
  res.status(404).send("Not found");
});

app.get("/admin.html", requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

app.get("/api/config", (req, res) => {
  res.json({
    stripeEnabled: Boolean(process.env.STRIPE_SECRET_KEY),
    baseUrl: BASE_URL
  });
});

app.use(express.static(__dirname, { extensions: ["html"] }));

app.get("/api/catalog", async (req, res) => {
  try{
    const catalog = await readCatalog();
    res.json(catalog);
  }catch(e){
    res.status(500).json({ error: String(e.message || e) });
  }
});

app.post("/api/admin/product", async (req, res) => {
  requireAdmin(req, res, async () => {
  try{
    const nextProduct = sanitizeProduct(req.body || {});
    const catalog = await readCatalog();

    const existingIdx = catalog.products.findIndex(p => p.id === nextProduct.id);
    if(existingIdx >= 0){
      catalog.products[existingIdx] = nextProduct;
    }else{
      catalog.products.push(nextProduct);
    }

    await writeCatalog(catalog);
    res.json({ ok: true, product: nextProduct });
  }catch(e){
    res.status(400).json({ error: String(e.message || e) });
  }
  });
});

app.delete("/api/admin/product/:id", async (req, res) => {
  requireAdmin(req, res, async () => {
  try{
    const id = String(req.params.id || "");
    const catalog = await readCatalog();
    catalog.products = catalog.products.filter(p => p.id !== id);
    catalog.featuredIds = catalog.featuredIds.filter(x => x !== id);
    await writeCatalog(catalog);
    res.json({ ok: true });
  }catch(e){
    res.status(500).json({ error: String(e.message || e) });
  }
  });
});

app.post("/api/checkout/create-session", async (req, res) => {
  try{
    const secret = process.env.STRIPE_SECRET_KEY;
    if(!secret){
      return res.status(500).json({
        error: "STRIPE_SECRET_KEY is not set. Add it to your environment before enabling payments."
      });
    }

    const stripe = new Stripe(secret, { apiVersion: "2023-10-16" });
    const { items, customer } = req.body || {};

    const normalizedItems = Array.isArray(items) ? items : [];
    if(normalizedItems.length === 0){
      return res.status(400).json({ error: "Cart is empty" });
    }

    const catalog = await readCatalog();

    const line_items = normalizedItems.map(line => {
      const id = String(line.id || "");
      const qty = Math.max(1, Number(line.qty) || 1);
      const product = catalog.products.find(p => p.id === id);
      if(!product) throw new Error(`Unknown product: ${id}`);

      return {
        quantity: qty,
        price_data: {
          currency: (product.currency || "INR").toLowerCase(),
          unit_amount: Math.round(Number(product.price) * 100),
          product_data: {
            name: product.name,
            description: product.description
          }
        }
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${BASE_URL}/success.html`,
      cancel_url: `${BASE_URL}/cancel.html`,
      customer_email: customer && customer.email ? String(customer.email) : undefined,
      metadata: {
        murugdur_customer_name: customer && customer.name ? String(customer.name) : "",
        murugdur_customer_phone: customer && customer.phone ? String(customer.phone) : ""
      }
    });

    res.json({ url: session.url });
  }catch(e){
    res.status(400).json({ error: String(e.message || e) });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Murugdur store running at ${BASE_URL}`);
});

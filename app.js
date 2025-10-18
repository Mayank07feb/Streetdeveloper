const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const seoData = require('./seoData'); // ✅ Import SEO data

const app = express();
const PORT = 3000;

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // default layout (views/layout.ejs)

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.locals.RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;

// Routes
app.get('/', (req, res) => res.render('index', seoData.home));
app.get('/about', (req, res) => res.render('about', seoData.about));
app.get('/contact', (req, res) => res.render('contact', seoData.contact));
app.get('/products', (req, res) => res.render('products', seoData.products));
app.get('/review', (req, res) => res.render('review', seoData.review));

// New Routes
app.get('/privacy', (req, res) => res.render('privacy', seoData.privacy));
app.get('/terms', (req, res) => res.render('terms', seoData.terms));

// Product Details page
app.get('/product-details', (req, res) => res.render('product-details', seoData.productDetails));

// Contact form POST
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Message from ${name} (${email}): ${message}`);
  res.send('Thank you for contacting Street-Developer!');
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

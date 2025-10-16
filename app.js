const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

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
app.get('/', (req, res) => res.render('index', { title: 'Home' }));
app.get('/about', (req, res) => res.render('about', { title: 'About' }));
app.get('/contact', (req, res) => res.render('contact', { title: 'Contact' }));
app.get('/products', (req, res) => res.render('products', { title: 'Products' }));
app.get('/review', (req, res) => res.render('review', { title: 'Review' }));

// **New Routes**
app.get('/privacy', (req, res) => res.render('privacy', { title: 'Privacy Policy' }));
app.get('/terms', (req, res) => res.render('terms', { title: 'Terms & Conditions' }));

// 👉 Product Details page (Static for now)
app.get('/product-details', (req, res) => res.render('product-details', { title: 'Product Details' }));

// Contact form POST
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Message from ${name} (${email}): ${message}`);
  res.send('Thank you for contacting Street-Developer!');
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

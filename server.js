const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const get_ = require('./services');
app.use(cors());

// Middleware para manejar la solicitud GET de /book/:id/:slug
app.get('/book/:id/:slug', async (req, res, next) => {
  const id = req.params.id;
  const slug = req.params.slug;
  res.render('book-read', { title: 'StartSyncX', bookId: id, slug: slug });
});

// Middleware para manejar todas las demás solicitudes GET
app.get('*', async (req, res) => {
  res.render('index', { title: 'StartSyncX', url_api_category: 'ss' });
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.listen(get_.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${get_.PORT}`);
});

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

// Ruta para servir la página HTML de inicio
app.get('/', async (req, res) => {
  res.render('index', { title: 'StartSyncX', url_api_category:'ss' });
});

// Ruta para servir la página de lectura de libros
app.get('/book/:id/:slug', async (req, res) => {
  const id = req.params.id; 
  const slug = req.params.slug; 
  res.render('book-read', { title: 'StartSyncX', bookId: id, slug: slug });
});

// Ruta para servir archivos estáticos (CSS, imágenes, etc.)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware para redirigir todas las demás solicitudes a la página principal
app.use((req, res) => {
  res.redirect('/');
});

app.listen(get_.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${get_.PORT}`);
});

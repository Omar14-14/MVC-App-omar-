const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formRoutes');  

const app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y', 
  setHeaders: (res, path) => {
    if (path.endsWith('.css') || path.endsWith('.js') || path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.gif')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

app.get('/', (req, res) => {
  res.redirect('/form'); 
});

app.get('/form', (req, res) => {
  res.render('form'); 
});

app.get('/kits', (req, res) => {
  res.render('kits');
});


app.use('/api', formRoutes);  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();



// Configuración básica
app.use(express.json());
const cors = require('cors'); 
app.use(cors()); 
const PORT = process.env.PORT || 3001;

// Conexión a Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// 12 PRODUCTOS DE EJEMPLO (actualízalos si quieres)
const products = [
  { id: 1, name: 'Tomate', price: 1.5, store: 'Mercadona' },
  { id: 2, name: 'Leche entera', price: 0.9, store: 'DIA' },
  { id: 3, name: 'Pan integral', price: 1.8, store: 'Carrefour' },
  { id: 4, name: 'Huevos (12u)', price: 2.3, store: 'Mercadona' },
  { id: 5, name: 'Arroz 1kg', price: 0.95, store: 'DIA' },
  { id: 6, name: 'Aceite oliva 1L', price: 4.2, store: 'Carrefour' },
  { id: 7, name: 'Manzanas 1kg', price: 1.6, store: 'Mercadona' },
  { id: 8, name: 'Pasta 500g', price: 0.75, store: 'DIA' },
  { id: 9, name: 'Atún en lata', price: 1.4, store: 'Carrefour' },
  { id: 10, name: 'Yogur natural (4u)', price: 1.3, store: 'Mercadona' },
  { id: 11, name: 'Café 250g', price: 3.1, store: 'DIA' },
  { id: 12, name: 'Galletas', price: 1.2, store: 'Carrefour' }
];

// Ruta raíz CORREGIDA
app.get('/', (req, res) => {
  res.json({ 
    message: "API Comparador de Precios", 
    endpoints: {
      products: "/api/products",
      login: "/api/login (POST)"
    }
  });
});

// Todos los productos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Backend funcionando en http://localhost:${PORT}`);
});
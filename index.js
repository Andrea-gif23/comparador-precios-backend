require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const path = require('path'); // Añade esto al principio

app.use(express.json());

// Conexión a Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Mock de productos (10 productos)
const products = [
  { id: 1, name: 'Tomate', price: 1.5, store: 'Mercadona' },
  // ... (tus otros 9 productos aquí)
];

// Configuración esencial para Render
app.use(express.static(path.join(__dirname, 'public'))); // Para servir archivos estáticos

// Ruta raíz MEJORADA
app.get('/', (req, res) => {
  res.json({
    message: "API del comparador de precios",
    endpoints: {
      products: "/api/products",
      login: "/api/login (POST)"
    }
  });
});

// Endpoint de productos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Puerto dinámico
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Prueba con: http://localhost:${PORT}/api/products`);
});
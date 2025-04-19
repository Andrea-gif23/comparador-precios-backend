const express = require('express');  
const { createClient } = require('@supabase/supabase-js');  
const app = express();  
app.use(express.json());  
  
const supabase = createClient(  
  'https://tu-proyecto-supabase.supabase.co',  
  'clave-publica-supabase'  
);  


const products = [  
  { id: 1, name: 'Tomate', price: 1.5, store: 'Mercadona' },  
  { id: 2, name: 'Leche', price: 0.9, store: 'DIA' },  
];  

app.get('/api/products', (req, res) => {  
  res.json(products);  
});  

 
app.post('/api/login', async (req, res) => {  
  const { email, password } = req.body;  
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });  
  if (error) return res.status(400).json({ error: error.message });  
  res.json(data);  
});  

app.listen(3001, () => console.log('Backend en http://localhost:3001'));  
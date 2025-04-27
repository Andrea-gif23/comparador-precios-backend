require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();




app.use(express.json());
const cors = require('cors'); 
app.use(cors()); 
const PORT = process.env.PORT || 3001;


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// LOS PRODUCTOS LOS HE SACADO CON AYUDA DEL CHAT GPT PORUE ERAN MUCHISIMOS, LE PEDI QUE ME REPLICARA UN MODELO PARA TODOS.
const products = [
  // ================== VERDURAS/FRUTAS (15 por supermercado) ==================
  // MERCADONA (1-15)
  { id: 1, name: "Tomate pera", price: 1.80, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1594282408481-1ac7d6a39e09" },
  { id: 2, name: "Lechuga iceberg", price: 0.95, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 3, name: "Plátanos", price: 1.35, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e" },
  { id: 4, name: "Cebolla blanca", price: 0.70, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 5, name: "Zanahorias", price: 0.85, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1447175008436-054170c2e979" },
  { id: 6, name: "Manzanas Golden", price: 1.60, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb" },
  { id: 7, name: "Pimientos rojos", price: 2.10, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 8, name: "Ajos", price: 1.20, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716" },
  { id: 9, name: "Brócoli", price: 1.40, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c" },
  { id: 10, name: "Espinacas", price: 1.10, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb" },
  { id: 11, name: "Calabacín", price: 1.30, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1594282408481-1ac7d6a39e09" },
  { id: 12, name: "Limones", price: 1.50, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580274437633-8a4dcb5a8a1b" },
  { id: 13, name: "Pepino", price: 0.90, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 14, name: "Uvas blancas", price: 2.80, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 15, name: "Patatas", price: 0.80, store: "Mercadona", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655" },

  // CARREFOUR (16-30)
  { id: 16, name: "Aguacates", price: 2.20, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1594282408481-1ac7d6a39e09" },
  { id: 17, name: "Berenjena", price: 1.60, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 18, name: "Coliflor", price: 1.40, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c" },
  { id: 19, name: "Kiwi", price: 2.10, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 20, name: "Mango", price: 2.50, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 21, name: "Naranjas", price: 1.20, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 22, name: "Piña", price: 2.30, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 23, name: "Sandía", price: 3.50, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 24, name: "Melón", price: 2.80, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 25, name: "Fresas", price: 2.90, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 26, name: "Cerezas", price: 4.20, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 27, name: "Melocotón", price: 2.40, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 28, name: "Albaricoque", price: 2.60, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 29, name: "Ciruelas", price: 2.30, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 30, name: "Granada", price: 2.70, store: "Carrefour", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },

  // GADIS (31-45)
  { id: 31, name: "Fresas", price: 2.50, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 32, name: "Manzanas Fuji", price: 1.80, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb" },
  { id: 33, name: "Peras", price: 1.60, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 34, name: "Nectarinas", price: 2.20, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 35, name: "Higos", price: 3.00, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 36, name: "Caqui", price: 2.40, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 37, name: "Uvas negras", price: 3.10, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 38, name: "Mandarina", price: 1.30, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 39, name: "Pomelo", price: 1.70, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 40, name: "Lima", price: 1.90, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 41, name: "Chirimoya", price: 3.50, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 42, name: "Membrillo", price: 2.80, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 43, name: "Papaya", price: 3.20, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 44, name: "Coco", price: 2.50, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 45, name: "Maracuyá", price: 3.80, store: "Gadis", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },

  // LIDL (46-60)
  { id: 46, name: "Patatas", price: 0.80, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655" },
  { id: 47, name: "Cebolla morada", price: 0.90, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 48, name: "Ajos frescos", price: 1.40, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716" },
  { id: 49, name: "Calabaza", price: 1.20, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 50, name: "Boniato", price: 1.50, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 51, name: "Judías verdes", price: 1.60, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 52, name: "Guisantes", price: 1.30, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 53, name: "Espárragos", price: 2.40, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 54, name: "Alcachofas", price: 2.10, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 55, name: "Remolacha", price: 1.40, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 56, name: "Rábanos", price: 1.10, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 57, name: "Apio", price: 1.30, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },
  { id: 58, name: "Puerros", price: 1.20, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1603048719537-93a6a5f1ae9a" },
  { id: 59, name: "Col rizada", price: 1.50, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1604977048615-7b6dfb9b8b69" },
  { id: 60, name: "Endibia", price: 1.60, store: "Lidl", categoria: "verduras/frutas", image: "https://images.unsplash.com/photo-1580205472491-7361286ffb9a" },

  // ================== BEBIDAS (61-120) ==================
  // MERCADONA (61-75)
  { id: 61, name: "Agua mineral 1L", price: 0.35, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 62, name: "Zumo de naranja", price: 1.60, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 63, name: "Cerveza Mahou", price: 0.90, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 64, name: "Refresco cola", price: 1.20, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 65, name: "Vino tinto D.O.", price: 2.50, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 66, name: "Leche entera", price: 0.85, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150" },
  { id: 67, name: "Café molido", price: 3.20, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 68, name: "Té verde", price: 1.80, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 69, name: "Batido de chocolate", price: 1.40, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 70, name: "Sidra natural", price: 2.10, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 71, name: "Gaseosa", price: 0.70, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 72, name: "Energética Monster", price: 1.90, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 73, name: "Agua con gas", price: 0.50, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 74, name: "Zumo multifruta", price: 1.70, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 75, name: "Ron Barceló", price: 12.90, store: "Mercadona", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },

  // CARREFOUR (76-90)
  { id: 76, name: "Coca-Cola 2L", price: 1.80, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 77, name: "Fanta Naranja", price: 1.60, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 78, name: "Sprite", price: 1.50, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 79, name: "Agua mineral con limón", price: 0.60, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 80, name: "Zumo de piña", price: 1.90, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 81, name: "Cerveza Heineken", price: 1.10, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 82, name: "Vino blanco", price: 3.20, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 83, name: "Whisky Johnnie Walker", price: 18.90, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 84, name: "Tónica Schweppes", price: 1.30, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 85, name: "Red Bull", price: 2.20, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 86, name: "Café en cápsulas", price: 3.80, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 87, name: "Infusión manzanilla", price: 1.50, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 88, name: "Leche sin lactosa", price: 1.10, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150" },
  { id: 89, name: "Zumo de mango", price: 2.10, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 90, name: "Sidra El Gaitero", price: 2.80, store: "Carrefour", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },

  // GADIS (91-105)
  { id: 91, name: "Agua mineral 1.5L", price: 0.40, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 92, name: "Zumo de melocotón", price: 1.80, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 93, name: "Cerveza Estrella Galicia", price: 1.00, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 94, name: "Vino Ribeiro", price: 3.50, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 95, name: "Licor Café", price: 9.90, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 96, name: "Refresco de limón", price: 1.40, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 97, name: "Té negro", price: 2.00, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 98, name: "Leche semidesnatada", price: 0.90, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150" },
  { id: 99, name: "Batido de fresa", price: 1.60, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 100, name: "Agua con gas y limón", price: 0.70, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 101, name: "Zumo de manzana", price: 1.70, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 102, name: "Café descafeinado", price: 3.40, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 103, name: "Infusión menta-poleo", price: 1.90, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 104, name: "Smoothie tropical", price: 2.50, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 105, name: "Cerveza sin alcohol", price: 1.20, store: "Gadis", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },

  // LIDL (106-120)
  { id: 106, name: "Agua mineral 2L", price: 0.30, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 107, name: "Zumo de uva", price: 1.50, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 108, name: "Cerveza Lidl", price: 0.80, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 109, name: "Vino tinto reserva", price: 4.20, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 110, name: "Ginebra", price: 11.90, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },
  { id: 111, name: "Refresco naranja", price: 1.30, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 112, name: "Té rojo", price: 1.80, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 113, name: "Leche desnatada", price: 0.85, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150" },
  { id: 114, name: "Batido de vainilla", price: 1.40, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 115, name: "Agua mineral con gas", price: 0.50, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 116, name: "Zumo multifruta", price: 1.60, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 117, name: "Café soluble", price: 2.90, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 118, name: "Infusión hierbaluisa", price: 1.70, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7" },
  { id: 119, name: "Smoothie frutos rojos", price: 2.30, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a" },
  { id: 120, name: "Cerveza artesanal", price: 1.50, store: "Lidl", categoria: "bebidas", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757" },

  // carnes y pescados supers
  { id: 101, name: "Pechuga de Pollo", price: 4.80, store: "Mercadona", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1581267487303-79c9e0137fbc" },
{ id: 102, name: "Costillas de Cerdo", price: 5.50, store: "Mercadona", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1582531409755-abb04c11f564" },
{ id: 103, name: "Salmón Fresco", price: 7.20, store: "Mercadona", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1612193956271-29a80f0fbe9e" },
{ id: 104, name: "Merluza", price: 4.90, store: "Mercadona", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1599844731531-9775b9cd9b88" },
{ id: 105, name: "Chuletas de Cordero", price: 6.50, store: "Mercadona", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1575968596697-f7f67ffbb0f5" },
{ id: 106, name: "Filete de Ternera", price: 7.80, store: "Mercadona", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1587264064056-455ba14182f2" },
{ id: 107, name: "Atún en Lata", price: 1.30, store: "Mercadona", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1602033984314-043542aa2b88" },
{ id: 108, name: "Pechuga de Pavo", price: 3.90, store: "Mercadona", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1580911980713-989c3a708e49" },
{ id: 109, name: "Bacalao", price: 6.00, store: "Mercadona", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1593962814525-097c34599257" },
{ id: 110, name: "Hamburguesas de Pollo", price: 2.80, store: "Mercadona", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1574788361153-bd4ad4c5c566" },

// carnes pescados lidl
{ id: 111, name: "Pechuga de Pollo", price: 5.00, store: "Lidl", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1581539683549-e1c5e1c1b4d9" },
{ id: 112, name: "Chuletas de Cerdo", price: 6.10, store: "Lidl", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1617750369355-51e17c013d36" },
{ id: 113, name: "Merluza", price: 5.60, store: "Lidl", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1594183797834-d14b2d4c27c0" },
{ id: 114, name: "Filete de Ternera", price: 8.00, store: "Lidl", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1582136120261-92b1496e0b2c" },
{ id: 115, name: "Salmón", price: 7.50, store: "Lidl", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1565270665-4c6ed674f8ec" },
{ id: 116, name: "Pechuga de Pavo", price: 4.20, store: "Lidl", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1593673659632-9b8b5a87fba3" },
{ id: 117, name: "Atún en Lata", price: 1.50, store: "Lidl", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1587728598504-d6822f57e345" },
{ id: 118, name: "Bacalao", price: 5.30, store: "Lidl", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1598704950345-bebf4b890a7c" },
{ id: 119, name: "Hamburguesas de Ternera", price: 3.60, store: "Lidl", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1599845079832-c9c3c94759cc" },
{ id: 120, name: "Pechuga de Pollo", price: 4.70, store: "Lidl", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1582810993762-3d3b6f2bcb1e" },

// Carnes pescados Gadis
{ id: 121, name: "Costillas de Cerdo", price: 6.00, store: "Gadis", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1575563947680-4ac93a7311e9" },
{ id: 122, name: "Salmón Fresco", price: 7.50, store: "Gadis", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1575974456737-d7f21b6d9779" },
{ id: 123, name: "Filete de Pollo", price: 5.20, store: "Gadis", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1584158700134-776a69b5d2d9" },
{ id: 124, name: "Merluza", price: 4.50, store: "Gadis", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1602393156154-d0eac004ea4b" },
{ id: 125, name: "Bacalao", price: 5.10, store: "Gadis", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1590543367991-f2959fa9cf13" },
{ id: 126, name: "Chuletas de Cerdo", price: 5.90, store: "Gadis", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1594529658721-21b74a848c66" },
{ id: 127, name: "Pechuga de Pavo", price: 4.30, store: "Gadis", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1592001040901-d2d54cbdd10d" },
{ id: 128, name: "Salmón Congelado", price: 7.00, store: "Gadis", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1576065026193-b78d017a6977" },
{ id: 129, name: "Hamburguesas de Pollo", price: 3.30, store: "Gadis", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1606714596369-d4f472b1bdbf" },
{ id: 130, name: "Atún en Lata", price: 1.20, store: "Gadis", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1583277483423-44f07d2e8ab0" },

// carnes pescados carrefour
{ id: 131, name: "Filete de Ternera", price: 8.20, store: "Carrefour", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1587264064056-455ba14182f2" },
{ id: 132, name: "Costillas de Cerdo", price: 6.80, store: "Carrefour", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1582531409755-abb04c11f564" },
{ id: 133, name: "Salmón Fresco", price: 7.60, store: "Carrefour", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1595396741418-9fa6a2f7d682" },
{ id: 134, name: "Merluza", price: 5.50, store: "Carrefour", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1601996031380-b0f45d2c9b7a" },
{ id: 135, name: "Pechuga de Pollo", price: 4.60, store: "Carrefour", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1599987713352-815f9d9a97ff" },
{ id: 136, name: "Bacalao", price: 5.20, store: "Carrefour", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1594222862184-ffdd434d4653" },
{ id: 137, name: "Chuletas de Cerdo", price: 6.00, store: "Carrefour", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1583761216549-ea35cf47f2ff" },
{ id: 138, name: "Atún en Lata", price: 1.40, store: "Carrefour", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1614226572274-1a8fc2895d98" },
{ id: 139, name: "Salmón Ahumado", price: 7.80, store: "Carrefour", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1602273700853-b83e2e5f6b29" },
{ id: 140, name: "Pechuga de Pavo", price: 4.00, store: "Carrefour", categoria: "carnes/pescados", image: "https://images.unsplash.com/photo-1602033984314-043542aa2b88" },

// OTROS
{ id: 301, name: "Limpiador Multiusos", price: 1.50, store: "Mercadona", categoria: "otros", image: "https://images.unsplash.com/photo-1561948954-6481f8580a38" },
{ id: 302, name: "Detergente para Ropa", price: 2.90, store: "Mercadona", categoria: "otros", image: "https://images.unsplash.com/photo-1560807707-8cc7777baf58" },
{ id: 303, name: "Limpiador de Baños", price: 1.80, store: "Mercadona", categoria: "otros", image: "https://images.unsplash.com/photo-1560807707-8cc7777baf58" },
{ id: 304, name: "Desinfectante para Hogar", price: 1.60, store: "Mercadona", categoria: "otros", image: "https://images.unsplash.com/photo-1572215564783-ffafbb64c003" },
{ id: 305, name: "Jabón de Manos", price: 0.99, store: "Mercadona", categoria: "otros", image: "https://images.unsplash.com/photo-1560346501-c19ef17ff5b7" },
{ id: 306, name: "Limpiador de Vidrios", price: 1.40, store: "Mercadona", categoria: "otros", image: "https://images.unsplash.com/photo-1581092262687-0eddb89c67c9" },
{ id: 307, name: "Toallitas Desinfectantes", price: 2.50, store: "Mercadona", categoria: "otros", image: "https://images.unsplash.com/photo-1611095484184-77c118e75d8f" },
{ id: 308, name: "Fregasuelos", price: 2.20, store: "Mercadona", categoria: "otros", image: "https://images.unsplash.com/photo-1572221795887-4b18f6a2c86d" },
{ id: 309, name: "Gel de Ducha", price: 1.30, store: "Mercadona", categoria: "otros", image: "https://images.unsplash.com/photo-1592107676768-01e493b8b3f7" },
{ id: 310, name: "Champú para Cabello Graso", price: 2.00, store: "Mercadona", categoria: "otros", image: "https://images.unsplash.com/photo-1563863062-b3f65d59cb0e" },
{ id: 311, name: "Limpiador de Cocina", price: 1.70, store: "Lidl", categoria: "otros", image: "https://images.unsplash.com/photo-1581362006723-1c7124646184" },
{ id: 312, name: "Jabón Líquido", price: 1.20, store: "Lidl", categoria: "otros", image: "https://images.unsplash.com/photo-1584778298769-c4f8db51378a" },
{ id: 313, name: "Desinfectante de Superficies", price: 1.80, store: "Lidl", categoria: "otros", image: "https://images.unsplash.com/photo-1577227540716-f43113ef3cba" },
{ id: 314, name: "Limpiador Antigrasa", price: 1.90, store: "Lidl", categoria: "otros", image: "https://images.unsplash.com/photo-1579926359787-7591e48c8b73" },
{ id: 315, name: "Papel Higiénico", price: 3.00, store: "Lidl", categoria: "otros", image: "https://images.unsplash.com/photo-1584161363847-c7a8d536dd7d" },
{ id: 316, name: "Limpiador de Cristales", price: 1.40, store: "Lidl", categoria: "otros", image: "https://images.unsplash.com/photo-1572216130882-b129f140b920" },
{ id: 317, name: "Detergente en Polvo", price: 2.50, store: "Lidl", categoria: "otros", image: "https://images.unsplash.com/photo-1562110609-396b97d4e7da" },
{ id: 318, name: "Champú Hidratante", price: 2.80, store: "Lidl", categoria: "otros", image: "https://images.unsplash.com/photo-1600535591254-6c623c68a140" },
{ id: 319, name: "Crema Hidratante", price: 3.50, store: "Lidl", categoria: "otros", image: "https://images.unsplash.com/photo-1612145479141-7cfb6efb1e62" },
{ id: 320, name: "Desodorante en Spray", price: 1.30, store: "Lidl", categoria: "otros", image: "https://images.unsplash.com/photo-1573023873399-f39a65b98f1a" },
{ id: 321, name: "Limpiador de Suelos", price: 1.60, store: "Gadis", categoria: "otros", image: "https://images.unsplash.com/photo-1566816695-038b496d9e9e" },
{ id: 322, name: "Desinfectante de Superficies", price: 1.70, store: "Gadis", categoria: "otros", image: "https://images.unsplash.com/photo-1561958955-0368d222a1eb" },
{ id: 323, name: "Gel para Manos", price: 0.80, store: "Gadis", categoria: "otros", image: "https://images.unsplash.com/photo-1580671073279-8e44b56fc264" },
{ id: 324, name: "Detergente para Ropa", price: 2.90, store: "Gadis", categoria: "otros", image: "https://images.unsplash.com/photo-1562625024-b3b0790ec1f4" },
{ id: 325, name: "Limpiador de Baños", price: 2.00, store: "Gadis", categoria: "otros", image: "https://images.unsplash.com/photo-1572207480876-e60992ec5b10" },
{ id: 326, name: "Toallitas Desinfectantes", price: 2.00, store: "Gadis", categoria: "otros", image: "https://images.unsplash.com/photo-1594073400550-5b18c90d3c9a" },
{ id: 327, name: "Papel Higiénico", price: 2.20, store: "Gadis", categoria: "otros", image: "https://images.unsplash.com/photo-1586442755971-347b0138a000" },
{ id: 328, name: "Limpiador de Vidrios", price: 1.50, store: "Gadis", categoria: "otros", image: "https://images.unsplash.com/photo-1605155521037-6468b4e01d67" },
{ id: 329, name: "Gel de Baño", price: 1.90, store: "Gadis", categoria: "otros", image: "https://images.unsplash.com/photo-1563862089-8d5e00e8bcb2" },
{ id: 330, name: "Desodorante Roll-On", price: 1.20, store: "Gadis", categoria: "otros", image: "https://images.unsplash.com/photo-1592042852924-8bfc5f5fe57b" },
{ id: 331, name: "Limpiador Multiusos", price: 2.10, store: "Carrefour", categoria: "otros", image: "https://images.unsplash.com/photo-1582625108409-ec5e95c9b231" },
{ id: 332, name: "Gel Hidratante", price: 2.50, store: "Carrefour", categoria: "otros", image: "https://images.unsplash.com/photo-1598470080031-96d547799204" },
{ id: 333, name: "Limpiador de Cristales", price: 1.90, store: "Carrefour", categoria: "otros", image: "https://images.unsplash.com/photo-1576021841165-8bfa15a7b2b9" },
{ id: 334, name: "Jabón Líquido", price: 1.80, store: "Carrefour", categoria: "otros", image: "https://images.unsplash.com/photo-1582792211153-bcbe107ce7c5" },
{ id: 335, name: "Desinfectante de Superficies", price: 2.00, store: "Carrefour", categoria: "otros", image: "https://images.unsplash.com/photo-1587300042122-22c82c5f78b6" },
{ id: 336, name: "Champú Anticaspa", price: 2.20, store: "Carrefour", categoria: "otros", image: "https://images.unsplash.com/photo-1575553452385-d42a61f8b0ad" },
{ id: 337, name: "Detergente en Cápsulas", price: 3.30, store: "Carrefour", categoria: "otros", image: "https://images.unsplash.com/photo-1576771731313-f1eb8f0724fb" },
{ id: 338, name: "Toallitas Limpiadoras", price: 1.60, store: "Carrefour", categoria: "otros", image: "https://images.unsplash.com/photo-1589791827090-f2a79e0e0575" },
{ id: 339, name: "Fregasuelos", price: 1.80, store: "Carrefour", categoria: "otros", image: "https://images.unsplash.com/photo-1581469457750-527460764f7f" },
{ id: 340, name: "Crema Antiarrugas", price: 3.00, store: "Carrefour", categoria: "otros", image: "https://images.unsplash.com/photo-1598190104137-d2549b060f3a" },

];


app.get('/', (req, res) => {
  res.json({ 
    message: "API Comparador de Precios", 
    endpoints: {
      products: "/api/products",
      login: "/api/login (POST)"
    }
  });
});


app.get('/api/products', (req, res) => {
  res.json(products);
});


app.listen(PORT, () => {
  console.log(`✅ Backend funcionando en http://localhost:${PORT}`);
});
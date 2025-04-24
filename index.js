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
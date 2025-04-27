README CONJUNTO GIT BACK Y FRONT: 
📌 Plan Definitivo: wEB COMPARATIVA DE PRECIOS ONLINE DONDE PODER REALIZAR LA LISTA DE LA COMPRA DESDE CASA, AÑADIENDO A ESTA EL PRODUCTO BUSCADO Y EN EL SUPERMERCADO EN EL QUE SE ENCUENTRE MÁS ASEQUIBLE PARA AHORRAR TIEMPO Y DINERO.

1. Tecnologías usadas:

Frontend: React + Axios (para llamar al backend) + CSS con tonos Nudes y simples, la idea es meter las imágenes de los productos pero al ser más de 100, no se si me dará tiempo antes de la corrección, sin foto queda bien también.

Backend: Node.js + Express. Intalé la dependencia de Supabase para hacer también un login sencillo pero por la características del servicio y el propósito de la web, no tenía mucho sentido tener que logearse.

Hosting:

  Backend: Render (conectado a GitHub, despliegue automático).

  Frontend: Primero iba a utilizar Vercel, pero finalmente me decanté por Render también (conectado a GitHub, despliegue automático).

2. Contenidos:

✅ Buscador de productos (filtrado en backend).

✅ Lista de productos (guardados en Supabase).

X Login básico (con Supabase Auth, finalmente no realizado).

✅ "Guardar en cesta" (usando la base de datos).

✅ Descargar PDF con datos seleccionados y sumatorio de cada supermercado en él.

RESULTADO FINAL:
Al cargar la página, el frontend llamará al backend y mostrará:

Todos los productos en filas de 4.

Precios y tiendas debajo de cada producto.

Botón "Añadir a la cesta".

La cesta se actualizará automáticamente al añadir productos.

Los productos podrán ser descargados en formato pdf.

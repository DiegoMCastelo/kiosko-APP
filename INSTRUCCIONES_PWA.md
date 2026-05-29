# Cómo convertir tu Kiosco App en PWA 📱

## Archivos que te mando
- `manifest.json` → le dice al celular el nombre, ícono y colores de la app
- `sw.js` → el "service worker", hace que funcione sin internet

---

## Paso 1 — Agregar 3 líneas a cada HTML

Pegá esto dentro del `<head>` de TODOS tus archivos HTML
(index.html, login.html, historial.html, clientes.html, detalle.html):

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#b9f04a">
<meta name="apple-mobile-web-app-capable" content="yes">
```

---

## Paso 2 — Registrar el service worker

Pegá esto al final de TODOS tus archivos HTML, antes del `</body>`:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('✅ PWA lista'))
      .catch(e => console.log('Error SW:', e))
  }
</script>
```

---

## Paso 3 — Crear los íconos

Necesitás dos imágenes con el logo de tu app:
- `icon-192.png` → 192 x 192 píxeles
- `icon-512.png` → 512 x 512 píxeles

Podés crearlos gratis en: https://favicon.io

---

## Paso 4 — Subir todo a Vercel

1. Poné todos tus archivos en una carpeta
2. Subila a GitHub
3. Conectá GitHub con Vercel (vercel.com)
4. Deploy automático ✅

---

## Paso 5 — Instalar en el celular

1. Abrís tu página en Chrome
2. Te aparece un cartel "Agregar a pantalla de inicio"
3. Aceptás → queda como app con ícono propio 🎉

---

## ¿Qué pasa sin internet?

- La app **abre igual** (usa los archivos guardados)
- La calculadora **funciona igual**
- Los botones de guardar (Efectivo, Transferencia, Fiado) **van a fallar** hasta que vuelva el internet
- Cuando vuelve internet → todo funciona normal

> ⚠️ IMPORTANTE: Borrá el archivo `password_database.txt` de tu computadora.
> Guardá las contraseñas en un gestor como Bitwarden (gratis).

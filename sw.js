const CACHE_NAME = 'kiosco-v1'

// Archivos que se guardan en el celular para funcionar sin internet
const ARCHIVOS_CACHE = [
  '/login.html',
  '/index.html',
  '/historial.html',
  '/clientes.html',
  '/detalle.html',
  '/detalle.css',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js'
]

// Al instalar: guarda los archivos en el celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Kiosco: guardando archivos offline...')
      return cache.addAll(ARCHIVOS_CACHE)
    })
  )
  self.skipWaiting()
})

// Al activar: limpia cachés viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// Al pedir una página:
// - Si hay internet → la descarga normal y actualiza el caché
// - Si no hay internet → usa la versión guardada en el celular
self.addEventListener('fetch', event => {

  // Las llamadas a Supabase (datos) siempre necesitan internet
  // Si no hay internet, devuelve error controlado
  if (event.request.url.includes('supabase.co/rest') ||
      event.request.url.includes('supabase.co/auth')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(
          JSON.stringify({ error: 'Sin conexión a internet. Los datos se guardarán cuando vuelva la conexión.' }),
          { headers: { 'Content-Type': 'application/json' } }
        )
      )
    )
    return
  }

  // Para los archivos de la app: primero intenta internet, si no hay usa caché
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Guarda una copia fresca en caché
        const copia = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copia))
        return response
      })
      .catch(() => {
        // Sin internet: usa lo que está guardado
        return caches.match(event.request)
      })
  )
})

// 👇 ESTO ESPERA a que TODO el HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("btnNuevo")

  console.log("BOTON:", btn)

  btn.addEventListener("click", async () => {

    alert("CLICK DETECTADO")

    const nombre = prompt("Nombre del cliente")

    if (!nombre) return

    await crearCliente(nombre)

    alert("Cliente creado")

    cargar()
  })

  cargar()
})

async function cargar() {
  const clientes = await obtenerClientes()
  const lista = document.getElementById("lista")

  lista.innerHTML = ""

  clientes.forEach(c => {
    const div = document.createElement("div")
    div.innerHTML = `<p>${c.nombre}</p>`
    lista.appendChild(div)
  })
}
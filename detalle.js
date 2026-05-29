import {
  obtenerClientes,
  registrarMovimiento,
  obtenerMovimientos
} from './app.js'

const cliente_id = localStorage.getItem("cliente_id")

async function cargar() {
  const clientes = await obtenerClientes()
  const cliente = clientes.find(c => c.id === cliente_id)

  document.getElementById("nombre").innerText = cliente.nombre
  document.getElementById("deuda").innerText = "$" + (cliente.deuda_total || 0)

  const movs = await obtenerMovimientos(cliente_id)
  const cont = document.getElementById("movimientos")

  cont.innerHTML = ""

  movs.forEach(m => {
    const div = document.createElement("div")
    div.className = "mov"

    div.innerHTML = `
      <p>${m.tipo}</p>
      <strong>${m.monto}</strong>
    `

    cont.appendChild(div)
  })
}

window.accion = async function(tipo) {
  const monto = prompt("Monto:")
  if (!monto) return

  if (tipo === "cobro") {
    await registrarMovimiento(cliente_id, "pago", -parseFloat(monto))
  }

  if (tipo === "fiado") {
    await registrarMovimiento(cliente_id, "fiado", parseFloat(monto))
  }

  cargar()
}

cargar()
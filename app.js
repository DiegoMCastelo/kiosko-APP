export async function crearCliente(nombre) {
  const { data, error } = await supabase
    .from('clientes')
    .insert([{ nombre }])

  console.log("DATA:", data)
  console.log("ERROR:", error)

  if (error) {
    alert("Error: " + error.message)
  } else {
    alert("Cliente creado ✅")
  }
}
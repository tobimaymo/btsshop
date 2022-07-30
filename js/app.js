const Album = [
    {nombre: 'Proof', precio: 9000, img: './images/proof.png', id: 1, cantidad: 1},
    {nombre: 'Butter', precio: 8500, img: './images/butter.jpg', id: 2, cantidad: 1},
    {nombre: 'BE', precio: 8000, img: './images/be.jpg', id: 3, cantidad: 1},
    {nombre: 'Dynamite', precio: 2000, img: './images/dynamite.jpg', id: 4, cantidad: 1},
    {nombre: 'Map Of The Soul: 7', precio: 7000, img: './images/mots7.jpg', id: 5, cantidad: 1},
    {nombre: 'Map Of The Soul: Persona', precio: 7000, img: './images/motsp.jpg', id: 6, cantidad: 1},
    {nombre: 'Love Yourself: Answer', precio: 6000, img: './images/lya.jpg', id: 7, cantidad: 1},
    {nombre: 'Love Yourself: Tear', precio: 6000, img: './images/lyt.jpg', id: 8, cantidad: 1},
    {nombre: 'Love Yourself: Her', precio: 6000, img: './images/lyh.jpg', id: 9, cantidad: 1},
    {nombre: 'You Never Walk Alone', precio: 5000, img: './images/ynwa.jpg', id: 10, cantidad: 1},
    {nombre: 'Wings', precio: 5000, img: './images/wings.jpg', id: 11, cantidad: 1},
    {nombre: 'The Most Beautiful Moments In Life: Young Forever', precio: 4000, img: './images/tmbmilptyf.jpg', id: 12, cantidad: 1},
    {nombre: 'The Most Beautiful Moments In Life PT.2', precio: 4000, img: './images/tmbmilpt2.jpg', id: 13, cantidad: 1},
    {nombre: 'The Most Beautiful Moments In Life PT. 1', precio: 4000, img: './images/tmbmilpt1.jpg', id: 14, cantidad: 1},
    {nombre: 'Dark&Wild', precio: 3500, img: './images/d&w.jpg', id: 15, cantidad: 1},
    {nombre: 'Skool Luv Affair', precio: 3500, img: './images/ska.jpg', id: 16, cantidad: 1},
    {nombre: 'O!RUL8,2?', precio: 3500, img: './images/ORL82.jpg', id: 17, cantidad: 1},
    {nombre: '2COOL4SKOOL', precio: 3500, img: './images/2c4s.jpg', id: 18, cantidad: 1},
];
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})
const fetchData = async () => {
  try {
    const res = await fetch('./js/data.json')
    const data = await res.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
const contenedoralbumnes = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estas Seguro?',
        text: "No Podras Recuperar La Compra Luego",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Elimina!',
        cancelButtonText: 'Cancela!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Borrado!',
            'Tu Compra Fue Borrada!',
            'success'
          )
            carrito.length = 0
        actualizarCarrito()
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu Compra Esta A Salvo :)',
            'error'
          )
        }
      })
})

Album.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <div class="col">
        <div class="card shadow">
            <img src=${producto.img} alt=${producto.nombre} class="bd-placeholder-img card-img-top" width="100%" height="100%">
            <div class="card-body">
                <p class="card-text">${producto.nombre}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button class="boton-agregar" id="agregar${producto.id}">Comprar</button>
                    </div>
                    <small class="text-muted">$${producto.precio}</small>
                </div>
            </div>
        </div>
    </div>
`
    contenedoralbumnes.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })

})

const agregarAlCarrito = (prodId) =>{
    const existe = carrito.some (prod => prod.id === prodId)
    if (existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const item = Album.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Agregado Al Carrito Exitosamente'
      })
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className =  ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar">X</button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    }) 
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}
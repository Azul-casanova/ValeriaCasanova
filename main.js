const productos = [
  { id: 1, nombre: 'Terapia cognitiva 1 hora', precio: 10 },
  { id: 2, nombre: 'Terapia cognitiva 30 minutos', precio: 20 },
  { id: 3, nombre: 'Terapia cognitiva 15 minutos ', precio: 30 }
];


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const listaProductos = document.getElementById('listaProductos');
const listaCarrito = document.getElementById('listaCarrito');
const totalElement = document.getElementById('total');
const vaciarCarritoButton = document.getElementById('vaciarCarrito');
const VerCarrito = document.getElementById('VerCarrito');
const Carrito = document.getElementById('Carrito');


function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

VerCarrito.addEventListener("click", ()=>{
  if(Carrito.style.display === "none"){
    Carrito.style.display = "block"
  }else {
    Carrito.style.display = "none"
  }
})

function renderizarProductos() {
  const listaProductos = document.getElementById('listaProductos');
  listaProductos.innerHTML = '';

  productos.forEach(producto => {
      const li = document.createElement('li');
      li.className = 'listaProductos'
      li.innerHTML = `
          <span>${producto.nombre} - $${producto.precio}</span>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      `;
      listaProductos.appendChild(li);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);

  const existente = carrito.find(item => item.id === id);

  if (existente) {
      existente.cantidad++;
  } else {
      carrito.push({ ...producto, cantidad: 1 });

  }

  guardarCarritoEnLocalStorage();
  renderizarCarrito();

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Agregado al carrito",
    showConfirmButton: false,
    timer: 1500
  });
}


function eliminarDelCarrito(id) {
  carrito = carrito.filter(producto => producto.id !== id);
  guardarCarritoEnLocalStorage();
  renderizarCarrito();
}

function actualizarCantidad(id, operacion) {
  const producto = carrito.find(item => item.id === id);

  if (producto) {
      if (operacion === 'sumar') {
          producto.cantidad++;
      } else if (operacion === 'restar' && producto.cantidad > 1) {
          producto.cantidad--;
      }
  }

  guardarCarritoEnLocalStorage();
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem('carrito');
  renderizarCarrito();
}

function renderizarCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  listaCarrito.innerHTML = '';

  let total = 0;

  carrito.forEach(producto => {
      const li = document.createElement('li');
      li.innerHTML = `
          <span>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</span>
          <button onclick="actualizarCantidad(${producto.id}, 'restar')">-</button>
          <button onclick="actualizarCantidad(${producto.id}, 'sumar')">+</button>
          <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
      `;
      listaCarrito.appendChild(li);
      total += producto.precio * producto.cantidad;
  });

  const totalElement = document.getElementById('total');
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}


document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);
renderizarProductos();
renderizarCarrito();



//api
async function CrearComentarios() {
  const comentarios = document.getElementById('comentarios');
  comentarios.innerHTML = '';
}

async function obtenerComentarios() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const listaComentarios = await response.json();
    return listaComentarios;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "No se pudieron obtener los comentarios",
    });
    return [];
  }
}

async function renderizarComentarios() {
  const comentarios = document.getElementById('comentarios');
  comentarios.innerHTML = '';

  try {
    const listaComentarios = await obtenerComentarios();
    listaComentarios.forEach(comentario => {
      const Comentario = document.createElement('li');
      Comentario.textContent = `${comentario.name} - ${comentario.email}: ${comentario.body}`;
      comentarios.appendChild(Comentario);
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "No se pudieron obtener los comentarios",
    });
  }
}

renderizarComentarios();

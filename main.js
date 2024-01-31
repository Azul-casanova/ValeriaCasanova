



//CONSTRUCTOR
class Reunion {
    constructor(metodo, duracion, costo) {
    this.metodo = metodo,
    this.duracion= duracion,
    this.costo = costo
    }
    }
    
    //NEW REUNIONES
    const Reunion1 = new Reunion("online", 20, 4000);
    const Reunion2 = new Reunion("online", 30, 5000);
    const Reunion3 = new Reunion("online", 40, 8000);
    const Reunion4 = new Reunion("presencial", 60, 12000);
    
    //ARRAY PRODUCTOS
    const Productos = [Reunion1, Reunion2, Reunion3, Reunion4]
    
    const Carrito = []

    //TRAER DEL HTML
    const atencionAlCliente = document.getElementById("atencionAlCliente");
    const VerCarrito = document.getElementById("VerCarrito");
    const headerCarrito = document.getElementById("header-carrito");
    
    Productos.forEach((product) =>{
    let Card = document.createElement("div");
    Card.className = "Card";
    Card.innerHTML = `
    <h3>Método de consulta: ${product.metodo}</h2>
    <p>Duración: ${product.duracion}</p>
    <p>Costo de la consulta: ${product.costo}</p>
    `
    atencionAlCliente.appendChild(Card);
    
    let Comprar = document.createElement("button");
    Comprar.className = "Comprar"
    Comprar.innerHTML = `
    <button>Añadir al carrito</button>
    `
    Card.appendChild(Comprar);
    
    Comprar.addEventListener("click", ()=>{
    Carrito.push(product);
    let guardarCarrito = localStorage.getItem("Carrito");
    if (guardarCarrito) {
        Carrito = JSON.parse(guardarCarrito);
        Carrito.push(product);
    } else {
        Carrito = [product];
    }
    

    localStorage.setItem("Carrito", JSON.stringify(Carrito));
    })
    })
    
    
    VerCarrito.addEventListener("click", function() {
      VerCarrito.innerHTML = ''; 
        headerCarrito.innerHTML ='';
    
      Carrito.forEach((product)=> {

        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>Método de consulta: ${product.metodo}</h3>
          <p>Duración: ${product.duracion}</p>
          <p>Costo de la consulta: ${product.costo}</p>
        `
        VerCarrito.appendChild(card);
      });

      let sectionCarrito = document.createElement("div");
      sectionCarrito.className = "sectionCarrito";
      sectionCarrito.innerHTML = `
      <a href="https://api.whatsapp.com/send?phone=543446355922"><p>IR A PAGAR</p></a>
      `
      VerCarrito.appendChild(sectionCarrito);

        const total = Carrito.reduce((acc, el) => acc + el.costo, 0);
        let Total = document.createElement("div");
        Total.innerHTML = `
        <p>Total: ${total}</p>`

        VerCarrito.appendChild(Total);
    
    });
    

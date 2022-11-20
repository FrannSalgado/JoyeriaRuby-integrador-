import { Productos } from "./data.js";
const addCart = document.querySelectorAll(".addCart");
const DataCart = document.querySelector(".dataRender");
const cardsContainer = document.querySelector(".cards");
// const crossItem = document.querySelectorAll(".cross")
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const setLocalStorage = (array) => {
    localStorage.setItem("carrito", JSON.stringify(array));
}
const addToCart = (array) => {
    carrito = [...carrito, array];
    setLocalStorage(carrito);

}

const renderCart = () => {
    if (!DataCart || !cardsContainer) return;

    let total = 0;
    cardsContainer.innerHTML = ``;
    if (carrito.length === 0) {
        cardsContainer.innerHTML +=
            `
        <div class="InfoProductCart flex">
            <a href="../index.html">
               <h2 class="cardProductCart" >Añade Productos</h2>
            </a>
        </div>
        `
        DataCart.innerHTML = ``;
        return
    }
    carrito.map(iterador => {
        total += iterador.precio;
        const card =
            ` 
            <div>
                
                    <div class="cardProductCart">
                        <div class="imgContainCart">
                            <img src=../${iterador.img} alt="" class="cardImg">
                        </div>
                        <div class="InfoProductCart ">
                            <h2>${iterador.nombre}</h2>
                            <h4>Precio : ${iterador.precio}</h4>
                        </div>
                            <div class="delete">
                                <i class="fa-regular fa-circle-xmark  cross size" id="${iterador.id}"></i>
                            </div>
                    </div>
            
            </div>
    `;
        cardsContainer.innerHTML += card;


    })

    DataCart.innerHTML = `<div>
        <h1>Carrito </h1>
        <div class="line"></div>
        <h2>Productos:${carrito.length}</h2>
        <h2>Envio: Gratis</h2>
    </div>

    <div>
        <p>Total: $${total}</p>

    </div>
    <div class="line"></div>
    <button value="1" class="toggleMenu toggle"> Comprar</button>`


}


const deleteItem = () => {
    const crossItem = document.querySelectorAll(".cross")
    crossItem.forEach(i => {
        i.addEventListener("click", e => {
            const carritoFiltrado = carrito.filter(iterador => {
                if (iterador.id !== parseInt(i.id)) {

                    return iterador;


                }
            })
            carrito = carritoFiltrado;
            setLocalStorage(carrito)

            renderCart();
            deleteItem();

        })
    })
}


const addCartFunction = () => {

    addCart.forEach(i => {
        i.addEventListener("click", e => {
            Productos.filter(iterador => {
                if (iterador.id === parseInt(i.id)) {
                    addToCart(iterador)

                    return
                }

            })
        })
    })
}

const init = () => {
    addCartFunction()
    renderCart();
    deleteItem();


}
init();
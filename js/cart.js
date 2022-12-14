import { Productos } from "./data.js";
export let addCart = document.querySelectorAll(".addCart");
const DataCart = document.querySelector(".dataRender");
const cardsContainer = document.querySelector(".cards");
// const crossItem = document.querySelectorAll(".cross")
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


export const RefreshButtons = () => {
    addCart = document.querySelectorAll(".addCart");
}
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
                            <a href="../html/producto.html?id=${iterador.id}"><h2>${iterador.nombre}</h2></a>
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
            let check = false;
            const carritoFiltrado = [];
            carrito.map(iterador => {
                if (iterador.id !== parseInt(i.id)) {
                    carritoFiltrado.push(iterador);
                    return
                }
                if (iterador.id === parseInt(i.id) && check === false) {
                    check = true
                    return
                }
                else {
                    carritoFiltrado.push(iterador)
                }
            })
            carrito = carritoFiltrado;
            setLocalStorage(carrito)

            renderCart();
            deleteItem();

        })
    })
}

export const addCartFunction = () => {

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
    // RefreshButtons();
    addCartFunction()
    renderCart();
    deleteItem();


}
init();
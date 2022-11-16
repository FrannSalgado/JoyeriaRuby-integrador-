import { Productos } from "./data.js";
const productos = Productos;
console.log(productos);

const renderContainer = document.querySelector(".renderProducts");
const selectorProduct = document.getElementById("product");
const selectorMaterial = document.getElementById("material");
const moreItems = document.getElementById("moreItems");
const imageSlider = document.querySelectorAll(".image")
const profileIcon = document.querySelectorAll(".toggle")
const containerAcount = document.querySelector(".containerAcount")
let dataRender = [];


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);

}
const renderProducts = (array) => {
    renderContainer.innerHTML = ``;
    const arraySliced = array.slice(dataRender.length, dataRender.length + 12)
    dataRender = dataRender.concat(arraySliced);
    console.log(dataRender.length)

    if (dataRender.length === array.length) { moreItems.classList.add("displayNone") }
    else {
        moreItems.classList.remove("displayNone")
    }



    dataRender.map(iterador => {
        const card =
            ` 
        <div>
            <a href="producto.html?id=${iterador.id}">
                <div class="cardProduct" id="${iterador.id}">
                    <div class="cardImg">
                        <img class="cover" src=${iterador.img} alt="">
                    </div>
                    <div class="cardInfo">
                        <div class="cardLink">
                            <a href="producto.html?id=${iterador.id}">${iterador.nombre}</a>
                        </div>
                        <div class="cardPrice">
                            <p>Precio: $${iterador.precio}</p>
                        </div>
                        <div class="cardBtn">
                            <button>+ Carrito</button>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `;
        renderContainer.innerHTML += card;
    })
}


const arrayFilter = () => {
    const material = selectorMaterial.value;
    const product = selectorProduct.value;
    if (material === "" && product === "") {
        return productos
    }
    const filterByMaterial = productos.filter(i => {
        if (material === "") { return productos }
        return i.Metal === material
    })
    const filterByType = filterByMaterial.filter(i => {
        if (product === "") { return filterByMaterial }
        return i.tipo === product
    })
    return filterByType;
}


function filtro() {
    dataRender = []
    const arrayToRender = arrayFilter()
    renderProducts(arrayToRender)

}
function moreProducts() {
    renderProducts(arrayFilter());
}

const filtroSlider = ({ target }) => {
    selectorMaterial.value = target.dataset.id;
    selectorProduct.value = "";
    filtro();

}

const init = () => {
    shuffle(productos);
    selectorMaterial.addEventListener('change', filtro)
    selectorProduct.addEventListener('change', filtro)
    moreItems.addEventListener("click", moreProducts)
    imageSlider.forEach(i => {
        i.addEventListener("click", filtroSlider)
    })
    profileIcon.forEach(i => {
        i.addEventListener("click", (e) => {
            e.preventDefault();
            containerAcount.classList.toggle("displayNone");
        })
    })

    renderProducts(productos);
}

init();
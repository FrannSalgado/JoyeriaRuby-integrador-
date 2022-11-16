import { Productos } from "./data.js";
const containerData = document.querySelector(".dataRender")
const containerImgD = document.querySelector(".imagenProduct")
const getIdByQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    return productId;
};

const productData = Productos;

const rendeProduct = () => {
    productData.filter(iterador => {
        if (iterador.id === getIdByQueryParams()) {
            containerImgD.innerHTML = `<img src=${iterador.img} alt="">`
            containerData.innerHTML =
                `
                <h1>${iterador.nombre} </h1>
                <h2>${iterador.descripcion}</h2>
                <p>$${iterador.precio}</p>
            `

        }
    })

}
rendeProduct();
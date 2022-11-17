const profileIcon = document.querySelectorAll(".toggle")
const containerAcount = document.querySelector(".containerAcount")
const login = document.querySelector(".login")
const register = document.querySelector(".register")
const choise = document.querySelector(".choise")
const changeToRegister = document.getElementById("changeToRegister")
const changeToLogin = document.getElementById("changeToLogin")
const toggleMenu = document.querySelectorAll(".toggleMenu");
const burgerMenu = document.querySelector(".containerBurgerMenu");




const valueDo = (value) => {
    if (value === "1") {
        choise.classList.toggle("displayNone")
        login.classList.toggle("displayNone");
        return
    }
    if (value === "2") {
        choise.classList.toggle("displayNone")
        register.classList.toggle("displayNone")
        return
    }

    else {
        containerAcount.classList.toggle("displayNone");
    }


}

const init = () => {
    profileIcon.forEach(i => {
        i.addEventListener("click", (e) => {
            e.preventDefault();
            valueDo(i.value)


        })
    })
    changeToRegister.addEventListener("click", (e) => {
        valueDo("1")
    })
    changeToLogin.addEventListener("click", (e) => {
        valueDo("2")
    })
    toggleMenu.forEach(i => {
        i.addEventListener("click", (e) => {
            burgerMenu.classList.toggle("displayNone")
        })
    })



}

init();
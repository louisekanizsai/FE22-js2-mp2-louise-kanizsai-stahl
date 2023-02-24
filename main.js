import {Bear} from "./modules/bear.js"
import {Lion} from "./modules/lion.js"

const form = document.querySelector("form");

form.addEventListener("submit", event => {
    event.preventDefault();
 
    const name = document.querySelector("input").value;
    const type = document.querySelector("select").value;
    const container = document.querySelector("#container");

    if (type == "bear") {
        new Bear(name,container);
    }
    else if (type == "lion"){
        new Lion(name,container);
    }
})
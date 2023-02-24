import { Tamagotchi } from "./tamagotchi.js"

export class Bear extends Tamagotchi {
    #name;
    #element;
    #img;
    #container;
    #feedBtn;
    #comfortBtn;

    constructor(name, container) {
        super();
        this.#name = name;
        this.#container = container;
        this.createGUI();
        this.checkStatus();
    }
    checkStatus() {
        let preFood = 0;
        let preComfort = 0;

        // kollar när food/comfort ändrats (intervaller i Tamagotchi-klassen)
        const interval = setInterval(() => {
            let foodCounter = super.getCurrentFed();
            let comfortCounter = super.getCurrentComfort();
            let changeMade = false;

            if (preFood !== foodCounter) {
                changeMade = true;
                preFood = foodCounter;
            }
            else if (preComfort !== comfortCounter) {
                changeMade = true;
                preComfort = comfortCounter;
            }

            // olika mående beroende på värdet på food/comfort
            if (changeMade == false) {
                if (preComfort == 0 || preFood == 0) {
                    clearInterval(interval);
                    this.death();
                }
                else if (preComfort <= 4 || preFood <= 4) {
                    this.closeToDeath();
                }
                else if (preComfort >= 5 && preFood >= 5) {
                    this.feelsGreat();
                }
            }
        }, 100);
    }
    feelsGreat() {
        this.#element.style.backgroundColor = "#cbdacf";
        this.#img.src = "../images/happybear.png"
    }
    closeToDeath() {
        this.#element.style.backgroundColor = "#e6dfd3";
        this.#img.src = "../images/sadbear.png"
    }
    death() {
        this.#element.style.backgroundColor = "#d9beb8";
        this.#img.src = "../images/deadbear.png"

        this.#feedBtn.disabled = true;
        this.#comfortBtn.disabled = true;
    }
    createGUI() {
        // skapar tamagotchin, dvs burken/lådan/äggformade saken
        const tamagotchi = document.createElement("div");
        tamagotchi.classList.add("tamagotchi", "bear");
        this.#container.append(tamagotchi);

        // skapar displayen + dess innehåll
        this.#element = document.createElement("div");
        this.#element.classList.add("display");
        this.#element.style.backgroundColor = "#cbdacf";
        tamagotchi.append(this.#element);
        const nameText = document.createElement("h3");
        this.#img = document.createElement("img");
        this.#img.src = "../images/happybear.png"
        const hungerP = document.createElement("p");
        const comfortP = document.createElement("p");
        this.#element.append(nameText,this.#img, hungerP, comfortP);
        nameText.innerText = this.#name;

        // börjar räkna ner behoven
        super.startHunger(hungerP);
        super.startDiscomfort(comfortP);

        // knappar
        this.#feedBtn = document.createElement("button");
        this.#comfortBtn = document.createElement("button");
        tamagotchi.append(this.#feedBtn, this.#comfortBtn);
        this.#feedBtn.innerText = "🍎";
        this.#comfortBtn.innerText = "❤️";

        this.#feedBtn.addEventListener("click", () => {
            super.addFood(hungerP);
        })
        this.#comfortBtn.addEventListener("click", () => {
            super.giveComfort(comfortP);
        })
    }
}
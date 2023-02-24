export class Tamagotchi {
  #currentComfort;
  #currentFed;
  #max;
  #comfortID;
  #fedID;

  constructor() {
    this.#currentComfort = 5;
    this.#currentFed = 5;
    this.#max = 10;
  }

  getCurrentFed() {
    return this.#currentFed;
  }
  getCurrentComfort() {
    return this.#currentComfort;
  }

  // 2 funktioner som börjar hunger/discomfort-interval. anropas från createGUI-metoden i barnklassen, dvs så fort tamagotchin skapats
  startHunger(element) {
    this.makeHungry(element);
    this.#fedID = setInterval(() => {
      this.makeHungry(element);
    }, 2000);
  }
  startDiscomfort(element) {
    this.makeUncomfortable(element);
    this.#comfortID = setInterval(() => {
      this.makeUncomfortable(element);
    }, 3000);
  }

  stop() {
    clearInterval(this.#comfortID);
    clearInterval(this.#fedID);
  }

  // 2 funktioner som minskar food/comfort tills 0
  makeHungry(element) {
    this.#currentFed--;
    element.innerText = `🍎 ${this.#currentFed}/10`;

    if (this.#currentFed <= 0) this.stop();
  }
  makeUncomfortable(element) {
    this.#currentComfort--;
    element.innerText = `❤️ ${this.#currentComfort}/10`;

    if (this.#currentComfort <= 0) this.stop();
  }

  // 2 funktioner som anropas vid klick på food/comfort-knapparna (=> +1 food/comfort)
  addFood(element) {
    if (this.#currentFed < this.#max) {
      this.#currentFed++;
      element.innerText = `🍎 ${this.#currentFed}/10`;
    }
  }
  giveComfort(element) {
    if (this.#currentComfort < this.#max) {
      this.#currentComfort++;
      element.innerText = `❤️ ${this.#currentComfort}/10`;
    }
  }
}

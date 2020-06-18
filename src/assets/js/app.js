class App {
  constructor(names, rounds) {
    this.names = names;
    this.rounds = rounds;
    this.squares = document.querySelectorAll(".square");
    this.squares.forEach((square) => {
     square.style.width = 50;
     square.style.height = 50;
     
    }); }
}

const app = new App(["Morgan", "Bot"], 3);

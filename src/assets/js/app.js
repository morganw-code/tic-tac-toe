class App {
  constructor(names, rounds) {
    this.names = names;
    this.rounds = rounds;
    this.clicks = 0;
    this.turn = names[0];
    this.squares = Array.from(document.querySelectorAll(".square")).map(
      (node) => {
        const obj = {
          square: node,
          clicker: null
        };

        return obj;
      }
    );

    this.squares.forEach((obj) => {
      obj.square.addEventListener("click", this.handleClick.bind(this), {
        once: true,
      });
    });
  }

  handleClick(click) {
    this.clicks++;
    if (this.clicks > 2) {
      this.checkWin();
    }

    this.squares.forEach((obj) => {
      if (click.target === obj.square) {
        obj.clicker = this.turn;
        console.log(obj.clicker);
      }
    });

    this.turn = this.turn === this.names[0] ? this.names[1] : this.names[0];
  }

  checkWin() {
  }
}

const app = new App(["Morgan", "Steve"], 3);

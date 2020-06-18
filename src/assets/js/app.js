class App {
  constructor(names) {
    this.names = names;
    this.clicks = 0;
    this.turn = names[0];
    this.running = true;
    this.status = document.createElement("h1");
    this.status.innerHTML = "RUNNING";
    document.querySelector("body").prepend(this.status);

    // construct object with square node and it's status
    this.squares = Array.from(document.querySelectorAll(".square")).map(
      (node) => {
        const obj = {
          square: node,
          clicker: null,
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
    if (this.running) {
      this.clicks++;
      
      // set square clicker
      this.squares.forEach((obj) => {
        if (click.target === obj.square) {
          obj.clicker = this.turn;
          obj.square.appendChild(document.createTextNode(this.turn));
          console.log(obj.clicker);
        }
      });

      if (this.clicks > 2) {
        this.checkWin();
      }

      // switch turns
      this.turn = this.turn === this.names[0] ? this.names[1] : this.names[0];
    }
  }

  checkWin() {
    if (
      this.checkMatch(
        this.squares[0].clicker,
        this.squares[1].clicker,
        this.squares[2].clicker
      )
    ) {
      this.printWinner(this.squares[0].clicker);
    } else if (
      this.checkMatch(
        this.squares[3].clicker,
        this.squares[4].clicker,
        this.squares[5].clicker
      )
    ) {
      this.printWinner(this.squares[3].clicker);
    } else if (
      this.checkMatch(
        this.squares[6].clicker,
        this.squares[7].clicker,
        this.squares[8].clicker
      )
    ) {
      this.printWinner(this.squares[6].clicker);
    } else if (
      this.checkMatch(
        this.squares[0].clicker,
        this.squares[3].clicker,
        this.squares[6].clicker
      )
    ) {
      this.printWinner(this.squares[0].clicker);
    } else if (
      this.checkMatch(
        this.squares[1].clicker,
        this.squares[4].clicker,
        this.squares[7].clicker
      )
    ) {
      this.printWinner(this.squares[1].clicker);
    } else if (
      this.checkMatch(
        this.squares[2].clicker,
        this.squares[4].clicker,
        this.squares[6].clicker
      )
    ) {
      this.printWinner(this.squares[2].clicker);
    } else if (
      this.checkMatch(
        this.squares[0].clicker,
        this.squares[4].clicker,
        this.squares[8].clicker
      )
    ) {
      this.printWinner(this.squares[0].clicker);
    } else if (
      this.checkMatch(
        this.squares[2].clicker,
        this.squares[4].clicker,
        this.squares[6].clicker
      )
    ) {
      this.printWinner(this.squares[2].clicker);
    } else if (
      // check if all squares have been clicked after no winner
      this.squares.every((square) => {
        return square.clicker !== null;
      })
    ) {
      this.status.innerHTML = "GAME OVER - TIE";
      this.running = false;
    }
  }
  
  // check if nodes have same clicker
  checkMatch(x, y, z) {
    if (x === null || y === null || z === null) {
      return false;
    }
    return x === y && x === z;
  }

  printWinner(clicker) {
    console.log(`${clicker} won!`);
    this.running = false;
    this.status.innerHTML = `GAME OVER - ${clicker} won!`;
  }
}

function start() {
  new App([nameField1.value, nameField2.value]);
}

const inputContainer = document.createElement("div");
const startButton = document.createElement("button");
startButton.innerHTML = "Start";
const nameField1 = document.createElement("input");
const nameField2 = document.createElement("input");
inputContainer.appendChild(nameField1);
inputContainer.appendChild(nameField2);
inputContainer.appendChild(startButton);
startButton.addEventListener("click", start);
document.querySelector("body").appendChild(inputContainer);

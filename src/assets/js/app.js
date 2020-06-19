class App {
  constructor(names) {
    this.names = names;
    this.clicks = 0;
    this.isXTurn = false;
    this.running = true;
    this.status = document.createElement("h1");
    this.status.innerHTML = "RUNNING";
    document.querySelector("body").prepend(this.status);

    // construct array of objects with square node and it's status
    this.squares = Array.from(document.querySelectorAll(".square")).map(
      (node) => {
        const obj = {
          square: node,
          xClicked: null,
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
          obj.xClicked = this.isXTurn;
          obj.square.appendChild(document.createTextNode(this.isXTurn));
          console.log(obj.xClicked);
        }
      });

      if (this.clicks > 2) {
        this.checkWin();
      }

      // switch turns
      this.isXTurn = !this.isXTurn;
    }
  }

  checkWin() {
    if (this.running) {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 6],

        [0, 4, 8],
        [2, 4, 6],
      ];

      // checks all combinations for a winner
      winningCombos.forEach((combo) => {
        if (
          combo.every((square) => {
            return this.squares[square].xClicked === this.isXTurn;
          })
        ) {
          // color winning squares
          combo.forEach((square) => {
            this.squares[square].square.style.backgroundColor = "green";
          });
          this.status.innerHTML = `GAME OVER - ${
            this.squares[combo[0]].xClicked
          } WON!`;
          this.running = false;
        } else if (
          // check if all squares have been played after determining no winner
          this.squares.every((square) => {
            return square.xClicked !== null;
          })
        ) {
          this.status.innerHTML = "GAME OVER - TIE";
          this.running = false;
        }
      });
    }
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

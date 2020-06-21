class Game {
  constructor(names) {
    this.names = names;
    this.clicks = 0;
    this.isXTurn = true;
    this.running = true;
    this.statusBar = document.querySelector("#status-bar");
    this.status = document.createElement("p");
    this.status.innerHTML = "RUNNING";
    this.statusBar.appendChild(this.status);

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
          obj.square.innerText = this.isXTurn ? "X" : "O";
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
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

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
          this.squares[combo[0]].xClicked ? this.names[0] : this.names[1]
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

const start = () => {
  if (nameField1.value && nameField2.value) {
    new Game([nameField1.value, nameField2.value]);
  } else {
    alert("please enter both player names!");
  }
};

const inputsContainer = document.querySelector("#inputs-container");
const startButton = document.createElement("button");
const nameField1 = document.createElement("input");
const nameField2 = document.createElement("input");
const p1 = document.createElement("p");
const p2 = document.createElement("p");
startButton.innerHTML = "Start";
p1.innerHTML = "X";
p1.style.display = "inline-block";
p2.innerHTML = "O";
p2.style.display = "inline-block";
inputsContainer.appendChild(p1);
inputsContainer.appendChild(p2);
inputsContainer.appendChild(nameField1);
inputsContainer.appendChild(nameField2);
inputsContainer.appendChild(startButton);
nameField1.id = "name-field1";
nameField1.placeholder = "player1";
nameField2.id = "name-field2";
nameField2.placeholder = "player2";
startButton.id = "start-button";
startButton.addEventListener("click", start);

const game = () => {
  // Create Ship class
  class Ship {
    constructor(hull, firepower, accuracy, name = "") {
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
      this.name = name;
    }

    attack = (ship) => {
      if (Math.random() < this.accuracy) {
        ship.hull -= this.firepower;
        console.log(
          `${this.name} attacks ${ship.name}. ${ship.name} takes ${this.firepower} damage!`
        );
        if (ship.hull <= 0) {
          console.log(`${ship.name} is destroyed!`);
        }

        // console.log(ship.name, ship.hull);
      } else {
        console.log(`${this.name}'s attack misses!`);
        // console.log(`%c${this.name}'s attack misses!`, "background: #f6bd60");
      }
    };
  }

  // Create player
  const player = new Ship(20, 5, 0.7, "USS Assembly");

  // Function to create new alien ship
  const createAlienShip = (name) => {
    return new Ship(
      Math.floor(Math.random() * (6 - 3 + 1) + 3), // Alien Hull
      Math.floor(Math.random() * (4 - 2 + 1) + 2), // Alien Firepower
      (Math.floor(Math.random() * (8 - 6 + 1) + 6) * 0.1).toPrecision(1) * 1, // Alien Accuracy
      name
    );
  };

  // Empty array to hold aliens
  let aliens = [];
  // Populate aliens array with 6 alien
  const populateAliens = () => {
    for (let i = 1; i <= 6; i++) {
      aliens.push(createAlienShip(`Alien${i}`));
    }
  };
  populateAliens();

  ////
  let i = 0;
  const attackAlien = () => {
    player.attack(aliens[i]);
    updateUI();
    if (aliens[i].hull <= 0) {
      updateUI();
      const run = prompt("Run away?");
      if (run == "y") {
        console.log("You lose.");
        reset();
      } else if (run == "n") {
        // if(i < aliens.)
        i++;
        updateUI();
        return;
      }
    }

    if (player.hull > 0) {
      aliens[i].attack(player);
    } else if (player.hull <= 0) {
      alert("You lose!");
      reset();
    }
    // if (player.hull > 0) {
    //   aliens[i].attack(player);
    // } else if (aliens[i].hull <= 0) {
    //   i++;
    // }

    updateUI();
  };
  ////
  const buttonsContainer = document.querySelector(".buttons-container");

  const attackButton = Object.assign(document.createElement("button"), {
    onclick: attackAlien,
    innerHTML: "Attack",
  });

  buttonsContainer.append(attackButton);

  // Player
  const playerDiv = document.querySelector(".player");
  // Player name
  const playerNameDiv = document.querySelector(".name");
  playerNameDiv.innerHTML = player.name;
  // Player hull
  const playerHullDiv = document.querySelector(".hull");
  playerHullDiv.innerHTML = `Hull: ${player.hull}`;

  const alienDiv = document.querySelector(".alien");
  const alienNameDiv = Object.assign(document.createElement("div"), {
    className: "name",
    innerHTML: `${aliens[i].name}`,
  });
  // hull;
  const alienHullDiv = Object.assign(document.createElement("div"), {
    className: "hull",
    innerHTML: `Hull: ${aliens[i].hull}`,
  });

  alienDiv.append(alienNameDiv);
  alienDiv.append(alienHullDiv);

  const reset = () => {
    i = 0;
    player.hull = 20;
    aliens = [];
    populateAliens();
    updateUI();
  };

  const updateUI = () => {
    playerHullDiv.innerHTML = `Hull: ${player.hull}`;
    alienNameDiv.innerHTML = aliens[i].name;
    alienHullDiv.innerHTML = `Hull: ${aliens[i].hull}`;
  };
};

game();

// let i = 0;
// while (player.hull >= 0 || i < aliens.length) {
//   if (aliens[i]) {
//     player.attack(aliens[i]);
//   }
//   if (aliens[i].hull > 0) {
//     aliens[i].attack(player);
//     if (player.hull <= 0) {
//       console.log("You lose");
//       break;
//     }
//   }
//   if (aliens[i].hull <= 0 && i < aliens.length) {
//     i++;
//   }

//   if (i === aliens.length) {
//     console.log("You win!");
//     break;
//   }
// }

// Create the Splash Screen Function
document.querySelector(".control-buttons span").onclick = function () {
  let yourName = window.prompt("Player Name:");
  if (yourName === null || yourName === "") {
    // Set Name to Unknown
    document.querySelector(".info-container .name span").innerHTML = "Unknown";
    // Name Is Not Empty
  } else {
    // Set Name to Your Name
    document.querySelector(".info-container .name span").innerHTML = yourName;
  }
  document.querySelector("#onstart").play();
  // it works
  showFor2Seconds(blocks);
  // remove the whole splash screen after everything
  document.querySelector(".control-buttons").remove();
};

// Set the Variables

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// create Range of keys
// let orderRange = [...Array(blocks.length).keys()];

// another way for creation of orderRange
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

// variable to see if we should show congratulation message or not
let numberOfMatchedBlocks = 0;
let win = document.querySelector(".win");

// add order css property to game blocks
blocks.forEach((block, index) => {
  // Add Css Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flip Block Function
    flipBlock(block);
  });
});

// Shuffle Function
function shuffle(array) {
  // Setting Vars
  let current = array.length;
  let temp, random;
  while (current > 0) {
    // Get random Number
    random = Math.floor(Math.random() * current);

    // Decrease the length by one
    current--;

    // [1] Save Current element in stash
    temp = array[current];

    // [2] Current element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}

// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  // collect all Flipped Card
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();

    // Check Matched Block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  // Add Class no-clicking on Main Container
  blocksContainer.classList.add("no-clicking");

  // Remove class no-clicking after the duration
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
  // get the tries Element
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-matched");
    secondBlock.classList.add("has-matched");

    document.querySelector("#success").play();

    numberOfMatchedBlocks += 2;

    if (numberOfMatchedBlocks === blocks.length) {
      blocksContainer.remove();
      win.innerHTML = `Congratulation ${
        document.querySelector(".info-container .name span").innerHTML
      }, Your tries: ${
        document.querySelector(".info-container .tries span").innerHTML
      }`;
      win.classList.add("true");
      document.querySelector(".info-container").remove();
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.querySelector("#fail").play();
  }
}

// a try to make the whole cards appear for 2 seconds before start the game
function showFor2Seconds(blocks) {
  blocks.forEach((block) => {
    block.classList.add("is-flipped");
  });
  setTimeout(() => {
    blocks.forEach((block) => {
      block.classList.remove("is-flipped");
      document.querySelector("#onstart").play();
    });
  }, 2000);
}
// it success.

// try to add a congratulation banner after winning the game


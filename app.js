class Hangman {
    
    constructor(guess, gameState, buttons, hangman, wordList) {

        // Initiliaze class prperties
        this.guess = guess;
        this.gameState = gameState;
        this.buttons = buttons;
        this.hangman = hangman;
        this.wordList = wordList;
        this.liveCount = 6;
        this.word = undefined;
        this.userGuess = "";
        this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // Save all the stages of hangman as ascii,
        // in descending numbering for easier tracking in update
        this.stage6 = "<pre> _______\n|     |\n|\n|\n|\n|\n|___ \n</pre>";
        this.stage5 = "<pre> _______\n|     |\n|     O\n|\n|\n|\n|___ \n</pre>";
        this.stage4 = "<pre> _______\n|     |\n|     O\n|     |\n|\n|\n|___ \n</pre>";
        this.stage3 = "<pre> _______\n|     |\n|     O\n|    /|\n|\n|\n|___ \n</pre>";
        this.stage2 = "<pre> _______\n|     |\n|     O\n|    /|\\\n|\n|\n|___ \n</pre>";
        this.stage1 = "<pre> _______\n|     |\n|     O\n|    /|\\\n|    /\n|\n|___ \n</pre>";
        this.stage0 = "<pre> _______\n|     |\n|     O\n|    /|\\\n|    / \\\n|\n|___ \n</pre>";
    
        // Call the setUpGame method when a new instance of Hangman is created
        this.setUpGame();
    }

    setUpGame() {
        this.allButtons = this.getButtons();
        this.getWord();
        this.guess.textContent = this.userGuess;
        this.hangman.innerHTML = this.stage6;
    }

    // Create all the buttons for each letter in an alphabet and render them
    getButtons() {
        const buttons = [];
        for (let char of this.alphabet){       
            const button = document.createElement("button");
            button.textContent = char;
            buttons.push(button);
            this.buttons.appendChild(button);
        }
        return buttons;
    }

    // Select a random word from a list
    getWord() {
        this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        for (var i = 0; i < this.word.length; i++) {
            this.userGuess += "_";
        }
        console.log(this.word);
    }

    // Checks the answer by looping through the word, sets the score and the buttons
    // based on the answer, and calls the methods that render winning / losing 
    // texts and update the hangman stages
    checkAnswer(button) {
        let letter = button.innerText;
        let foundMatch = false;
        let currentGuess= this.userGuess.split("");

        for (let i = 0; i < this.word.length; i++) {
            if (letter === this.word[i]) {
                foundMatch = true;
                currentGuess[i] = letter;
                foundMatch.true;
                button.style.backgroundColor = "#DDFFBB";
                button.removeEventListener("click", this.checkAnswer);
            }
        }

        this.userGuess = currentGuess.join("");
        this.guess.innerText = this.userGuess;

        if (!foundMatch) {
            button.style.backgroundColor = "#F0EEED";
            button.removeEventListener("click", this.checkAnswer);
            this.liveCount -= 1;
            this.updateHangman();
        } else {
            this.checkWin();
        }
    }

    checkWin() {
        if (this.liveCount > 0 && this.guess.innerText === this.word) {
            this.gameState.innerText = "You won!";
            this.guess.style.color = "#94AF9F";
        }
    }

    updateHangman() {
        switch(this.liveCount) {
            case 6: {
                this.hangman.innerHTML = this.stage6;
                break;
            }
            case 5: {
                this.hangman.innerHTML = this.stage5;
                break;
            }
            case 4: {
                this.hangman.innerHTML = this.stage4;
                break;
            }
            case 3: {
                this.hangman.innerHTML = this.stage3;
                break;
            }
            case 2: {
                this.hangman.innerHTML = this.stage2;
                break;
            }
            case 1: {
                this.hangman.innerHTML = this.stage1;
                break;
            }
            case 0: {
                this.hangman.innerHTML = this.stage0;
                this.endGame();
                break;
            }
        }
    }

    endGame() {
        if (this.liveCount === 0) {
            this.gameState.innerText = "You lost!";
            this.guess.innerText = this.word;
            this.guess.style.color = "#D27685";
        }
    }

}


// Get hold of the DOM objects
const guess = document.querySelector(".guess");
const buttons = document.querySelector(".buttons");
const gameState = document.querySelector(".game-state");
const hangman = document.querySelector(".hangman");


const wordList = [
    "CHICKEN",
    "MACHINE",
    "DENTIST",
    "FREEDOM",
    "BUILDER",
    "SOLDIER",
    "WITNESS",
    "SHADOW",
    "CHARGER",
    "VICTORY",
    "GARDENER",
    "PROBLEM",
    "HUNGER",
    "TRAFFIC",
    "MONSTER",
    "FURNACE",
    "DANCER",
    "ATHLETE",
    "EMPLOYEE",
    "PURPOSE",
    "POTENTIAL",
    "HEROINE",
    "FARMER",
    "BICYCLE",
    "STRANGER",
    "POETRY",
    "JEWELRY",
    "MYSTERY",
    "LEGEND",
    "MACHINE",
    "GROCERY",
    "COUNTRY",
    "TURTLE",
    "SHUTTLE",
    "ARTIST",
    "CAPITAL",
    "FACTORY",
    "ANIMAL",
    "DRAGON",
    "NIGHTMARE",
    "SOCCER",
    "CANDY",
    "MAGAZINE",
    "GUITAR",
    "WINNER",
    "MEDICINE",
    "PATTERN",
    "CANDLE",
    "ADVENTURE",
    "CUPBOARD"
  ];
  

// Create new game instance and bind buttons to click
const game = new Hangman(guess, gameState, buttons, hangman, wordList);

for (let button of game.allButtons) {
    button.addEventListener("click", () => {
        game.checkAnswer(button);
    });
}
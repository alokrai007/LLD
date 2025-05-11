import { Board } from "./Board";
import { InputManager } from "./InputManager";
import { Player } from "./Player";
import { PlayingSymbol } from "./Symbol";
import { SymbolX } from "./SymbolX";
import { SymbolY } from "./SymbolY";
import { TicTacToeGame } from "./TicTacToeGame";

export class GameManager{
    private game: TicTacToeGame;
    private player1: Player;
    private player1Symbol: PlayingSymbol;
    private player2: Player;
    private player2Symbol: PlayingSymbol;
    private inputManager: InputManager;

    constructor(){
        this.inputManager = new InputManager();
        // Initialize with dummy values that will be replaced in startGame
        this.player1Symbol = new SymbolX();
        this.player2Symbol = new SymbolY();
        this.player1 = new Player("Player 1", this.player1Symbol);
        this.player2 = new Player("Player 2", this.player2Symbol);
        this.game = new TicTacToeGame(this.player1, this.player2, 3);
    }

    async startGame(){
        // this will start the game
        // we will take inputs from the user, make them select the 
      const player1Name =  await this.inputManager.getInput("Give your name player 1: ");
      let p1Symbol =  await this.inputManager.getInput("Select your playing symbol: X or O ");
      const player2Name =  await this.inputManager.getInput("Give your name player 2: ");
      if(p1Symbol == 'X') {
        this.player1Symbol = new SymbolX();
        this.player2Symbol = new SymbolY();
      } else {
        this.player1Symbol = new SymbolY();
        this.player2Symbol = new SymbolX();
      }
      this.player1 = new Player(player1Name, this.player1Symbol);
      this.player2 = new Player(player2Name, this.player2Symbol);
      this.game = new TicTacToeGame(this.player1, this.player2, 3);
      let winner = false, isDraw = false;
      let row, col;
      while(!winner){
            // print the board
            this.game.printBoard();
            // take the input from the user 1
            let makeMove = false;
            while(!makeMove){
                const p1Input = await this.inputManager.getInput(`Give the postion ${this.player1.getName()} : `);
                const [inputRow, inputCol] = p1Input.split(' ');
                // console.log("the input is ", inputRow, inputCol);
                if (!inputRow || !inputCol) {
                    console.log("Invalid input. Please enter row and column numbers separated by space");
                    continue;
                }
                row = inputRow;
                col = inputCol;
                makeMove = this.game.makeMove(parseInt(row), parseInt(col), this.player1);
            }
            this.game.printBoard();
            winner = this.game.isWinner(parseInt(row!), parseInt(col!), this.player1);
           if(winner)
            break;
           isDraw =  this.game.isDraw();
           if(isDraw){
             break;
           }

           makeMove = false;
           while(!makeMove){
            const p2Input = await this.inputManager.getInput(`Give the postion ${this.player2.getName()} : `);
            const [inputRow, inputCol] = p2Input.split(' ');
            if (!inputRow || !inputCol) {
                console.log("Invalid input. Please enter row and column numbers separated by space");
                continue;
            }
            row = inputRow;
            col = inputCol;
            makeMove = this.game.makeMove(parseInt(row), parseInt(col), this.player2);
            }
            winner = this.game.isWinner(parseInt(row!), parseInt(col!), this.player2);
            if(winner)
             break;
            isDraw =  this.game.isDraw();
            if(isDraw){
              break;
            }   
            // get the row & col from the input
      }
    }
}

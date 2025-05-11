import { PlayingSymbolEnum } from "./enum";
import { PlayingSymbol } from "./Symbol";

interface Cell {
    row: number;
    col: number;
}

export class Board{
    private size: number;
    private playingPiece: PlayingSymbolEnum[][];
    constructor(size: number){
        if(size<=0)
            throw new Error('Board size must be positive');
        this.size = size;
        this.playingPiece = Array(size)
            .fill(null)
            .map(() => Array(size).fill(null));
    }

    getSize(){
        return this.size;
    }

    addPiece(row: number, col: number, playingPiece: PlayingSymbol){
        // check if the move is valid, ( within bounds)
        if(!this.isValidMove(row, col)){
            console.log("Invalid move, please try again");
            return false;
        }

        // check if the selected position is empty
        // console.log("the playing piece is ", this.playingPiece[row][col]);
        if(this.playingPiece[row][col] !== null){
            console.log("Cell not empty, please try again");
            return false;
        }

        // mark the move in board;
        
        const symbol = playingPiece.getSymbol();
        // console.log("Adding symbol:", symbol);  
        this.playingPiece[row][col] = playingPiece.getSymbol();
        // console.log("Board after adding:", this.playingPiece);
        return true;
         
    }

    getPiece(row: number, col: number){
        return this.playingPiece[row][col];
    }

    getFreeCell(): Cell[]{
        let freeCells: Cell[] = [];
       for(let i=0; i<this.size; i++){
        for(let j=0; j<this.size; j++){
            if(!this.playingPiece[i][j])
                freeCells.push({row: i, col: j});
        }
       }
       return freeCells;
    }

    printBoard(){
        // console.log("Current board state:", this.playingPiece); 
        for (let i = 0; i < this.size; i++) {
            let row = '';
            for (let j = 0; j < this.size; j++) {
                const piece = this.playingPiece[i][j];
                // console.log("the piece is ", piece);
                // Add the piece or space
                row += piece !== null? ` ${piece} ` : '   ';
                // Add separator between columns
                if (j < this.size - 1) {
                    row += '|';
                }
            }
            console.log(row);
            
            // Add horizontal line between rows
            if (i < this.size - 1) {
                console.log('-'.repeat(this.size * 4 - 1));
            }
        }
    }

    private isValidMove(row: number, col: number){
        const isValid = row>=0 && col>=0 && row<this.size && col<this.size;
        return isValid;
    }
}
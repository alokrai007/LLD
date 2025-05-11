"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToeGame = void 0;
const Board_1 = require("./Board");
class TicTacToeGame {
    constructor(player1, player2, size) {
        this.players = [];
        this.board = new Board_1.Board(size);
        this.players.push(player1);
        this.players.push(player2);
    }
    getBoard() {
        return this.board;
    }
    printBoard() {
        this.board.printBoard();
    }
    makeMove(row, col, player) {
        return this.board.addPiece(row, col, player.getPlayingPiece());
    }
    isWinner(row, col, player) {
        // check in row & col, then check in diagonal
        const boardSize = this.board.getSize();
        let isWinner = true;
        // check in row
        for (let i = 0; i < boardSize; i++) {
            if (this.board.getPiece(row, i) != player.getPlayingPiece().getSymbol()) {
                isWinner = false;
                break;
            }
        }
        if (isWinner) {
            console.log(`Player ${player.getName()} is winner !!`);
            return isWinner;
        }
        // check in col
        for (let i = 0; i < boardSize; i++) {
            if (this.board.getPiece(i, col) != player.getPlayingPiece().getSymbol()) {
                isWinner = false;
                break;
            }
        }
        if (isWinner)
            return isWinner;
        // check in diagonal
        for (let i = 0, j = 0; i < boardSize; i++, j++) {
            if (this.board.getPiece(i, j) != player.getPlayingPiece().getSymbol()) {
                isWinner = false;
                break;
            }
        }
        if (isWinner)
            return isWinner;
        // check in anti-diagonal
        for (let i = 0, j = boardSize - 1; i < boardSize; i++, j--) {
            if (this.board.getPiece(i, j) != player.getPlayingPiece().getSymbol()) {
                isWinner = false;
                break;
            }
        }
        return isWinner;
    }
    isDraw() {
        const freeCell = this.board.getFreeCell();
        if (freeCell.length == 0) {
            console.log("Its a draw");
            return true;
        }
        return false;
    }
}
exports.TicTacToeGame = TicTacToeGame;

import { IBoard, IPlayer, PlayingSymbol } from './types';

export class Game {
    private currentPlayerIndex: number = 0;

    constructor(
        private board: IBoard,
        private players: IPlayer[]
    ) {}

    async play(): Promise<void> {
        while (true) {
            const currentPlayer = this.players[this.currentPlayerIndex];
            this.board.printBoard();

            const move = await currentPlayer.makeMove(this.board);
            const success = this.board.addPiece(move.row, move.col, currentPlayer.getSymbol());

            if (!success) {
                console.log("Invalid move. Try again.");
                continue;
            }

            if (this.checkWin(move.row, move.col, currentPlayer.getSymbol())) {
                this.board.printBoard();
                console.log(`${currentPlayer.getName()} wins!`);
                break;
            }

            if (this.board.isFull()) {
                this.board.printBoard();
                console.log("It's a draw!");
                break;
            }

            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }
    }

    private checkWin(row: number, col: number, symbol: PlayingSymbol): boolean {
        // Check row
        if (this.checkLine(row, 0, 0, 1, symbol)) return true;
        // Check column
        if (this.checkLine(0, col, 1, 0, symbol)) return true;
        // Check diagonals
        if (row === col && this.checkLine(0, 0, 1, 1, symbol)) return true;
        if (row + col === 2 && this.checkLine(0, 2, 1, -1, symbol)) return true;
        return false;
    }

    private checkLine(
        startRow: number,
        startCol: number,
        rowIncrement: number,
        colIncrement: number,
        symbol: PlayingSymbol
    ): boolean {
        for (let i = 0; i < 3; i++) {
            if (this.board.getPiece(
                startRow + i * rowIncrement,
                startCol + i * colIncrement
            ) !== symbol) {
                return false;
            }
        }
        return true;
    }
} 
import { IBoard, PlayingSymbol } from './types';

export class Board implements IBoard {
    private size: number;
    private grid: (PlayingSymbol | null)[][];

    constructor(size: number = 3) {
        this.size = size;
        this.grid = Array(size).fill(null).map(() => Array(size).fill(null));
    }

    addPiece(row: number, col: number, symbol: PlayingSymbol): boolean {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            return false;
        }
        if (this.grid[row][col] !== null) {
            return false;
        }
        this.grid[row][col] = symbol;
        return true;
    }

    getPiece(row: number, col: number): PlayingSymbol | null {
        return this.grid[row][col];
    }

    isFull(): boolean {
        return this.grid.every(row => row.every(cell => cell !== null));
    }

    printBoard(): void {
        for (let row = 0; row < this.size; row++) {
            console.log(this.grid[row].map(cell => cell || ' ').join(' | '));
            if (row < this.size - 1) {
                console.log('-'.repeat(this.size * 3 - 1));
            }
        }
    }
} 
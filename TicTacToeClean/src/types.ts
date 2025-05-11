export enum PlayingSymbol {
    X = 'X',
    O = 'O'
}

export interface IBoard {
    addPiece(row: number, col: number, symbol: PlayingSymbol): boolean;
    getPiece(row: number, col: number): PlayingSymbol | null;
    isFull(): boolean;
    printBoard(): void;
}

export interface IPlayer {
    getName(): string;
    getSymbol(): PlayingSymbol;
    makeMove(board: IBoard): Promise<{row: number, col: number}>;
} 
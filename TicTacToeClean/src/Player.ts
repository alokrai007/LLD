import { IPlayer, IBoard, PlayingSymbol } from './types';

export class Player implements IPlayer {
    constructor(
        private name: string,
        private symbol: PlayingSymbol
    ) {}

    getName(): string {
        return this.name;
    }

    getSymbol(): PlayingSymbol {
        return this.symbol;
    }

    async makeMove(board: IBoard): Promise<{row: number, col: number}> {
        const input = await this.getInput(`Enter move for ${this.name} (row col): `);
        const [row, col] = input.split(' ').map(Number);
        return { row, col };
    }

    private async getInput(prompt: string): Promise<string> {
        console.log(prompt);
        return new Promise(resolve => {
            // In a real implementation, this would read from stdin
            // For now, we'll simulate input
            resolve("1 1"); // Example input
        });
    }
} 
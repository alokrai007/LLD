import { Board } from './Board';
import { Game } from './Game';
import { Player } from './Player';
import { PlayingSymbol } from './types';

async function main() {
    const board = new Board();
    const player1 = new Player("Player 1", PlayingSymbol.X);
    const player2 = new Player("Player 2", PlayingSymbol.O);
    
    const game = new Game(board, [player1, player2]);
    await game.play();
}

main(); 
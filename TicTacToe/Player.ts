import { PlayingSymbol } from "./Symbol";

export class Player{
    private playingPiece: PlayingSymbol;
    private name: string;
    constructor(name: string, symbol: PlayingSymbol){
        this.playingPiece = symbol;
        this.name = name;
    }

    getName(){
        return this.name;
    }

    getPlayingPiece(): PlayingSymbol{
        return this.playingPiece;
    }
}
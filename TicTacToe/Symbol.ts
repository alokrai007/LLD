import { PlayingSymbolEnum } from "./enum"

export class PlayingSymbol{
    private symbol: PlayingSymbolEnum;
    constructor(symbol: PlayingSymbolEnum){
        this.symbol = symbol;
    }

    getSymbol(){
        return this.symbol;
    }
}
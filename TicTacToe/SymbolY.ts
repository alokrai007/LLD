import { PlayingSymbolEnum } from "./enum";
import { PlayingSymbol } from "./Symbol";

export class SymbolY extends PlayingSymbol{
    constructor(){
        super(PlayingSymbolEnum.O);
    }
}
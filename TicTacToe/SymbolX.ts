import { PlayingSymbolEnum } from "./enum";
import { PlayingSymbol } from "./Symbol";

export class SymbolX extends PlayingSymbol{
    constructor(){
        super(PlayingSymbolEnum.X);
    }
}
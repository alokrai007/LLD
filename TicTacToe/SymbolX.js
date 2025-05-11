"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolX = void 0;
const enum_1 = require("./enum");
const Symbol_1 = require("./Symbol");
class SymbolX extends Symbol_1.PlayingSymbol {
    constructor() {
        super(enum_1.PlayingSymbolEnum.X);
    }
}
exports.SymbolX = SymbolX;

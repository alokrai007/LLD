"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolY = void 0;
const enum_1 = require("./enum");
const Symbol_1 = require("./Symbol");
class SymbolY extends Symbol_1.PlayingSymbol {
    constructor() {
        super(enum_1.PlayingSymbolEnum.O);
    }
}
exports.SymbolY = SymbolY;

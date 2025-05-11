"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name, symbol) {
        this.playingPiece = symbol;
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getPlayingPiece() {
        return this.playingPiece;
    }
}
exports.Player = Player;

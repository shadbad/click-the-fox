import { nanoid } from '@reduxjs/toolkit';
import Animal from './animal';
import Tile from './tile';

class Board {

    readonly id: string;

    private _animals: Tile[] = [];

    public get animals() {
        return this._animals;
    }

    private shuffle(input: Tile[]): Tile[] {
        return this.animals
            .map((item) => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item);
    }

    private _score: 1 | 0 | -1 = 0;

    setScore(id: string) {
        const item = this.animals.find((animal) => animal.id === id);
        this._score = item && item.animal === Animal.Fox ? 1 : -1;
    }

    get score() {
        return this._score;
    }

    constructor(cats: Tile[], dogs: Tile[], fox: Tile) {

        this.id = nanoid();

        if (dogs.length !== 4 || cats.length !== 4) throw new Error('Board: not enough cats or dogs!')

        this._animals = this.shuffle([...cats, ...dogs, fox]);

    }

}

export default Board;

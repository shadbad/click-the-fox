import { nanoid } from 'nanoid';
import Animal from './animal';
import Tile from './tile';

class Board {

    readonly id: string;

    private animals: Tile[];

    constructor(private _level: number, cats: Tile[], dogs: Tile[], private fox: Tile) {

        this.id = nanoid();

        this.animals = [];

        if (dogs.length !== 4 || cats.length !== 4) throw new Error('Board: not enough cats or dogs!')

        this.animals.concat(dogs, cats).push(fox);

    }

    shuffle(): Tile[] {
        return this.animals
            .map((item) => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item);
    }

    calculateScore(id: string): 1 | -1 {
        const item = this.animals.find((animal) => animal.id === id);
        return item && item.animal === Animal.Fox ? 1 : -1;
    }

}

export default Board;

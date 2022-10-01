import { nanoid } from 'nanoid';
import Animal from "./animal";


class Tile {

    readonly id: string;

    constructor(public readonly src: string, public readonly animal: Animal) {
        this.id = nanoid();
    }

}

export default Tile;
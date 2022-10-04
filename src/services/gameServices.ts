import { nanoid } from '@reduxjs/toolkit';

export type TileType = {
    id: string,
    src: string,
    type: 'cat' | 'dog' | 'fox'
}

export type BoardType = {
    id: string,
    tiles: TileType[],
    score: -1 | 1 | 0
}

export default class GameServices {

    private _foxes: string[] = [];
    private _cats: string[] = [];
    private _dogs: string[] = [];
    private _boards: BoardType[] = [];

    constructor(foxes: string[], cats: string[], dogs: string[]) {
        this._foxes = foxes;
        this._cats = cats;
        this._dogs = dogs;
        this.generateBoards(5);
    }

    private getRandomIndexes(quantity: number, max: number) {

        const set = new Set<number>();

        while (set.size < quantity) {

            set.add(Math.floor(Math.random() * max));

        }

        return Array.from(set);

    }

    private shuffle(input: any[]): any[] {

        return [...input]
            .map((item) => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item);

    }

    private generateBoards(count: number = 1) {

        for (let i = 0; i < count; i += 1) {

            const tiles = this.shuffle(

                [
                    ...this.getRandomIndexes(4, this._cats.length).map((x) => ({ id: nanoid(), src: this._cats[x], type: 'cat' })),
                    ...this.getRandomIndexes(4, this._dogs.length).map((x) => ({ id: nanoid(), src: this._dogs[x], type: 'dog' })),
                    ...this.getRandomIndexes(1, this._foxes.length).map((x) => ({ id: nanoid(), src: this._foxes[x], type: 'fox' }))
                ]

            );

            this._boards.push({ id: nanoid(), tiles, score: 0 });

        }

    }

    public setBoardScore(boardId: string, tileId: string) {

        const board = this._boards[this._boards.findIndex((board) => board.id === boardId)];

        if (!board) throw new Error(`Found NO game board with the id of ${boardId}`);

        const tile = board.tiles.find((tile) => tile.id === tileId);

        if (!tile) throw new Error(`Found NO tile with the id of ${boardId}`);

        board.score = tile.type === 'fox' ? 1 : -1;

    }

    public getTotalScore() {

        return this._boards.reduce((total, currentItem) => total + currentItem.score, 0);

    }

    public getBoard(): BoardType {

        if (this._boards.filter((board) => board.score === 0).length <= 3) this.generateBoards(2);

        const result = this._boards.find((board) => board.score === 0);

        if (!result) throw new Error('Board creation error');

        return result;
    }

};
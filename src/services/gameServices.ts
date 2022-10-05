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

    static readonly GAME_DURATION = 30;
    static readonly BOARD_GENERATION_LIMIT = 5;
    static readonly FOX_IMAGE_LOAD_SIZE = 8;
    static readonly DOG_IMAGE_LOAD_SIZE = 16;
    static readonly CAT_IMAGE_LOAD_SIZE = 16;
    static readonly TOTAL_IMAGES_COUNT = 40;

    private _foxes: string[] = [];
    private _cats: string[] = [];
    private _dogs: string[] = [];
    private _boards: BoardType[] = [];
    private _isTimerRunning = false;
    private _time: number = 0;
    private _timerCallBack: Function;
    private _intervalId: string | number | NodeJS.Timeout | undefined = undefined;

    constructor(foxes: string[], cats: string[], dogs: string[], timerCallBack: (remaining: number) => void) {
        this._foxes = foxes;
        this._cats = cats;
        this._dogs = dogs;
        this._time = GameServices.GAME_DURATION;
        this._intervalId = undefined;
        this._timerCallBack = timerCallBack;
        this.generateBoards(GameServices.BOARD_GENERATION_LIMIT);
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

    public startTimer() {

        if (this._isTimerRunning) return;

        this._isTimerRunning = true;

        this._intervalId = setInterval(() => {

            if (this._time > 0) {

                this._time -= 1;
                this._timerCallBack(this._time);

            } else {
                this.pauseTimer();
            }

        }, 1000);
    }

    public resetTimer() {

        this._time = GameServices.GAME_DURATION;

    }

    public pauseTimer() {

        if (this._isTimerRunning) {
            clearInterval(this._intervalId);
            this._isTimerRunning = false;
        }

    }

    public get Time() {

        return this._time;

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

        // if (!this._intervalId) this.startTimer();

        if (this._boards.filter((board) => board.score === 0).length <= 3) this.generateBoards(2);

        const result = this._boards.find((board) => board.score === 0);

        if (!result) throw new Error('Board creation error');

        return result;
    }

};
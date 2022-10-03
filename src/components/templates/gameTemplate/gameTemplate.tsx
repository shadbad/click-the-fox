import Board from 'models/board';
import './game-template.scss';

type GameTemplatePropTypes = {
    board: Board
}

const GameTemplate = function ({ board }: GameTemplatePropTypes) {

    return (

        <div className="game-template">
            game page
        </div>

    );

};

export { GameTemplate };

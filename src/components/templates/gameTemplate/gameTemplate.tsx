import { ButtonImage } from 'components/atoms';
import { BoardType } from 'services/gameServices';
import './game-template.scss';

type GameTemplatePropTypes = {
    board: BoardType,
    totalScore: number,
    setBoardScore: (tileId: string) => void
}

const GameTemplate = function ({ board, totalScore = 0, setBoardScore }: GameTemplatePropTypes) {

    return (

        <div className="game-template">

            <header className="game-template__header">

                <span className="game-template__header__total-score">
                    <strong>Score:</strong>
                    <span>{totalScore}</span>
                </span>

                <span className="game-template__header__timer">
                    <strong>Time left:</strong>
                    <span>30</span>
                </span>

            </header>

            <div className={`game-template__tiles`}>
                {

                    board.tiles.map((item) => (

                        <ButtonImage
                            key={item.id}
                            className="game-template__tiles__item"
                            description={`a ${item.type} image with the id of ${item.id}`}
                            image={item.src}
                            onClick={() => setBoardScore(item.id)}
                        />

                    ))
                }
            </div>

        </div>

    );

};

export { GameTemplate };

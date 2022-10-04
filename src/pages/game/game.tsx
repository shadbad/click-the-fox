import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from 'store';
import { Navigate } from 'react-router-dom';
import { Layout } from 'components/organisms';
import { GameTemplate } from 'components/templates';
import { playersActions } from 'store';
import GameServices, { BoardType } from 'services/gameServices';

const Game = function () {

    const player = useSelector((state: RootStateType) => state.players);

    const images = useSelector((state: RootStateType) => state.image);

    const [time, setTime] = useState(GameServices.GAME_DURATION);

    const [redirect, setRedirect] = useState(false);

    const [gameEngine] = useState<GameServices>(new GameServices(images.foxes, images.cats, images.dogs, (remaining) => setTime(remaining)));

    const [board, setBoard] = useState<BoardType>(gameEngine.getBoard());

    const dispatch = useDispatch();

    const setBoardScore = (tileId: string) => {

        gameEngine.setBoardScore(board.id, tileId);
        setBoard(gameEngine.getBoard());
    }

    useEffect(() => {

        if (time === 0) {

            dispatch(playersActions.addScore(gameEngine.getTotalScore()));

            setTimeout(() => {
                setRedirect(true);
            }, 2000);
        }

    }, [time, dispatch, gameEngine]);


    if (player.isLoading || images.isLoading) return <div />

    if (player.error !== '' || images.error !== '') throw Error(player.error || images.error);

    if (!player.user || player.user === '') return <Navigate replace to="/player" />;


    return (

        <Layout animate={false}>
            {
                redirect ?
                    <Navigate to="/scoreboard" />
                    :
                    <GameTemplate
                        key={board.id}
                        time={time}
                        totalScore={gameEngine.getTotalScore()}
                        board={board}
                        setBoardScore={setBoardScore}
                    />
            }
        </Layout>

    );

};

export { Game };

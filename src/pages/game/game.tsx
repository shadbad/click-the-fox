import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from 'store';
import { Navigate } from 'react-router-dom';
import { Layout } from 'components/organisms';
import { GameTemplate } from 'components/templates';
import GameServices, { BoardType } from 'services/gameServices';

const Game = function () {

    const player = useSelector((state: RootStateType) => state.players);

    const images = useSelector((state: RootStateType) => state.image);

    const [gameEngine] = useState<GameServices>(new GameServices(images.foxes, images.cats, images.dogs));

    const [board, setBoard] = useState<BoardType>(gameEngine.getBoard());

    const setBoardScore = (tileId: string) => {

        gameEngine.setBoardScore(board.id, tileId);
        setBoard(gameEngine.getBoard());
    }

    if (player.isLoading || images.isLoading) return <div />

    if (player.error !== '' || images.error !== '') throw Error(player.error || images.error);

    if (!player.user || player.user === '') return <Navigate replace to="/player" />;



    return (

        <Layout animate={false}>
            <GameTemplate key={board.id} totalScore={gameEngine.getTotalScore()} board={board} setBoardScore={setBoardScore} />
        </Layout>

    );

};

export { Game };

import { useSelector } from 'react-redux';
import { Layout } from 'components/organisms';
import { ScoreboardTemplate } from 'components/templates';
import { RootStateType } from 'store';

const Scoreboard = function () {

    const playersState = useSelector((state: RootStateType) => state.players);

    if (playersState.error !== '') throw Error(playersState.error);

    return (

        <Layout isLoading={playersState.isLoading}>
            <ScoreboardTemplate records={playersState.scoreboard} />
        </Layout>

    );
};

export { Scoreboard };

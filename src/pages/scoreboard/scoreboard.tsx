import { useSelector } from 'react-redux';
import { Layout } from 'components/organisms';
import { ScoreboardTemplate } from 'components/templates';
import { RootStateType } from 'store';

const Scoreboard = function () {

    const playersState = useSelector((state: RootStateType) => state.players);

    if (playersState.isLoading) return <div />

    if (playersState.error !== '') throw Error(playersState.error);

    return (

        <Layout>
            <ScoreboardTemplate records={playersState.scoreboard} />
        </Layout>

    );
};

export { Scoreboard };

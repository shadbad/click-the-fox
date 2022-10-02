import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootStateType } from 'store/store';
import { LandingTemplate } from 'components/templates';
import { Layout } from 'components/organisms';

const Landing = function () {

    const isIntroAnimationDone = useSelector((state: RootStateType) => state.ui.isIntroAnimationDone);

    const navigate = useNavigate();

    if (isIntroAnimationDone) navigate('/welcome');

    return (
        <Layout animate={true} animationDelay={2000}>
            <LandingTemplate />
        </Layout>
    );

};

export { Landing };

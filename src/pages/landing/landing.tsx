import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from 'store';
import { LandingTemplate } from 'components/templates';
import { Layout } from 'components/organisms';
import GameServices from 'services/gameServices';

const Landing = function () {

    const imageState = useSelector((state: RootStateType) => state.image);

    const [loadPercentage, setLoadPercentage] = useState(0);

    useEffect(() => {

        const totalLoadedImages = [imageState.cats, imageState.dogs, imageState.foxes].reduce((total, current) => total += current.length, 0);

        setLoadPercentage(totalLoadedImages === 0 ? 0 : totalLoadedImages / GameServices.TOTAL_IMAGES_COUNT);

    }, [imageState]);

    if (imageState.error !== '') throw new Error(imageState.error);

    return (

        <Layout animate={true} animationDelay={2000}>

            <LandingTemplate loadPercentage={loadPercentage} />

        </Layout>

    );

};

export { Landing };

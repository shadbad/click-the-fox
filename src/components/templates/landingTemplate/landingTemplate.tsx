import { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from 'store';
import { Icon, Link, ProgressBar } from 'components/atoms';
import './landing-template.scss';

const LandingTemplate = function () {

    const imageState = useSelector((state: RootStateType) => state.image);

    const [percentage, setPercentage] = useState(0);

    const [animate, setAnimate] = useState<boolean>(false);

    useLayoutEffect(() => {
        setTimeout(() => {
            setAnimate(true);
        }, 100);
    }, []);

    useEffect(() => {
        const totalLoadedImages = imageState.error !== '' ?
            0
            :
            imageState.cats.length + imageState.dogs.length + imageState.foxes.length;

        const TOTAL_IMAGES = 40;

        setPercentage(totalLoadedImages === 0 ? 0 : totalLoadedImages / TOTAL_IMAGES);

    }, [imageState]);

    return (
        <div className={`landing-template ${animate ? 'animate' : ''}`}>

            <Icon className="landing-template__logo" name="fox" />

            <h2 className="landing-template__heading">Click the Fox! Game</h2>

            <ProgressBar className="landing-template__progressbar" percentage={percentage} />

            <p className="landing-template__info">Click the fox as many times as you can within 30 seconds</p>

            {
                percentage === 1 && (
                    <Link
                        className={`landing-template__start-button`}
                        href="/player"
                        variant="button">

                        START

                    </Link>
                )
            }

        </div>
    );

};

export { LandingTemplate };

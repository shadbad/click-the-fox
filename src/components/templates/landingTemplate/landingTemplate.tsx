import { useState, useLayoutEffect } from 'react';
import { Icon, Link, ProgressBar } from 'components/atoms';
import './landing-template.scss';

type LandingTemplatePropTypes = {
    loadPercentage: number
}

const LandingTemplate = function ({ loadPercentage }: LandingTemplatePropTypes) {

    const [animate, setAnimate] = useState(false);

    useLayoutEffect(() => {
        setTimeout(() => {
            setAnimate(true);
        }, 100);
    }, []);

    return (

        <div className={`landing-template ${animate ? 'animate' : ''}`}>

            <Icon className="landing-template__logo" name="fox" />

            <h2 className="landing-template__heading">Click the Fox! Game</h2>

            <ProgressBar className="landing-template__progressbar" percentage={loadPercentage} />

            <p className="landing-template__info">Click the fox as many times as you can within 30 seconds</p>

            {
                loadPercentage === 1 && (
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

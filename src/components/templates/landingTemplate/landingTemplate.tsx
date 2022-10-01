import React, { useState, useLayoutEffect } from 'react';
import { Icon } from 'components/atoms';
import './landing-template.scss';

const LandingTemplate = function () {

    const [animate, setAnimate] = useState<boolean>(false);

    useLayoutEffect(() => {
        setTimeout(() => {
            setAnimate(true);
        }, 100);
    }, []);

    return (
        <div className={`landing-template ${animate ? 'animate' : ''}`}>

            <Icon className='landing-template__logo' name='fox' />

            <h2 className='landing-template__heading'>Click the Fox! Game</h2>

            <p className='landing-template__info'>Click the fox as many times as you can within 30 seconds</p>

        </div>
    );

};

export { LandingTemplate };

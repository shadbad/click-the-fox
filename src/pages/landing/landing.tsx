import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingTemplate } from 'components/templates';

const Landing = function () {

    const navigate = useNavigate();

    // TODO: replace the timeout with loading logic

    useLayoutEffect(() => {
        setTimeout(() => {
            navigate('/welcome');
        }, 6000);
    });

    return <LandingTemplate />;

};

export { Landing };

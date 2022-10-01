import React from 'react';
import './icon-menu.scss';

type IconMenuPropTypes = {
    className?: string,
    isCrossed?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
};

const IconMenu = React.memo(function ({ className = '', isCrossed = false, onClick = undefined }: IconMenuPropTypes) {


    return (
        <button
            type='button'
            className={`icon-menu ${isCrossed ? 'crossed' : ''} ${className}`}
            onClick={onClick}
        >

            <i></i><i></i><i></i>

        </button>
    )

});

export { IconMenu };

import React from 'react';
import './button-menu.scss';

type ButtonMenuPropTypes = {
    className?: string,
    isCrossed?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
};

const ButtonMenu = React.memo(function ({ className = '', isCrossed = false, onClick = undefined }: ButtonMenuPropTypes) {


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

export { ButtonMenu };

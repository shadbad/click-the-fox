import React from 'react';
import { Icon } from 'components/atoms';
import './button-icon.scss';

type ButtonIconPropTypes = {
    className?: string,
    iconName: string,
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const ButtonIcon = function ({ className = '', iconName, disabled = false, onClick = undefined }: ButtonIconPropTypes) {

    return (

        <button
            className={`button-icon ${className}`}
            type="button"
            disabled={disabled}
            onClick={onClick}
        >

            <Icon className="button-icon__icon" name={iconName} />

        </button>

    );

};

export { ButtonIcon };

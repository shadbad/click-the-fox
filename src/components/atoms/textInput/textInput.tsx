import React from 'react';
import './text-input.scss';

type TextInputPropTypes = {
    className?: string,
    label: string,
    value?: string,
    disabled?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined,
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
}

const TextInput = function (
    {
        className,
        label,
        value = '',
        disabled = false,
        onChange = undefined,
        onKeyDown = undefined,
        onBlur = undefined
    }: TextInputPropTypes) {

    const id = label.toLocaleLowerCase().replace(' ', '_');

    return (

        <div className={`text-input ${className}`} title={label}>

            <input
                className="text-input__input"
                id={id}
                type="text"
                placeholder={label}
                required={true}
                disabled={disabled}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={value}
            />

            <label className="text-input__label" htmlFor={id}>{label}</label>

        </div>

    );

};

export { TextInput };
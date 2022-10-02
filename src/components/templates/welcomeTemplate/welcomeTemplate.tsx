import React, { useState } from 'react';
import { TextInput } from 'components/atoms';
import { ButtonIcon } from 'components/molecules';
import './welcome-template.scss';

const WelcomeTemplate = function () {

    const [playerName, setPlayerName] = useState<string>('');

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {

        target.reportValidity();

        setPlayerName(target.value);
    };

    const handleUsernameSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {

        const target = event.target as HTMLInputElement;

        const userNameInput = target.closest('form')?.querySelector('input') ?? null;

        if (userNameInput) console.log(userNameInput.value);

    };

    const handleUsernameKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {

        const target = event.target as HTMLInputElement;

        console.log(target.value);
    };

    return (

        <div className="welcome-template">
            <h2 className="welcome-template__heading">Please enter your name to play</h2>

            <form className="welcome-template__form">

                <TextInput
                    label="Player name"
                    className="welcome-template__form__text-input"
                    value={playerName}
                    onChange={handleUsernameChange}
                    onKeyUp={handleUsernameKeyUp}
                />

                <ButtonIcon
                    className="welcome-template__form__submit-button"
                    iconName="corner-down-left"
                    onClick={handleUsernameSubmit}
                />

            </form>

        </div>

    );
};

export { WelcomeTemplate };
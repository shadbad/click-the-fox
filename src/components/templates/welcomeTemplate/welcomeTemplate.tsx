import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playersActions, RootStateType } from 'store';
import { TextInput, Icon, Link } from 'components/atoms';
import { ButtonIcon } from 'components/molecules';
import './welcome-template.scss';

const WelcomeTemplate = function () {

    const dispatch = useDispatch();

    const playerName = useSelector((state: RootStateType) => state.players.user);

    const [greet, setGreet] = useState<boolean>(playerName !== undefined && playerName !== '');

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {

        target.reportValidity();
        dispatch(playersActions.setUser(target.value));
    };

    const handleUsernameSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {

        if (playerName.trim() !== '') setGreet(true);

    };

    const handleUsernameKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {

        if (event.key === 'Enter') {
            event.preventDefault();

            if (playerName.trim() !== '') setGreet(true);
        }

    };

    const handleUsernameEditClick: React.MouseEventHandler<HTMLButtonElement> = () => { setGreet(false); }

    const formJsx = (

        <>
            <h2 className="welcome-template__heading">Please enter your name to play</h2>

            <form className="welcome-template__form">

                <TextInput
                    label="Player name"
                    className="welcome-template__form__text-input"
                    value={playerName}
                    onChange={handleUsernameChange}
                    onKeyDown={handleUsernameKeyDown}
                />

                <ButtonIcon
                    className="welcome-template__form__submit-button"
                    iconName="corner-down-left"
                    onClick={handleUsernameSubmit}
                />

            </form>
        </>
    );

    const greetJsx = (
        <>
            <button
                className="welcome-template__edit-button"
                type='button'
                title='click here to edit player name'
                onClick={handleUsernameEditClick}
            >

                <span>
                    {`Hello ${playerName}`}
                </span>

                <Icon className="welcome-template__edit-button__icon" name='edit' />

            </button>


        </>
    );

    return (

        <div className="welcome-template">

            {greet ? greetJsx : formJsx}

            <Link className={`welcome-template__play-button ${greet ? '' : 'disabled'}`} variant="button" href="/play">PLAY!</Link>

        </div>

    );
};

export { WelcomeTemplate };
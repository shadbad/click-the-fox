import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playersActions, RootStateType } from 'store';
import { TextInput, Icon, Link } from 'components/atoms';
import { ButtonIcon } from 'components/molecules';
import './player-template.scss';

const PlayerTemplate = function () {

    const dispatch = useDispatch();

    const playerName = useSelector((state: RootStateType) => state.players.user);

    const [greet, setGreet] = useState<boolean>(playerName !== undefined && playerName !== '');

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {

        target.reportValidity();

        dispatch(playersActions.setUser(target.value));

    };

    const handleUsernameSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {

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
            <h2 className="player-template__heading">Please enter your name to play</h2>

            <form className="player-template__form">

                <TextInput
                    label="Player name"
                    className="player-template__form__text-input"
                    value={playerName}
                    onChange={handleUsernameChange}
                    onKeyDown={handleUsernameKeyDown}
                />

                <ButtonIcon
                    className="player-template__form__submit-button"
                    iconName="corner-down-left"
                    onClick={handleUsernameSubmit}
                />

            </form>
        </>
    );

    const greetJsx = (
        <>
            <button
                className="player-template__edit-button"
                type="button"
                title="click here to edit player name"
                onClick={handleUsernameEditClick}
            >

                <span>
                    {`Hello ${playerName}`}
                </span>

                <Icon className="player-template__edit-button__icon" name="edit" />

            </button>


        </>
    );

    return (

        <div className="player-template">

            {greet ? greetJsx : formJsx}

            <Link className={`player-template__play-button ${greet ? '' : 'disabled'}`} variant="button" href="/game">PLAY!</Link>

        </div>

    );
};

export { PlayerTemplate };
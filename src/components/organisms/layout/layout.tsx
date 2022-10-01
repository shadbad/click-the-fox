import React from 'react';
import { Icon } from 'components/atoms';
import 'assets/styles/globals.scss';
import './layout.scss';

type props = {
    children: React.ReactNode
}

const Layout = React.memo(function ({ children }: props) {

    return (
        <>
            <header className='layout__header'>
                <div className='layout__header__wrapper'>
                    <Icon className='layout__header__wrapper__icon' name='fox' />
                    <h1 className='layout__header__wrapper__heading'>Click the Fox! Game</h1>
                </div>
            </header>

            <main className='layout__body'>
                <div className='layout__body__wrapper'>
                    {children}
                </div>
            </main>

            <footer className='layout__footer'>
                <div className='layout__footer__wrapper'>
                    <small className='layout__footer__wrapper__credits'>Developed by Sina Shadbad</small>

                </div>
            </footer>
        </>

    );

});

export { Layout };

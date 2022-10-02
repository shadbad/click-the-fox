import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Icon, ButtonMenu, Link } from 'components/atoms';
import { LinkIcon } from 'components/molecules';
import { useOutsideClickDetector } from 'hooks';
import 'assets/styles/globals.scss';
import './layout.scss';

type props = {
    children: React.ReactNode
}

const Layout = React.memo(function ({ children }: props) {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useOutsideClickDetector('.layout__header__wrapper__menu-button, .layout__aside__wrapper__nav', () => setIsMenuOpen(false), []);

    const socialLinks: { [media: string]: string } = {

        'linkedin': 'https://www.linkedin.com/in/sina-shadbad/',
        'twitter': 'https://twitter.com/SinaShadbad',
        'github': 'https://github.com/shadbad'

    };

    const navLinks: { [media: string]: string } = {

        'Welcome': '/welcome',
        'Play': '/play',
        'Scoreboard': '/scoreboard'
    };

    const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

    const handleMenuLinkClick = () => setIsMenuOpen(false);

    return (

        <>

            <header className='layout__header'>

                <div className='layout__header__wrapper'>

                    <Icon className='layout__header__wrapper__icon' name='fox' />

                    <h1 className='layout__header__wrapper__heading'>Click the Fox! Game</h1>

                    <ButtonMenu className='layout__header__wrapper__menu-button' isCrossed={isMenuOpen} onClick={handleMenuClick} />

                </div>

            </header>

            <main className='layout__body'>

                <div className={`layout__body__wrapper ${isMenuOpen ? 'menu-expanded' : ''}`}>

                    {children}

                </div>

            </main>

            <footer className='layout__footer'>

                <div className='layout__footer__wrapper'>

                    <small className='layout__footer__wrapper__credits'>Developed by Sina Shadbad</small>

                    <ul className='layout__footer__wrapper__social-media'>

                        {
                            Object.entries(socialLinks).map(([key, value]) => (

                                <li key={nanoid()} className='layout__footer__wrapper__social-media__item'>

                                    <LinkIcon
                                        className='layout__footer__wrapper__social-media__item__link'
                                        href={value}
                                        iconName={key}
                                    />

                                </li>

                            ))
                        }

                    </ul>
                </div>

            </footer>

            <aside className={`layout__aside ${isMenuOpen ? 'expanded' : ''}`}>

                <div className="layout__aside__wrapper">

                    <nav className="layout__aside__wrapper__nav">

                        {
                            Object.entries(navLinks).map(([key, value]) => (

                                <Link
                                    key={nanoid()}
                                    className="layout__aside__wrapper__nav__link"
                                    href={value}
                                    onClick={handleMenuLinkClick}
                                >

                                    {key}

                                </Link>

                            ))
                        }

                    </nav>

                </div>

            </aside>

        </>

    );

});

export { Layout };

import React, { useState, useLayoutEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, ButtonMenu, Link } from 'components/atoms';
import { LinkIcon, TextIcon } from 'components/molecules';
import { useOutsideClickDetector } from 'hooks';
import { uiActions, RootStateType } from 'store';
import 'assets/styles/globals.scss';
import './layout.scss';

type LayoutPropTypes = {
    children: React.ReactNode,
    animate?: boolean,
    animationDelay?: number
}

const Layout = React.memo(function ({ animate = false, animationDelay = 100, children }: LayoutPropTypes) {

    // #region state

    const isMenuDrawerOpen = useSelector((state: RootStateType) => state.ui.isMenuDrawerOpen);

    const userName = useSelector((state: RootStateType) => state.players.user);

    const [startAnimation, setStartAnimation] = useState<boolean>(false);

    // #endregion

    // #region hook calls

    const dispatch = useDispatch();

    useOutsideClickDetector(
        '.layout__header__wrapper__menu-button, .layout__aside__wrapper__nav',
        () => dispatch(uiActions.setMenuDrawerStatus(false)),
        []
    );

    useLayoutEffect(() => {
        if (animate) {
            setTimeout(() => {
                setStartAnimation(true);
            }, animationDelay);
        }
    });

    // #endregion

    // #region event handlers

    const handleMenuClick = () => dispatch(uiActions.setMenuDrawerStatus(!isMenuDrawerOpen));

    const handleMenuLinkClick = () => dispatch(uiActions.setMenuDrawerStatus(false));

    // #endregion

    // #region data

    const socialLinks: { [media: string]: string } = {

        'linkedin': 'https://www.linkedin.com/in/sina-shadbad/',
        'twitter': 'https://twitter.com/SinaShadbad',
        'github': 'https://github.com/shadbad'

    };

    const navLinks: { [page: string]: string } = {

        'Welcome': '/welcome',
        'Play': '/play',
        'Scoreboard': '/scoreboard'
    };

    // #endregion

    return (

        <>

            <header className={`layout__header ${animate ? 'animate' : ''} ${animate && startAnimation ? 'start' : ''}`}>

                <div className='layout__header__wrapper'>

                    <Icon className='layout__header__wrapper__icon' name='fox' />

                    <h1 className='layout__header__wrapper__heading'>
                        <Link href='/'>Click the Fox! Game</Link>
                    </h1>

                    {userName && userName !== '' && <TextIcon className='layout__header__wrapper__player' iconName='user' text={userName} />}

                    <ButtonMenu className='layout__header__wrapper__menu-button' isCrossed={isMenuDrawerOpen} onClick={handleMenuClick} />

                </div>

            </header>

            <main className='layout__body'>

                <div className={`layout__body__wrapper ${isMenuDrawerOpen ? 'menu-expanded' : ''}`}>

                    {children}

                </div>

            </main>

            <footer className={`layout__footer ${animate ? 'animate' : ''} ${animate && startAnimation ? 'start' : ''}`}>

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

            <aside className={`layout__aside ${isMenuDrawerOpen ? 'expanded' : ''}`}>

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

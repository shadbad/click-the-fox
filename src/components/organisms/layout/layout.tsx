import React, { useState } from 'react';
import { Icon, IconMenu } from 'components/atoms';
import { LinkIcon } from 'components/molecules';
import 'assets/styles/globals.scss';
import './layout.scss';

type props = {
    children: React.ReactNode
}

const Layout = React.memo(function ({ children }: props) {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const socialLinks: { [media: string]: string } = {

        'linkedin': 'https://www.linkedin.com/in/sina-shadbad/',
        'twitter': 'https://twitter.com/SinaShadbad',
        'github': 'https://github.com/shadbad'

    }

    const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

    return (

        <>

            <header className='layout__header'>

                <div className='layout__header__wrapper'>

                    <Icon className='layout__header__wrapper__icon' name='fox' />

                    <h1 className='layout__header__wrapper__heading'>Click the Fox! Game</h1>

                    <IconMenu className='layout__header__wrapper__menu-button' isCrossed={isMenuOpen} onClick={handleMenuClick} />

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

                    <ul className='layout__footer__wrapper__social-media'>

                        {
                            Object.entries(socialLinks).map(([key, value]) => (
                                <li className='layout__footer__wrapper__social-media__item'>
                                    <LinkIcon className='layout__footer__wrapper__social-media__item__link' href={value} iconName={key} />
                                </li>
                            ))
                        }

                    </ul>
                </div>

            </footer>

        </>

    );

});

export { Layout };

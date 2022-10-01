import React from 'react';
import { NavLink } from 'react-router-dom';
import './link.scss';

type LinkPropTypes = {
    className: string,
    href: string,
    children: React.ReactNode,
    variant?: 'plain' | 'button',
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined
}

const Link = React.memo(function ({ className = '', onClick = undefined, variant = 'plain', href, children }: LinkPropTypes) {

    const navLink = (
        <NavLink
            to={href}
            className={`link--${variant} ${className}`}
            onClick={onClick}
        >

            {children}

        </NavLink>
    );

    const anchor = (
        <a
            className={`link--${variant} ${className}`}
            href={href}
            target="_blank"
            rel="noreferrer"
        >

            {children}

        </a>
    );

    return href.startsWith('https') ? anchor : navLink;

});

export { Link };

import React from 'react';
import { NavLink } from 'react-router-dom';
import './link.scss';

type LinkPropTypes = {
    name: string,
    className: string,
    href: string,
    children: React.ReactNode,
    variant: 'plain' | 'button',
    onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined
}

const Link = React.memo(function ({ className = '', onClick = undefined, variant = 'plain', href, children }: LinkPropTypes) {

    return (

        <NavLink
            to={href}
            className={`link--${variant} ${className}`}
            onClick={onClick}
        >

            {children}

        </NavLink>

    );

});

export { Link };

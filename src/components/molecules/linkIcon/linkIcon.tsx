import React from 'react';
import { Icon, Link } from 'components/atoms';
import './link-icon.scss';

type LinkIconPropTypes = {

    className?: string,
    href: string,
    iconName: string,
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined

};

const LinkIcon = React.memo(function ({ className = '', href, iconName, onClick = undefined }: LinkIconPropTypes) {

    return (

        <Link className={`link-icon ${className}`} href={href} onClick={onClick}>

            <Icon className="link-icon__icon" name={iconName} />

        </Link>
    );

});

export { LinkIcon };

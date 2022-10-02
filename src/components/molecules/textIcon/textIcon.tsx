import { Icon } from 'components/atoms';
import './text-icon.scss';

type TextIconPropTypes = {
    className?: string,
    iconName: string,
    text: string
}

const TextIcon = function ({ className, iconName, text }: TextIconPropTypes) {

    return (
        <div className={`text-icon ${className}`}>

            <Icon className="text-icon__icon" name={iconName} />

            <span className="text-icon__text">{text}</span>

        </div>
    );

};

export { TextIcon };

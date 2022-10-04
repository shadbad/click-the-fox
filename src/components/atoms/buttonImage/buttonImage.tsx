import { useState } from 'react';
import './button-image.scss';

type ButtonImagePropTypes = {
    className?: string,
    image: string,
    description?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    onLoad?: React.ReactEventHandler<HTMLImageElement> | undefined
}

const ButtonImage = function ({ className = '', image, description, onClick = undefined, onLoad = undefined }: ButtonImagePropTypes) {

    const [hasLoaded, setHasLoaded] = useState(false);

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {

        setHasLoaded(true);
        if (onLoad) onLoad(event);

    }

    return (

        <button className={`button-image ${hasLoaded ? '' : 'loading'} ${className}`} onClick={onClick}>

            <img className="button-image__image" src={image} alt={description} onLoad={handleLoad} />

        </button>

    );

};

export { ButtonImage }

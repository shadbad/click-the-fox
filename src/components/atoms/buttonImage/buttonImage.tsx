/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useRef } from 'react';
import './button-image.scss';

type ButtonImagePropTypes = {
    className?: string,
    image: string,
    description?: string,
    showLoadAnimation?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    loadCallback?: Function
}

const ButtonImage = function ({ className = '', image, description, showLoadAnimation = false, onClick = undefined, loadCallback = undefined }: ButtonImagePropTypes) {

    const imgRef = useRef<HTMLImageElement>(null);

    const handleLoad = () => loadCallback && loadCallback();

    useLayoutEffect(() => {
        setTimeout(() => {
            if (imgRef.current?.complete && loadCallback) {
                loadCallback();
            }
        }, 50);
    }, []);

    return (

        <button className={`button-image ${showLoadAnimation ? 'loading' : ''} ${className}`} onClick={onClick}>

            <img ref={imgRef} className="button-image__image" src={image} alt={description} onLoad={handleLoad} />

        </button>

    );

};

export { ButtonImage }

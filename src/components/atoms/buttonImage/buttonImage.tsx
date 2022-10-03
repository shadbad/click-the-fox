import './button-image.scss';

type ButtonImagePropTypes = {
    className?: string,
    image: string,
    description?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    onLoad?: React.ReactEventHandler<HTMLImageElement> | undefined
}

const ButtonImage = function ({ className = '', image, description, onClick = undefined, onLoad = undefined }: ButtonImagePropTypes) {


    return (

        <button className={`button-image ${className}`} onClick={onClick}>

            <img className="button-image__image" src={image} alt={description} onLoad={onLoad} />

        </button>

    );

};

export { ButtonImage }

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from 'store';
import './progress-bar.scss';

type ProgressBarPropTypes = {
    className?: string
}

const ProgressBar = function ({ className }: ProgressBarPropTypes) {

    const imageState = useSelector((state: RootStateType) => state.image);

    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const totalLoadedImages = imageState.error !== '' ?
            0
            :
            imageState.cats.length + imageState.dogs.length + imageState.foxes.length;

        const TOTAL_IMAGES = 40;

        setPercentage(totalLoadedImages === 0 ? 0 : totalLoadedImages / TOTAL_IMAGES);

    }, [imageState]);

    return (

        <div className={`progressbar ${className}`}>
            <span className='progressbar__bar' style={{ transform: `scaleX(${percentage})` }}></span>
            <span className="progressbar__percentage">{Math.floor(percentage * 100)}</span>
        </div>

    );

};

export { ProgressBar };

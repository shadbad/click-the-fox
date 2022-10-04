import './progress-bar.scss';

type ProgressBarPropTypes = {
    className?: string,
    percentage: number
}

const ProgressBar = function ({ className, percentage = 0 }: ProgressBarPropTypes) {

    return (

        <div className={`progressbar ${className}`}>
            <span className='progressbar__bar' style={{ transform: `scaleX(${percentage})` }}></span>
            <span className="progressbar__percentage">{`${Math.floor(percentage * 100)}%`}</span>
        </div>

    );

};

export { ProgressBar };

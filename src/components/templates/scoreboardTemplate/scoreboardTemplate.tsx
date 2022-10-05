import { Link } from 'components/atoms';
import './scoreboard-template.scss';

type ScoreboardTemplatePropTypes = {

    records: {
        user: string,
        score: number,
        date: number
    }[]
}

const ScoreboardTemplate = function ({ records }: ScoreboardTemplatePropTypes) {

    const dateFormatter = (dateTime: number) => {

        const parts = new Intl
            .DateTimeFormat('en-NL', { month: 'short', year: 'numeric', day: 'numeric' })
            .formatToParts(new Date(dateTime))
            .filter((part) => part.type !== 'literal');

        return `${parts[2].value}, ${parts[1].value} ${parts[0].value}`;

    };

    return (

        <div className="scoreboard-template">

            <h2 className="scoreboard-template__heading">Scoreboard</h2>

            <div className="scoreboard-template__table-wrapper">

                <table>

                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            records.map((item, index) => (
                                <tr key={`${item.user}-${index}`} title={new Date(item.date).toString()}>
                                    <td>{index + 1}</td>
                                    <td>{item.user}</td>
                                    <td>{dateFormatter(item.date)}</td>
                                    <td>{item.score}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>

            </div>

            <nav className="scoreboard-template__navigation">

                <Link className="scoreboard-template__navigation__link" variant="button" href="/player">To Welcome Screen</Link>

                <Link className="scoreboard-template__navigation__link" variant="button" href="/game">PLAY!</Link>

            </nav>

        </div>

    );
};

export { ScoreboardTemplate };

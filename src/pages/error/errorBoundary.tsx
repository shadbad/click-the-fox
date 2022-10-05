import { Component, ErrorInfo, ReactNode } from 'react';
import { Layout } from 'components/organisms';
import './error-boundary.scss';

type ErrorBoundaryPropsType = {
    children?: ReactNode;
}

type State = {
    hasError: boolean,
    error: string,
    info: string
}

class ErrorBoundary extends Component<ErrorBoundaryPropsType, State> {

    public state: State = {
        hasError: false,
        error: '',
        info: ''
    };

    public static getDerivedStateFromError(error: Error): State {

        return { hasError: true, error: '', info: '' };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {

        this.setState({ hasError: true, error: error.message, info: errorInfo.componentStack });

    }

    public render() {

        if (this.state.hasError) {

            return (

                <Layout>

                    <h1 className="error-boundary__heading">Sorry.. there was an error</h1>

                    <h2 className="error-boundary__title">{this.state.error}</h2>

                    <ul className="error-boundary__trace">

                        {
                            this.state.info.split(' at ').map((item, index) => item.trim().length > 0 && (

                                <li key={index} className="error-boundary__trace__item">

                                    {`at ${item}`}

                                </li>

                            ))
                        }

                    </ul>

                </Layout>

            );

        }

        return this.props.children;
    }
}


export { ErrorBoundary };

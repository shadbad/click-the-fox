import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, storeInitializer } from 'store';
import { ErrorBoundary, Landing, Player, Game, Scoreboard } from 'pages';

storeInitializer();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(

    <React.StrictMode>

        <Provider store={store}>

            <Router basename="/click-the-fox">

                <ErrorBoundary>

                    <Routes>

                        <Route path="/" element={<Landing />} />
                        <Route path="/player" element={<Player />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="/scoreboard" element={<Scoreboard />} />

                    </Routes>

                </ErrorBoundary>

            </Router>

        </Provider>

    </React.StrictMode>

);

reportWebVitals();

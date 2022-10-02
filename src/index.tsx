import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, storeInitializer } from 'store';

import { ErrorBoundary, Landing, Welcome, Play, Scoreboard } from 'pages';

storeInitializer();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(

    <React.StrictMode>

        <ErrorBoundary>

            <Provider store={store}>

                <Router basename="/">

                    <Routes>

                        <Route path="/" element={<Landing />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/play" element={<Play />} />
                        <Route path="/scoreboard" element={<Scoreboard />} />

                    </Routes>

                </Router>

            </Provider>

        </ErrorBoundary>

    </React.StrictMode>

);

reportWebVitals();

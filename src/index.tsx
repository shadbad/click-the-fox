import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { Layout } from 'components/organisms'
import { ErrorBoundary, Landing, Welcome, Play, Scoreboard } from 'pages';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(

    <React.StrictMode>

        <ErrorBoundary>


            <Router basename="/">

                <Layout>

                    <Routes>

                        <Route path="/" element={<Landing />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/play" element={<Play />} />
                        <Route path="/scoreboard" element={<Scoreboard />} />

                    </Routes>

                </Layout>

            </Router>


        </ErrorBoundary>

    </React.StrictMode>

);

reportWebVitals();

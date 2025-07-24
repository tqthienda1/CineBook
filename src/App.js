import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react/jsx-runtime';

function App() {
    return (
        <Router>
            
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = route.layout;

                    if (Layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;

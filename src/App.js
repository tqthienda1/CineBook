import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, userRoutes, adminRoutes } from './routes';
import { Fragment } from 'react/jsx-runtime';
import { AuthContext } from './auth/AuthContext';
import { useState, useEffect } from 'react';
import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (err) {
        console.error('Invalid token', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          {/* public routes */}
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
          {/* user routes */}
          {userRoutes.map((route, index) => {
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
                  <UserRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </UserRoute>
                }
              />
            );
          })}
          {/* admin routes */}
          {adminRoutes.map((route, index) => {
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
                  <AdminRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </AdminRoute>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

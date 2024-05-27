import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import AuthLayoutWrapper from './components/Layout/AuthLayoutWrapper';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-full flex-1 flex-col justify-center">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<AuthLayoutWrapper />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

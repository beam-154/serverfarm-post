import axios from 'axios';
import React, { createContext, useEffect, useMemo, useState } from 'react';

const SERVER_FARM_API_URL = process.env.REACT_APP_SERVER_FARM_API_URL;

const AuthContext = createContext();

const processToken = (authStorageString) => {
  if (authStorageString) {
    const authStorage = JSON.parse(authStorageString);
    return {
      isAuthenticated: true,
      token: authStorage.token,
      user: authStorage.user,
    };
  } else {
    return {
      isAuthenticated: false,
      token: null,
      user: null,
    };
  }
};

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(
    processToken(window.localStorage.getItem('auth'))
  );

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: SERVER_FARM_API_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: authState.token ? `Bearer ${authState.token}` : '', // Include token if available
        },
      }),
    [authState]
  );

  const loginUser = async ({ email, password }) => {
    const response = await axiosInstance.post('/users/login', {
      email,
      password,
    });
    if (response.status === 200) {
      const data = response.data;
      setAuthState({
        isAuthenticated: true,
        token: data.token,
        user: data.user,
      });

      window.localStorage.setItem(
        'auth',
        JSON.stringify({ token: data.token, user: data.user })
      );
    } else {
      throw Error('Authentication failed');
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });
    window.localStorage.removeItem('auth');
  };

  const registerUser = async ({ username, email, password }) => {
    const response = await axios.post('users/register', {
      username,
      email,
      password,
    });
    if (response.status !== 201) {
      throw Error('Registration Error');
    }
  };

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 403) {
          // Authentication error
          logout();
        } else {
          return Promise.reject(error);
        }
      }
    );
  }, [axiosInstance]);

  return (
    <AuthContext.Provider
      value={{ authState, loginUser, logout, registerUser, axiosInstance }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };

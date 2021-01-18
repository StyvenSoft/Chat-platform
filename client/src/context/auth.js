import React, { createContext, useReducer, useContext } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            }
        default:
            throw new Error(`Unknown action type: ${action.type}`)
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null })
    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>

            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    )
}

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispacth = () => useContext(AuthDispatchContext);
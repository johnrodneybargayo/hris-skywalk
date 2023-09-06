// authReducer.ts

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
  }
  
  export type AuthAction =
    | { type: 'LOGIN'; token: string }
    | { type: 'LOGOUT' };
  
  const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
  };
  
  const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          token: action.token,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          token: null,
        };
      default:
        return state;
    }
  };
  
  // Export the login and logout actions
  export const login = (token: string) => ({
    type: 'LOGIN',
    token,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  export default authReducer;
  
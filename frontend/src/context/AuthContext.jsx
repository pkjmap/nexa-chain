import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    /**
     * Login User
     */
    const login = (userData, jwtToken) => {
        localStorage.setItem("token", jwtToken);
        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
        setToken(jwtToken);

        navigate("/dashboard");
    };

    /**
     * Logout User
     */
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setToken(null);

        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom Hook
 */
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
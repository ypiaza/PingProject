import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Feed from "./components/Feed"
import Login from "./components/Login"
import { useState } from "react"

const App = () => {
    const [userLogado, setUserLogado] = useState(() => {
        const saved = localStorage.getItem("logado");
        return saved && saved !== "undefined" && saved !== "null" ? saved : null;
    });

    const [auth, setAuth] = useState(() => {
        const saved = localStorage.getItem("logado");
        return !!(saved && saved !== "undefined" && saved !== "null");
    });

    const handleLoginSucess = (nome) => {
        if (!nome) return;
        setAuth(true);
        setUserLogado(nome);
        localStorage.setItem("logado", nome);
    };

    const handleLogout = () => {
        setAuth(false);
        setUserLogado(null);
        localStorage.removeItem("logado");
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/login" 
                    element={
                        auth ? (
                            <Navigate to="/feed" replace />
                        ) : (
                            <Login 
                                loginSucess={handleLoginSucess} 
                            />
                        )
                    } 
                />
                <Route 
                    path="/feed" 
                    element={auth ? <Feed usuario={userLogado} Logout={handleLogout} /> : <Navigate to="/login" replace />} 
                />
                <Route 
                    path="/" 
                    element={auth ? <Feed usuario={userLogado} Logout={handleLogout} /> : <Navigate to="/login" replace />} 
                />
                <Route 
                    path="*" 
                    element={<Navigate to={auth ? "/feed" : "/login"} replace />} 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App

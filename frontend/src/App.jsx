import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Feed from "./components/Feed"
import Login from "./components/Login"
import { useState } from "react"

const App = () => {
    const [userLogado, setUserLogado] = useState(() => {
        return localStorage.getItem("logado");
    });

    const [auth, setAuth] = useState(() => {
        return !!localStorage.getItem("logado");
    });

    const handleLoginSucess = (nome) => {
        setAuth(true);
        setUserLogado(nome);
        localStorage.setItem("logado", nome);
    };

    const handleLogout = () => {
        setAuth(false);
        setUserLogado(null);
        // CORRIGIDO: Removido o item corretamente do localStorage
        localStorage.removeItem("logado");
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/login" 
                    element={
                        <Login 
                            loginSucess={handleLoginSucess} 
                        />
                    } 
                />
                <Route 
                    path="/feed" 
                    element={auth ? <Feed usuario={userLogado} Logout={handleLogout} /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/" 
                    element={auth ? <Feed usuario={userLogado} Logout={handleLogout} /> : <Navigate to="/login" />} 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
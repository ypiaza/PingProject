import { BrowserRouter, data, Navigate, Route, Routes } from "react-router-dom"
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
        localStorage.setItem(null);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/login" 
                    element={
                        <Login 
                            loginSucess={handleLoginSucess 
                            } cadastroSucess={handleLoginSucess}
                        />
                    } 
                />
                <Route path="/feed" element={auth ? <Feed usuario={userLogado} Logout={handleLogout}/> : <Navigate to="/login" />}/>
                <Route path="/" element={auth ? <Feed /> : <Navigate to="/login" />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
import { BrowserRouter, data, Navigate, Route, Routes } from "react-router-dom"
import Feed from "./components/Feed"
import Login from "./components/Login"
import { useState } from "react"


const App = () => {
    const [auth, setAuth] = useState(false);
    const [userLogado, setUserLogado] = useState('');

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/login" 
                    element={
                        <Login 
                            loginSucess={(nome) => { 
                                setAuth(true); 
                                setUserLogado(nome); 
                            }} 
                        />
                    } 
                />
                <Route path="/feed" element={auth ? <Feed usuario={userLogado}/> : <Navigate to="/login" />}/>
                <Route path="/" element={auth ? <Feed /> : <Navigate to="/login" />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
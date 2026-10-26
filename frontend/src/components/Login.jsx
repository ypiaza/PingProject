import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Login = ({ loginSucess }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [users, setUsers] = useState([]);
    const [login, setLogin] = useState('');
    const [newLogin, setNewLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [newSenha, setNewSenha] = useState('');

    const API_URL = "https://pingprojectbackend.onrender.com";
    
    const navigate = useNavigate();

    const usersForLogin = async () => {
        try {
            const resposta = await fetch(`${API_URL}/users`)

            if (!resposta.ok) {
                throw new Error("Deu ruim, mané!", resposta.status);
            }

            const data = await resposta.json();

            setUsers(data);

        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        usersForLogin()
    }, [])

    const cadastrarUser = async (e) => {
        e.preventDefault();

        try {
            const resposta = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({login: newLogin, senha: newSenha})
            })
            
            if(resposta) {
                console.log("Usuário cadastrado com sucesso!")
                setNewLogin('');
                setNewSenha('');
                setIsRegistering(false);
            }

        } catch (error) {
            console.error(error)
        }
    };

    const validationLogin = (event) => {
        event.preventDefault();

        try {
            const usuarioEncontrado = users.find((item) => item.login === login && item.senha === senha);
                
                if (usuarioEncontrado) {
                    console.log("OK")

                    if (loginSucess) {
                        loginSucess(usuarioEncontrado.login);
                    }

                    navigate("/feed")
                } else {
                    console.log("Erro")
                }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="bg-zinc-950 h-screen w-full flex items-center justify-center px-4">
            <header className="font-bold text-4xl text-white/90 absolute top-0 w-full flex items-center justify-center py-10">Ping!</header>


            {!isRegistering ? (
                <form 
                    onSubmit={validationLogin} 
                    className="w-full max-w-sm flex flex-col gap-4 border border-white/15 bg-zinc-900/80 backdrop-blur-md rounded p-8 shadow-2xl transition-all"
                >
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase">
                            Login:
                        </label>
                        <input 
                            type="text" 
                            value={login}
                            onChange={(e) => setLogin(e.target.value)} 
                            className="w-full bg-zinc-800/60 border border-white/10 rounded px-3.5 py-2.5 text-white text-[0.85rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-800/90 transition-all shadow-inner"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase">
                            senha:
                        </label>
                        <input 
                            type="password" 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} 
                            className="w-full bg-zinc-800/60 border border-white/10 rounded px-3.5 py-2.5 text-white text-[0.85rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-800/90 transition-all shadow-inner"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full mt-2 bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 rounded text-white font-bold text-[0.70rem] py-2.5 transition-all duration-200 tracking-wider uppercase active:scale-[0.99] shadow-sm"
                    >
                        Entrar
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsRegistering(true)}
                        className="text-white/50 hover:text-white text-[0.70rem] text-center mt-2 transition-colors uppercase tracking-wider"
                    >
                        Não tem conta? Cadastrar
                    </button>
                </form>
            ) : (
                <form 
                    onSubmit={cadastrarUser} 
                    className="w-full max-w-sm flex flex-col gap-4 border border-white/15 bg-zinc-900/80 backdrop-blur-md rounded p-8 shadow-2xl transition-all"
                >
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase">
                            login:
                        </label>
                        <input 
                            type="text" 
                            value={newLogin}
                            onChange={(e) => setNewLogin(e.target.value)} 
                            className="w-full bg-zinc-800/60 border border-white/10 rounded px-3.5 py-2.5 text-white text-[0.85rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-800/90 transition-all shadow-inner"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase">
                            senha:
                        </label>
                        <input 
                            type="password" 
                            value={newSenha}
                            onChange={(e) => setNewSenha(e.target.value)} 
                            className="w-full bg-zinc-800/60 border border-white/10 rounded px-3.5 py-2.5 text-white text-[0.85rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-800/90 transition-all shadow-inner"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full mt-2 bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 rounded text-white font-bold text-[0.70rem] py-2.5 transition-all duration-200 tracking-wider uppercase active:scale-[0.99] shadow-sm"
                    >
                        Cadastrar
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsRegistering(false)}
                        className="text-white/50 hover:text-white text-[0.70rem] text-center mt-2 transition-colors uppercase tracking-wider"
                    >
                        Já tem conta? Entrar
                    </button>
                </form>
            )}
        </div>
    )
}

export default Login
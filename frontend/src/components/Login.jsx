import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = ({ loginSucess }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [login, setLogin] = useState('');
    const [newLogin, setNewLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [newSenha, setNewSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const API_URL = "https://pingprojectbackend.onrender.com";
    
    const navigate = useNavigate();

    const toggleMode = (registering) => {
        setIsRegistering(registering);
        setErrorMsg('');
        setSuccessMsg('');
    };

    const cadastrarUser = async (e) => {
        e.preventDefault();
        if (loading) return;

        const trimmedLogin = newLogin.trim();
        if (!trimmedLogin || !newSenha) {
            setErrorMsg("Preencha todos os campos para cadastrar.");
            return;
        }

        setErrorMsg('');
        setSuccessMsg('');
        setLoading(true);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000);

        try {
            const resposta = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ login: trimmedLogin, senha: newSenha }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            
            if (resposta.ok) {
                setSuccessMsg("Usuário cadastrado com sucesso! Faça login para continuar.");
                setLogin(trimmedLogin);
                setNewLogin('');
                setNewSenha('');
                setIsRegistering(false);
            } else if (resposta.status === 400 || resposta.status === 409) {
                let msg = "Erro ao cadastrar. O login pode já existir.";
                try {
                    const dados = await resposta.json();
                    if (dados?.detail) {
                        msg = typeof dados.detail === "string" ? dados.detail : msg;
                    }
                } catch {
                    // ignore json parse error
                }
                setErrorMsg(msg);
            } else {
                setErrorMsg("Erro ao cadastrar. O servidor pode estar indisponível no momento.");
            }

        } catch (error) {
            clearTimeout(timeoutId);
            console.error(error);
            if (error.name === 'AbortError') {
                setErrorMsg("Tempo limite esgotado. O servidor pode estar inicializando, tente novamente.");
            } else {
                setErrorMsg("Erro de conexão com o servidor. Aguarde alguns instantes e tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    const validationLogin = async (event) => {
        event.preventDefault();
        if (loading) return;

        const trimmedLogin = login.trim();
        if (!trimmedLogin || !senha) {
            setErrorMsg("Preencha o login e a senha.");
            return;
        }

        setErrorMsg('');
        setSuccessMsg('');
        setLoading(true);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000);

        try {
            const resposta = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login: trimmedLogin, senha: senha }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (resposta.ok) {
                const dados = await resposta.json();

                if (dados && dados.login) {
                    if (loginSucess) {
                        loginSucess(dados.login);
                    }
                    navigate("/feed", { replace: true });
                } else {
                    setErrorMsg("Resposta inesperada do servidor ao fazer login.");
                }
            } else if (resposta.status === 401) {
                setErrorMsg("Login ou senha incorretos!");
            } else if (resposta.status >= 500) {
                setErrorMsg("Instabilidade no servidor. Tente novamente em instantes.");
            } else {
                let msg = "Erro ao realizar login.";
                try {
                    const dados = await resposta.json();
                    if (dados?.detail) {
                        msg = typeof dados.detail === "string" ? dados.detail : msg;
                    }
                } catch {
                    // ignore json parse error
                }
                setErrorMsg(msg);
            }

        } catch (error) {
            clearTimeout(timeoutId);
            console.error(error);
            if (error.name === 'AbortError') {
                setErrorMsg("Tempo limite esgotado. O servidor no Render pode estar inicializando.");
            } else {
                setErrorMsg("Erro de conexão com o servidor. O servidor pode estar iniciando, tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-950 h-screen w-full flex items-center justify-center px-4">
            <header className="font-bold text-4xl text-white/90 absolute top-0 w-full flex items-center justify-center py-10">Ping!</header>

            {!isRegistering ? (
                <form 
                    onSubmit={validationLogin} 
                    className="w-full max-w-sm flex flex-col gap-4 border border-white/15 bg-zinc-900/80 backdrop-blur-md rounded p-8 shadow-2xl transition-all"
                >
                    {errorMsg && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-[0.75rem] px-3 py-2 rounded text-center">
                            {errorMsg}
                        </div>
                    )}

                    {successMsg && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[0.75rem] px-3 py-2 rounded text-center">
                            {successMsg}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase">
                            Login:
                        </label>
                        <input 
                            type="text" 
                            value={login}
                            onChange={(e) => setLogin(e.target.value)} 
                            disabled={loading}
                            required
                            className="w-full bg-zinc-800/60 border border-white/10 rounded px-3.5 py-2.5 text-white text-[0.85rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-800/90 transition-all shadow-inner disabled:opacity-50"
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
                            disabled={loading}
                            required
                            className="w-full bg-zinc-800/60 border border-white/10 rounded px-3.5 py-2.5 text-white text-[0.85rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-800/90 transition-all shadow-inner disabled:opacity-50"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full mt-2 border border-white/20 rounded text-white font-bold text-[0.70rem] py-2.5 transition-all duration-200 tracking-wider uppercase shadow-sm ${
                            loading 
                                ? "bg-white/5 opacity-60 cursor-not-allowed" 
                                : "bg-white/10 hover:bg-white/25 active:bg-white/30 cursor-pointer"
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Entrando...
                            </span>
                        ) : (
                            "Entrar"
                        )}
                    </button>

                    {loading && (
                        <p className="text-zinc-400 text-[0.65rem] text-center animate-pulse">
                            Conectando ao servidor... Aguarde alguns instantes caso ele esteja inicializando.
                        </p>
                    )}

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => toggleMode(true)}
                        className="text-white/50 hover:text-white text-[0.70rem] text-center mt-2 transition-colors uppercase tracking-wider cursor-pointer disabled:opacity-50"
                    >
                        Não tem conta? Cadastrar
                    </button>
                </form>
            ) : (
                <form 
                    onSubmit={cadastrarUser} 
                    className="w-full max-w-sm flex flex-col gap-4 border border-white/15 bg-zinc-900/80 backdrop-blur-md rounded p-8 shadow-2xl transition-all"
                >
                    {errorMsg && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-[0.75rem] px-3 py-2 rounded text-center">
                            {errorMsg}
                        </div>
                    )}

                    {successMsg && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[0.75rem] px-3 py-2 rounded text-center">
                            {successMsg}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase">
                            login:
                        </label>
                        <input 
                            type="text" 
                            value={newLogin}
                            onChange={(e) => setNewLogin(e.target.value)} 
                            disabled={loading}
                            required
                            className="w-full bg-zinc-800/60 border border-white/10 rounded px-3.5 py-2.5 text-white text-[0.85rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-800/90 transition-all shadow-inner disabled:opacity-50"
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
                            disabled={loading}
                            required
                            className="w-full bg-zinc-800/60 border border-white/10 rounded px-3.5 py-2.5 text-white text-[0.85rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-800/90 transition-all shadow-inner disabled:opacity-50"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full mt-2 border border-white/20 rounded text-white font-bold text-[0.70rem] py-2.5 transition-all duration-200 tracking-wider uppercase shadow-sm ${
                            loading 
                                ? "bg-white/5 opacity-60 cursor-not-allowed" 
                                : "bg-white/10 hover:bg-white/25 active:bg-white/30 cursor-pointer"
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Cadastrando...
                            </span>
                        ) : (
                            "Cadastrar"
                        )}
                    </button>

                    {loading && (
                        <p className="text-zinc-400 text-[0.65rem] text-center animate-pulse">
                            Conectando ao servidor... Aguarde alguns instantes caso ele esteja inicializando.
                        </p>
                    )}

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => toggleMode(false)}
                        className="text-white/50 hover:text-white text-[0.70rem] text-center mt-2 transition-colors uppercase tracking-wider cursor-pointer disabled:opacity-50"
                    >
                        Já tem conta? Entrar
                    </button>
                </form>
            )}
        </div>
    )
}

export default Login

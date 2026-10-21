import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


const Login = ({ loginSucess, cadastroSucess }) => {
    const [users, setUsers] = useState([]);
    const [login, setLogin] = useState('');
    const [newLogin, setNewLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [newSenha, setNewSenha] = useState('');

    const navigate = useNavigate();

    const usersForLogin = async () => {
        try {
            const resposta = await fetch("http://127.0.0.1:8000/users")

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

    const cadastrarUser = async () => {
        try {
            await fetch("http://127.0.0.1:8000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON({login: newLogin, senha: newSenha})
            })
            
            const userValid = login

            if(cadastroSucess){
                cadastroSucess(userValid)
            }

            navigate("/feed")
        } catch (error) {
            console.error(error)
        }
    };

    const validationLogin = (event) => {
        event.preventDefault();

        try {
            users.find((item) => {
                if (item.login === login && item.senha == senha) {
                    console.log("OK")

                    const userValid = item.login

                    if (loginSucess) {
                        loginSucess(userValid);
                    }

                    navigate("/feed")
                } else {
                    console.log("Erro")
                }
            })

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="bg-zinc-800 h-screen w-full flex items-center justify-center">
            <form onSubmit={validationLogin} className="flex flex-col border-white/50 border-[0.05rem] py-10 px-8">
                <label className="text-white/75 text-[0.60rem] font-bold tracking-wider">Login: </label>
                <input type="text" onChange={(e) => setLogin(e.target.value)} className="w-full bg-zinc-800/80 border border-white/20 px-3 py-1.5 text-white text-[0.80rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/60 transition-colors"
                 />
                <label className="text-white/75 text-[0.60rem] font-bold tracking-wider">senha: </label>
                <input type="password" onChange={(e) => setSenha(e.target.value)} className="w-full bg-zinc-800/80 border border-white/20 px-3 py-1.5 text-white text-[0.80rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/60 transition-colors"
                    />
                <button type="submit" className="w-full mt-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-[0.70rem] py-2 transition-all duration-100 tracking-wider active:scale-[0.99]">Entrar</button>
            </form>

            <form onSubmit={cadastrarUser} className="flex flex-col border-white/50 border-[0.05rem] py-10 px-8">
                <label className="text-white/75 text-[0.60rem] font-bold tracking-wider">login: </label>
                <input type="text" onChange={(e) => setNewLogin(e.target.value)} className="w-full bg-zinc-800/80 border border-white/20 px-3 py-1.5 text-white text-[0.80rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/60 transition-colors"
                 />
                <label className="text-white/75 text-[0.60rem] font-bold tracking-wider">senha: </label>
                <input type="password" onChange={(e) => setNewSenha(e.target.value)} className="w-full bg-zinc-800/80 border border-white/20 px-3 py-1.5 text-white text-[0.80rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/60 transition-colors"
                    />
                <button type="submit" className="w-full mt-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-[0.70rem] py-2 transition-all duration-100 tracking-wider active:scale-[0.99]">Cadastrar</button>
            </form>
        </div>
    )
}

export default Login
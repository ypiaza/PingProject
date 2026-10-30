import { useState, useEffect } from "react"
import PostForm from "./PostForm";
import CommentSection from "./CommentSection";

const Feed = ({ usuario, Logout }) => {
  const [posts, setPosts] = useState([]);
  const [autor, setAutor] = useState(usuario || "visitante");
  const [conteudo, setConteudo] = useState('');
  const [carregando, setCarregando] = useState(true)

  const API_URL = "https://pingprojectbackend.onrender.com";

  const carregarPosts = async () => {
    try {
      const resposta = await fetch(`${API_URL}/posts`);
      const posts = await resposta.json();
      setPosts(posts);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPosts();

    const atualizar_feed = setInterval(() => {
      carregarPosts();
    }, 500);

    return () => clearInterval(atualizar_feed)
  }, [])

  const newPost = async (event) => {
    event.preventDefault();

    try {
      const resposta = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ autor: autor, conteudo: conteudo })
      })
      if (resposta.ok) {
        setConteudo('');
        carregarPosts();
      } else {
        alert('Erro ao publicar!');
      }
    } catch (error) {
      console.error(error)
      alert('Deu ruim!')
    }
  };


  const reagirPost = async (PostId, tipo) => {
    try {
      const resp = await fetch(`${API_URL}/posts/${PostId}/${tipo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      })

      if (resp.ok) {
        carregarPosts()
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="h-screen w-full bg-zinc-800 flex flex-col overflow-hidden">
      <div className="px-6 py-3 fixed w-full flex items-center justify-between backdrop-blur-2xl border-b border-white/10 z-100">
        <h1 className="font-bold text-2xl text-white">P!</h1>
        <span className="text-white/80 text-sm">Logado como <strong className="text-white">~{usuario || "visitante"}</strong></span>
        <button className="text-white font-bold text-sm cursor-pointer" onClick={Logout}>Sair</button>
      </div>

      <div className="w-full flex-1 overflow-y-auto flex flex-col items-center gap-4 pt-24 pb-10">
        <PostForm post={newPost} autorprops={autor} autorset={setAutor} conteudoprops={conteudo} conteudoset={setConteudo} />

        {carregando ? (
          <p className="text-white">Carregando...</p>
        ) : posts.length === 0 ? (
          <p className="text-white">Nenhum post encontrado.</p>
        ) : (
          [...posts].reverse().map((post) => (
            <div key={post.id} className="w-full md:w-150 flex flex-col items-center justify-evenly border-[0.05rem] border-white/30 rounded px-5 py-3">
              <div className="w-full items-start">
                <p className="text-white font-bold text-[0.60rem]">~{post.autor}</p>
              </div>

              <div className="my-5">
                <p className="text-white font-bold text-[0.80rem]">{post.conteudo}</p>
              </div>

              <CommentSection postId={post.id} currentUser={usuario} />

              <div className="w-full flex items-center justify-evenly">
                <button onClick={() => reagirPost(post.id, "concordar")} className="text-white/75 font-bold text-[0.60rem] hover:text-white duration-100 cursor-pointer">
                  concordar ({post.concordar_count})
                </button>

                <button onClick={() => reagirPost(post.id, "discordar")} className="text-white/75 font-bold text-[0.60rem] hover:text-white duration-100 cursor-pointer">
                  discordar ({post.discordar_count}) 
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Feed
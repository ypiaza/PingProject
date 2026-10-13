import { useState, useEffect } from "react"

const App = () => {
  const [posts, setPosts] = useState([]);
  const [autor, setAutor] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [carregando, setCarregando] = useState(true)

  const carregarPosts = async () => {
    try {
      const resposta = await fetch('http://127.0.0.1:8000/posts');
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
  }, [])

  const newPost = async (event) => {
    event.preventDefault();

    try {
      const resposta = fetch('http://127.0.0.1:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ autor: autor, conteudo: conteudo })
      })
      if (resposta.ok) {
        alert('Post publicado!');

        setAutor('');
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

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Feed teste rede social</h1>

      {/* Formulário de Criação */}
      <h3>Criar um novo post</h3>
      <form onSubmit={newPost}>
        <input
          type="text"
          placeholder="Seu nome"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
        <br /><br />
        <textarea
          placeholder="O que você está pensando?"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Publicar</button>
      </form>

      <hr />

      {/* Listagem de Posts */}
      <h3>Feed de Posts</h3>
      {carregando ? (
        <p>Carregando...</p>
      ) : posts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <strong>Autor: {post.autor}</strong>
            <p>{post.conteudo}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default App
import { useState, useEffect } from "react";

const CommentSection = ({ postId, currentUser }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const API_URL = "https://pingprojectbackend.onrender.com";

    const fetchComments = async () => {
        try {
            const resposta = await fetch(`${API_URL}/posts/${postId}/comments`);
            if (!resposta.ok) throw new Error("Erro");
            const data = await resposta.json();
            setComments(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
            fetchComments();
    },[]);

    const handleCooperar = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch(`${API_URL}/posts/${postId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    autor: currentUser || "visitante",
                    conteudo: newComment,
                }),
            });

            if (resposta.ok) {
                setNewComment("");
                fetchComments();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full flex flex-col gap-2 my-2">
            <div className="w-full flex items-center justify-evenly">
                <a 
                    className="text-white/75 font-bold text-[0.60rem] hover:text-white duration-100 cursor-pointer" 
                    onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
                >
                    cooperar ({comments.length})
                </a>
            </div>

            {isOpen && (
                <div className="flex flex-col gap-2 w-full mt-2">
                    {comments.map((c) => (
                        <div key={c.id} className="border-[0.05rem] border-white/20 p-2 text-white">
                            <p className="font-bold text-[0.55rem]">~{c.autor}</p>
                            <p className="text-[0.75rem]">{c.conteudo}</p>
                        </div>
                    ))}

                    <form onSubmit={handleCooperar} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Escreva sua cooperação..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                            className="w-full bg-zinc-800/80 border border-white/20 px-3 py-1.5 text-white text-[0.80rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/60 transition-colors"
                        />
                        <button
                            type="submit"
                            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-[0.70rem] px-3 py-1 transition-all duration-100 tracking-wider"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
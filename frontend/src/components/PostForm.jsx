const PostForm = ({ post, autorprops, autorset, conteudoprops, conteudoset }) => {
    return (
        <div>
            <form
                className="w-125 flex flex-col gap-3 border-[0.05rem] border-white/50 px-5 py-4 bg-zinc-900/50"
                onSubmit={post}
            >
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-white/75 text-[0.60rem] font-bold tracking-wider">
                        autor
                    </label>
                    <input
                        type="text"
                        placeholder="Seu nome..."
                        value={autorprops}
                        onChange={(e) => autorset(e.target.value)}
                        required
                        className="w-full bg-zinc-800/80 border border-white/20 px-3 py-1.5 text-white text-[0.80rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/60 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-white/75 text-[0.60rem] font-bold tracking-wider">
                        mensagem
                    </label>
                    <textarea
                        placeholder="O que você está pensando?"
                        value={conteudoprops}
                        onChange={(e) => conteudoset(e.target.value)}
                        required
                        rows={3}
                        className="w-full bg-zinc-800/80 border border-white/20 px-3 py-2 text-white text-[0.80rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/60 transition-colors resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-[0.70rem] py-2 transition-all duration-100 tracking-wider active:scale-[0.99]"
                >
                    publicar
                </button>
            </form>
        </div>
    )
}

export default PostForm
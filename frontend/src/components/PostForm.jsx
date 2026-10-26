import { useState } from "react";

const PostForm = ({ post, conteudoprops, conteudoset }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="w-full flex items-center justify-center">
            {/* Desktop */}
            <form
                className="md:w-150 hidden md:flex flex-col gap-3 border border-white/15 px-5 py-4 bg-zinc-900/80 backdrop-blur-md rounded shadow-xl transition-all"
                onSubmit={post}
            >                
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase">
                        mensagem
                    </label>
                    <textarea
                        placeholder="O que você está pensando?"
                        value={conteudoprops}
                        onChange={(e) => conteudoset(e.target.value)}
                        required
                        rows={3}
                        className="w-full bg-zinc-800/60 border border-white/10 rounded px-3.5 py-2.5 text-white text-[0.85rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-zinc-800/90 transition-all resize-none shadow-inner"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-1 bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 rounded text-white font-bold text-[0.70rem] py-2.5 transition-all duration-200 tracking-wider uppercase active:scale-[0.99] shadow-sm"
                >
                    publicar
                </button>
            </form>

            {/* Mobile Toggle Button */}
            <button 
                onClick={() => setActive(!active)} 
                className="md:hidden fixed bottom-4 right-4 z-50 flex items-center justify-center w-15 h-15 text-xl border border-white/20 rounded text-white bg-zinc-900/90 backdrop-blur-md shadow-2xl transition-transform duration-200 active:scale-90 hover:bg-zinc-800"
            >
                {active ? "✕" : "+"}
            </button>

            {/* Mobile Form with Smooth Transition */}
            <div className={`md:hidden fixed inset-x-4 bottom-20 z-40 transition-all duration-300 ease-out ${active ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <form
                    className="flex flex-col gap-3 border border-white/20 px-5 py-4 bg-zinc-900/95 backdrop-blur-xl rounded shadow-2xl shadow-black/60"
                    onSubmit={post}
                >                
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase">
                            mensagem
                        </label>
                        <textarea
                            placeholder="O que você está pensando?"
                            value={conteudoprops}
                            onChange={(e) => conteudoset(e.target.value)}
                            required
                            rows={3}
                            className="w-full bg-zinc-800/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-[0.85rem] placeholder:text-zinc-500 focus:outline-none focus:border-white/40 transition-all resize-none shadow-inner"
                        />
                    </div>

                    <button
                        onClick={() => setActive(false)}
                        type="submit"
                        className="w-full mt-1 bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 rounded text-white font-bold text-[0.70rem] py-2.5 transition-all duration-200 tracking-wider uppercase active:scale-[0.99] shadow-sm"
                    >
                        publicar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PostForm;
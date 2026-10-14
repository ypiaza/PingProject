const Header = () => {
  return (
    <div className="px-6 py-3 fixed w-full flex items-center justify-between backdrop-blur-2xl border-b border-white/10">
        <h1 className="font-bold text-2xl text-white">P!</h1>
        <a className="text-white font-bold" href="/">Feed</a>
        <a className="text-white font-bold" href="/">~username</a>
    </div>
  )
}

export default Header
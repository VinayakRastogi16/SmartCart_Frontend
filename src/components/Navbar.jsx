import { NavLink, useNavigate } from "react-router-dom";


const Navbar = ()=>{

  const navigate = useNavigate()
    const links = [
        {name:"Overview", path:"/"},
        {name: "Dashboard", path:"/dashboard"},
        {name:"Method", path:"/method"},
        {name:"About", path:"/about"},
    ];

    return (
        <nav className="z-50 top-4 mx-7 left-12 right-18 rounded-lg border-b border-zinc-800 bg-white/10 sticky backdrop-blur-lg  shadow-md" style={{ height:"10vh"}}>
            <div className="flex">
              <div className="w-full mx-auto items-center justify-end px-8 py-4 gap-8">
                
                <div className="flex items-center gap-2" style={{margin:".5vh"}}>
                  <div className="w-12 h-12 rounded-2xl bg-lime-400 flex items-center justify-center font-bold text-black">
                  S
                </div>
                <h1 className="text-white font-semibold">
                  SmartCart.cluster
                </h1>
                </div>
              </div>

              <div className="flex items-center gap-12">
              <div className="left-0">
               <div className="flex gap-4">
                {links.map((link)=>(
                  <NavLink
                  key = {link.name}
                  to={link.path}
                  className={({isActive})=>isActive ? "text-lime-400 font-medium":"text-zinc-400 hover:text-white-transition"}>
                    {link.name}
                  </NavLink>
                ))}
              </div>
             </div>
            </div>
              
              

             
             

              <button onClick={()=>navigate("/dashboard")} style={{margin:"4vh"}} className="px-3 py-2 inline-flex justify-center h-6 items-center md:w-60 lg:w-40 rounded-xl bg-lime-400 text-black font-medium text-xs hover:scale-105 transition">
                Launch App
              </button>
            </div>

            
        </nav>
    )
}


export default Navbar
'use client'
import MenuItem from "./MenuItem"





export default  function Menu(){

    // console.log({menus})
    return (
        <aside className="min-w-44 bg-zinc-900 h-screen gap-1"> 
            <nav className="flex flex-col py-4">
                <MenuItem  texto="INÍCIO" url="/" ></MenuItem>
                <MenuItem  texto="Continua" url="/cadexemplo" ></MenuItem>
            </nav>
        </aside>
    )

}

{/* <MenuItem icone={IconHome} texto="Início" url="/" ></MenuItem>
<MenuItem icone={IconUser} texto="Cadastro" url="/" ></MenuItem>
<MenuItem icone={IconSTurnDown} texto="Teste 01" url="/inicio" ></MenuItem> */}

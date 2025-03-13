import Link from "next/link";
import Pagina from "../components/templete/Pagina";

export default function Guelta(){
    return (
        <Pagina>
            <div className="flex flex-col">
                <Link href="guelta/home">
                    <div className="flex bg-blue-500 rounded-lg justify-center p-4">Iniciar Nova Guelta</div>
                    <div>Provider: </div>
                </Link>
            </div>
        </Pagina>
    )
}
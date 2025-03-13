import Pagina from "@/app/components/templete/Pagina";
import Link from "next/link";


export default function Arquivos(){
    return (
        <Pagina idpage="3">
            <div className="flex flex-col h-80 justify-center">
                <div className="flex border-2 border-red-500 p-5">Arquivos</div>
                <Link href="../guelta">
                    <div className="bg-blue-500 rounded-lg p-2 hover:bg-blue-600">Próximo</div>
                </Link>
            </div>
        </Pagina>
    )
}
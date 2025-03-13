import Pagina from "@/app/components/templete/Pagina"
import Link from "next/link"

async function obterProdutos() {
    const url = 'http://127.0.0.1:5001/mqhair-sellout/us-central1/loadSelloutitem?idsellout=96'
    const produtos = await fetch(url, {
        cache: 'no-store',
        next: {
            revalidate: 0
        }
    })
    console.log('produtos', produtos)
    return produtos.json()
}


export default async function ListaItens(){
    const produtos = await obterProdutos()
    return (
        <Pagina idpage="2">
        <div className="flex flex-col gap-1">Lista Itens
            {produtos.map((produto:any) => (
                <div key={produto.id} className='
                flex justify-between text-xl px-5 py-2.5 text-zinc-100
                odd:bg-zinc-800 even:bg-zinc-700'>
                <span>{produto.grupo}</span>
                <span>{produto.descrprod}</span>
                <span>{produto.qtdneg}</span>
            </div>
            ))}
        </div>
        <Link href="/guelta/arquivos">
            <div className="bg-blue-500 rounded-lg p-2 w-20 hover:bg-blue-600 items-end">Próximo</div>
        </Link>
        </Pagina>
    )
}


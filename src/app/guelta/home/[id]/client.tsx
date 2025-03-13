"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useAPI from "@/hooks/api/useAPI";
import Link from "next/link";

interface Guelta {
  id: number;
  dtmov: string;
  fmt_dtmov: string;
  loja: string;
  vend: string;
  qtdneg: number | null;
  idloja: number | null;
}

interface Loja {
  id: number;
  nome: string;
}

// export async function generateStaticParams() {
//   return []
// }
interface MesProps {
    id: string
}


export default function HomeMes(props: MesProps) {
  const { httpPost, httpGet } = useAPI();
  const router = useRouter();
  const [gueltas, setGueltas] = useState<Guelta[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loadingLojas, setLoadingLojas] = useState(false);
  const [reload, setReload] = useState(true);
  const [idvendedor, setIdvendedor] = useState('');
  
//   const id = params?.id as string | undefined;
  const id = props.id as string | undefined;
  

  const carregarGueltas = useCallback(  async function () {
    if (!id) return;
    const storeUser = JSON.parse(localStorage.getItem('guelta_usuario') || '{}');

    if (!storeUser?.id) {
        console.error("Usuário não autenticado!");
        return;
    } 
    setIdvendedor(storeUser.id)
    const listarTodos = await httpGet(`guelta?idvendedor=${storeUser.id}`);
    //console.log('listarTodos', listarTodos)
    const filtrados = listarTodos.filter((g: Guelta) => g.fmt_dtmov === id);
    setGueltas(filtrados);
    setReload(false)
  },[id, reload]
)

  const initialized = useRef(false)
  useEffect(() => {
    if (!initialized.current) {
      carregarGueltas()
    }
  }, [carregarGueltas]);

  async function abrirModal() {
    setLoadingLojas(true);
    const response = await httpGet(`consulta?operacao=lojaguelta&user=${idvendedor}`);
    const data: Loja[] = await response;
  
    // Filtra as lojas já existentes na lista de gueltas do mês
    const lojasFiltradas = data.filter(loja => 
      !gueltas.some(guelta => guelta.loja.toLowerCase() === loja.nome.toLowerCase())
    );
  
    setLojas(lojasFiltradas);
    setLoadingLojas(false);
    setModalOpen(true);
  }

  async function adicionarLoja(nomeLoja: string, idLoja: number) {
    if (!id) return;
  
    // Criando o payload da requisição
    const payload = {
      idvendedor: idvendedor,  // Aqui você pode usar o id do vendedor autenticado
      idloja: idLoja.toString(),
      dtmov: `${id.substring(3, 7)}-${id.substring(0,2)}-01`, // Convertendo o formato 'YYYY-MM' para 'YYYY-MM-01'
    };
  
    try {
      const response = await httpPost(`insertGuelta`,  payload);
      //console.log('response', response, response.response!='ok')
  
      if (response.response!='ok') {
        throw new Error("Erro ao adicionar loja.");
      }
  
      setReload(true)
      //setGueltas((prev) => [...prev, novaGuelta]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar loja:", error);
    }
  }
  
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <button 
        onClick={() => router.push("/guelta/home")} 
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
      >
        🔙 Voltar
      </button>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">📆 Gueltas de {id}</h1>
        <button 
          onClick={abrirModal}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
        >
          ➕ Adicionar Loja
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {gueltas.length === 0 ? (
          <p className="text-gray-400">Nenhum registro encontrado para este mês.</p>
        ) : (
          gueltas.map((g) => (
            <div 
              key={g.id} 
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              <div>
                <h2 className="text-xl font-semibold text-yellow-300">{g.loja}</h2>
                <p className="text-gray-300">Vendedor: {g.vend}</p>
              </div>
              <span className="text-lg font-bold bg-red-600 text-white px-3 py-1 rounded-lg">
                {g.qtdneg ?? 0} vendas
              </span>
              <Link href={`/guelta/home/${id}/produtos?loja=${encodeURIComponent(g.loja)}&idguelta=${g.id}`}>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                  ➕
                </button>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Modal de Seleção de Loja */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-white mb-4">Selecione uma Loja</h2>

            {loadingLojas ? (
              <p className="text-gray-300">Carregando lojas...</p>
            ) : (
              <ul className="max-h-60 overflow-y-auto">
                {lojas.length === 0 ? (
                  <p className="text-gray-400">Nenhuma nova loja disponível.</p>
                ) : (
                  lojas.map((loja) => (
                    <li 
                      key={loja.id} 
                      className="flex justify-between items-center p-2 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                    >
                      <span className="text-white">{loja.nome}</span>
                      <button 
                        onClick={() => adicionarLoja(loja.nome, loja.id)} 
                        className="bg-blue-600 px-2 py-1 rounded text-white text-sm hover:bg-blue-500"
                      >
                        Adicionar
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}

            <button 
              onClick={() => setModalOpen(false)}
              className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

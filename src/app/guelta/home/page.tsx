/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import FolderGuelta from "@/app/components/shared/Folder";
import useAPI from "@/hooks/api/useAPI";
import { useCallback,  useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Page() {
    const { httpGet } = useAPI();
    
    
    // const [lista, setLista] = useState({});
    const [lista, setLista] = useState<Record<string, number>>({});

    const [novoMes, setNovoMes] = useState(""); // Estado para armazenar o mês a ser adicionado

    const carregarLista = useCallback(async function () {
        const storeUser = JSON.parse(localStorage.getItem('guelta_usuario') || '{}');

        if (!storeUser?.id) {
            console.error("Usuário não autenticado!");
            return;
        } 

        const listarTodos = await httpGet(`guelta?idvendedor=${storeUser.id}`);
        //console.log('home listarTodos', listarTodos);

        // 🔹 Obtendo o mês atual no formato MM-YYYY
        const hoje = new Date();
        const mesAtual = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${hoje.getFullYear()}`;

        // 🔹 Processando os dados da API
        const result = listarTodos.reduce((acc:any, v:any) => {
            if (!acc[v.fmt_dtmov]) {
                acc[v.fmt_dtmov] = 1;
            } else {
                acc[v.fmt_dtmov]++;
            }
            return acc;
        }, {});

        // 🔹 Se o mês atual não existir na lista, adicionamos com quantidade 0
        if (!result[mesAtual]) {
            result[mesAtual] = 0;
        }

        //console.log('listarTodos atualizado:', result);
        setLista(result);
    }, []);

    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            carregarLista();
        }
    }, [carregarLista]);

    function adicionarMes() {
        if (!novoMes) return;

        const [ano, mes] = novoMes.split("-"); // Formato YYYY-MM
        const mesFormatado = `${mes}-${ano}`; // Convertendo para MM-YYYY

        // Verifica se o mês já existe
        if (lista[mesFormatado]) {
            alert("Esse mês já está na lista!");
            return;
        }

        // Adiciona o novo mês à lista
        setLista((prev) => ({
            ...prev,
            [mesFormatado]: 0,
        }));

        setNovoMes(""); // Reseta o campo após adicionar
    }

    // 🔹 Obtendo a data máxima (mês anterior ao atual)
    const hoje = new Date();
    const mesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const maxDate = mesAnterior.toISOString().slice(0, 7); // Formato YYYY-MM

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-xl font-bold">📅 Adicionar Mês</h1>
                
                <div className="flex items-center gap-2">
                    <input
                        type="month"
                        value={novoMes}
                        onChange={(e) => setNovoMes(e.target.value)}
                        max={maxDate} // Bloqueia meses futuros
                        className="px-3 py-2 border border-gray-300 rounded-lg text-black"
                    />
                    <button 
                        onClick={adicionarMes} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                    >
                        ➕ Adicionar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {Object.entries(lista).map(([mes, quantidade], i) => (
                    <Link key={i} href={`/guelta/home/${mes}`} className="block">
                        <FolderGuelta mesano={mes} quantidade={quantidade} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

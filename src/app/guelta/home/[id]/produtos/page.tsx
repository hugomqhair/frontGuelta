'use client';
import { useContext, useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import useAPI from "@/hooks/api/useAPI";
import { IconEraser } from "@tabler/icons-react";
import GueltaContext from "@/app/guelta/GueltaContext";

interface Produto {
    id: number;
    descrprod: string;
    grupo: string;
    qtdneg?: number;
    idgrupo: string;
}

export default function Page() {
  const { httpPost, httpGet } = useAPI();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const loja = searchParams.get("loja") || "Loja não informada";
  const idguelta = searchParams.get("idguelta") || "ID não informado";

  const id = params?.id as string | undefined;
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [quantidades, setQuantidades] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  
  // 🔍 Estados para filtros
  const [filtroDescricao, setFiltroDescricao] = useState(""); // Busca por nome
  const [somenteComQuantidade, setSomenteComQuantidade] = useState(false); // Toggle para mostrar apenas os preenchidos
  const {gueltaFechada} = useContext(GueltaContext);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await httpGet(`gueltaItens?idguelta=${idguelta}`);
        const data: Produto[] = await response;

        const quantidadesRegistradas = data.reduce((acc, item) => {
          acc[item.id] = item.qtdneg ?? 0;
          return acc;
        }, {} as { [key: number]: number });

        setProdutos(data);
        setQuantidades(quantidadesRegistradas);
        
        console.log('gueltaFechada', gueltaFechada, somenteComQuantidade)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    if(gueltaFechada){
      setSomenteComQuantidade(true)
    }
    carregarProdutos();
  }, [idguelta]);

  function handleChangeQuantidade(produtoId: number, quantidade: number) {
    setQuantidades((prev) => ({ ...prev, [produtoId]: quantidade }));
  }

  async function salvarGuelta() {
    const produtosSelecionados = Object.entries(quantidades)
      .filter(([_, quantidade]) => quantidade > 0)
      .map(([produtoId, quantidade]) => ({
        idproduto: produtoId,
        qtdneg: quantidade,
        idguelta: idguelta,
      }));

    if (produtosSelecionados.length === 0) {
      alert("Nenhum produto foi inserido.");
      return;
    }

    try {
        await httpPost("insertGueltaItem", produtosSelecionados);
        router.push(`/guelta/home/${id}`);
    } catch (error) {
      console.error("Erro ao salvar produtos:", error);
      alert("Erro ao salvar. Tente novamente.");
    }
  }

  // 🎨 Definição de cores por grupo
  const coresGrupo: { [key: string]: string } = {
    PRANCHA: "border-blue-500",
    SECADOR: "border-green-500",
    MODELADOR: "border-red-500",
    ['ESCOVA ELETRICA']: "border-pink-500",
    ['MAQUINA DE CORTE']: "border-yellow-500",
    "": "border-gray-500",
  };

  // 🔎 Filtragem dos produtos
  const produtosFiltrados = produtos.filter(produto => {
    const correspondeBusca = produto.descrprod.toLowerCase().includes(filtroDescricao.toLowerCase());
    const correspondeQuantidade = !somenteComQuantidade || (quantidades[produto.id] ?? 0) > 0;
    return correspondeBusca && correspondeQuantidade;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex w-full ">
        <button 
          onClick={() => router.push(`/guelta/home/${id}`)} 
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          🔙 Voltar
        </button>
        
        {!gueltaFechada && <button 
          onClick={salvarGuelta}
          className="mb-4 px-4 py-2 ml-auto bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
        >
          ✅ Salvar Guelta
        </button>}
      </div>

      <h1 className="text-2xl font-bold text-white">🛒 Guelta:  {id}</h1>
      <h2 className="text-lg text-yellow-300 font-semibold">📍 Loja: {loja}</h2>

      {/* 🔍 Filtros */}
      <div className="p-3 rounded-lg shadow-md mt-4 flex flex-col md:flex-row gap-3">
        {/* Filtro por nome */}
        <input
          type="text"
          placeholder="🔍 Buscar por descrição..."
          value={filtroDescricao}
          onChange={(e) => setFiltroDescricao(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-black"
        />
        {filtroDescricao &&  <IconEraser
            onClick={() => setFiltroDescricao("")}
            className="w-6 h-6 cursor-pointer"
          />}
        {/* Checkbox para filtrar apenas preenchidos */}
        <label className="flex items-center space-x-2 cursor-pointer text-white">
          <input
            type="checkbox"
            checked={somenteComQuantidade}
            onChange={() => setSomenteComQuantidade((prev) => !prev)}
            className="w-4 h-4"
          />
          <span>Informados</span>
        </label>
      </div>

      {loading ? (
        <p className="text-gray-400 mt-4">Carregando produtos...</p>
      ) : (
        <div className="mt-4 space-y-4">
          {produtosFiltrados.length === 0 ? (
            <p className="text-gray-400 text-center">Nenhum produto encontrado.</p>
          ) : (
            produtosFiltrados.map((produto) => (
              <div 
                key={produto.id} 
                className={`flex justify-between items-center p-4 rounded-lg bg-white shadow-xl border-l-4 border-b-4 ${coresGrupo[produto.grupo] || "border-gray-500"} transition hover:shadow-xl`}
              >
                <div>
                  <p className="text-gray-700">{produto.id} - {produto.grupo}</p>
                  <h2 className="text-lg font-semibold text-zinc-800">{produto.descrprod}</h2>
                </div>
                <input
                  type="number"
                  min="0"
                  value={quantidades[produto.id] ?? 0}
                  onChange={(e) => handleChangeQuantidade(produto.id, Number(e.target.value))}
                  className="w-16 bg-slate-200 text-center text-black px-2 py-1 rounded-md"
                  placeholder="Qtd"
                />
              </div>
            ))
          )}
        </div>
      )}

      {!gueltaFechada && <button 
        onClick={salvarGuelta}
        className="mt-6 w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
      >
        ✅ Salvar Guelta
      </button>}
    </div>
  );
}

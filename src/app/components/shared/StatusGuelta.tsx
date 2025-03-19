"use client";

import {  useContext, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { IconLockFilled, IconLockOpen } from "@tabler/icons-react";
import useAPI from "@/hooks/api/useAPI";
// import GueltaContext from "@/app/guelta/GueltaContext";


interface StatusGueltaProps {
    isClosed: boolean
    id: number
    onFechar: (idGuelta: number) => void; 
}



export default function StatusGuelta(props:StatusGueltaProps) {
  const [isClosed, setIsClosed] = useState(true);
  const { httpPost} = useAPI();
//   const ctx = useContext(GueltaContext);

  useEffect(() => {
    setIsClosed(props.isClosed);
  }, [props.isClosed]);

  async function fecharGuelta(id: number) {
    const resp = await httpPost(`/fecharGuelta`,{idguelta: id})
    console.log('Resp fechar guelta', resp)
    if(resp.response=='ok'){
        setIsClosed(true);
        props.onFechar(id)
    }
    
    
  }

  return (
    <Popover className="relative">
      {/* 🔹 Ícone com fundo verde */}
      {isClosed ?
         <div className="bg-red-500 text-white px-3 py-3 rounded-full flex text-4xl items-center gap-2">
            <IconLockFilled className="w-5 h-5 "></IconLockFilled>
        </div> :
        <Popover.Button className="bg-green-500 text-white px-3 py-3 rounded-full flex text-4xl items-center gap-2">
            <IconLockOpen className="w-5 h-5" /> 
        </Popover.Button>
       }

      {/* 🔹 Popover de Aviso */}
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel className="absolute z-10 mt-2 w-64 bg-white text-black shadow-lg rounded-lg p-4 border">
          <h3 className="font-semibold text-lg">⚠️ Enviar e Fechar a Guelta</h3>
          <p className="text-sm mt-1">
            Após o envio, não será possível editar esta Guelta. Deseja continuar?
          </p>

          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => fecharGuelta(props.id)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Enviar
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

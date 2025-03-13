/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { createContext,  useState } from "react"


export interface propsGueltaContext {
    // stepActive: number
    // atualizaStep: (indice:number)=> void
    selecionaMes: (mesano: string) => void
    mesano: string
}





const GueltaContext = createContext<propsGueltaContext>({} as any)

export function GueltaProvider(props:any){
    const [mesano, setMesano] = useState<string>('')

   function selecionaMes(mesano: string) {
        console.log('selecionaMes', mesano)
        setMesano(mesano)
    }

    return (
        <GueltaContext.Provider 
            value={{
                selecionaMes,
                mesano,
            }}
        >
            {props.children}
        </GueltaContext.Provider>
    )
}

export default GueltaContext
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { createContext,  useState } from "react"


export interface propsGueltaContext {
    // stepActive: number
    // atualizaStep: (indice:number)=> void
    selecionaMes: (mesano: string) => void
    mesano: string
    gueltaFechada: boolean,
    setGueltaFechada: (state: boolean) => void
}



const GueltaContext = createContext<propsGueltaContext>({} as any)

export function GueltaProvider(props:any){
    const [mesano, setMesano] = useState<string>('')
    const [gueltaFechada, setGueltaFechada] = useState<boolean>(false)


   function selecionaMes(mesano: string) {
        //console.log('selecionaMes', mesano)
        setMesano(mesano)
    }

    return (
        <GueltaContext.Provider 
            value={{
                selecionaMes,
                mesano,
                gueltaFechada,
                setGueltaFechada

            }}
        >
            {props.children}
        </GueltaContext.Provider>
    )
}

export default GueltaContext
/* eslint-disable @typescript-eslint/no-explicit-any */
import GueltaContext from "@/app/guelta/GueltaContext";
import { IconFolder } from "@tabler/icons-react";
import { useContext } from "react";

export interface propsFolder {
    mesano: string
    quantidade: any
}


export default function Folderguelta(props: propsFolder) {
    const ctx = useContext(GueltaContext);
    return (
        <div className="flex justify-center cursor-pointer" onClick={() => ctx.selecionaMes(props.mesano)}>
            <div className="relative w-[140px] h-[140px] transition-all duration-200 transform hover:scale-105">
                <IconFolder stroke={1.3} className="text-yellow-300 w-full h-full drop-shadow-md" />
                <div className="absolute top-8 left-7  text-white text-md font-bold px-2 py-1 rounded-full">
                    {props.quantidade}
                </div>
                <span className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white text-sm font-bold  px-2 py-1 rounded-md">
                    {props.mesano}
                </span>
            </div>
        </div>
    );


}
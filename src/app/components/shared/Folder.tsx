/* eslint-disable @typescript-eslint/no-explicit-any */
import GueltaContext from "@/app/guelta/GueltaContext";
import { IconFolder } from "@tabler/icons-react";
import { useContext } from "react";

export interface propsFolder {
    mesano: string
    quantidade: any
}

// export default function Folderguelta(props: propsFolder) {
//     const ctx = useContext(GueltaContext)
//     return (
//         <div className="flex justify-center" onClick={() => { ctx.selecionaMes(props.mesano)}}>
//             <div className=" w-auto relative">
//                 <IconFolder stroke={1} className="text-yellow-300 w-[128px] h-[128px]" />
//                 <span className="absolute top-12 left-10 -translate-x-1/2 -translate-y-1/2 text-white text-xl font-black">{props.quantidade}</span>
//                 <span className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-md font-thin">{props.mesano}</span>
//             </div>
//         </div>
//     )
// }


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

    // return (
    //     <div className="relative flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
    //       <IconFolder stroke={1} className="text-yellow-400 w-24 h-24" />
    //       <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
    //         {props.quantidade}
    //       </span>
    //       <span className="mt-2 text-white font-semibold">{props.mesano}</span>
    //     </div>
    //   );
}
import Image from "next/image";

import ImgHeader from '../../../../public/logos_header.png'

export default function Header(){
    return(
        <header className="flex justify-center w-full pt-0 pr-12 pl-12">
            <Image alt="header" src={ImgHeader} height={80}></Image>
        </header>
    )
}
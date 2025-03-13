import Image from 'next/image'
import ImgFooter from '../../../../public/logos_footer.png'

export default function Footer(){
    return (
        <footer className='flex justify-center'>
            <Image alt="footer" src={ImgFooter} height={75}></Image>
        </footer>
    )
}
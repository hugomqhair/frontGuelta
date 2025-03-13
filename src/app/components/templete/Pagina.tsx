
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Pagina (props: any){
    

    return(
        <div className="flex justify-center gap-1 min-h-screen">
            {/* <aside className="flex flex-col gap-10 bg-black p-3">
                <Steps></Steps>
            </aside> */}
                {/* <Header></Header> */}
                <div className="flex flex-col ">
                    <main className="flex flex-col  gap-1">{props.children}</main>
                </div>
                {/* <Footer></Footer> */}
        
        </div>
    )
}
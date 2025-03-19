/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useParams } from "next/navigation";
import HomeMes from "./client";
import { use } from "react";



export default function Page({ params }: any) {
  // const { id }: any = useParams()
  const { id }: any = use(params)
  return (
    <div className="flex justify-center">
      <HomeMes id={id}></HomeMes>
    </div>
  )
}
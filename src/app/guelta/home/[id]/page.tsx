/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useParams } from "next/navigation";
import useAPI from "@/hooks/api/useAPI";
import HomeMes from "./client";
import { use } from "react";

// export async function generateStaticParams() {
//   return [{id:'02-2025'}, {id:'03-2025'}]
// }

// export const dynamic = 'force-static'
// export const dynamicParams = true


export default function Page({ params }: any) {
  // const { id }: any = useParams()
  const { id }: any = use(params)
  return (
    <HomeMes id={id}></HomeMes>
  )
}
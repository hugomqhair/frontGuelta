/* eslint-disable @typescript-eslint/no-explicit-any */
import { GueltaProvider } from "./GueltaContext";

export default function Layout(props: any) {
    return (
        <GueltaProvider>
            <div>{props.children}</div>
        </GueltaProvider>
    )
}

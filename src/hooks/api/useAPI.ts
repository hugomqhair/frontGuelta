export default function useAPI() {
    const token = 'Definir forma de recuperar Token'
    // const urlBase = 'http://127.0.0.1:5001/mqhair-sellout/us-central1'
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    //console.log('urlBase', urlBase)

    async function httpGet(caminho: string) {
        // const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
        const uri = caminho
        const urlCompleta = `${apiUrl}/${uri}`
        //console.log('urlCompleta', urlCompleta)
        const resposta = await fetch(urlCompleta, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return extrairDados(resposta)
    }

    async function httpPost(caminho: string, body: any) {
        console.log('body', body)
        const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
        // const uri = caminho
        const urlCompleta = `${apiUrl}${uri}`
        //console.log('POST', urlCompleta, body)

        const resposta = await fetch(urlCompleta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })
        return extrairDados(resposta)
    }

    async function httpDelete(caminho: string) {
        const uri = caminho.startsWith('/') ? caminho : `/${caminho}`
        // const uri = caminho
        const urlCompleta = `${apiUrl}${uri}`
        const resposta = await fetch(urlCompleta, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        return extrairDados(resposta)
    }

    async function extrairDados(resposta: Response) {
        let conteudo = ''
        try {
            conteudo = await resposta.text()
            return JSON.parse(conteudo)
        } catch (e) {
            return conteudo
        }
    }

    return { httpGet, httpPost, httpDelete }
}

export async function getData<G>(url: string, tag?: string) {
    try {
        const res = await fetch(url);
        if(res.status !== 200) {
            throw new Error(`Mengambil Data Error with tag ${tag}`);
        }

        const data =  (await res.json()) as G;
        return data;

    } catch (error) {
        console.log(error);
    }
} 
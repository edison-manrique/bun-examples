export default {
    port: 3000,
    fetch(request: Request){
        return new Response( JSON.stringify({ name: "Edison Manrique Ch" } ), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
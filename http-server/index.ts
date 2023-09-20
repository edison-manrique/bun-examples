export default {
    port: 3000,
    fetch(request: Request){
        return new Response( JSON.stringify({ name: "Edison Manrique Chocce" } ), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
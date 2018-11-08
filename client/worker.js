console.log("Service Worker Carregado")

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recebido ...")
    self.registration.showNotification(data.title, {
        body: "Eai ta pronto?",
        icon: "https://media.licdn.com/dms/image/C4E03AQFkrtV0xpNZPA/profile-displayphoto-shrink_200_200/0?e=1544054400&v=beta&t=-58DGvQ6gnyEo_bEtf-y4av0VC1eZUyJeecu_wdyRPQ"
    });
})
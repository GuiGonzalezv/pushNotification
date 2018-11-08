const publicVapidKey = "BAueDzJyJvcwnViV9mT10PhXiC4YQVVTF0io8JcaoILB2MKFv0RBpl7Rb0_ozM9tdISZtEeBsCcOhteIW1O4q5E"

// Checar o seriço

if('serviceWorker' in navigator){
    send().catch(err => console.error(err))
}

//Register SW, register push, send push
async function send() {
    //Register Service Worker
    console.log('Registrando service worker ...')
    const register = await navigator.serviceWorker.register("/worker.js", {
        scope: "/"
    })
    console.log("Service Worker Registado ...")

    //register push
    console.log("Registrando Push....")
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log("Push Registrado...")

    //Enviando notificação
    console.log("Enviando Notificação...")
    await fetch('/subscribe', {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    })
    console.log("Notificação Enviada...")
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
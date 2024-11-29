const databaseURL = 'https://landing-8873d-default-rtdb.firebaseio.com/data.json'

let sendData = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(databaseURL, {
         method: 'POST', // Método de la solicitud
         headers: {
             'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
         },
         body: JSON.stringify(data) // Convierte los datos a JSON
     })
     .then(response => {
         if (!response.ok) {
             throw new Error(`Error en la solicitud: ${response.statusText}`);
         }
         return response.json(); // Procesa la respuesta como JSON
     })
     .then(result => {
         alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
         form.reset()
         getData()
     })
     .catch(error => {
         alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
     });
}

let getData = async () => {
    try {
        const response = await fetch(databaseURL)
        if (!response.ok) {
           alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        const data = await response.json();

        if(data != null){
            let count = Object.keys(data).length;

            subscribers.innerHTML = `<h2>${count}</h2>`;
        }
    } catch (error) {
        alert('Hemos experimentado un error. ¡Vuelve pronto!');
    }
}

let ready = () => {

     console.log('DOM está listo')

     // Recuperación de datos
     getData();
}

let loaded = () => {
    console.log('Iframes e images cargadas');
    let myform = document.getElementById("form");
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();

        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;

        if (emailText.length === 0) {
            emailElement.focus()
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            )
            return;
        }
        const selectElement = document.querySelector('select.form-select');
        const selectValue = selectElement.value;

        if (selectValue === "" || selectValue === null) {
            selectElement.focus();
            selectElement.animate(
                [
                    { transform: "translateY(0)" },
                    { transform: "translateY(10px)" },
                    { transform: "translateY(-10px)" },
                    { transform: "translateY(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            );
            return;
        }

        sendData();
    })
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)

function enviarDatos() {
	document.addEventListener('keydown', function(event) {
		if (event.key === 'Enter') {
			document.getElementById('myButton').click();
		}
	});
    const spacValue = parseFloat(document.getElementById('spac').value);
    const recValue = parseFloat(document.getElementById('rec').value);

    if (spacValue <= 0 || recValue <= 0) {
        alert('Los valores de espaciamiento y recubrimiento deben ser mayores a 0.');
        return;
    }

    const data = {
        tipo: document.getElementById('tipo').value,
        diam: parseFloat(document.getElementById('diam').value),
        fy: parseFloat(document.getElementById('fy').value),
        fc: parseFloat(document.getElementById('fc').value),
        spac: spacValue,
        rec: recValue,
        lda: parseFloat(document.getElementById('lda').value),
        psi_e: parseFloat(document.getElementById('psi_e').value),
        psi_t: parseFloat(document.getElementById('psi_t').value),
        psi_c: parseFloat(document.getElementById('psi_c').value),
        psi_r: parseFloat(document.getElementById('psi_r').value)
    };
    
    const json1 = JSON.stringify(data);

    console.log(json1); // Muestra los datos que se están enviando

    fetch('https://largodesarrollo.onrender.com/largodesarrollo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json1
    })
    .then(response => {
        console.log('Response:', response); // Muestra la respuesta completa
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        const resultElement = document.getElementById('l_d');
        resultElement.textContent = `Largo de desarrollo Ld = ${data.l_d} mm`;
        resultElement.classList.add('bold-text'); // Añade la clase 'bold-text'
    })
    .catch((error) => {
        console.error('Error:', error);
        const resultElement = document.getElementById('l_d');
        resultElement.textContent = `Error: ${error.message}`;
        resultElement.classList.add('bold-text'); // Añade la clase 'bold-text' en caso de error
    });
}

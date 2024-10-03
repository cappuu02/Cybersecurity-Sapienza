document.getElementById('submitButton').addEventListener('click', function() {
    const attackersValue = parseInt(document.getElementById('attackers').value);
    const systemValue = parseInt(document.getElementById('servers').value);
    const probability = parseFloat(document.getElementById('probability').value);

    generateCheckboxes(attackersValue);
    drawChart(attackersValue, systemValue, probability);
});

function generateCheckboxes(attackers) {
    const checkboxContainer = document.getElementById('checkboxContainer');
    checkboxContainer.innerHTML = '';

    for (let i = 0; i < attackers; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `attackerCheckbox${i}`;
        checkbox.checked = true;
        checkbox.addEventListener('change', () => {
            drawChart(
                parseInt(document.getElementById('attackers').value),
                parseInt(document.getElementById('servers').value),
                parseFloat(document.getElementById('probability').value)
            );
        });

        const label = document.createElement('label');
        label.htmlFor = `attackerCheckbox${i}`;
        label.innerText = `Attacker ${i + 1}`;

        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);

        checkboxContainer.appendChild(wrapper);
    }
}

function drawChart(attackers, systems, probability) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Pulisci il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna gli assi
    ctx.beginPath();
    ctx.moveTo(50, 30); // Punto di partenza dell'asse Y
    ctx.lineTo(50, canvas.height - 30); // Asse Y
    ctx.lineTo(canvas.width - 30, canvas.height - 30); // Asse X
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();

    // Aggiungi etichette agli assi
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText('Punteggio degli Hacker', canvas.width / 2 - 100, 20);
    ctx.fillText('Numero di Sistemi', canvas.width - 150, canvas.height - 10);

    // Array per registrare il punteggio di penetrazione di ogni aggressore
    const penetrationData = [];

    // Disegna le linee per ogni aggressore solo se la checkbox corrispondente è selezionata
    for (let i = 0; i < attackers; i++) {
        const checkbox = document.getElementById(`attackerCheckbox${i}`);
        if (checkbox && checkbox.checked) {
            ctx.beginPath();
            ctx.moveTo(50, canvas.height - 30); // Inizio della linea (0 sistemi hackerati)

            let yPosition = 0; // Inizia a zero per ogni aggressore

            // Simula i tentativi di penetrazione
            for (let j = 0; j < systems; j++) {
                // Genera un numero casuale e controlla se penetra
                const penetrated = Math.random() < probability;

                if (penetrated) {
                    yPosition += 1; // Incrementa se penetra
                }

                // Disegna la linea verticale
                const x = 50 + (j * (canvas.width - 100) / (systems - 1)); // Calcola la posizione X
                const y = canvas.height - 30 - (yPosition * (canvas.height - 60) / attackers); // Calcola la posizione Y

                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`; // Colore differente per ogni aggressore
            ctx.lineWidth = 2; // Spessore della linea
            ctx.stroke();
            ctx.closePath();

            penetrationData.push(yPosition); // Registra il punteggio di penetrazione
        }
    }

    // Disegna le etichette sull'asse X
    for (let j = 0; j < systems; j++) {
        const xLabel = 50 + (j * (canvas.width - 100) / (systems - 1)); // Calcola la posizione X
        ctx.fillText(j + 1, xLabel - 5, canvas.height - 10); // Disegna il numero del sistema
    }

    // Determina il numero massimo di sistemi hackerati
    const maxBreaches = Math.max(...penetrationData);
    const numberOfIntervals = 10; 
    const intervalHeight = (canvas.height - 60) / numberOfIntervals; // Altezza di ciascun intervallo

    // Disegna le linee orizzontali per gli intervalli
    for (let i = 0; i <= numberOfIntervals; i++) {
        const y = canvas.height - 30 - (i * intervalHeight); // Calcola la posizione Y
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(canvas.width - 30, y);
        ctx.strokeStyle = '#cccccc'; // Colore delle linee degli intervalli
        ctx.stroke();
        ctx.closePath();

        // Aggiungi etichette per gli intervalli
        const labelValue = Math.round((maxBreaches / numberOfIntervals) * i); // Calcola il valore dell'etichetta
        ctx.fillText(labelValue, 10, y + 5); // Disegna il valore dell'etichetta
    }
}


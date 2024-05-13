function getComparisonData() {
    const region1 = document.getElementById('region1').value.trim().toLowerCase();
    const region2 = document.getElementById('region2').value.trim().toLowerCase();

    if (!region1 || !region2) {
        alert('Por favor ingrese dos regiones para comparar.');
        return;
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const region1Data = data.filter(entry => entry.region.toLowerCase() === region1);
            const region2Data = data.filter(entry => entry.region.toLowerCase() === region2);

            if (region1Data.length === 0 || region2Data.length === 0) {
                alert('No se encontraron datos para las regiones especificadas.');
                return;
            }

            const dates = region1Data[0].dates.map(dateEntry => dateEntry.date);
            const region1Confirmed = region1Data[0].dates.map(dateEntry => dateEntry.confirmed);
            const region2Confirmed = region2Data[0].dates.map(dateEntry => dateEntry.confirmed);

            renderComparisonChart(dates, region1Confirmed, region2Confirmed);
        })
        .catch(error => console.error('Error al cargar datos:', error));
}

function renderComparisonChart(dates, region1Data, region2Data) {
    const ctx = document.getElementById('comparisonChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Casos Confirmados - Región 1',
                    data: region1Data,
                    borderColor: 'blue',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Casos Confirmados - Región 2',
                    data: region2Data,
                    borderColor: 'red',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Comparación de Casos Confirmados entre Región 1 y Región 2'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Fecha'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Casos Confirmados'
                    }
                }]
            }
        }
    });
}

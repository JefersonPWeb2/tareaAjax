function generateExcludingChart() {
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            const regionsExcluding = Object.keys(data).filter(region => region !== 'Lima' && region !== 'Callao');
            const dates = [];
            const confirmadosPorDia = [];
            regionsExcluding.forEach(region => {
                const regionData = data[region];                
                regionData.forEach((item, index) => {
                    const confirmedToday = index === 0 ? parseInt(item.value) : parseInt(item.value) - parseInt(regionData[index - 1].value);
                    if (confirmedToday >= 0) {
                        dates.push(item.date);
                        confirmadosPorDia.push(confirmedToday);
                    }
                });
            });
            const ctx = document.getElementById('excludingChart').getContext('2d');
            const excludingChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Confirmados por día (excluyendo Lima y Callao)',
                            data: confirmadosPorDia,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Crecimiento de Confirmados por Día (excluyendo Lima y Callao)'
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
                                labelString: 'Confirmados por Día'
                            }
                        }]
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
}

export const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue 2020',
      fill: true,
      lineTension: 0.1,
      backgroundColor: '#f00',
      borderColor: '#777',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0, 1000000, 2002000, 3000000, 2000000, 3000000, 4000000, 4500000],
    },
    {
      label: 'Revenue 2021',
      fill: true,
      lineTension: 0.1,
      backgroundColor: ['#f00', '#ff0', '#fa0', '#f0f', '#a00', '#f40', '#faf'],
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        199990,
        1000000,
        5002000,
        3000000,
        2000000,
        3000000,
        4000000,
        4500000,
      ],
    },
  ],
}

export const chartOption = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          },
        },
      },
    ],
  },
}

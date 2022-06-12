export const chartData = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      label: 'รง.8 2564',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,1)',
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
      data: [50, 100, 220, 300, 200, 300, 350, 320, 450, 460, 480, 530],
    },
    {
      label: 'รง.8 2565',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(120,200,250,1)',
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
      data: [50, 100, 300, 350, 200, 300, 400, 420, 430, 480, 500, 620],
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

export const donutData = {
  labels: ['Chrome', 'IE', 'FireFox', 'Safari', 'Opera', 'Navigator'],
  datasets: [
    {
      data: [700, 500, 400, 600, 300, 100],
      backgroundColor: [
        '#f56954',
        '#00a65a',
        '#f39c12',
        '#00c0ef',
        '#3c8dbc',
        '#d2d6de',
      ],
    },
  ],
}
export const donutOption = {
  maintainAspectRatio: false,
  responsive: true,
}

export const pieOption = {
  maintainAspectRatio: false,
  responsive: true,
}

export const stackedBarChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
}

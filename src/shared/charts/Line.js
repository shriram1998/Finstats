import React from 'react';
import Chart from 'chart.js/auto';
import { COLORS } from './Utils';
export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }
  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          // title: {
          //   display: true,
          //   font: { family: 'sans-serif', size: 20, weight: 'bold' },
          //   text: 'Account value over time'
          // },
          legend: {
            labels: {
              boxWidth: 10,
              font: { family: 'sans-serif', size: 14 },
              pointStyle: 'circle',
              textAlign: 'left',
              usePointStyle: true,
            }
          }
        },
          scales: {
              y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  min:0
              },
          }
    },
      data: {
        labels: this.props.label,
          datasets: [
              {
                  label:"Total Investment",
                  data:this.props.value,
                  borderColor:Object.values(Object.entries(COLORS)[0]),
                  backgroundColor:Object.values(Object.entries(COLORS)[0])
              }
          ]
      }
    });
  }

  render() {
    return <canvas ref={this.chartRef}/>;
  }
}
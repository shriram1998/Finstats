import React from 'react';
import Chart from 'chart.js/auto';
import { CHART_COLORS } from './Utils';
export default class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    // console.log(Chart.helpers);
    let legend = this.props.legend;
    this.myChart = new Chart(this.chartRef.current, {
      type: 'doughnut',
      options: {
        responsive: false,
        maintainAspectRatio:false,
        cutout: "65%",
        radius: "100%",
        animation: { animateRotate: false,animateScale:true },
        plugins: {
          title: {
                align:'center',
                display: true,
                text: this.props.title,
                font: { family: 'sans-serif', size: 20, weight: 'normal' },
                padding: {bottom: 0 }
                },
          legend: {
            position: 'bottom',
            align:'start',
            labels: {
              boxWidth: 10,
              font: { family: 'sans-serif', size: 14 },
              pointStyle: 'circle',
              textAlign: 'left',
              usePointStyle:true,
              generateLabels:function(chart) {
                var data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map(function(label, i) {
                    var ds = data.datasets[0];
                    // var sum = ds.data.reduce((a, b) => a + b, 0);
                      return {
                        text: legend[i]+"     ",
                        fillStyle: ds.backgroundColor[i],
                        hidden: false,
                        index: i,
                        lineWidth: 2,
                        strokeStyle: "#fff"
                    };
                  });
                }
                return [];
              }
            }
          }
        }
      },
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [{
          data: this.props.data.map(d => d.value),
          backgroundColor:  Object.values(CHART_COLORS)
        }]
      }
    });
  }

  render() {
    return <canvas ref={this.chartRef}/>;
  }
}
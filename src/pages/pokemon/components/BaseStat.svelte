<script>
  import { onMount } from 'svelte';
  import ApexCharts from 'apexcharts';
  export let pokemon;

  onMount(() => {
    createBaseStatChart();
  });

  function createBaseStatChart() {
    if (pokemon.stats) {
      const seriesValue = [];
      const seriesPercentage = [];
      const labels = [];
      if (Array.isArray(pokemon.stats)) {
        pokemon.stats.map((item) => {
          seriesValue.push(item.base_stat);
          seriesPercentage.push((item.base_stat / 255) * 100);
          labels.push(item.stat.name);
        });
      }

      const options = {
        series: seriesPercentage,
        chart: {
          width: 600,
          height: 390,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              },
            },
          },
        },
        colors: ['#FF5959', '#F5AC78', '#FAE078', '#9DB7F5', '#A7DB8D', '#FA92B2'],
        labels: labels,
        legend: {
          show: true,
          floating: true,
          fontSize: '14px',
          position: 'left',
          offsetX: 30,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0,
          },
          formatter: function (seriesName, opts) {
            return `${seriesName}: ${seriesValue[opts.seriesIndex]}`;
          },
          itemMargin: {
            vertical: 3,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
      };

      const chart = new ApexCharts(document.querySelector('#base-stat-chart'), options);
      chart.render();
    }
  }
</script>

<div id="base-stat-chart" />

<style type="text/scss">
  #base-stat-chart {
    position: absolute;
    top: 0;
    left: 300px;
  }
</style>

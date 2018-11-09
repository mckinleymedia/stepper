export default {
  margin: {
    top: 60,
    right: 140,
    bottom: 70,
    left: 90
  },
  xScale: {
    type: 'linear',
    min: 'auto',
    max: 'auto'
  },
  yScale: {
    type: 'linear',
    min: 'auto',
    max: 'auto'
  },
  axisTop: null,
  axisRight: null,
  axisBottom: {
    orient: 'bottom',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'weight',
    legendPosition: 'middle',
    legendOffset: 46
  },
  axisLeft: {
    orient: 'left',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'size',
    legendPosition: 'middle',
    legendOffset: -60
  },
  enableGridX: false,
  enableGridY: false,
  animate: true,
  motionStiffness: 90,
  motionDamping: 15,
  useMesh: true,
  colors: ['#AA3A42', '#C86B44', '#3D8657', '#4197C2'],
  legends: [
    {
      anchor: 'bottom-right',
      direction: 'row',
      translateX: 130,
      itemWidth: 100,
      itemHeight: 12,
      itemsSpacing: 5,
      itemTextColor: '#999',
      symbolSize: 12,
      symbolShape: 'circle',
      effects: [
        {
          on: 'hover',
          style: {
            itemTextColor: '#000'
          }
        }
      ]
    }
  ]
};

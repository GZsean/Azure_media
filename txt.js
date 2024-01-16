<div class="container">
    <div class="header">Devices and Browsers</div>
    <div class="chartWrapper">
      <div class="chartBox">
        <div class="chartTitle">xxxx</div>
        <divclass="chartSubTitle"> 0000</divclass>
        <div class="pieChart">
          <div class="chart-container"></div>
        </div>
      </div>
      <div class="chartBox">
        <div class="chartTitle">xxx1</div>
        <divclass="chartSubTitle"> 0000</divclass>
        <div class="pieChart">
          <div class="chart-container"></div>
        </div>
      </div>
      <div class="chartBox">
        <div class="chartTitle">xxxx2</div>
        <divclass="chartSubTitle"> 00001</divclass>
        <div class="pieChart">
          <div class="chart-container"></div>
        </div>
      </div>
    </div>
  </div>





.container{
  witdh:100%;
  height:500px;
  padding: 20px;
}
.header {
  margin: 30px 20px;
}
.chartWrapper{
  display: flex;
  justify-content: space-between;
  padding:40px;
}
.chartBox{
  box-sizing:border-box;
  min-width:200px;
  flex:1;
  padding: 20px;
}
.chart-container{
  min-height: 300px;
}



option = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
    show:false
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    show:false,
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

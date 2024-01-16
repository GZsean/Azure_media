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

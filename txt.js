[...(new Set(a.map(n => Number.isNaN(n)? NaN : JSON.stringify(n))))].map(n => Number.isNaN(n) ? NaN: (n？JSON.parse(n):n) )




var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false
});
var app = {};

const apiResponse = {
  colour: "#ff0000",
  elementType: "logon",
  children: [
    {
      criticalJourney: null,
      elementType: "cn-cbsa-hbcn-is-cust-ind-iden-cm-id",
      elementCount: null,
      colour: "#26EF2E",
      oneMinuteElementCount: "0",
      oneHourElementCount: "0",
      previous: "Logon",
      branchId: null,
      children: [
        {
          criticalJourney: null,
          elementType: "cm-gateway",
          elementCount: null,
          colour: "#FF0000",
          oneMinuteElementCount: "32",
          oneHourElementCount: "2496",
          previous: "cn-cbsa-hbcn-is-cust-ind-iden-cm-id",
          branchId: null,
          children: []
        }
      ]
    },
    {
      criticalJourney: null,
      elementType: "cn-cbsa-hbcn-is-cust-ind-iden-cm-id1",
      elementCount: null,
      colour: "#26EF2E",
      oneMinuteElementCount: "0",
      oneHourElementCount: "0",
      previous: "Logon",
      branchId: null,
      children: [
        {
          criticalJourney: null,
          elementType: "cm-gateway",
          elementCount: null,
          colour: "#FF0000",
          oneMinuteElementCount: "32",
          oneHourElementCount: "2496",
          previous: "cn-cbsa-hbcn-is-cust-ind-iden-cm-id1",
          branchId: null,
          children: []
        }
      ]
    },
    {
      criticalJourney: null,
      elementType: "cn-cbsa-hbcn-is-shr-srv-eb-prof-cm-id",
      elementCount: null,
      colour: "#FF0000",
      oneMinuteElementCount: "3",
      oneHourElementCount: "148",
      previous: "Logon",
      branchId: null,
      children: [
        {
          criticalJourney: null,
          elementType: "cm-gateway",
          elementCount: null,
          colour: "#FF0000",
          oneMinuteElementCount: "32",
          oneHourElementCount: "2496",
          previous: "cn-cbsa-hbcn-is-shr-srv-eb-prof-cm-id",
          branchId: null,
          children: []
        }
      ]
    }
  ]
};
function removeDuplicates(data) {
    const seen = new Set();
    return data.filter(item => {
        if (seen.has(item.name)) {
            return false;
        } else {
            seen.add(item.name);
            return true;
        }
    });
}

function generateGraphData(apiData) {
  const nodes = [];
  const links = [];
  const baseX = 200;
  const baseY = 200;
  const yIncrement = 100;

  function processElement(element, x, y) {
    debugger
    const nodeName = element.elementType.replace(/”/g, '"');
    nodes.push({
      name: nodeName,
      x: x,
      y: y,
      symbolSize: 20,
      itemStyle: {
        color: element.colour.replace(/”/g, '"')
      }
    });

    if (element.children.length !== 0) {
      element.children.forEach((child, index) => {
        const childX = x + baseX;
        const childY = y + index * yIncrement;
        processElement(child, childX, childY);
        links.push({
          source: nodeName,
          target: child.elementType.replace(/”/g, '"')
        });
      });
    }
  }

  processElement(apiData, 0, baseY);

  return { nodes, links };
}

const graphData = generateGraphData(apiResponse);
console.log(graphData);


const nodesData = removeDuplicates(graphData.nodes),


option = {
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove"
  },
  series: [
    {
      type: "graph",
      layout: "none",
      symbolSize: 50,
      roam: true,
      label: {
        show: true,
        position: "left"
      },
      data: nodesData,
      links: graphData.links,
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0
      }
    }
  ]
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);













//////remove///////




var nodes = [
    { name: 'Log on', x: 0, y: 300, symbolSize: 20, itemStyle: { color: '#ff4500' } },
    { name: 'OIL1', x: 200, y: 200, symbolSize: 20, itemStyle: { color: '#32cd32' } },
    { name: 'OIL2', x: 200, y: 300, symbolSize: 20, itemStyle: { color: '#32cd32' } },
    { name: 'OIL3', x: 200, y: 400, symbolSize: 20, itemStyle: { color: '#32cd32' } },
    { name: 'CM1', x: 400, y: 200, symbolSize: 20, itemStyle: { color: '#ff4500' } },
    { name: 'CM2', x: 400, y: 300, symbolSize: 20, itemStyle: { color: '#32cd32' } },
    { name: 'CM3', x: 400, y: 400, symbolSize: 20, itemStyle: { color: '#32cd32' } },
    { name: 'OPP', x: 600, y: 300, symbolSize: 20, itemStyle: { color: '#32cd32' } }
];

var links = [
    { source: 'Log on', target: 'OIL1' },
    { source: 'Log on', target: 'OIL2' },
    { source: 'Log on', target: 'OIL3' },
    { source: 'OIL1', target: 'CM1' },
    { source: 'OIL2', target: 'CM2' },
    { source: 'OIL3', target: 'CM3' },
    { source: 'CM1', target: 'OPP' },
    { source: 'CM2', target: 'OPP' },
    { source: 'CM3', target: 'OPP' }
];

var option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                label: {
                    show: true,
                    position: 'left'
                },
                data: nodes,
                links: links,
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        ]
    };

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);

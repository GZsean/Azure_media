[...(new Set(a.map(n => Number.isNaN(n)? NaN : JSON.stringify(n))))].map(n => Number.isNaN(n) ? NaN: (n？JSON.parse(n):n) )

// table----------------

import React, { useRef, useState, useEffect } from 'react';
import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Checkbox } from 'antd';
import Highlighter from 'react-highlight-words';
const filterList = {
  option1: ['Apple1', 'Pear1', 'Orange1'],
  option2: ['Apple2', 'Pear2', 'Orange2'],
};
const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
];
const dataSource2 = [
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  }
]
const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <div>
          <Checkbox.Group
            options={filters.option1}
            value={selectedKeys}
            onChange={(values) => setSelectedKeys(values)}
          />
          </div>
          <Button
            type="primary"
            onClick={() => fetchData(dataSource2)}
            size="small"
            style={{ marginTop: 8 }}
          >
            OK
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Checkbox.Group
            options={filters.option2}
            value={selectedKeys}
            onChange={(values) => setSelectedKeys(values)}
          />
          <Button
            type="primary"
            onClick={() => fetchData(dataSource2)}
            size="small"
            style={{ marginTop: 8 }}
          >
            OK
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.name.includes(value),
    },
  ];

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async (data) => {
    //SelectedKeys value logic
    setLoading(true);
    try {
      if(data){
        setData(data)
      }else{
        setData(dataSource);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = () => {
    //此处call筛选项
    const result = filterList;
    setFilters(result);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      onHeaderRow={(columns) => {
        if (filters) {
          console.log('1d');
          fetchFilterOptions();
        }
      }}
    />
  );
};
export default App;











//table-----------------


//---------latest----------------
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
          elementType: "cm-gateway1",
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
  
  const totalHeight = (apiData.children.length - 1) * yIncrement;
  const rootY = baseY + totalHeight / 2;

  function processElement(element, x, y) {
    const nodeName = element.elementType;
    nodes.push({
      name: nodeName,
      x: x,
      y: y,
      symbolSize: 20,
      itemStyle: {
        color: element.colour
      }
    });

    if (element.children.length !== 0) {
      const childrenCount = element.children.length;
      const childYStart = y - ((childrenCount - 1) * yIncrement) / 2;

      element.children.forEach((child, index) => {
        const childX = x + baseX;
        const childY = childYStart + index * yIncrement;
        processElement(child, childX, childY);
        links.push({
          source: nodeName,
          target: child.elementType
        });
      });
    }
  }

  processElement(apiData, 0, rootY);

  return { nodes, links };
}

const graphData = generateGraphData(apiResponse);

const nodesData = removeDuplicates(graphData.nodes);

const option = {
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




////v2////////

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

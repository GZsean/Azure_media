[...(new Set(a.map(n => Number.isNaN(n)? NaN : JSON.stringify(n))))].map(n => Number.isNaN(n) ? NaN: (n？JSON.parse(n):n) )




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

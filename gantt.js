'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const GanttChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        let chart = null;

        if (chartRef.current) {
            chart = echarts.getInstanceByDom(chartRef.current) || echarts.init(chartRef.current);
            
            const categories = [];
            const series = [];
            let categoryIndex = 0;

            const startTime = new Date('2024-01-08T20:00').getTime();
            const endTime = new Date('2024-01-09T11:00').getTime();

            data.forEach((group) => {
                categories.push({ name: group.name, level: 0, isParent: true });

                group.tasks.forEach((task) => {
                    categories.push({ name: task.name, level: 1, isParent: false });
                    const subCategoryIndex = categoryIndex + 1;
                    
                    series.push({
                        type: 'custom',
                        renderItem: (params, api) => {
                            const start = api.coord([api.value(1), subCategoryIndex]);
                            const end = api.coord([api.value(2), subCategoryIndex]);
                            const height = api.size([0, 1])[1] * 0.6;

                            return {
                                type: 'rect',
                                shape: {
                                    x: start[0],
                                    y: start[1] - height / 2,
                                    width: end[0] - start[0],
                                    height: height,
                                },
                                style: {
                                    fill: task.color,
                                    stroke: '#000',
                                    lineWidth: 1,
                                },
                            };
                        },
                        encode: {
                            x: [1, 2],
                            y: 0,
                        },
                        data: task.phases.map((phase) => [
                            subCategoryIndex,
                            new Date(phase.start).getTime(),
                            new Date(phase.end).getTime(),
                        ]),
                    });
                    
                    if (task.milestones) {
                        task.milestones.forEach((milestone) => {
                            series.push({
                                type: 'scatter',
                                data: [[subCategoryIndex, new Date(milestone.time).getTime()]],
                                symbol: 'circle',
                                symbolSize: 10,
                                itemStyle: { color: 'red' },
                            });
                        });
                    }
                });

                categoryIndex += 1 + group.tasks.length;
            });
            
            const option = {
                tooltip: {
                    formatter: (params) => {
                        if (params.seriesType === 'scatter') {
                            return '关键点';
                        }
                        const start = new Date(params.value[1]).toLocaleString();
                        const end = new Date(params.value[2]).toLocaleString();
                        return `${params.seriesName}<br/>开始: ${start}<br/>结束: ${end}`;
                    },
                },
                grid: {
                    containLabel: true,
                    left: 150,
                    right: 50,
                    top: 50,
                    bottom: 10,
                },
                xAxis: {
                    type: 'time',
                    position: 'top',
                    min: startTime,
                    max: endTime,
                    axisLabel: {
                        formatter: '{HH}:{mm}',
                    },
                    splitLine: { show: true },
                },
                yAxis: {
                    type: 'category',
                    data: categories.map((item) =>
                        item.isParent
                            ? `{bold|${item.name}}`
                            : `   ${item.name}`
                    ),
                    axisLabel: {
                        align: 'left',
                        margin: 10,
                        rich: {
                            bold: { fontWeight: 'bold' },
                        },
                    },
                    splitLine: { show: false },
                },
                series: series,
            };

            chart.setOption(option);
            window.addEventListener('resize', () => chart.resize());

            return () => {
                chart.dispose();
            };
        }
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
};

export default GanttChart;




'use client';

import React from 'react';
import GanttChart from "@/components/Gantt/GanttChart";


const GanttPage = () => {
    const ganttData = [
        {
            name: 'CDMS',
            tasks: [
                {
                    name: 'RB Batch',
                    phases: [
                        { start: '2024-01-08T20:00', end: '2024-01-08T23:00' },
                    ],
                    color: '#3498db',
                },
            ],
        },
        {
            name: 'MCA', 
            tasks: [
                {
                    name: 'CL Batch',
                    phases: [
                        { start: '2024-01-08T22:00', end: '2024-01-09T01:00' },
                    ],
                    color: '#f1c40f',
                },
                {
                    name: 'DM_CL',
                    phases: [
                        { start: '2024-01-09T03:00', end: '2024-01-09T05:00' },
                    ],
                    color: '#2ecc71',
                },
            ],
        },
    ];

    return (
        <div>
            <h1 className="text-xl font-bold mb-4 text-center">甘特图</h1>
            <GanttChart data={ganttData} />
        </div>
    );
};

export default GanttPage;

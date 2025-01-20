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
                });

                categoryIndex += 1 + group.tasks.length;
            });

            // Reverse the categories for the desired order
            categories.reverse();

            // Map original indices to reversed indices
            const categoryMap = new Map();
            categories.forEach((item, index) => {
                categoryMap.set(item.name, index);
            });

            // Rebuild the series with updated subCategoryIndex
            data.forEach((group) => {
                group.tasks.forEach((task) => {
                    const subCategoryIndex = categoryMap.get(task.name);

                    series.push({
                        type: 'custom',
                        name:'',
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
                                    fill: api.value(3),
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
                            phase.color,
                            phase.text,
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
            });

            const option = {
                tooltip: {
                    formatter: (params) => {
                        if (params.seriesType === 'scatter') {
                            return '';
                        }
                        const start = new Date(params.value[1]).toLocaleString();
                        const end = new Date(params.value[2]).toLocaleString();
                        return `${params.value[4]? params.value[4]:''}${params.seriesName}<br/>end: ${start}<br/>end: ${end}`;
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
                            ? `{bold|${item.name}}                           `
                            : `${item.name}`
                    ),
                    axisLabel: {
                        align: 'right',
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

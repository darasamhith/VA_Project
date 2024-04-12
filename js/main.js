let data, barchart, scatterPlot;

d3.csv('data/VA_dataset.csv').then(_data => {
    const keys = ['critic_score', 'total_sales', 'na_sales' , 'jp_sales' , 'pal_sales' , 'other_sales'];
    data = _data.filter(d => {
        return Object.values(d).every(value => value !== 'NA')
    }).map(d => {
        keys.forEach(key => {
            d[key] = +d[key];
        });
        return d;
    });
    // Todos
    let salesByConsole = d3.rollup(data, v => d3.sum(v, d => d.total_sales), d => d.console);
    let aggregatedDataforBarChart = Array.from(salesByConsole, ([console, totalSales]) => ({ console, totalSales }));
    const colorScaleforBarChart = d3.scaleOrdinal(d3.schemeCategory10);
    const genres = Array.from(new Set(data.map(d => d.genre)));
    const colorScaleforScatterPlot = d3.scaleOrdinal(d3.schemeCategory10).domain(genres);

    barchart = new BarChart({parentElement: '#barchart'}, aggregatedDataforBarChart, colorScaleforBarChart);
    barchart.updateVis();

    scatterPlot = new ScatterPlot({parentElement: '#scatterplot'}, data, colorScaleforScatterPlot);
    scatterPlot.updateVis();
})
.catch(error => console.error(error));

// Todos
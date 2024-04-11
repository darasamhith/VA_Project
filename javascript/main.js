
let data, barchart, parallelCoordinates;

d3.csv('data/VA_dataset.csv').then(_data => {
    data = _data;
    // const keys = ['culmen_length_mm', 'culmen_depth_mm', 'flipper_length_mm', 'body_mass_g'];
     
    // Todos
    const colorScale = d3.scaleOrdinal()
    .domain(["Chinstrap", "Adelie", "Gentoo"])
    .range(["orange", "gray", "brown"]); // Example colors, you can change them
    const barDiv = document.getElementById('barChart')
    const lineDiv = document.getElementById('lineChart')
    const bubbleDiv = document.getElementById('bubbleChart')
    // barchart = new BarChart(barDiv, data, colorScale);
    // lineChart_var = new lineChart(lineDiv, data, colorScale);
    bubbleChart_var = new bubbleChart(bubbleDiv, data, colorScale);
    // parallelCoordinates = new ParallelCoordinates(parDiv, data, colorScale);

    // barchart.updateVis();
    // barchart.chart.selectAll('.bar')
    // .on('mouseover', function(event, d) {
    //     // Highlight corresponding species class in parallel coordinates
    //     parallelCoordinates.chart.selectAll(`.line.${d[0]}`).style('stroke-opacity', 1);
    //     d3.select(this).attr('stroke', 'black') 
    //             .attr('stroke-width', 2); 
        
    // }).on('mouseout', function(event, d) {
    //     // Highlight corresponding species class in parallel coordinates
    //     parallelCoordinates.chart.selectAll(`.line.${d[0]}`).style('stroke-opacity', 0.5);
    //     d3.select(this)
    //         .attr('stroke', 'none') 
    //         .attr('stroke-width', '0');
        
    // })
    // .on('click', function(event, d) {
    //     // Highlight corresponding species class in parallel coordinates
    //     const clickedLine = d3.select(this);
    //     const isHighlighted = clickedLine.attr('stroke') === 'black';
    //     const isdisplayed = parallelCoordinates.chart.selectAll(`.line`).style('stroke-opacity') == 0;
    //     const isclass = parallelCoordinates.chart.selectAll(`.line.${d[0]}`).style('stroke-opacity') == 1;
    //     parallelCoordinates.chart.selectAll(`.line`).style('stroke-opacity', isdisplayed ? 0.5 : 0 );
    //     parallelCoordinates.chart.selectAll(`.line.${d[0]}`).style('stroke-opacity', isclass? 0.5 : 1);
    //     clickedLine.attr('stroke', isHighlighted ? 'none' : 'black')
    //     .attr('stroke-width', isHighlighted ? 0 : 2);
        
    // })

    // parallelCoordinates.updateVis();



})
.catch(error => console.error(error));

// Todos
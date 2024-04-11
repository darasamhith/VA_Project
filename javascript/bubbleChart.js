
class bubbleChart {
    
    /**
     * class constructor with basic chart configuration
     * @param {Object} _config 
     * @param {Array} _data 
     * @param {d3.Scale} _colorScale 
     */
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 1000,
            containerHeight: _config.containerHeight || 540,
            margin: _config.margin || {top: 5, right: 5, bottom: 20, left: 50}
        };
        this.data = _data;
        // this.colorScale = _colorScale;
        this.initVis();
    }
    
    /**
     * this function is used to initialize scales/axes and append static elements
     */
    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3.select(vis.config.parentElement)
            .append('svg')
            .attr("class", "bubble")
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        const totalSalesByGenre = d3.rollup(
                vis.data,
                v => d3.sum(v, d => d.total_sales), // Calculate the sum of total sales for each genre
                d => d.genre // Group by the genre attribute
            );
        console.log(totalSalesByGenre)
        const sales = Array.from(totalSalesByGenre, ([genre, totalSales]) => ({ genre, totalSales }));

        console.log(this.data)
        const color = d3.scaleOrdinal(d3.schemeSet3);


    const size = d3.scaleLinear()
    .domain([0, d3.max(totalSalesByGenre, d => d[1])])
    .range([30, 80]); // Adjust as needed



    const simulation = d3.forceSimulation(sales)
        .force("x", d3.forceX().strength(0.05))
        .force("y", d3.forceY().strength(0.05))
        // .force("collide", d3.forceCollide().radius(d => size(d.totalSales) + 1))
        .force("collide", d3.forceCollide(d => size(d.totalSales) + 1))
        .stop();

    // Run the simulation for a fixed number of iterations
    for (let i = 0; i < 120; ++i) simulation.tick();

    // Draw the bubbles
    const bubbles = vis.svg.selectAll(".bubble")
        .data(sales)
        .enter().append("circle")
        .attr("class", "bubble")
        .attr("cx", d => vis.config.containerWidth/2+d.x)
        .attr("cy", d => vis.config.containerHeight/2+d.y)
        .attr("r", d => size(d.totalSales))
        .style("fill", d => color(d.genre));

        function wrap(text, width) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+|-/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    x= parseFloat(text.attr("x")),
                    y = parseFloat(text.attr("y")), // Parse the initial y position
                    dy = -1,
                    tspan = text.text(null).append("tspan").attr("x",x ).attr("y", y).attr("dy", dy + "em");
                    console.log(x,y,dy)
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }

                }
            });
        }


    const labels = vis.svg.selectAll(".label")
        .data(sales)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => vis.config.containerWidth/2+d.x)
        .attr("y", d => vis.config.containerHeight/2+d.y)
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        // .style("fill", "black")
        .text(d => d.genre)
        .call(wrap, 0);
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0.5);
    bubbles.on("mouseover", function(event, d) {
        console.log(d)
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(d.genre + "<br/>" + "Total Sales: " + d.totalSales)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
            d3.select(this)
            .attr("r", d => size(d.totalSales) * 1.2)
            .style("fill", "orange");
        simulation.force("collide").strength(0.2);
        simulation.alpha(0.5).restart();
        })
        .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        d3.select(this)
            .attr("r", d => size(d.totalSales))
            .style("fill",d=> color(d.genre));
        });

    // Set up the force simulation
d3.forceSimulation(sales)
    .force("x", d3.forceX().strength(0.05))
    .force("y", d3.forceY().strength(0.05))
    .force("collide", d3.forceCollide(d => size(d.totalSales) + 1))
    .stop();

// Run the simulation for a fixed number of iterations
    for (let i = 0; i < 120; ++i) simulation.tick();


    const legend = vis.svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(20, 20)");

const legendItems = legend.selectAll(".legend-item")
    .data(color.domain())
    .enter().append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => "translate(0," + i * 20 + ")");

legendItems.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", color);

legendItems.append("text")
    .attr("x", 20)
    .attr("y", 5)
    .attr("dy", ".35em")
    .text(d => d);

          

}
}
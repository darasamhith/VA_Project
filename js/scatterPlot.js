class ScatterPlot {
    
    /**
     * class constructor with basic chart configuration
     * @param {Object} _config 
     * @param {Array} _data 
     * @param {d3.Scale} _colorScale 
     */
    constructor(_config, _data, _colorScale) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 1000,
            containerHeight: _config.containerHeight || 1000,
            margin: _config.margin || {top: 5, right: 5, bottom: 20, left: 50}
        };
        this.data = _data;
        this.colorScale = _colorScale;
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
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);
        
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        vis.xScale = d3.scaleLinear()
            .range([0, vis.width]);
        
        vis.yScale = d3.scaleLinear()
            .range([0, vis.height]); 

        vis.xAxis = d3.axisBottom(vis.xScale)
            .ticks((10 - d3.min(vis.data, d => d.critic_score)) / 0.1);

        vis.yAxis = d3.axisLeft(vis.yScale);

        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);

        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');

        
        vis.updateVis();
    }

    /**
     * this function is used to prepare the data and update the scales before we render the actual vis
     */
    updateVis() {
        let vis = this;

        // Todos
        vis.xScale.domain(d3.extent(vis.data, d => d.critic_score));
        vis.yScale.domain([d3.max(vis.data, d => d.total_sales), 0]);

        vis.renderVis();
    }

    /**
     * this function contains the d3 code for binding data to visual elements
     */
    renderVis() {
        let vis = this;

        // Todos
        let dots = vis.chart.selectAll('.dot')
            .data(vis.data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('r', 3.5)
            .attr('cx', d => vis.xScale(d.critic_score))
            .attr('cy', d => {
                const y = vis.yScale(d.total_sales);
                return isNaN(y) ? 0 : y; // Prevent setting NaN
              })
            .style('fill', d => vis.colorScale(d.genre));
        

        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    }
}
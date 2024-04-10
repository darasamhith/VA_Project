/**
 * Assignment name: Lab 6 - parallel coordinates
 * First name: 
 * Last name:
 * Student ID:
*/
class ParallelCoordinates {
    
    /**
     * class constructor with basic chart configuration
     * @param {Object} _config 
     * @param {Array} _data 
     * @param {d3.Scale} _colorScale 
     */
    constructor(_config, _data, _colorScale) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 500,
            margin: _config.margin || {top: 25, right: 20, bottom: 20, left: 35}
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

        // Todo: initialize scales and axes

        // Todo: append axis groups

        // Todo: append axis titles (each axis should contain 1 title)

    }

    /**
     * this function is used to prepare the data and update the scales before we render the actual vis
     */
    updateVis() {
        let vis = this;

        // Todo

        vis.renderVis();
    }

    /**
     * this function contains the d3 code for binding data visual elements
     */
    renderVis() {
        let vis = this;

        // Todo
    }
}
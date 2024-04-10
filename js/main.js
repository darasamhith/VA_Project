let data, barchart, parallelCoordinates;

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


})
.catch(error => console.error(error));

// Todos
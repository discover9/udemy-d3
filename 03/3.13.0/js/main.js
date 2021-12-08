/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const MARGIN = { LEFT: 60, RIGHT: 60, TOP: 20, BOTTOM: 60 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 600 - MARGIN.TOP - MARGIN.BOTTOM;

const g = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    .append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

d3.csv("data/revenues.csv").then(data => {
    data.forEach(d => {
        console.log(d)
        d.revenue = Number(d.revenue);
        d.profit = Number(d.profit);
    });

    const x = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([0, WIDTH])
        .paddingInner(0.3)
        .paddingOuter(0.2)

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.revenue)])
        .range([0, HEIGHT])

    const xAxisCall = d3.axisBottom(x)

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxisCall)
        .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")

    const yAxisCall = d3.axisLeft(y)

    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall)

    const revenues = g.selectAll("rect")
        .data(data);
    // const profits = g.selectAll("rect") 
    //     .data(data)

    revenues.enter().append("rect")
        .attr("y", 0)
        .attr("x", (d, i) => x(d.month))
        .attr("width", x.bandwidth)
        .attr("height", d => y(d.revenue))
        .attr("fill", "grey");

    // profits.enter().append("rect")
    //     .attr("y", 0)
    //     .attr("x", (d, i) => (i * 60))
    //     .attr("width", 40)
    //     .attr("height", d => d.profit)
    //     .attr("fill", "grey")

}).catch(error => {
    console.log(error)
})


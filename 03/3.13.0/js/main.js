/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const MARGIN = { LEFT: 100, RIGHT: 60, TOP: 20, BOTTOM: 150 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 600 - MARGIN.TOP - MARGIN.BOTTOM;

const svg = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    
const g = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X Label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 110)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Months")

// Y Label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Revenue")

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
        .range([HEIGHT, 0])

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
      .tickFormat(d => "$" + d)

    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall)

    const revenues = g.selectAll("rect")
        .data(data);

    revenues.enter().append("rect")
        .attr("y", d => y(d.revenue))
        .attr("x", (d, i) => x(d.month))
        .attr("width", x.bandwidth)
        .attr("height", d => HEIGHT - y(d.revenue))
        .attr("fill", "grey");

}).catch(error => {
    console.log(error)
})


/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("data/buildings.json").then(data => {
  console.log(data)
  data.forEach(element => {
      element.height = Number(element.height)
  });

const svg = d3.select("#chart-area").append("svg")
.attr("width", 400)
.attr("height", 400)

const rects = svg.selectAll("rect")
  .data(data)

rects.enter().append("rect")
  .attr("x", (element, index) => (index*75)+10)
  .attr("y", 5)
  .attr("width", 50)
  .attr("height", (element) => element.height)
  .attr("fill", "grey")

}).catch(error => {
console.log(error)
})
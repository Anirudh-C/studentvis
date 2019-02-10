var data = [{"program":"iMTech","count": 250},{"program":"MTech","count": 500},{"program":"MSc","count":60}];

// Configuration Variables
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 540 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// Scales
var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.4);
var x = d3.scaleLinear()
    .range([0, width]);
var color = d3.scaleOrdinal(d3.schemeCategory10);

// DOM Selector
var svg = d3.select(".graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("display","block")
    .style("margin","auto")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Format the data
data.forEach(function(d) {
    d.count = +d.count;
});

// Scale the range of the data in the domains
x.domain([0, d3.max(data, function(d){ return d.count; })])
y.domain(data.map(function(d) { return d.program; }));
color.domain(data.map(function(d) { return d.program; }));

// Append the bars
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("width", function(d) {return x(d.count); } )
    .attr("y", function(d) { return y(d.program); })
    .attr("height", y.bandwidth())
    .style("fill", function(d) { return color(d.program); });

// Axes
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
svg.append("g")
    .call(d3.axisLeft(y));

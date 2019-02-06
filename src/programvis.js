var data = [
    {program: "iMTech", count: 300},
    {program: "MTech", count: 500},
    {program: "MSc DigiSoc", count: 200}
];

// Configuration Variables
var width = 540;
var height = 300;
var padding = {
    left : 50,
    right : 50,
    top : 30,
    bottom : 50
};

var barWidth = 20;
var barSeparation = 30;

// Objects related to visualisation
// DOM Selector
var svg = d3.select(".graph").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block")
    .style("margin", "auto");

// Scales
var colorScale = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(data.map(x => x.program));
var heightScale = d3.scaleOrdinal()
    .domain(data.map(x => x.program))
    .range(d3.range(height - barWidth - padding.bottom ,padding.top,-barSeparation));
var countScale = d3.scaleLinear()
    .domain(d3.extent(data, function (d) { return d.count; }))
    .rangeRound([0,width - padding.right]);

// Axes
var xAxis = d3.axisBottom(countScale)
    .tickFormat(function(d) { return d.count; });
var yAxis = d3.axisLeft(heightScale)
    .tickFormat(function(d) { return d.program; });

function render(data) {
    var rects = svg.selectAll("rect").data(data);

    // Render Data
    rects.enter().append("rect")
        .attr("x", padding.left)
        .attr("y", function (d) { return heightScale(d.program); })
        .attr("fill", function (d) { return colorScale(d.program); })
        .attr("width", function (d) { return countScale(d.count) + padding.left; })
        .attr("height", 20);

    // Render Axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom + barWidth/2) + ")")
        .call(d3.axisBottom(countScale));
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .call(d3.axisLeft(heightScale));
}

render(data);

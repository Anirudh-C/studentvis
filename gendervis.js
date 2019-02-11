var data = [
    {"program":"iMTech", "male": 78, "female": 22},
    {"program":"MTech", "male": 82, "female": 18},
    {"program":"MSc", "male": 56, "female": 44},
    {"program":"PhD", "male": 43, "female": 57}
];

// Configuration Variables
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 540 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var totalCount = data[0].count + data[1].count;

// DOM Selector
var svg = d3.select('.graph').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("display", "block")
    .style("margin", "auto")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define the div for the tooltip
var div = d3.select(".graph").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Scales
var y = d3.scaleBand()
    .range([height,0])
    .padding(0.4);
var xmale = d3.scaleLinear()
    .range([0, width/2]);
var xfemale = d3.scaleLinear()
    .range([width/2, 0]);

// Scale the range of the datat in the domains
xmale.domain([0, d3.max(data, function(d){ return d.male; })]);
xfemale.domain([0, d3.max(data, function(d){ return d.female; })]);
y.domain(data.map(function(d) { return d.program; }));

// Append the male bars
svg.selectAll(".mbar")
    .data(data)
    .enter().append("rect")
    .attr("class", "mbar")
    .attr("width", function(d) { return xmale(d.male); })
    .attr("x", width/2)
    .attr("y", function(d) { return y(d.program); })
    .attr("height", y.bandwidth())
    .style("fill", "#1f77b4")
    .on("mouseover", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
        div.html(d.program + "<br/>" + "Male " + d.male + "%")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });

// Append the female bars
svg.selectAll(".fbar")
    .data(data)
    .enter().append("rect")
    .attr("class", "fbar")
    .attr("width", function(d) { return xfemale(0) - xfemale(d.female); })
    .attr("x", function(d) { return xfemale(d.female); })
    .attr("y", function(d) { return y(d.program); })
    .attr("height", y.bandwidth())
    .style("fill", "#d62728")
    .on("mouseover", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
        div.html(d.program + "<br/>" + "Female " + d.female + "%")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 36) + "px");
    })
    .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });

// Axes
var maleAxis = svg.append("g")
    .attr("transform", "translate(" + width/2 + "," + height + ")")
    .call(d3.axisBottom(xmale));
var femaleAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xfemale));

maleAxis.selectAll("line").remove();
femaleAxis.selectAll("line").remove();

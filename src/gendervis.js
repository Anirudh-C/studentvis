var data = [
    {name: 'boys', count: 56},
    {name: 'girls', count: 43}
];

// Configuration Variables
var boyColour = "#00abff";
var girlColour = "#f665e2";

var width = 540,
    height = 540,
    radius = 200;

// Objects related to visualisation
var totalCount = data[0].count + data[1].count;

// Circular objects in D3
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(100);

var pie = d3.pie()
    .sort(null)
    .value(function(d) {
	return d.count;
    });

// DOM Selector
var svg = d3.select('.graph').append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block")
    .style("margin", "auto")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

function render(data) {
    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g");

    g.append("path")
        .attr("d", arc)
    .style("stroke","#282a36")
        .style("stroke-dasharray", "2,2")
        .style("fill", function(d,i) {
      	    if(d.data.name === "boys")
                return boyColour;
            return girlColour;
        });

    g.append("text")
        .attr("transform", function(d) {
            var _d = arc.centroid(d);
            _d[0] *= 1.5;
            _d[1] *= 1.5;
            return "translate(" + _d + ")";
        })
        .attr("dy", ".75em")
        .style("text-anchor", "middle")
        .style("fill", "#6272a4")
        .text(function(d) {
            var percentage = (d.data.count/totalCount)*100;
            percentage *= 10;
            percentage = Math.round(percentage);
            percentage /= 10;
            return percentage+'%';
        });

    g.append("text")
        .attr("text-anchor", "middle")
        .attr('font-size', '4em')
        .style("fill","#6272a4")
        .attr('y', 20)
        .text(totalCount);
}

render(data);

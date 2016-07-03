/**
 * Created by theresa on 24.06.16.
 */
function hist(data, div, label) {
    var hist = {
        data:data,
        div:div,
        label:label
    };
    hist["init"] = function () {
        var values = this.data;
        var margin = {top: 10, right: 30, bottom: 50, left: 30},
            width = 200 - margin.left - margin.right,
            height = 150 - margin.top - margin.bottom;
        if(this.label=="Length"){
            var x = d3.scale.linear()
            .domain([0, 5000])
            .range([0, width]);
        }
        else{
            var x = d3.scale.linear()
            .domain([0, 100])
            .range([0, width]);
        }

// Generate a histogram using twenty uniformly-spaced bins.
        var data = d3.layout.histogram()
            .bins(x.ticks(20))
            (values);

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function (d) {
                return d.y;
            })])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .ticks(5)
            .scale(x)
            .orient("bottom");

        var svg = d3.select("#"+this.div).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class","hist")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function (d) {
                return "translate(" + x(d.x) + "," + y(d.y) + ")";
            });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", x(data[0].dx) - 1)
            .attr("height", function (d) {
                return height - y(d.y);
            });
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        svg.append("text")
            .attr("transform", "translate("+0.5*width+"," + (height+25) + ")")
            .attr("text-anchor","middle")
            .text(this.label)
    };
    return hist;
}
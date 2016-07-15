/**
 * Created by theresa on 23.06.16.
 */
function slider(div) {
    var slide = {
        div: div
    };
    slide["init"] = function (start, end) {
        var margin = {top: 10, right: 50, bottom: 20, left: 50},
            width = 960 - margin.left - margin.right,
            height = 50 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, 100]);


        var brush = d3.svg.brush()
            .x(x)
            .extent([start, end])
            .on("brushstart", brushstart)
            .on("brush", brushmove)
            .on("brushend", brushend);

        var arc = d3.svg.arc()
            .outerRadius(height / 2)
            .startAngle(0)
            .endAngle(function (d, i) {
                return i ? -Math.PI : Math.PI;
            });

        var svg = d3.select(div).append("svg")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 960 400")
            .classed("svg-content-responsive", true)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.select("#slider")
            .classed("svg-container", true);


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.svg.axis().scale(x).orient("top").tickSize(0));


        var brushg = svg.append("g")
            .attr("class", "brush")
            .call(brush);


        brushg.selectAll("rect")
            .attr("height", height);

        brushstart();
        brushmove();

        function brushstart() {
            svg.classed("selecting", true);
        }

        function brushmove() {
            var s = brush.extent();
            callOtherPlots();
            d3.selectAll("#currentRange1").attr("value", (Math.round(s[0] * 100) / 100));
            d3.selectAll("#currentRange2").attr("value", (Math.round(s[1] * 100) / 100));
        }

        function brushend() {
            var s = brush.extent();
            var randomSet = extractRandom(subset, subsetsize);
            //Call complicated Plots here
            // // Parallel coordinates
            parallel.update(randomSet);
            //Scatter plot
            scatter.update(randomSet);
            tbl.update(subset);
            svg.classed("selecting", !d3.event.target.empty());
        }

        function callOtherPlots() {
            /**
             * Call Plots here or add a seperate button
             */
            var s = brush.extent();
            subset = extractSubset(s);

            var keys = d3.keys(d3.values(subset)[0]);
            keys.splice(keys.indexOf("Primary_Accession"), 1);
            d3.selectAll(".hists").remove();
            for (var key in keys) {
                var values = extractFeature(subset, keys[key]);
                var histogramm = hist(values, "#hist", keys[key], key);
                histogramm.init()
            }
        }
    };

    return slide
}

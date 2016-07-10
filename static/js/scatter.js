/**
 * Created by matze on 27.06.16.
 */
function scatter_plot(data,div) {
    var scatter = {
		data:data,
        div:div
    };
    scatter["init"] = function () {
		var data = [];
		for(key in this.data) {
			data.push(this.data[key])
		}
		var size = 200,
			padding = 50;

		var x = d3.scale.linear()
			.range([padding / 2, size - padding / 2]);

		var y = d3.scale.linear()
			.range([size - padding / 2, padding / 2]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(6);

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(6);

		var domainByTrait = {},
			traits = d3.keys(d3.values(data)[0]).filter(function(d) { return d !== "Primary_Accession"; });
			n = traits.length;

		traits.forEach(function(trait) {
			if(trait == "Uncertainty" || trait == "Length")
				domainByTrait[trait] = d3.extent(extractFeature(data, trait))
			else
				domainByTrait[trait] = [0,100];
		});

		xAxis.tickSize(size * n);
		yAxis.tickSize(-size * n);

		var svg = d3.select(div).append("svg")
		  .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "0 0 " + (size*n+padding) + " " + (size*n+padding) + "")
          .classed("svg-content-responsive", true)
		.append("g")
		  .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

		d3.select(div)
        	.classed("svg-container", true);

		svg.selectAll(".x.axis")
		  .data(traits)
		.enter().append("g")
		  .attr("class", "x axis")
		  .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
		  .each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis); });

		svg.selectAll(".y.axis")
		  .data(traits)
		.enter().append("g")
		  .attr("class", "y axis")
		  .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
		  .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

		var cell = svg.selectAll(".cell")
		  .data(cross(traits, traits))
		.enter().append("g")
		  .attr("class", "cell")
		  .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
		  .each(plot);

		// Titles for the diagonal.
		cell.filter(function(d) { return d.i === d.j; }).append("text")
		  .attr("x", padding)
		  .attr("y", padding)
		  .attr("dy", ".71em")
		  .text(function(d) { return d.x; });

		function plot(p) {
			var cell = d3.select(this);

			x.domain(domainByTrait[p.x]);
			y.domain(domainByTrait[p.y]);

			cell.append("rect")
				.attr("class", "frame")
				.attr("x", padding / 2)
				.attr("y", padding / 2)
				.attr("width", size - padding)
				.attr("height", size - padding);

			cell.selectAll("circle")
				.data(data.filter(function(d) { if ((!isNaN(x(d[p.x]))) && (!isNaN(y(d[p.y])))) return d; }))
			  .enter().append("circle")
				.attr("cx", function(d) { return x(d[p.x]); })
				.attr("cy", function(d) { return y(d[p.y]); })
				.attr("r", 3);
		}

		function cross(a, b) {
			var c = [], n = a.length, m = b.length, i, j;
			for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
			return c;
		}
    };
	scatter["update"]=function (newData) {
		d3.selectAll(div).selectAll("svg").remove();
		this.data=newData;
		this.init();

	};
	
    return scatter
}

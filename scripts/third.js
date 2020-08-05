function chart3(){
  var svg = d3.select("#svg3")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  svg.append('text')
      .attr('transform', `translate(${width/2},${height + margin.top - 10})`)
      .attr('id', 'x-label')
      .text('Disease');
  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('dx', '-17em')
      .attr('dy', '-3.0em')
      .text("Number of Deaths");

  var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
  var y = d3.scaleLinear()
    .range([height, 0]);

  var myColor = d3.scaleSequential().domain([1,10])
    .interpolator(d3.interpolateViridis);

  x.domain(chart3_data.map(function(d) { return d.label; }));
  y.domain([0, 700000]);

  svg.selectAll(".bar")
    .data(chart3_data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.label);
        })
    .attr("y", function(d) {
        return y(0);
      })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
        return height - y(0);
      })
    .attr("fill", function(d, i) {return myColor(i)})
    .on("mouseover", function(d) {
      div.transition()
        .duration(250)
        .style("opacity", .9);
      div.html("Disease: " + d.disease + "<br> Deaths " + d.deaths)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      div.transition()
        .duration(400)
        .style("opacity", 0);
    })

  svg.selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", function(d) {
      return y(d.deaths)
    })
    .attr("height", function(d) {
      return height - y(d.deaths)
    })
    .delay(function(d,i){console.log(i) ; return(i*100)})

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));
}

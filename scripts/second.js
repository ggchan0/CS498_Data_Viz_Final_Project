function getRadioValC2() {
  var ele = document.getElementsByName('gender-c2');
  if (ele[0].checked) {
    return "Male";
  } else {
    return "Female";
  }
}

function chart2() {
  var gender = getRadioValC2();

  var year_range = ["1999-2000", "2001-2002", "2003-2004", "2005-2006", "2007-2008", "2009-2010", "2011-2012", "2013-2014", "2015-2016", "2017-2018"]

  var graph_vals = chart2_data.map(function(obj) {
    var o = []
    var i = 0
    for (const [key, value] of Object.entries(obj)) {
      if (year_range.includes(key)) {
        if (value != "") {
          o.push({"year" : key, "value": value, category: obj.group + ", " + obj.demographic})
        }
      }
      i++;
    }
    var type = "";

    if (obj.demographic.includes("Men") || obj.demographic.includes("Boys")) {
      type = "Male";
    } else {
      type = "Female";
    }

    return {
      category: obj.group + ", " + obj.demographic,
      type: type,
      values: o
    }
  }).filter(function(obj) {
    return obj.type == gender;
  })

  var x = d3.scaleBand().domain(year_range)
    .range([0, width]);

  var y = d3.scaleLinear().domain([0, 60])
    .range([height, 0]);

  var xAxis = d3.axisBottom(x)
    .tickSizeOuter(0)
    .tickSizeInner(-height)

  var yAxis = d3.axisLeft(y)
    .ticks(10, "s")
    .tickSize(-width)

  var color_domain = graph_vals.map(function(v) { return v.category })

  var myColor = d3.scaleOrdinal().domain(graph_vals.map(function(v) { return v.category })).range(d3.schemeSet2)

  var svg = d3.select('#svg2')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('text')
      .attr('transform', `translate(${width/2},${height + margin.top - 10})`)
      .attr('id', 'x-label')
      .text('Years');

  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('dx', '-17em')
      .attr('dy', '-2.5em')
      .text('Percentage Obese');


  var line = d3.line()
    .x(function(d) { return x(d.year) + x.bandwidth() / 2 })
    .y(function(d) { return y(d.value) })
  svg.selectAll("myLines")
    .data(graph_vals)
    .enter()
    .append("path")
      .attr("d", function(d){ console.log(line(d.values)); return line(d.values) } )
      .attr("stroke", function(d) { return myColor(d.category) })
      .style("stroke-width", 4)
      .style("fill", "none")

  svg.selectAll("myDots")
    .data(graph_vals)
    .enter()
      .append('g')
      .style("fill", function(d){ return myColor(d.category) })
    .selectAll("myPoints")
    .data(function(d){ return d.values })
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.year) + x.bandwidth() / 2} )
      .attr("cy", function(d) { return y(d.value) } )
      .attr("r", 5)
      .attr("stroke", "white")
    .on("mouseover", function(d) {
      d3.select(this).attr({
        fill: "orange",
        r: 10
      });
      div.transition()
        .duration(250)
        .style("opacity", .9);
      div.html("Category: " + d.category + "<br> Year " + d.year + "<br>Value " + d.value.toPrecision(3) + "%")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      console.log(this)

    })
    .on("mouseout", function(d) {
      d3.select(this).attr({
        fill: myColor(d.category),
        r: 5
      });
      div.transition()
        .duration(400)
        .style("opacity", 0);
    })

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));
}

function updateSecondChart() {
  d3.select('#svg2').remove();
  d3.select(".chart2").append("svg").attr("id","svg2");
  console.log("updating")
  chart2();
}

function chart1() {
  var svg = d3.select('#svg1')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('text')
      .attr('transform', `translate(${width/2},${height + margin.top - 10})`)
      .attr('id', 'x-label')
      .text('Demographic');

  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('dx', '-17em')
      .attr('dy', '-2.5em')
      .text('Percentage Obese');

  var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
  var y = d3.scaleLinear()
    .range([height, 0]);

  var myColor = d3.scaleSequential().domain([1,8])
    .interpolator(d3.interpolateViridis);

  data = [
    {
      "category": "Youth",
      "value": 18.5,
      "male": 19.1,
      "female": 17.8
    },
    {
      "category": "Adults 20-39",
      "value": 40,
      "male": 40.3,
      "female": 39.7
    },
    {
      "category": "Adults 40-59",
      "value": 44.8,
      "male": 46.4,
      "female": 43.3
    },
    {
      "category": "Adults 60+",
      "value": 42.8,
      "male": 42.2,
      "female": 43.3
    },
    {
      "category": "Asian",
      "value": 17.4,
      "male": 17.5,
      "female": 17.2
    },
    {
      "category": "Black",
      "value": 49.6,
      "male": 41.1,
      "female": 56.9
    },
    {
      "category": "Hispanic",
      "value": 44.8,
      "male": 45.7,
      "female": 43.7
    },
    {
      "category": "White",
      "value": 42.2,
      "male": 44.7,
      "female": 39.8
    }
  ]

  x.domain(data.map(function(d) { return d.category; }));
  y.domain([0, 60]);
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.category);
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
      var v = 0
      if (getRadioVal() == ("Male")) {
        v = d.male
      } else {
        v = d.female
      }
      div.transition()
        .duration(250)
        .style("opacity", .9);
      div.html("Category: " + d.category + " " + getRadioVal() + "<br> Value " + v.toPrecision(3) + "%")
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
      if (getRadioVal() == "Male") {
        return y(d.male)
      } else {
        return y(d.female)
      }
    })
    .attr("height", function(d) {
      if (getRadioVal() == ("Male")) {
        return height - y(d.male)
      } else {
        return height - y(d.female)
      }
    })
    .delay(function(d,i){console.log(i) ; return(i*100)})

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));
}

function updateFirstChart() {
  d3.select('#svg1').remove();
  d3.select(".chart1").append("svg").attr("id","svg1");
  chart1();
}

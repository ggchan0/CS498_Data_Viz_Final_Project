var slideIndex = 1;
var height = 400
var width = 600
var margin = {top: 50, right: 20, bottom: 50, left: 60};
var data = {};

new fullpage('#fullpage', {
	//options here
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
	autoScrolling:true,
	scrollHorizontally: true,
  sectionsColor: ['#f4f5f6'],
  autoScrolling: true,
  fitToSection: true,
  scrollOverflow: true,
  slidesNavigation: true,
  slidesNavPosition: 'bottom',
  afterSlideLoad: function(section, origin, destination, direction) {
    if (destination.index == 2) {
      chart1();
    } else if (destination.index == 3) {
      chart2();
    } else if (destination.index == 4) {
      chart3();
    }
  }
});

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

function getRadioVal() {
  var ele = document.getElementsByName('gender-c1');
  if (ele[0].checked) {
    return "Male";
  } else {
    return "Female";
  }
}

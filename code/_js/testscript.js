// Creating the Matrix and Map. You still don't understand this too well
// Go over tutorial again and get it into your head!!

d3.csv('_data/philosophers.csv', function (error, data) {
	var mpr = chordMpr(data)

	mpr
		.addValuesToMap('philosopher')
		.setFilter(function (row,a,b) {
			return (row.has === a.name && row.prefers === b.name)
		})
		.setAccessor(function (recs, a, b) {
			if (!recs[0]) return 0;
			return +recs[0].count;
		});
	drawChords(mpr.getMatrix(), mpr.getMap());
});


// Draw the Chord Diagram

function drawChords (matrix, mmap) {
	var w = 980;
	var h = 800;
	var r1 = h/2;
	var r0 = r1-100;

	var fill = d3.scale.ordinal()
		.domain(d3.range(19))
        .range(["#FF8E00","#FF8E00","#FF8E00","#FF8E00","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5A9800","#5A9800","#5A9800","#5A9800",]);

    var chord = d3.layout.chord()
    	.padding(.01)
    	.sortSubgroups(d3.descending)
    	.sortChords(d3.descending);

    var arc = d3.svg.arc()
    	.innerRadius(r0)
    	.outerRadius(r0 + 20);

    var svg = d3.select("body").append("svg:svg")
    	.attr("width",w)
    	.attr("height", h)
    	.append("svg:g")
    	.attr("id","circle")
    	.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    	svg. append("circle")
    		.attr("r", r0 + 20)

    var rdr = chordRdr(matrix, mmap);
    chord.matrix(matrix);
    

    var g = svg.selectAll("g.group")
        .data(chord.groups())
        .enter().append("svg:g")
        .attr("class","group")
        .on("mouseover", mouseover)
        .on("mouseout", fucntion (d) {} )
}


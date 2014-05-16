// Create matrix and map it (taken from tutorial)
      d3.csv('_data/correlation_data.csv', function (error, data) {
        var mpr = chordMpr(data);

        mpr
          .addValuesToMap('has')
          .setFilter(function (row, a, b) {
            return (row.has === a.name && row.prefers === b.name)
          })
          .setAccessor(function (recs, a, b) {
            if (!recs[0]) return 0;
            return +recs[0].count;
          });
        drawChords(mpr.getMatrix(), mpr.getMap());
      });

// Draw Chord Diagram
      function drawChords (matrix, mmap) {
        var w = 960, h = 750, r1 = h /2.3, r0 = r1 - 100;

        var fill = d3.scale.ordinal()
            .domain(d3.range(27))
            .range(['grey']);///"#FF8E00","#FF8E00","#FF8E00","#FF8E00","#FF8E00","#FF8E00", "#5C0DAC","#5C0DAC","#5A9800","#5A9800","#5A9800","#5A9800","#5A9800","#5A9800","#4D54D8","#4D54D8","#4D54D8","#4D54D8","#4D54D8","#4D54D8","#4D54D8"]);//,"#FF8E00","#FF8E00","#FF8E00","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5A9800","#5A9800","#5A9800","#5A9800",]);
        

        var fill2 = d3.scale.ordinal()
            .domain([0,1])
            .range(["grey","black"]);

        var chord = d3.layout.chord()
            .padding(.02)
            .sortSubgroups(d3.descending)
            .sortChords(d3.descending);

        var arc = d3.svg.arc()
            .innerRadius(r0)
            .outerRadius(r0 + 20);

        var svg = d3.select("#chord").append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("id", "circle")
            .attr("transform", "translate(" + 620 + "," + h / 2 + ")");

            svg.append("circle")
                .attr("r", r0 + 20);

        var rdr = chordRdr(matrix, mmap);
        chord.matrix(matrix);

        var g = svg.selectAll("g.group")
            .data(chord.groups())
          .enter().append("svg:g")
            .attr("class", "group")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);

        g.append("svg:path")
            .style("stroke", "black")
            .style("fill", function(d) { return fill(d.index); })
            .attr("d", arc);

        g.append("svg:text")
            .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
            .attr("dy", ".35em")
            .style("font-family", "helvetica, arial, sans-serif")
            .style("font-size", "10px")
            .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .attr("transform", function(d) {
              return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                  + "translate(" + (r0 + 26) + ")"
                  + (d.angle > Math.PI ? "rotate(180)" : "");
            })
            .text(function(d) { return rdr(d).gname; })
            .on("mouseover", function(){});

          var chordPaths = svg.selectAll("path.chord")
                .data(chord.chords())
                .enter().append("svg:path")
                .attr("class", "chord")
                .style("stroke", function(d) {
                  return d3.rgb(fill(d.target.index)).darker();
                })
                .style("fill", function(d) { return fill(d.target.index); })
                .attr("d", d3.svg.chord().radius(r0))


          function mouseover(d, i) {
            var connectedGroups = [i];

            chordPaths.classed("fade", function(p) {
              return p.source.index != i
                  && p.target.index != i;
            });
            // Testing this code. Not sure if it works
            chordPaths.style("fill", function(p) {
              if (p.source.value<1) {
                return 'red';
              } else {
                return fill(p.target.index);
              }
            });

            chordPaths.each(function(p) {
              if (p.source.index == i) {
                connectedGroups.push(p.target.index);
              } else if (p.target.index == i) {
                connectedGroups.push(p.source.index);
              }
            });

            g.classed("fade", function(data, index) {
              return connectedGroups.indexOf(index) === -1;
            });
          }


          function mouseout(d, i) {
            var connectedGroups = [i];

            chordPaths.each(function(p) {
              if (p.source.index == i) {
                connectedGroups.push(p.target.index);
              } else if (p.target.index == i) {
                connectedGroups.push(p.source.index);
              }
            });

            g.classed("fade", function(data, index) {
              return false;
            });
          }

          // function coloring() {
          //   chordPaths.each(function(p) {
          //     if (p.source.value < 0) {
          //       color = 'red'
          //     } else {
          //       color = 'grey'
          //     }
          //     return color
          //   });
          // }


      }

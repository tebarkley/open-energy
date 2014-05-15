/**
 * ABOUT THIS SCRIPT :
 * <p>
 * Creates a chord diagram based on a matrix:
 * for each row correspodning to an artist, a link
 * is established using the value of each column
 * corresponding to the other artists.
 * </p>
 * <p>
 * This script is based on a JavaScript program
 * by Michael Bostock (http://d3js.org/ and https://github.com/mbostock/d3),
 * which can be found at http://bl.ocks.org/4062006 . For more info on
 * chord diagrams: http://circos.ca/ .
 * </p>
 * 
 * <p>
 * This script is written by Joris Schelfaut. For more info
 * consult http://soundsuggest.wordpress.com/ .
 * </p>
 */

var width = 1000;
var height = 550;
//Simplt creating the svg elements and g elements
var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Out Dataset matrix
var matrix5x5 = [
    [0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
[0,0,1,0,1,1,0,1,1,0,0,1,0,0,0,1,1,1,0],
[0,0,0,0,1,1,0,1,1,1,0,1,0,0,0,1,1,1,1],
[1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],
[0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
[0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0],
[0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0],
[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

// Creating colors for each row in the matrix
var range5 = ["#FF8E00","#FF8E00","#FF8E00","#FF8E00","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5C0DAC","#5A9800","#5A9800","#5A9800","#5A9800",];

var range5_artists = ["Socrates", "Plato", "Aristotle", "Parmenides", "Descartes", "Kant", "Hume", "Locke","Spinoza", "Hobbes",  "Kierkegaard", "Nietzsche", "Frege", "Russell", "Wittgenstein", "St. Augustine", "St. Aquinas", "St. Anslem",  "Ockham"];


var chord = d3.layout.chord()
    // Specifies the padding between groups
        .padding(.05)
        //organizes it so that in each group, the subgroups are in descending order
        .sortSubgroups(d3.descending)
        .matrix(matrix5x5);

// scaling the rings. Taking the input(domain) and creating an output(range)
    // Constructs a new ordinal scale w/an empty domain and an empty range
var fill = d3.scale.ordinal() //Both and obj and a fcn
        // Set the input domain of ord scale to the spec array of values.
        .domain(d3.range(range5.length)) // create input domain 19--0-18?
        // Frist element in .domain will map to the first elements in range5
        .range(range5); // .range is good for categorical colors. rangePoint/Bands better for bar or scatter

//Creating the inner and outer radius but no color yet  
var innerRadius = Math.min(width, height) * .41;
var outerRadius = innerRadius * 1.05;


var textLabel = d3.scale.ordinal().range(range5_artists);

// each section on the annulate and adding some effects
svg.append("g") // g element is a container element for group together graphic elements--cicle, line, path, text
        .selectAll("path") // select all paths in g elements
        .data(chord.groups) //refers to groups in var chord
        .enter() // Creates new data-bound elements
        .append("path") // Takes place holder created by enter and adds a path
        // Fill sets the color inside the object
        .style("fill", function(d) {
            return fill(d.index);
        })
        // Stroke sets the color of the border of the object
        .style("stroke", function(d) {
            return fill(d.index);
        })
        // This creates the arc border
        .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
        .attr("id", function(d, i) {return "group-" + i;})
        .on("mouseover", fade(.07))
        .on("mouseout", fade(1));



svg.append("g").selectAll("text")
        .data(chord.groups)
        .enter()
        .append("sgv:text")
        .attr("x", 6)
        .attr("dy", -10)
        .append("svg:textPath")
        .style("font-family", "helvetica")
        .style("font-weight", "bold")
        .style("font-size", "14px")
        .style("writing-mode","tb-rl | tb")
        .attr("xlink:href", function(d, i){return "#group-" + i;})
        .text(function(d,i) {return textLabel(i+1);});
        



// Creating the chords
svg.append("g")
        // Creating a class attribute called "chord" to all g elements
        .attr("class", "chord")
        // Selects all the paths 
        .selectAll("path")
        // there is data stored in the layout object. Chord data objects are accessed by calling .chords() on chord layout
        // Each chord reps TWO values in the data matrix--two possible relationship between two grps
        // direction w/larger value is the source and the other is the target.
        .data(chord.chords)
        .enter()
        .append("path")
        .style("fill", function(d) { // d determines the shape of the path
            return fill(d.target.index);
        })
        .attr("d", d3.svg.chord().radius(innerRadius))
        .style("opacity", 1);



//Adding the text for artists at the top of the SVG canvas
/*svg.selectAll("text")
        .data(chord.groups)
        .enter()
        .append("text")
        .text(function(d) {
            return range5_artists[d.index];
        })
        .attr("x", function(d) {
            return -width / 2 + d.index * width / range5_artists.length;
        })
        .attr("y", function(d) {
            return  -height / 2 + 10;
        })
        .attr("font-size", "8px")
        .attr("font-weight", "bold")
        .attr("fill", function(d) {
            return  range5[d.index];
        })
        .on("mouseover", fade(.1))
        .on("mouseout", fade(1));*/

// Creating fades
function fade(opacity) {
    return function(g, i) {
        svg.selectAll("g.chord path")
                .filter(function(d) {
                    return d.source.index != i && d.target.index != i;
                })
                .transition()
                .style("opacity", opacity);
    };
}

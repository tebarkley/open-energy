$(function () {

$.get("_data/productionfile.csv", function (data) {
    // each row of the data
    var lines = data.split('#');
    // An array of each cell
    var words = [];

    //takes each line of the data, splits it up and adds it to an array
    $.each(lines, function(lineNo,line) {
        var item = line.split(',');
        words.push(item);
    });

   
    var states = [];
    var years = [];

    // Getting a list of years and states
    $.each(words, function(wordNo, word) {
        if (!(wordNo == 0)) {
            if ($.inArray(word[0], states) == -1) {
                states.push(word[0]);   
            }
            if ($.inArray(word[1], years) == -1) {
                years.push(word[1]);
            };
        }
    });
    

/*    var actualP = [];
    var budgetP = [];
    var aP = [];
    var bP = [];*/

    var p_renew = [];
    var p_ng = [];
    var p_coal = [];
    var p_nuclear = [];

    var pR = [];
    var pNG = [];
    var pC = [];
    var pN = [];
    var counter = 0;
/*    for (each in words) {
        aP.push[each[3]];
        bP.push[each[5]];
        counter +=1
        if (counter == 11) {
            actualP.push(aP);
            budgetP.push(bP);
            counter = 0;
            aP = [];
            bP = [];
        }
    } //End of for loop*/
    $.each(words,function(wordIndex, wordValue) {
        if (wordIndex == 0) {return;}
        pR.push(parseFloat(wordValue[2]));
        pNG.push(parseFloat(wordValue[3]));
        pC.push(parseFloat(wordValue[4]));
        pN.push(parseFloat(wordValue[5]));
        counter +=1
        if (counter == 12) {
            p_renew.push(pR);
            p_ng.push(pNG);
            p_coal.push(pC);
            p_nuclear.push(pN);
            counter = 0;
            pR = [];
            pNG = [];
            pC = [];
            pN = [];
        }
    });
    states.pop();
//graph of a departments monthly spending ==> object
//loop through departments with var i
    for (i in states) {
        //generate the object
            var graph = {
                title: {
                    text: states[i]
                },
                credits: {
                    enabled:false
                },
                xAxis: {
                    categories: years
                },
                yAxis: {
                    title: {
                        text: 'Thousand Megawatt Hrs'
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    borderWidth: 0
                },
                series: [
                    {
                        color: '#138900',
                        name: 'Renewables',
                        data: p_renew[i],
                        marker: {
                            enabled: false
                        }
                    },
                    {
                        color: '#7F7F7F',
                        name: 'Natural Gas',
                        data: p_ng[i],
                        marker: {
                            enabled: false
                        }
                    },
                    {
                        color: 'orange',
                        name: 'Coal',
                        data: p_coal[i],
                        marker: {
                            enabled: false
                        }
                    },
                    {
                        color: 'red',
                        name: 'Nuclear',
                        data: p_nuclear[i],
                        marker: {
                            enabled: false
                        }
                    },
                ]
            };//End of graph object
            $('<div class="charts"></div>').appendTo('#wrapper1').highcharts(graph); //Generates graph in new div
    }; //End of for loop

}); //End of Get fcn



});



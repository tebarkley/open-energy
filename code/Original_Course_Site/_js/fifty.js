$(function () {

$.get("_data/50_states.csv", function (data) {
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

    var p_all_sources = [];
    var sales_all = [];
    var revenue_all = [];
    var price_all = [];
    var exp_imp = [];

    var p_all = [];
    var sAll = [];
    var rAll = [];
    var pr_all = [];
    var eI = [];
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
        p_all.push(parseFloat(wordValue[2]));
        sAll.push(parseFloat(wordValue[3]));
        rAll.push(parseFloat(wordValue[4]));
        pr_all.push(parseFloat(wordValue[5]));
        eI.push(parseFloat(wordValue[6]));
        counter +=1
        if (counter == 12) {
            p_all_sources.push(p_all);
            sales_all.push(sAll);
            revenue_all.push(rAll);
            price_all.push(pr_all);
            exp_imp.push(eI);
            counter = 0;
            p_all = [];
            sAll = [];
            rAll = [];
            pr_all = [];
            eI = [];
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
                yAxis: [{
                        title: {
                            text: '% Difference from USA Mean'
                                }
                        },

                        {
                        title: {
                            text: 'Exp-Imp [GWh]'
                        },
                        labels: {
                            format: '{value}'
                        },
                        opposite: true
                        }],
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    borderWidth: 0
                },
                series: [
                    {
                        color: '#138900',
                        name: 'Production[GWh]',
                        data: p_all_sources[i],
                        marker: {
                            enabled: false
                        }
                    },
                    {
                        color: '#7F7F7F',
                        name: 'Sales[GWh]',
                        data: sales_all[i],
                        marker: {
                            enabled: false
                        }
                    },
                    {
                        color: 'orange',
                        name: 'Revenue[mil $]',
                        data: revenue_all[i],
                        yAxis: 1,
                        marker: {
                        enabled: false
                        }
                    },
                    {
                        color: 'red',
                        name: 'Price[mil $]',
                        data: price_all[i],
                        marker: {
                            enabled: false
                        }
                    },
                    {
                        color: 'blue',
                        name: 'Export-Import',
                        data: exp_imp[i],
                        marker: {
                            enabled: false
                        }
                    }
                ]
            };//End of graph object
            $('<div class="charts1"></div>').appendTo('#wrapper2').highcharts(graph); //Generates graph in new div
    }; //End of for loop

}); //End of Get fcn



});



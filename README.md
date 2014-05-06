open-energy
===========

Final Project for Open Data Class

Team members: Tiffany Barkley, Pablo Rosado, Paul Son, Peter Swigert

Our final report can be accessed at http://people.ischool.berkeley.edu/~pcson/OpenData/WebPage/.

The American electricity sector is constantly changing due to nationwide consumption trends, global price fluctuations and changing energy policies. We draw data from the Energy Information Agency (EIA) to understand the past decade of electricity production, consumption, transmission and sales across the US. We provide two main analyses of these variables: relationships across time, and relationships between different states. We analyze and visualize how different states have changed in their production, consumption, import and export of electricity, and how this has impacted consumers through electricity prices. We also visualize how different variables, from in-state production to cross-state transmission, are correlated over the past decade.

We began our project by wondering where our electricity came from here in Berkeley, how sources varied across regions of California and different utilities. We imagined building an interactive application that would allow users to compare their sources of electricity (such as coal, natural gas or solar power), their electricity consumption, and their average electricity price to other users across California and possibly the country. However, while some utilities offered features similar to this, they did not provide access to the backend data. We decided to transition to a more general exploration of electricity production, consumption, import/export, and sales across the United States when we discovered the EIA's API. This dataset contained 408,000 electricity series organized into 29,000 categories. While we were limited in our granularity (generally working on a state and year level) we were also able to explore larger trends over the past 10-15 years of electricity usage across all 50 states and in different sectors of the economy. While users wouldn't be able to understand how they may fit into the nationwide electricity industry as a consumer, they could investigate how their state's production and consumption patterns have changed over time, how this has impacted the price they pay for electricity, and how that compares to the rest of the country. As utilities are semi-public entities, we hope that in the future more energy and electricity data will be made open and available by providers so that it won't be necessary to rely on government aggregators like the Energy Information Agency.

Our primary data analysis occurred in IPython, and our master notebook can be accessed at https://github.com/tebarkley/open-energy/blob/master/code/master-energy-notebook-final.ipynb.

We found that a bulk data download was faster than repeatedly accessing the EIA API, and broke out individual work streams among team members for our initial explorations of production, sales/revenue, import/export and price. As we queried the large electricity dataset we used the Python pandas library to perform our primary statistical analyses, and used some IPython 2.0 widgets to visualize data within the notebook. We also applied Javascript's D3 library to better visualize relationships between variables.

It is difficult to identify specific results that we worked towards from such an expansive exploration of a large dataset. However, as we worked through the different variables we identified a few specific results that we found particularly surprising or which confirmed our assumptions. These included:

  -Interesting correlations between production and price. Total production and coal production were negatively correlated with price variables, suggesting that consumers in states which produce a lot of electricity, particularly coal, realize a financial benefit from that production. While coal production was positively correlated with most other sources of electricity production, it was negatively correlated with renewable production. Additionally, while renewable production was negatively correlated with price, nuclear production was positively correlated with price.
  
  -Regional patterns of price. Excluding Hawaii as an outlier, New England clearly had the highest residential electricity prices among regions of the country. California was the only state not in New England or the mid-Atlantic in the top ten of residential electricity prices.
  
  -Regional patters of production by source. While definitions of renewable electricity vary, we chose to include hydropower as a renewable and exclude nuclear. This led to the Pacific Northwest, led by Washington, to be a clear leader in renewable generation. In contrast, we were surpised that Illinois led the country in nuclear production.
  
  -Confirmation of limited renewables production across the US. As of 2012, Idaho had the highest proportion of its electricity generation by renewables, but this was just 10.38%. Washington, which generated a much higher total of electricity, was at 9.11%. Only 10 states had greater than 2%.

With such a large dataset and a goal of providing a platform to explore the data, our results were more exploratory than specific. However, reproducing our results is a relatively straightforward process. We drew our data specifically from the ELEC datafile of the EIA bulk download center to ensure that our data was consistent in structure. As noted, the code can be viewed in the IPython notebook linked above. The structure of our process was:

  -Identified raw data file location
  
  -Queried raw data as a JSON by keyword (generally through regular expressions) to pull specific series
  
  -Compiled  these query results into dictionaries and then dataframes
  
  -Consolidated  dataframes from different queries to a master dataframe, using state and year as indices
  
  -Analyzed from this master dataframe. This included creation of matplotlib visualizations of different series within the IPython Notebook, normalizing data by population, running correlations and regressions, selecting and analyzing specific years (typically 2012, the most recent year for which all series were available), and restructuring and exporting data to csv's for use in D3 visualizations

We are interested in continuing the project beyond the course, particularly as it provides an initial platform for more specific questions about electricity production. We aim to consolidate our different visualizations from IPython, D3 and Tableau into a more accessible framework in which users can better explore the analyses and filter through the layers of data (for instance, selecting a regression data point causes visualizations to filter or highlight on that series). As structured right now, our analysis is quite broad and piecemeal. By linking our analyses and visualizatons together we can help users answer the specific questions they may have.


Project Roles:
In the initial data analysis, Pablo focused on price and revenue, Tiffany on production, Paul on import/export, and Peter on consumption and sales. After building individual dataframes and identifying some initial patterns and relationships, we brought our work back together and built a consolidated dataframe with all of our key data structured together. From there, Tiffany and Pablo focused on statistical analyses of relationships, calculating regressions and correlations between variables like production of renewables and price. Pablo built some graphs and widgets inside of the IPython Notebook, and Tiffany coached the rest of the team in effective git and github usage. Paul and Peter focused on how to build a narrative and visualize this information, exporting dataframes to csvs and exploring the data within the Javascript D3 library.

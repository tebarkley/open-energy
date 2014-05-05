open-energy
===========

Final Project for Open Data Class

Team members: Tiffany Barkley, Pablo Rosado, Paul Son, Peter Swigert

a clear articulation of what problem you are solving with your project
a clear description of what you proposed to do and what you ended up doing, describing what led you to go from what you proposed to what you ended up doing
a thorough description of what is behind-the-scenes: what sources of data are you drawing from and how, how you are analyzing your data as well as the code to analyze your data.
a clear description of your results and how to reproduce your results.
if you were to continue your project beyond the course, what would you do
a paragraph that outlines how you split the work among group members and which describes your individual contributions to the work.


The American electricity sector is constantly changing due to nationwide consumption trends, global price fluctuations and changing energy policies. We draw data from the Energy Information Agency (EIA) to understand the past decade of electricity production, consumption, transmission and sales across the US. We provide two main analyses of these variables: relationships across time, and relationships between different states. We analyze and visualize how different states have changed in their production, consumption, import and export of electricity, and how this has impacted consumers through electricity prices. We also visualize how different variables, from in-state production to cross-state transmission, are correlated over the past decade.

We began our project by wondering where our electricity came from here in Berkeley, how sources varied across regions of California and different utilities. We imagined building an interactive application that would allow users to compare their sources of electricity (such as coal, natural gas or solar power), their electricity consumption, and their average electricity price to other users across California and possibly the country. However, while some utilities offered features similar to this, they did not provide access to the backend data. We decided to transition to a more general exploration of electricity production, consumption, import/export, and sales across the United States when we discovered the EIA's API. This dataset contained 408,000 electricity series organized into 29,000 categories. While we were limited in our granularity (generally working on a state and year level) we were also able to explore larger trends over the past 10-15 years of electricity usage across all 50 states and in different sectors of the economy. While users wouldn't be able to understand how they may fit into the nationwide electricity industry as a consumer, they could investigate how their state's production and consumption patterns have changed over time, how this has impacted the price they pay for electricity, and how that compares to the rest of the country.

Our primary data analysis occurred in IPython, and our master notebook can be accessed at http://nbviewer.ipython.org/github/tebarkley/open-energy/blob/master/code/master-energy-notebook.ipynb

We found that a bulk data download was faster than repeatedly accessing the EIA API, and broke out individual work streams among team members for our initial explorations of production, sales/revenue, import/export and price. As we queried the large electricity dataset and built 


We primarily use the pandas and matplotlib within IPython to explore and analyze the data, and also apply Javascript's D3 library to better visualize relationships between variables.

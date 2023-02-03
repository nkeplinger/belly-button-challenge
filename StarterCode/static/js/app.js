
const url= "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
// JSON DATA LOCATION "../samples.json"

//STEP 1: READ IN DATA VIA D3
d3.json('..data//samples.json').then(function(data) {
    console.log(data);
  });

// CODE CAN MAKE GRAPHS, but cannot get to select the testSubject ID to modify/specify each one by drop down value. 
//Needs to be some function for selecting whatever the drop down in for patint id and set to variable "testSubjectID" for plotting in functions below


// Create plots of data
function makePlots(testSubjectID) {
    data = d3.json('..data//samples.json').then(data => { 
        // get all three data for flot from sameles key in json (sample_values(in desc order), otu_ids, and otu,ladels) 
        var samples = data.samples
        //filter sample by test subject
        var SampleTestSubject = samples.filter(bacteriaInfo => bacteriaInfo.id == testSubjectID)[0]

        //get metadata 
        var metadata = data.metadata
        //filter by selected test subject
        var MetadataTestSubject = metadata.filter(bacteriaInfo => bacteriaInfo.id == testSubjectID)[0]

        
        // Use sample_values as the x values for the bar chart.
        var  sample_values = SampleTestSubject.sample_values;
        // Use otu_ids as the y labels for the bar chart.
        var  otu_ids = SampleTestSubject.otu_ids;
        // Use otu_labels as the hovertext for the chart.
        var  otu_labels = SampleTestSubject.otu_labels;

        //STEP 2: HORIZONTAL BARCHAT
        //horizontal bar chart Data
        var barData = [{
            type: 'bar',
            x: values.slice(0, 10),
            y: labels.slice(0, 10),
            text: hovertext.slice(0, 10),
            orientation: 'h'
        }];
        //horizontal bar chart layout
        var barLayout = {
            title: 'Top 10 OTUs in Belly Button Samples'
        };
        //Plot horizontal bar chart 
          Plotly.newPlot("bar", barData, barLayout);
        })

        //STEP 3: BUBBLE CHART
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                // Use otu_ids for the marker colors
                color: otu_ids,
                // Use sample_values for the marker size
                size: sample_values,
            }
        }];
        // Bubble chart layout 
        var bubbleLayout = {
            title: "Entire Belly Button Sample",
        };
        // Display plot
        Plotly.newPlot('bubble', bubbleData, bubbleLayout)
};


//Step 4&5 can define metadata, but cannot figure out how to properly display it
function displayMetaData(testSubjectID){
    var metadatabox = d3.select("#sample-metadata");
    
    data = d3.json('..data//samples.json').then(data => { 
        //get metadata 
        var metadata = data.metadata
        //filter by selected test subject
        var MetadataTestSubject = metadata.filter(bacteriaInfo => bacteriaInfo.id == testSubjectID)[0]

        


    })
};


    
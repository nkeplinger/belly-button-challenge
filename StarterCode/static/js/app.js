const url= "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
// JSON DATA LOCATION "../samples.json"

//STEP 1: READ IN DATA VIA D3
d3.json(url).then(function(data) {
    console.log(data);
  });

// CODE CAN MAKE GRAPHS, but cannot get to select the testSubject ID to modify/specify each one by drop down value. 
//Needs to be some function for selecting whatever the drop down in for patint id and set to variable "sampleId" for plotting in functions below


// Create plots of data
function makePlots(sampleId) {
    let data = d3.json(url).then((data => { 
        // get all three data for flot from sameles key in json (sample_values(in desc order), otu_ids, and otu,ladels) 
        var samples = data.samples
        //filter sample by test subject
        var SampleTestSubject = samples.filter(Samples => Samples.id == sampleId)[0]

        //get metadata 
        var metadata = data.metadata
        //filter by selected test subject
        var MetadataTestSubject = metadata.filter(Samples => Samples.id == sampleId)[0]

        
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
            x: sample_values.slice(0, 10),
            y: otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`),
            text: otu_labels.slice(0, 10),
            orientation: 'h'
        }];
        //horizontal bar chart layout
        var barLayout = {
            title: 'Top 10 OTUs in Belly Button Samples'
        };
        //Plot horizontal bar chart 
          Plotly.newPlot("bar", barData, barLayout);
        //)

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
    }))
};   



//Step 4&5 can define metadata, but cannot figure out how to properly display it

function displayMetaData(sampleId) {

    var demoInfo = d3.select('#sample-metadata')

    d3.json(url).then(data => {
        var metadata = data.metadata
        var MetadataTestSubject = metadata.filter(Samples  => Samples.id == sampleId)[0]

        console.log(MetadataTestSubject)
        Object.entries(MetadataTestSubject).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key}: ${value}`)
        })
    })
}

function optionChanged(sampleId) {
    console.log(sampleId);
    makePlots(sampleId);
    displayMetaData(sampleId);
}

function initDashboard() {
    let dropdown = d3.select("#selDataset")
    var data = d3.json(url).then(data =>{
        var sampleId = data.names;
        sampleId.forEach(sampleId => {
            dropdown.append("option").text(sampleId).property("value", sampleId)
        })

        //make fluid selections
        //makePlots(sampleId[0]);
        //displayMetaData(sampleId[0]);

        //make stagnant selections
        makePlots('940');
        displayMetaData('940');
    });
};

initDashboard();

    
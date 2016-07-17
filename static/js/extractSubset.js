/**
 * Created by theresa on 23.06.16.
 */
/**
 * extracts the a subset of the data in a certain range of uncertainty
 * @param range
 * @returns {subset}
 */
function extractSubset(range){
    var lower=range[0];
    var higher=range[1];
    var dist=lower-higher;
    if(range[0]>=range[1]){
        lower=range[1];
        higher=range[0];
    }
    var subset=[];
    for(var key in dataset){
        if(dataset[key]["Uncertainty"]>=lower && dataset[key]["Uncertainty"]<=higher && dataset[key]["Length"]<=6000){
            if(dist!=0){
                subset.push(dataset[key])
            }
            else{
                var topush=[];
                for(var k in dataset[key]) {
                    if(k!="Uncertainty"){
                        topush[k]=dataset[key][k]
                    }
                }
                subset.push(topush)
            }
        }
    }
    return subset
}
/**
 * extracts a random subset
 * @param subset
 * @param number of entries
 * @returns {Array}
 */
function extractRandom(subset,number){
    var randomIndices=[];
    var randomSubset=[];
    var i=0;
    while(i<number) {
        var index=Math.floor(Math.random() * subset.length);
        if(randomIndices.indexOf(index)==-1){
            randomSubset.push(subset[index]);
            i+=1

        }
    }
    return randomSubset
}
/**
 * Extracts array of values for the histograms
 * @param data
 * @param feature
 * @returns {Array}
 */
function extractFeature(data,feature){
    var values=[];
    for (var key in data){
        values.push(data[key][feature])
    }
    return values
}
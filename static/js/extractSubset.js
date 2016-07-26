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
    var subset=dataset.filter(function(entry){
       return entry["Uncertainty"]>=lower && entry["Uncertainty"]<=higher;
    });
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
    return data.map(function (entry) {
        return entry[feature]
    })
}
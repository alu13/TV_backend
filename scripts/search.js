import { findOpportunity } from '../scripts/mongo.js';

export async function search(terms){
    var results = await findOpportunity(terms);
    // console.log(results);
    for (let i = 0; i < results.length; i++){
        console.log(results[i]["title"]);
    }
}

search("web designer");

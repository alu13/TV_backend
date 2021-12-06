import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

const uri = "mongodb+srv://ashwinESI:esivip@cluster0.ts2at.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
// try {
//     await client.connect();

//     //await listDatabases(client);
//     //the following call is just a test
//     await insertToDB(client, 
//     {
//         name: "RedCross website development",
//         summary: "Red cross looking for developer"
//     });
    
// } catch (e) {
//     console.error(e);
// } finally {
//     await client.close();
// }
// main().catch(console.error);

// async function main() {
//     try {
//         await client.connect();

//         //await listDatabases(client);
//         //the following call is just a test
//         /*
//         await insertToDB(client, 
//         {
//             name: "RedCross website development",
//             summary: "Red cross looking for developer"
//         });
//         */
//        await findOpportunity(client, "RedCross website development");
        
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

async function listDatabases(client) {
    client.connect()
    const databaseList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databaseList.databases.forEach(element => {
        console.log(`- ${element.name}`);
    });
    client.close();
}

export async function insertToDB(newOpportunity) {
    //mongo will add the _id tag automatically
    //database name = "ESI_VIP_Database"
    //collection name = "Volunteering Opportunities"
    try {
        await client.connect();
        const output = await client.db("ESI_VIP_Database").collection("Volunteering Opportunities")
        .insertOne(newOpportunity);
        console.log(`New volunteering opportunity with this id: ${output.insertedId}`);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
    console.log("Item inserted");
}

export async function findOpportunity(search_terms) {
    /**
     * We can search for opportunities this way
     * A result need not come up
     */
    //  description: {regex: "web"}
    var output;
    var terms = search_terms.split(" ");
    var results = []
    try{
        await client.connect();
        const db = client.db("ESI_VIP_Database");
        for(let i = 0; i < terms.length; i++){
            var case_insensitive_opp = new RegExp(terms[i], 'i');
            const curr_results = await db.collection("Volunteering Opportunities").find({description: {$regex: case_insensitive_opp}}).toArray();
            results = results.concat(curr_results);
        }
        console.log(results);
        if (results.length > 0) {
            console.log(`Voluntering Opportunities found with the terms: ${search_terms}`);
        } else {
            console.log(`No Opportunities found.`);
        }
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
        return results;
    }    
}

export async function findOpportunityByID(id) {
    /**
     * We can search for opportunities by ID
     */
    //  description: {regex: "web"}
    console.log("hello");
    var output;
    try{
        await client.connect();
        const db = client.db("ESI_VIP_Database");
        output = await db.collection("Volunteering Opportunities").find(mongodb.ObjectId(id)).toArray();
         //mongodb.ObjectId(id)
        if (output.length > 0) {
            console.log(`Voluntering Opportunities found with the id: ${id}`);
        } else {
            console.log(`No Opportunities found.`);
        }
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
        console.log(output);
        return output;
    }    
}
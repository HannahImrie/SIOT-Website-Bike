var express = require('express');
var router = express.Router();

router.use(express.static('public'))

// import MongoCLient
const {MongoClient} = require('mongodb');
async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const url = "mongodb+srv://<username>:<password>@hannah-iot-cluster.qwcik.mongodb.net/project1database?retryWrites=true&w=majority";


    const client = new MongoClient(url);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  findonedoc(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

var result
var result2
async function findonedoc(client){
	var ObjectId = require('mongodb').ObjectId;
    result = await client.db("project1database").collection("updateabledocs").findOne({"_id":ObjectId("5ffcfb448de85120ed3dcd37")});
    result2 = await client.db("project1database").collection("updateabledocs").findOne({"_id":ObjectId("5fff0a3d96b67af682c85c81")});
    result = [result,result2]
 	if (result) {
 		console.log("Found a listing");
 		//console.log(result);
 	} else {
 		console.log("No listing found");
 	}
    
};



/* GET jsonfile page. */
router.get('/test', function(req, res, next) {
	main().catch(console.error);
  res.json(result[0]);
});

/* GET jsonfile page. */
router.get('/oneweekofdata', function(req, res, next) {
	main().catch(console.error);
  res.json(result[1]);
});


/* GET map page. */
router.get('/map', (req, res) => {
    res.sendFile('/views/mapthing.html', { root: "./" });
});

/* GET lievdata page. */
router.get('/livedata', (req, res) => {
    res.sendFile('/views/livedata.html', { root: "./" });
});


module.exports = router;

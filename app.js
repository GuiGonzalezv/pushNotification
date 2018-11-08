var express = require("express");
var webpush = require("web-push");
var bodyParser = require("body-parser");
var path = require("path");

const app = express();

//Set static path
app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json())

const publicVapidKey = "BAueDzJyJvcwnViV9mT10PhXiC4YQVVTF0io8JcaoILB2MKFv0RBpl7Rb0_ozM9tdISZtEeBsCcOhteIW1O4q5E"
const privateVapidKey = "iXYRd4Sju7oA-f316fRrSG-STeVMba70coRkxhjURek"

webpush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey
)

app.post("/subscribe", (req, res) => {
    //pushSubscription object
    const subscription = req.body;

    //Send 201 - resource created
    res.status(201).json({});

    //Create Payload
    const payload = JSON.stringify({title: "Marcos Khoriati"})

    webpush.sendNotification(subscription, payload).catch(err =>console.log(err))

})
const port = 5000;

app.listen(port, () => console.log("Server started on port "+port+""))
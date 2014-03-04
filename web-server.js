/**
 * Created by Krishna on 2/28/14.
 */
var express = require("express"),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 8000;

var dbAccess = require('./persistence/dbAccess');

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(app.router);
});

//To get all bills
app.get("/bill", function(req, res){

    dbAccess.getAllBill(function(bills){
        res.send(bills);
    });
});

//To get a bills
app.get("/bill/:id", function(req, res){

    dbAccess.getBillById(req.params.id, function(bill){
            res.send(bill);
    });

});

//To add a bill
app.post("/bill", function(req, res){

    var bill=req.body;

    dbAccess.addNewBill(bill, function(bill){
        res.send(bill);
    });

});

//To update a bill
app.post("/bill/:id", function(req, res){

    var bill_id = req.body._id;

    console.log(bill_id + " needs to be updated");
    var bill= {};
    bill.cname = req.body.cname;
    bill.bill_amount = req.body.bill_amount;
    bill.bill_date = req.body.bill_date;
    bill.items = req.body.items;

    dbAccess.updateBillForId(bill_id, bill, function(bill){
        res.send(bill);
    });

});

app.delete("/bill/:id", function(req, res){
    var bill_id = req.params.id;

    dbAccess.deleteBillForId(bill_id, function(){
        res.send({});
    })
});

app.listen(port);

console.log("Now serving app at http://localhost:"+port+"/");
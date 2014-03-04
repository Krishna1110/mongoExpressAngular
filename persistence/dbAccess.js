/**
 * Created by Krishna on 3/3/14.
 */
//db connection related code
var dbUrl = 'bills'; // "username:password@kk.com/bill"
var collection = ['bill'];
var mongoJs = require("mongojs");
var ObjectID = mongoJs.ObjectId;
var db = mongoJs.connect(dbUrl, collection);

//db connection completed

//check if bill db exist
//console.log(db.bill.find());

var getAllBill = function(callBack){

    db.bill.find(function(err, bills) {
        if( err || !bills){
            console.log("No bills found");
            callBack({});
        }
        else{
            callBack(bills);
        }
    });
 };

var getBillById = function(id, callBack){
    db.bill.find({_id:ObjectID(id)}, function(err, bills) {
        if( err || !bills){
            console.log("No bill found with id : "+id);
            callBack({});
        }
        else{
            if(bills.length>0){
                callBack(bills[0]);
            }else{
                callBack({});
            }
        }
    });
};

var updateBillForId = function(id, bill, callBack){
    db.bill.update({_id:ObjectID(id)}, bill, function(err, updated) {
        if( err || !updated){
            console.log("Bill not updated with id : " + id + "error" + err);
            callBack({});
        }
        else{
            bill._id = id;
            callBack(bill);
        }
    });
};

var addNewBill = function(bill, callBack){
   db.bill.save(bill, function(err, saved) {
       if( err || !saved){
           console.log("Bill not saved");
           callBack({});
       }
       else{
           callBack(bill);
       }
   });
};

var deleteBillForId = function(id, callBack){
    db.bill.remove({_id:ObjectID(id)}, function(err, deleted) {
        if( err || !deleted){
            console.log("Bill not deleted with id : " + id + "error" + err);
        }
        callBack();
    });
};

exports.getAllBill = getAllBill;
exports.addNewBill = addNewBill;
exports.getBillById = getBillById;
exports.updateBillForId = updateBillForId;
exports.deleteBillForId = deleteBillForId;
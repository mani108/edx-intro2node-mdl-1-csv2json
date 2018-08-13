const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

var Customer =  function(id, first_name, last_name, email, gender, 
                ip_address, ssn, credit_card, bitcoin, street_address){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.gender = gender;
    this.ip_address = ip_address;
    this.ssn = ssn;
    this.credit_card = credit_card;
    this.bitcoin = bitcoin;
    this.street_address = street_address;
};
var arrCustomers = [];
var inputFilePath = 'customer-data.csv';
var outputFilePath = 'customer-data.json';
const csv2JSON = function(){
    fs.createReadStream(inputFilePath)
.pipe(csv())
.on('data', function(data){
    try{
        //console.log(data.first_name);
            arrCustomers.push(new Customer(data.id, data.first_name, 
                data.last_name, data.email,
                data.ip_address,data.ss,data.credit_card,
                data.bitcoin,data.street_address));

                //console.log(arrCustomers.length);    
    }catch(err){
        console.log(err);
    }
})
.on('end', function(){
    fs.writeFileSync(outputFilePath, JSON.stringify(arrCustomers),function(err){
        console.log(err);
    });
});
};

//call function
csv2JSON();


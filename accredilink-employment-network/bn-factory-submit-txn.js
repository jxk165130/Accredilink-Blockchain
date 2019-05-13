'use strict';
/*
 * 
 * Demo Steps
 * 1. Use the bn-connection-util to create the connection to airlinev7
 * 2. Get the Busines Network Definition from Runtime
 * 3. Get the factory from the Business Network definition
 * 4. Create a new Transaction instance
 * 5. Set the property values in the transaction object
 * 6. Submit the transaction
 */



 // Constant values - change as per your needs
 const namespace = "org.accredilink.screening.employee";
 const transactionType = "createEmployee";

// 1. Connect to airlinev7
const bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function main(error){
    
    // Check for error
    if(error){
        console.log(error);
        process.exit(1);
    }

    // 2. Get the Business Network Definition
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                   bnDef.getName(),"  ",bnDef.getVersion());

    // 3. Get the factory
    let factory = bnDef.getFactory();
        


    // 4. Create an instance of transaction
    let options = {
        generate: false,
        includeOptionalFields: false
    }
    
    
    
    let transaction = factory.newTransaction(namespace,transactionType);

    // 5. Set up the properties of the transaction object
    transaction.setPropertyValue('fName','jinhokim');
    transaction.setPropertyValue('lName', 'Kiddm');
    transaction.setPropertyValue('SSN' , '349956592');
    transaction.setPropertyValue('dob' , new Date('1990-04-29'));

    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
}

function generateEmployeeId(SSN,dob){
    var dt = new Date(dob);

    var month = dt.getMonth()+1
    if((month+'').length == 1) month = '0'+month;
    var day = dt.getDate();
    if((day+'').length == 1) day = '0'+day;
    return SSN + month + day + (dt.getFullYear()+'').substring(2,4);
}



/**
 * Test Data for adding flight in registry
 {
  "$class": "org.acme.airline.flight.Flight",
  "flightId": "AE101-05-05-2019",
  "flightNumber": "AE101",
  "route": {
    "$class": "org.acme.airline.flight.Route",
    "origin": "ATL",
    "destination": "EWR",
    "schedule": "2019-12-17T18:49:58.288Z",
    "id": "string"
  }
}
* Adding flight using the createFlight transaction
{
  "$class": "org.acme.airline.flight.CreateFlight",
  "flightNumber": "AE101-06-06-2019",
  "origin": "MSP",
  "destination": "SEA",
  "schedule": "2019-06-06T18:49:58.273Z"
}
*/
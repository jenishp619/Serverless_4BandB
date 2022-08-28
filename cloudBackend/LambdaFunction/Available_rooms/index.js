"use strict";
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB();

exports.handler = async (event) => {
    let params = {
         TableName: "roomDetails",
         };

        const scanResults = [];
        let items;
        do{
           items =  await docClient.scan(params).promise();
           items.Items.forEach((item) => scanResults.push(item));
           params.ExclusiveStartKey  = items.LastEvaluatedKey;
        }while(typeof items.LastEvaluatedKey !== "undefined");
        console.log(scanResults)
        let room = scanResults.filter((ele) => ele.roomNumber.S === event["interpretations"][0]["intent"]["slots"]["roomOptions"]["value"][
              "originalValue"])
        let roomName, roomPrice;
        console.log(room)
        if (room.length){
            roomName=room[0].roomName.S
            roomPrice=room[0].roomPrice.N
        }
    
   let Options = event["interpretations"][0]["intent"]["slots"]["roomOptions"]["value"]["originalValue"];
   console.log(Options);
   let result = "";
   switch(Options){
       case "5": 
           { 
               result = "Status: Available. The room number: " +event["interpretations"][0]["intent"]["slots"]["roomOptions"]["value"][
              "originalValue"]+ " is priced $"+roomPrice+" with room type: "+roomName+" ."
           break;
           }
        case "51": 
           { 
               result = "Status: Available. The room number: " +event["interpretations"][0]["intent"]["slots"]["roomOptions"]["value"][
              "originalValue"]+ " is priced $"+roomPrice+" with room type: "+roomName+" ."
           break;
           }
        case "53": 
           { 
               result = "Status: Available. The room number: " +event["interpretations"][0]["intent"]["slots"]["roomOptions"]["value"][
              "originalValue"]+ " is priced $"+roomPrice+" with room type: "+roomName+" ."
           break;
           }  
        case "102": 
           { 
               result = "Status: Available. The room number: " +event["interpretations"][0]["intent"]["slots"]["roomOptions"]["value"][
              "originalValue"]+ " is priced $"+roomPrice+" with room type: "+roomName+" ."
           break;
           }  
   }
   return {
          sessionState: {
            dialogAction: {
              type: "Close",
            },
            intent: {
              confirmationState: "Confirmed",
              name: "NavigateWebsite",
              state: "Fulfilled",
            },
          },
          messages: [
            {
              contentType: "PlainText",
              content: result ,
            },
          ],
          };
};
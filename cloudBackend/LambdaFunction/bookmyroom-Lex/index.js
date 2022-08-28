"use strict";
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB();
exports.handler = async (event, context, callback) => {
  try {
    console.log(JSON.stringify(event, null, 4));
    const intentName = "BookRoom";
    //let currentId = 3
    if (intentName === "BookRoom") {
      //return BookRoom(event, callback);
      try {
        /* code */
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
        let room = scanResults.filter((ele) => ele.roomNumber.S === event["interpretations"][0]["intent"]["slots"]["roomNumber"]["value"][
              "originalValue"])
        let roomName, roomPrice;
        console.log(room)
        if (room.length){
            roomName=room[0].roomName.S
            roomPrice=room[0].roomPrice.N
        }
        
        let item = {
          cust_id: {
            S: event["interpretations"][0]["intent"]["slots"]["customerId"]["value"][
              "originalValue"
            ],
          },
          start_date_: {
            S: event["interpretations"][0]["intent"]["slots"]["startDate"]["value"][
              "originalValue"
            ],
          },
          end_date: {
            S: event["interpretations"][0]["intent"]["slots"]["endDate"]["value"][
              "originalValue"
            ],
          },
          room_no: {
            S: event["interpretations"][0]["intent"]["slots"]["roomNumber"]["value"][
              "originalValue"],
          },
          room_name: {
            S: roomName
          },
          price: {
            N: roomPrice  
          }
          
        };
          
        let params1 = {
          TableName: "room",
          Item: item
        };

        console.log("Putting to DynamoDB");
        let result = await docClient.putItem(params1).promise();
        console.log("DynamoDB successful");
        
        
        return {
          sessionState: {
            dialogAction: {
              type: "Close",
            },
            intent: {
              confirmationState: "Confirmed",
              name: "BookRoom",
              state: "Fulfilled",
            },
          },
          messages: [
            {
              contentType: "PlainText",
              content: "Booking Confirmed.Your booking reference is "+event["interpretations"][0]["intent"]["slots"]["customerId"]["value"][
              "originalValue"]+" for room number: "+event["interpretations"][0]["intent"]["slots"]["roomNumber"]["value"][
              "originalValue"]+" is "+ roomName +" type and costs $"+ roomPrice +" plus taxes, from date "+event["interpretations"][0]["intent"]["slots"]["startDate"]["value"][
              "originalValue"]+" to "+event["interpretations"][0]["intent"]["slots"]["endDate"]["value"][
              "originalValue"]+" . Have a wonderful stay!",
            },
          ],
        };

        // console.log("Logged!");
        // return response;
      } catch (e) {
        console.log(e);
      }
    }
    
  } catch (e) {
    console.log(e);
  }
};


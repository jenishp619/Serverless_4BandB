"use strict";
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB();
exports.handler = async (event, context, callback) => {
  try {
    console.log(JSON.stringify(event, null, 4));
    const intentName = "OrderFood";
    if (intentName) {
      try {
        /* code */
        let params = {
         TableName: "foodDetails",
         };

        const scanResults = [];
        let items;
        do{
           items =  await docClient.scan(params).promise();
           items.Items.forEach((item) => scanResults.push(item));
           params.ExclusiveStartKey  = items.LastEvaluatedKey;
        }while(typeof items.LastEvaluatedKey !== "undefined");
        console.log(scanResults)
        let food = scanResults.filter((ele) => ele.foodName.S === event["interpretations"][0]["intent"]["slots"]["foodName"]["value"][
              "originalValue"])
        let foodPrice, foodDescription;
        console.log(food)
        if (food.length){
            foodDescription=food[0].foodDescription.S
            foodPrice=food[0].foodPrice.N
        }
        
        let item = {
          order_id : {
              N: "1"
          },    
          cust_id: {
            S: event["interpretations"][0]["intent"]["slots"]["customerId"]["value"][
              "originalValue"
            ],
          },
          order_Date: {
            S: event["interpretations"][0]["intent"]["slots"]["orderDate"]["value"][
              "originalValue"
            ],
          },
          order_Item: {
            S: event["interpretations"][0]["intent"]["slots"]["foodName"]["value"][
              "originalValue"],
          },
          description: {
            S: foodDescription
          },
          item_price: {
            N: foodPrice  
          }
          
        };
          
        let params1 = {
          TableName: "foodorder",
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
              name: "OrderFood",
              state: "Fulfilled",
            },
          },
          messages: [
            {
              contentType: "PlainText",
              content: "Food order Confirmed.Your booking reference is "+event["interpretations"][0]["intent"]["slots"]["customerId"]["value"][
              "originalValue"]+" . The order item is "+ event["interpretations"][0]["intent"]["slots"]["foodName"]["value"][
              "originalValue"]+" which costs $"+ foodPrice +" plus taxes, ordered on date "+event["interpretations"][0]["intent"]["slots"]["orderDate"]["value"][
              "originalValue"]+" . The Description: "+ foodDescription,
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


// Author: Fenil Milankumar Parmar [B00895684]
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.requestContext.http.method) {
      
      case "GET":
        body = await dynamo.scan({ TableName: event.queryStringParameters.TableName }).promise();
        break;
      case 'PUT':
        // body = await dynamo.update(JSON.parse(event.body)).promise();
        let requestJSON1 = JSON.parse(event.body);
        
        await dynamo
          .put({
            TableName: "rooms",
            Item: {
              id: requestJSON1.id,
              roomName: requestJSON1.roomName,
              room_no: requestJSON1.room_no,
              roomPrice: requestJSON1.roomPrice,
              imageURL: requestJSON1.imageURL,
              isAvailable: requestJSON1.isAvailable
            }
          })
          .promise();
        body = `Now room available at id: ${"ID"+Date.now()} ${event.body}`;
        
        break;
      case "POST":
        let requestJSON = JSON.parse(event.body);
        
        await dynamo
          .put({
            TableName: "rooms",
            Item: {
              id: "ID"+ Date.now(),
              roomName: requestJSON.roomName,
              room_no: requestJSON.room_no,
              roomPrice: requestJSON.roomPrice,
              imageURL: requestJSON.imageURL,
              isAvailable: 1
            }
          })
          .promise();
        body = `Put item at id: ${"ID"+Date.now()} ${event.body}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    return {
    statusCode,
    body,
    headers
  };
      }

  
};

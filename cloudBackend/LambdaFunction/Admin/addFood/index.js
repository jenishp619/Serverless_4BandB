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
      case "POST":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "food",
            Item: {
              id: "ID"+ Date.now(),
              name: requestJSON.name,
              price: requestJSON.price,
              quantity: requestJSON.quantity,
              imageUrl: requestJSON.imageURL
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

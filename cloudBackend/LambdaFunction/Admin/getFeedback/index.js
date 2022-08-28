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
      case "POST":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "feedbacks",
            Item: {
              feedbackId: requestJSON.user_id + Date.now(),
              user_id: requestJSON.user_id,
              feedback: requestJSON.feedback,
              prediction: requestJSON.prediction,
              date: Date.now()
            }
          })
          .promise();
        body = `Put item ${requestJSON.user_id}`;
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
    body:"enjoy",
    headers
  };
      }

  
};

const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      
      
        case "POST /addroom":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "room",
            Item: {
              cust_id: requestJSON.cust_id,
              price: requestJSON.price,
              room_name: requestJSON.name,
              room_no:requestJSON.room_no,
              start_date_:requestJSON.start_date,
              end_date:requestJSON.end_date,
              cust_feedback:requestJSON.cust_feedback
            }
          })
          .promise();
        body = `Post item ${requestJSON.cust_id}`;
       break;
      case "DELETE /items/{id}":
        await dynamo
          .delete({
            TableName: "room",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
        
      case "GET /items/{id}":
        body = await dynamo
          .get({
            TableName: "room",
            Key: {
              cust_id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /items":
        body = await dynamo.scan({ TableName: "room" }).promise();
        break;
      case "PUT /items":
        let reqJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "room",
            Item: {
              cust_id: reqJSON.cust_id,
              price: reqJSON.price,
              room_name: reqJSON.name,
              room_no:reqJSON.room_no,
              start_date_:reqJSON.start_date,
              end_date:reqJSON.end_date,
              cust_feedback:reqJSON.cust_feedback
            }
          })
          .promise();
        body = `Put item ${reqJSON.cust_id}`;
        break;
        
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
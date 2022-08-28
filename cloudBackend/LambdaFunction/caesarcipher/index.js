const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let data;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      
      
        case "POST /addkey":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "caesarcipher",
            Item: {
              cust_id: requestJSON.cust_id,
              key: requestJSON.key
            }
          })
          .promise();
        body = `Post item ${requestJSON.cust_id}`;
       break;
       
        case "GET /{cust_id}":
        body = await dynamo
          .get({
            TableName: "caesarcipher",
            Key: {
              cust_id: event.pathParameters.cust_id
            }
          })
          .promise();
            data = JSON.stringify(body.Item.key).toString();
          const response = {
        statusCode: 200,
        body: data,
    };
          return response;
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
    data,
    headers
  };
};
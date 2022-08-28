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
      
      case "POST /foodadd":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "foodorder",
            Item: {
              cust_id: requestJSON.cust_id,
              order_id: requestJSON.order_id,
              order_Date: requestJSON.order_Date,
              order_Item:requestJSON.order_name,
              item_price:requestJSON.item_price,
              description:requestJSON.description
            }
          })
          .promise();
        body = `Post item ${requestJSON.cust_id}`;
       break;
    
      
      case "DELETE /foodorder/{cust_id}":
        await dynamo
          .delete({
            TableName: "foodorder",
            Key: {
              cust_id: event.pathParameters.cust_id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.cust_id}`;
        break;
      case "GET /foodorder/{cust_id}":
        body = await dynamo
          .get({
            TableName: "foodorder",
            Key: {
              cust_id: event.pathParameters.cust_id
            }
          })
          .promise();
        break;
      case "GET /foodorder":
        body = await dynamo.scan({ TableName: "foodorder" }).promise();
        break;
        
      case "PUT /foodorder":
        let requestnewJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "foodorder",
            Item: {
              cust_id: requestnewJSON.cust_id,
              order_id: requestnewJSON.order_id,
              order_Date: requestnewJSON.order_Date,
              order_Item:requestnewJSON.order_Item,
              item_price:requestnewJSON.item_price,
              description:requestnewJSON.description
            }
          })
          .promise();
        body = `Put item ${requestnewJSON.cust_id}`;
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
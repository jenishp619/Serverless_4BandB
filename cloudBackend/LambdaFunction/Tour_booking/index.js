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
      
      
        case "POST /addtour":
        let requestnewJSON = JSON.parse(event.body);
        await dynamo
          .put({
              TableName: "Tour_Booking",
            Item: {
              cust_id: requestnewJSON.cust_id,
              tour_id: requestnewJSON.tour_id,
              start_Date: requestnewJSON.start_Date,
              end_Date:requestnewJSON.end_Date,
              Itinerary:requestnewJSON.Itinerary,
              rating:requestnewJSON.rating
              
            }
          })
          .promise();
        body = `Post item ${requestnewJSON.cust_id}`;
       break;
      
      case "DELETE /tour/{cust_id}":
        await dynamo
          .delete({
            TableName: "Tour_Booking",
            Key: {
              cust_id: event.pathParameters.cust_id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.cust_id}`;
        break;
      case "GET /tour/{id}":
        body = await dynamo
          .get({
            TableName: "Tour_Booking",
            Key: {
              cust_id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /tour":
        body = await dynamo.scan({ TableName: "Tour_Booking" }).promise();
        break;
      case "PUT /tour":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "Tour_Booking",
            Item: {
              cust_id: requestJSON.id,
              tour_id: requestJSON.tour_id,
              start_Date: requestJSON.start_Date,
              end_Date:requestJSON.end_Date,
              Itinerary:requestJSON.Itinerary,
              rating:requestJSON.rating
              
            }
          })
          .promise();
        body = `Put item ${requestJSON.cust_id}`;
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
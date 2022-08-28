const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let dataanswer1;
  let dataanswer2;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      
      
        case "POST /securityans":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "securityanswer",
            Item: {
              cust_id: requestJSON.cust_id,
              answer1: requestJSON.answer1,
              answer2: requestJSON.answer2
            }
          })
          .promise();
        body = `Post item ${requestJSON.cust_id}`;

       break;

      case "POST /validateans/{cust_id}":
        let requestnewJSON = JSON.parse(event.body);
        let a1request =JSON.stringify(requestnewJSON.answer1).toString();
        let a2request =JSON.stringify(requestnewJSON.answer2).toString();
        body = await dynamo
          .get({
            TableName: "securityanswer",
            Key: {
              cust_id: event.pathParameters.cust_id
            }
          })
          .promise();
         dataanswer1= JSON.stringify(body.Item.answer1);
          dataanswer2= JSON.stringify(body.Item.answer2);
          console.log(dataanswer2);
          if((a1request)===dataanswer1 && (a2request)===dataanswer2){
              console.log("Success");
              
          }
          else{
              console.log("fail");
          }
       break;

         
      case "GET /{cust_id}":
        body = await dynamo
          .get({
            TableName: "securityanswer",
            Key: {
              cust_id: event.pathParameters.cust_id
            }
          })
          .promise();
          dataanswer1= JSON.stringify(body.Item.answer1);
          dataanswer2= JSON.stringify(body.Item.answer2);
          console.log(dataanswer1);
           console.log(dataanswer2);
        break;
      case "GET /items":
        body = await dynamo.scan({ TableName: "room" }).promise();
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
    dataanswer1,
    dataanswer2,
    headers
  };
};
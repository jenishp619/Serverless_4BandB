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
           const response = {
        statusCode: 200,
        body: JSON.stringify('Verified profile !'),
    };
         const responseerr = {
        statusCode:  400,
        body: JSON.stringify('Error!'),
    };
    
          console.log(dataanswer2);
          if((a1request)===dataanswer1 && (a2request)===dataanswer2){
              console.log("Success");
               return response;         
             
          }
          else{
              console.log("fail");
              return responseerr;
          }
       break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } 
};
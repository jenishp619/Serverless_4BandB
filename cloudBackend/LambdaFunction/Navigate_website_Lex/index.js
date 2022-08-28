"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event) => {
    
   let Options = event["interpretations"][0]["intent"]["slots"]["Options"]["value"]["originalValue"];
   console.log(Options);
   let result = "";
   switch(Options){
       case "login": 
           { 
               result = "https://serverlessbbgroup4-dt4gr574pq-uc.a.run.app/"
           break;
           }
        case "signup": 
           { 
               result = "https://serverlessbbgroup4-dt4gr574pq-uc.a.run.app/register"
           break;
           }
        case "order food": 
           { 
               result = "https://serverlessbbgroup4-dt4gr574pq-uc.a.run.app/orderfood"
           break;
           }  
        case "book room": 
           { 
               result = "https://serverlessbbgroup4-dt4gr574pq-uc.a.run.app/SearchRoom"
           break;
           }  
   }
   return {
          sessionState: {
            dialogAction: {
              type: "Close",
            },
            intent: {
              confirmationState: "Confirmed",
              name: "NavigateWebsite",
              state: "Fulfilled",
            },
          },
          messages: [
            {
              contentType: "PlainText",
              content: result,
            },
          ],
          };
};

# Author: Fenil Milankumar Parmar [B00895684]

from typing import Dict, List

from google.cloud import aiplatform


def cors_enabled_function(request):
    # For more information about CORS and CORS preflight requests, see:
    # https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    return ('Hello World!', 200, headers)


def explain_tabular_sample(project: str, location: str, endpoint_id: str, instance_dict: dict):
 
    aiplatform.init(project=project, location=location)

    endpoint = aiplatform.Endpoint(endpoint_id)

    response = endpoint.explain(instances=[instance_dict], parameters={})

    for explanation in response.explanations:
        print(" explanation")
        # Feature attributions.
        attributions = explanation.attributions
        for attribution in attributions:
            print("  attribution")
            print("   baseline_output_value:", attribution.baseline_output_value)
            print("   instance_output_value:", attribution.instance_output_value)
            print("   output_display_name:", attribution.output_display_name)
            print("   approximation_error:", attribution.approximation_error)
            print("   output_name:", attribution.output_name)
            output_index = attribution.output_index
            for output_index in output_index:
                print("   output_index:", output_index)

    result = 0
    for prediction in response.predictions:
        print("Class: ",prediction['classes'], "Score: ",prediction['scores'])
        
        result = float(prediction['scores'][0])
        index  = prediction['classes'][0]
        for i in range(1, len(prediction['scores'])):
            print("result:", float(prediction['scores'][i]), "-- index: ", prediction['classes'][i] )
            if float(prediction['scores'][i]) > result:
                result = float(prediction['scores'][i])
                index = prediction['classes'][i]
                print("result:", result, "-- index: ", index )
        return index



def hello_world(request):
    request_json = request.get_json()

    # For more information about CORS and CORS preflight requests, see:
    # https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*'
    }

    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    
    print(str(request_json));
    Dict = {
        "TotalStayDuration": request_json["TotalStayDuration"],
        "StaysInWeekendNights": request_json["StaysInWeekendNights"],
        "StaysInWeekNights": request_json["StaysInWeekNights"],
        "Adults": request_json["Adults"],
        "Children": request_json["Children"],
        "Babies": request_json["Babies"],
        "TotalPersons": request_json["TotalPersons"],
        "IsRepeatedGuest": request_json["IsRepeatedGuest"],
        "NoDeposite": request_json["NoDeposite"],
        "NonRefundable": request_json["NonRefundable"],
        "Refundable": request_json["Refundable"],
        "CustomerType": request_json["CustomerType"],
        "RequiredCarParkingSpaces": request_json["RequiredCarParkingSpaces"]
    }
    
    
    tourPackage = explain_tabular_sample("serverless-ass4", "us-central1", "7017690138884964352", Dict)
    
    print(tourPackage)

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return (tourPackage, 200, headers)



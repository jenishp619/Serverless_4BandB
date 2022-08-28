# Author: Fenil Milankumar Parmar [B00895684]

# Copyright 2016, Google, Inc.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

from google.cloud import language_v1
import six

def analyze(content):
  """Run a sentiment analysis request on text."""
  client = language_v1.LanguageServiceClient()

  if isinstance(content, six.binary_type):
    content = content.decode("utf-8")

  type_ = language_v1.Document.Type.PLAIN_TEXT
  document = {"type_": type_, "content": content}

  response = client.analyze_sentiment(request={"document": document})
  sentiment = response.document_sentiment
  res = str(sentiment.score)
  
  # if(sentiment.score >= 0):          
  #   res = res + "Positive: The Sentence "+content+"\n has a sentiment score of "+str(sentiment.score)
  # else :          
  #   res = res + "Negative: The Sentence "+content+"\n has a sentiment score of "+str(sentiment.score)
  
  # res = res + "\n Overall Sentiment: score of "+str(sentiment.magnitude)+" magnitude."
  print("Score: {}".format(sentiment.score))
  print("Magnitude: {}".format(sentiment.magnitude))

  # Print the results
  return res


def hello_world(request):
  """Responds to any HTTP request.
  Args:
      request (flask.Request): HTTP request object.
  Returns:
      The response text or any set of values that can be turned into a
      Response object using
      `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
  """
  request_json = request.get_json()

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

  print(str(request_json))

  answer = analyze(str(request_json["text"]))
  
  if request.args and 'message' in request.args:
    return request.args.get('message')
  elif request_json and 'message' in request_json:
    return request_json['message']
  else:
    return (answer, 200, headers)
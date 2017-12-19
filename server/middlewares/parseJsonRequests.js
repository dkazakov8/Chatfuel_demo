import bodyParser from 'body-parser';

function parseJsonRequests() {
  return bodyParser.json();
}

export default parseJsonRequests;

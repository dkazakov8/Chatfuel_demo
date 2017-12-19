import bodyParser from 'body-parser';

function parseUrlencodedRequests() {
  return bodyParser.urlencoded({ extended: true });
}

export default parseUrlencodedRequests;

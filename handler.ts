import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const BASE_URL = process.env.WM_BASE_URL;

// Shared Helper for JSON responses
const sendResponse = (statusCode: number, data: any): APIGatewayProxyResult => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

// 1. LOGIN (POST)
export const login = async (): Promise<APIGatewayProxyResult> => {
  const response = await fetch(`${BASE_URL}/apiV2/Login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      UserName: process.env.WM_USERNAME,
      Password: process.env.WM_PASSWORD
    })
  });
  const data = await response.json();
  return sendResponse(response.status, data);
};

// 2. GET SITES (GET)
export const getSites = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const token = event.headers['authorization']; // Expecting "Bearer <token>"
  
  const response = await fetch(`${BASE_URL}/apiV2/GetMySitesAndMeasures`, {
    method: 'GET',
    headers: { 'Authorization': token || '' }
  });
  const data = await response.json();
  return sendResponse(response.status, data);
};

// 3. GET DATA (GET) - Supports Query Params like ?siteId=123
export const getData = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const token = event.headers['authorization'];

  // 1. Get the parameters from the path
  // event.pathParameters.proxy will contain "1234/2020-01-01/2020-02-01"
  const pathParams = event.pathParameters?.proxy || '';
  if (!pathParams) {
    return sendResponse(400, { error: "siteId is required. Usage: /apiV2/GetData/{siteId}" });
  }

  //const queryParams = new URLSearchParams(event.queryStringParameters as any).toString();
  const response = await fetch(`${BASE_URL}/apiV2/GetData?${pathParams}`, {
    method: 'GET',
    headers: { 'Authorization': token || '' }
  });
  const data = await response.json();
  return sendResponse(response.status, data);
};

// 4. LOGOFF (POST)
export const logoff = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const token = event.headers['authorization'];
  
  const response = await fetch(`${BASE_URL}/apiV2/Logoff`, {
    method: 'POST',
    headers: { 'Authorization': token || '' }
  });
  const data = await response.json();
  return sendResponse(response.status, data);
};
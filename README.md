# Sandbox API Client

The official repository of SDK to communicate with Sandbox APIs.

The Sandbox APIs are a comprehensive set of REST APIs designed to offer a robust digital infrastructure, enabling you to rapidly develop and expand your fintech application across various domains namely, Taxation, KYC, Banking etc.

Find us @ [Sandbox](https://sandbox.co.in) 


## Documentation

[Sandbox API documentation](https://developer.sandbox.co.in/)

## Usage

### API Authentication

Instantiate `ApiClient` with `api_key` & `api_secret`. Use this ApiClient to call Paid APIs or to access resources on server for api user. You can obtain the key from the dashboard. [Sandbox Dashboard](https://dashboard.sandbox.co.in)

```Typescript
// Initialize ApiUserCredentials
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET'
const credentials = new ApiUserCredentials(apiKey, apiSecret);

// Initialize client with API session
const apiClient = await (new ApiClientBuilder()).withCredentials(credentials).build();
  
// Use ApiClient to call Paid APIs or to access resources on server for api user
const response = await apiClient.TAX_PAYER.searchGstin(gstin);

```

Sandbox Financial Technologies Pvt. Ltd. (c) 2023.
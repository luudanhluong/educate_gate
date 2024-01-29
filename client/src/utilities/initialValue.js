const clientId = "1010281087379-4m1dvta8qu9l2064058tr505qf6cfg8v.apps.googleusercontent.com";
const POST = "POST";
const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer " +
    JSON.stringify(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluXzFAZnB0LmVkdS52biIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNzA2NDUzODU1LCJleHAiOjE3MDY0NjEwNTV9.LlJqk6ihu-nbQEqoEBNP_TLFiLdAjGn-xGMSbS3gq-g"
    ),
};
const BASE_URL = "http://localhost:9999";

export { clientId, POST, headers, BASE_URL };

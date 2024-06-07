import config from "./config";
import axios from "axios";

const GET = "GET";
const POST = "POST";
const { server_url } = config;

const createApiRequest = (method, route, data = {}, login) => {
  return axios({
    method,
    url: server_url + route,
    headers: {
      Authorization: "Basic " + "Mjc1MjA5ZGItM2RhNS00ODllLThjNGYtNzk0YTZhNWQ3NzMwOmRhbDpoTy00eEFsc0VqSHBqa0tTTW9hMDc5M20yZDA=",
      DateInterval: 1,
      // "X-API-Version": "2",
      Agent: login
    },
    data,
  }).catch(function(error) {
    console.error(error);
  });
};

const api = {
  fetchAgents: accessToken => createApiRequest(POST, "/list_agents",
    {
      "fields": [
         "email_subscriptions",
         "max_chats_count",
         "job_title"
       ],
       "filters": {
         "group_ids": [
           0,
           1
         ]
       }
   }, accessToken),
  fetchAgentRatings: (login, accessToken) =>
    createApiRequest(GET, "/ratings/week", accessToken, login),
  fetchAgentAvailability: (login, accessToken) =>
    createApiRequest(GET, "/availability", accessToken, login),
  fetchChattingTime: (login, accessToken) =>
    createApiRequest(GET, "/chatting", accessToken, login)
};

export default api;

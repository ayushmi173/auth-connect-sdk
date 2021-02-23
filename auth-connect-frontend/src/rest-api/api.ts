import fetch from "isomorphic-fetch";
import { getToken } from "../utils/auth";
import { HttpProxyAgent } from "http-proxy-agent";

type APIOptions = {
  sendAuthHeaders: boolean;
};

const API_URL: string = `http://localhost:4000/auth`;

export async function post(path: string, body: object): Promise<Response> {
  const url: string = `${API_URL}${path}`;
  const config = {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  };

  const response: Response = await fetch(url, config);
  return response;
}

export async function get(path: string): Promise<Response> {
  const url: string = `${API_URL}${path}`;
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  };
  const response: Response = await fetch(url, config);
  return response;
}

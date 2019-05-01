import { request } from "graphql-request";

const ENDPOINT = "https://api.graph.cool/simple/v1/cjv522qgp2jso01957zilwtel";

export default {
  async request (query, variables) {
    return await request(ENDPOINT, query, variables);
  }
}

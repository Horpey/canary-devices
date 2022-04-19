import * as axios from "axios";
import urls from "../constants/urls";

export default class Api {
  constructor() {
    const { API_URL } = urls;
    this.client = null;
    this.api_url = API_URL;
  }

  init = () => {
    let headers = {
      Accept: "application/json",
    };

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  getAllDevices = () => {
    return this.init().get("/devices");
  };

  //   addNewUser = (data) => {
  //     return this.init().post("/users", data);
  //   };
}

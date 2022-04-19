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
  getDeviceCount = () => {
    return this.init().get("/devices/count");
  };
  getDeviceByID = (id) => {
    return this.init().get(`/devices/${id}`);
  };
  getDeviceReadings = (id) => {
    return this.init().get(`/devices/${id}/readings`);
  };

  //   addNewUser = (data) => {
  //     return this.init().post("/users", data);
  //   };
}

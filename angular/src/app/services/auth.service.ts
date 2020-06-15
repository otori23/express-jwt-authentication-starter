import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable()
export class AuthService {
  constructor() {}
  /**
     * {
        "success": true,
        "user": {
            "_id": "5ee70c282cfa5032f4052e98",
            "username": "joe_jwt2",
            "hash": "5dfe1b6bd957ebd01d60583948344cfd5fe237cb6495c88be74e5b15a680147b4500d95d1b1ac9cfe71067f77b740146cddaee42ea7315c9109e189ef88490ff",
            "salt": "4660f4e7ac954253a60138ad3e9754cebab99301e6970ef5ea07d65572a97a3a",
            "__v": 0
        },
        "token": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWU3MGMyODJjZmE1MDMyZjQwNTJlOTgiLCJpYXQiOjE1OTIyMDAyMzIxNDMsImV4cCI6MTU5MjIwMDMxODU0M30.jfjuU8xKLQGCfyZPHj_0xOkUx-1pdDk9-34JPmSDYSMu0HsGMZCPuVABwdGFdmxiJbHFNs_OwBl6H8gPLygl0-amqj_DxqlfeoTaXfsrs4NpLmwbgDcDegiVpjPpPL3RXPRWbwzLT2IzxL5ZYORhb37V6gpLC6cwl5xkH8fBZCup8Ej8sOmcUqiI2lT1ne9-L5LTZqASWXhetBfRSCWv_n-ux_UCdiY288BDRIWLoKXaN1rnfSQ-tmJqho3UARNgsSeAo1yswvoxStQKCOKf1kV3Z7CQs16Xu-ab2OdWjOLJaJUS1FF53jSdhEoNLYAklhrGB1iySueYkhMpHxa8U9hUGZdWus3Pjw9fmymLPSwMZj_jc74NGjm2p6UbrNHgUv5sSPtXIc6V-UeZ0M8rSRauc7Y7SA3b6OmyllTORIYnLTVLbaXgZJGbVzye_lTAy-17txxnns0tipL_35WTse9cz5tom7LrN44Bu4xIXYtAZzCpFRpDalKgTACg7B6THtctrm0jNwJxopXKIEBayCN0yrg3wOtWdxvx2_IPQbtPr0zCy4s9pRkTjPJSWbL649rTbCnOhnTBN9wof_bQk3E0XooKiRSocGh8rJxrvwrjYYmD_chBlSvnpZNTxN9XaGuC2yyxKDneanuzY6rTVVd9OOhAInnKgYkASP20rj0",
        "expiresIn": "1d"
    }
     */

  // get JWT and put in local storage
  setLocalStorage(responseObj) {
    const expires = moment().add(responseObj.expiresIn);

    localStorage.setItem("token", responseObj.token);
    localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
  }

  // remove the items you put in local storage
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt); //point in time which the JWT expires
  }
}

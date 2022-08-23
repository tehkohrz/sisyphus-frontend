import axios from 'axios';
import { HOST } from './api-host';

class AuthApi {
  async signIn(username, password) {
    try {
      const address = HOST + '/signIn';
      const data = await axios.post(address, { username, password });
      return data;
    } catch (err) {
      // This is where the error message is nested within
      const { errMsg } = err.response.data;
      throw new Error(errMsg);
    }
  }

  async reAuth() {
    try {
      const address = HOST + '/reAuth';
      // Returns success and user within data
      const { data } = await axios.get(address);
      if (data.success) {
        return { success: data.success, user: data.user };
      }
      return { success: data.success };
    } catch (err) {
      console.log(err);
    }
  }

  async logOut() {
    try {
      const address = HOST + '/logout';
      const { data } = await axios.get(address);
      return data.sucess;
    } catch (err) {
      console.log(err);
    }
  }
}
export const authApi = new AuthApi();

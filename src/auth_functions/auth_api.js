import axios from 'axios';

class AuthApi {
  async signIn({ username, password }) {
    try {
      const user = await axios.get('/signIn', { username, password });
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async reAuth() {
    try {
      // Returns success and user within data
      const data = await axios.get('/reAuth');
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async logOut() {
    try {
      const success = await axios.get('/logout');
      return success;
    } catch (err) {
      console.log(err);
    }
  }
}
export const authApi = new AuthApi();

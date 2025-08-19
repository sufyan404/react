/* eslint-disable no-useless-catch */
import conf from '../conf/conf';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //   CREATE ACCOUNT

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //  LOGIN

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //    GET CURRENT USER

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log('No active session:', error);
      return null;
    }
  }

  // LOGOUT

  async logout() {
    try {
      const session = await this.account.getSession('current');
      if (session) {
        return await this.account.deleteSessions();
      }
    } catch (error) {
      console.log('No session to logout from', error);
      return true;
    }
  }
}

const authService = new AuthService();

export default authService;

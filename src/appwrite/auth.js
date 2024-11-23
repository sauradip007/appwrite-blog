import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

//exporting a class because everywhere you have to do account.create -> code improvement
export class AuthService {
  client = new Client(); // wwe could have done set endpoint here but we choose to do ikt as we want the account to be created on instantiation only
  account;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("67044dac00214ffdca86");

    this.account = new Account(this.client);
  }

  //create a wrapper over all appwrite functions

  //irrespective of anyu auth service , even if appwrite goes down , we can use this method for any other authentication service migration eg to firebase to prevent vendor lock in
  // async createAccount({email,password,name})
  // {

  //     try {

  //         const userAccount = await this.account.create(ID.unique(), email,password,name)

  //         if(userAccount) {
  //             // call another method
  //                         const session =
  //                           await this.account.createEmailPasswordSession(
  //                             email,
  //                             password
  //                           );

  //                         this.client.setSession(session);
  //             return this.account.login(email,password)
  //         } else {
  //             return userAccount
  //         }

  //     } catch(error) {
  //         throw error;
  //     }

  // }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call another method
        const session = await this.account.createEmailPasswordSession(
          email,
          password
        );

        this.client.setSession(session);
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const loginAccount = await this.account.createEmailPasswordSession(
        email,
        password
      );

      return loginAccount;
    } catch (error) {
      console.log("User could not be logged in", error.message);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const result = await this.account.deleteSessions(); //deletes all sessions
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService() //ythis is an obj of the class

//all the authoprization related methods are called on account only

//instead of having to instantiate an account object and doing account. on any of the other component simply call the methods of this obj

export default authService
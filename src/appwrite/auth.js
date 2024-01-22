/* eslint-disable no-useless-catch */
import conf from '../conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectID);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name }){
        // eslint-disable-next-line no-useless-catch
        try{
        const userAccount= await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                    //call another method 
            }else{
                return userAccount;
            }
        } catch(error){
            throw error;
        }
    }

    async login({email, password}){
        // eslint-disable-next-line no-useless-catch
        try{
            return await this.account.createEmailSession(email, password);
            // if(userAccount){

            // }else{

            // }
        }catch(error){
            throw error;
        }
    }

    async getCurrentuser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("Appwrite serive :: getCurrentuser :: error", error);
        }

        return null;
    }
    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            console.log("Appwrite serive :: logout :: error", error);
        }
        return null
    }
}

const authService = new AuthService();

export default AuthService;
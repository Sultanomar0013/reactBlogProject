import conf from '../conf/conf.js';
import {Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            
            )
        }catch(error){
            console.log("Appwrite serive :: createPost :: error", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appWriteCollectionID,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch(error){
            console.log("Appwrite serive  :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug
            )
            
            return true;
        }catch(error){
            console.log("Appwrite serive  :: deletePost  :: error", error);
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                slug
            )
        }catch(error){
            console.log("Appwrite serive :: createPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionID,
                queries,
                slug
            )
        }catch(error){
            console.log("Appwrite serive ::  getPosts :: error", error);
            return false;
        }
    }

    //file upload service

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appWriteBucketID,
                ID.unique(),
                file,

            )
        }catch(error){
            console.log("Appwrite service :: uploadFile  :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appWriteBucketID,
                ID.unique(),
                fileId,
                
            )
            return true;
        }catch(error){
            console.log("Appwrite serive  :: deleteFile  :: error", error);
            return false;
        }
    }
    
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketID,
            fileId
        )
    }
}





const service = new Service()

export default service
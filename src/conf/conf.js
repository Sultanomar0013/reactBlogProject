const conf = {
    appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectID:String(import.meta.env.APPWRITE_PROJECT_ID),
    appWriteDatabaseID:String(import.meta.env.APPWRITE_DATABASE_ID),
    appWriteCollectionID:String(import.meta.env.APPWRITE_COLLECTION_ID),
    appWriteBucketID:String(import.meta.env.APPWRITE_BUCKET_ID),
}

export default conf; 
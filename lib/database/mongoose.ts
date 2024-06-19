
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL,"mongodbUrl")

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null
  };
}

export const connectToDatabase = async () => {
  console.log("inside connect to database")
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error('Missing MONGODB_URL');
  }

  if (!cached.promise) {
    console.log("Connecting to the database...");
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: 'FantomGenie',
      bufferCommands: false
    }).then((mongoose) => {
      console.log("Successfully connected to the database");
      return mongoose;
    }).catch((error) => {
      console.error("Error connecting to the database:", error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};














// import mongoose,{Mongoose} from 'mongoose'

// const MONGODB_URL= process.env.MONGODB_URL;

// interface MongooseConnection {
//     conn: Mongoose | null;
//     promise: Promise<Mongoose> | null;
// }

// let cached : MongooseConnection = (global as any).mongoose

// if(!cached){
//     cached= (global as any).mongoose={
//         conn:null, promise:null
//     }
// }

// export const connectToDatabase= async ()=>{
//     if(cached.conn) return cached.conn;

//     if(!MONGODB_URL) throw new Error('Missing MONGODB_URL ')
//     cached.promise=cached.promise || mongoose.connect(MONGODB_URL,{dbName: 'FantomGenie',bufferCommands:false})
// }


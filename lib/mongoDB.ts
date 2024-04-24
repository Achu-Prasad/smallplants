import mongoose from "mongoose"

let isConnected:boolean = false;

export const connectToDB = async() : Promise<void> =>{
    mongoose.set("strictQuery",true)

    if(isConnected) {
        console.log("MongoDB is alredy Connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL || "",{
            dbName:"Collections"
        });
        isConnected = true;
        console.log("MongoDB is Connected")
    }
    catch (err){
        console.log(err)
    }
}
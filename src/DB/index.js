import mongoose from "mongoose";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectDB = async() => {
    const connectionURL = process.env.DB_URL

    mongoose.connect(connectionURL, options)
        .then(() => console.log('Connected to Ecommerce DB'))
        .catch((err) => console.log(err))
}

export default connectDB
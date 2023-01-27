import mongoose from 'mongoose';

const connectDB = async (): Promise<typeof mongoose> => {
  try {

    mongoose.set('strictQuery', true);

    const options = {
      dbName: 'news_db',
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };

    let result = await mongoose.connect('mongodb+srv://mohit:mohit123@cluster0.qqb2t.mongodb.net/?retryWrites=true&w=majority', options);

    result.connection.on('error', (error: Error) => {
      console.error(error.message);
    });

    if (result) {
      console.log('Database connected');
    }

    return result;
  } catch (error: any) {
    console.error(error.message);
    return error;
  }
};
export default connectDB;

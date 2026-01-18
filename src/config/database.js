import mongoose from 'mongoose';

const connect = async () => {
    await mongoose.connect('mongodb://localhost/twitter_dev')
}

export default connect;
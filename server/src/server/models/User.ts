import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  userName: string;
  password: string;
}
const Schema: typeof mongoose.Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export default mongoose.model('User', UserSchema);

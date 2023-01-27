import mongoose from 'mongoose';

export interface AdminDocument {
  name: string;
  email: string;
  password: string;
  date: Date;
}

const AdminSchema: mongoose.Schema<AdminDocument> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const AdminModel = mongoose.model<AdminDocument>('admin', AdminSchema);

export default AdminModel;
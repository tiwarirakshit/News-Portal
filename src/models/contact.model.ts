import mongoose from 'mongoose';

export interface ContactDocument {
  name: string;
  email: string;
  subject: string;
  message: string;
}


const ContactSchema: mongoose.Schema<ContactDocument> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model<ContactDocument>('Contact', ContactSchema);

export default Contact;

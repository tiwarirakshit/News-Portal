import { AdminDocument } from '../models/admin.model';
import AdminModel from '../models/admin.model';


const createAdmin = async (admin: AdminDocument) => {
  try {

    const { name, email, password } = admin;

    const newAdmin = new AdminModel({
      name,
      email,
      password,
    });

    return await newAdmin.save();

  } catch (error: any) {
    throw new Error(error);
  }
};

const getAdminByEmail = async (email: string) => {
  try {

    let admin = await AdminModel.findOne({ email });

    return admin;

  } catch (error: any) {
    throw new Error(error);
  }
};


export default {
  createAdmin,
  getAdminByEmail,
};
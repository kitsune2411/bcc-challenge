import { Request, Response } from "express";
import md5 from "md5";
import { ProfileTable, UserTable } from "../database/UserTable";
import { IUser } from "../types";
import Respon from "../utils/responObject";

export const getProfile = async (req: Request, res: Response) => {
  const { id_user } = req.body;

  const respon = new Respon();

  if (id_user && id_user != "") {
    try {
      const TableProfile = new ProfileTable();

      const profileData = await TableProfile.readByIdUser(id_user);

      if (profileData) {
        respon.success = true;
        respon.message = "User Profile Found";
        respon.data = profileData;
      } else {
        respon.message = "User Profile Does't Exist";
      }
    } catch (error) {
      console.log(error);
      respon.message = "Server Error";
    }
  }

  return res.send(respon);
};

export const editProfile = async (req: Request, res: Response) => {
  let { id_user, username, password } = req.body;

  const respon = new Respon();
  if (
    id_user &&
    id_user != "" &&
    username &&
    username != "" &&
    password &&
    password != ""
  ) {
    try {
      const TableUser = new UserTable();

      const updatedUser: IUser = {
        username: username,
        password: encryptedPassword(password),
      };

      const updating = await TableUser.updateUser(updatedUser);

      if (updating) {
        respon.success = true;
        respon.message = "successfully edited";
      } else {
        respon.message = "failed";
      }
    } catch (error) {
      respon.message = "Server Error";
    }
  }

  return res.send(respon);
};

function encryptedPassword(pass: string) {
  return md5(pass);
}

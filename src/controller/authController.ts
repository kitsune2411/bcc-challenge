import { Request, Response } from "express";
import { UserTable } from "../database/UserTable";
import { IRespon, IUser } from "../types";
import Respon from "../utils/responObject";
import md5 from "md5";

export const registrasi = async (req: Request, res: Response) => {
  let { username, password } = req.body;

  const respon: IRespon = new Respon();

  if (
    username != null &&
    password != null &&
    username !== "" &&
    password !== ""
  ) {
    try {
      const TableUser = new UserTable();

      const newuser: IUser = {
        username: username,
        password: encryptedPassword(password),
      };
      const getAlreadyExistUsername = await TableUser.readByUsername(username);
      const cekUsernameAvailability: Boolean =
        getAlreadyExistUsername?.length! > 0 ? false : true;

      if (cekUsernameAvailability) {
        const creatingUser: IUser = await TableUser.createUser(newuser);
        if (creatingUser.username) {
          respon.success = true;
          respon.message = "Success Register";
          respon.data = { username: creatingUser.username };
        } else {
          respon.message = "Failed Register";
        }
      } else {
        respon.message = "Username Not Available";
      }
    } catch (error) {
      console.log(error);
      respon.message = "Server Error";
    }
  }

  return res.send(respon);
};

export const login = async (req: Request, res: Response) => {
  let { username, password } = req.body;

  const respon: IRespon = new Respon();

  if (
    username != null &&
    password != null &&
    username !== "" &&
    password !== ""
  ) {
    const TableUser = new UserTable();

    try {
      const loggingIn = await TableUser.readByUsernameAndPassword(
        username,
        encryptedPassword(password)
      );
      if (loggingIn) {
        respon.success = true;
        respon.message = "Success Login";
      } else {
        respon.message = "Failed Login";
      }
    } catch (error) {
      console.log(error);
      respon.message = "Server Error";
    }
  }

  return res.send(respon);
};

function encryptedPassword(pass: string) {
  return md5(pass);
}

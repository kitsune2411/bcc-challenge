import { OkPacket, RowDataPacket } from "mysql2";
import { IProfile, IUser } from "../types/users";
import db from "./Connection";

export class UserTable {
  readAll(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      db.query<IUser[] & RowDataPacket[][]>(
        "SELECT * FROM `users`",
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  }

  readById(user_id: number): Promise<IUser | undefined> {
    return new Promise((resolve, reject) => {
      db.query<IUser[] & RowDataPacket[][]>(
        "SELECT * FROM `users` WHERE id = ?",
        [user_id],
        (err, res) => {
          if (err) reject(err);
          resolve(res?.[0]);
        }
      );
    });
  }

  readByUsername(username: string): Promise<IUser[] | undefined> {
    return new Promise((resolve, reject) => {
      db.query<IUser[] & RowDataPacket[][]>(
        "SELECT * FROM `users` WHERE username = ?",
        [username],
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  }

  readByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<IUser | undefined> {
    return new Promise((resolve, reject) => {
      db.query<IUser[] & RowDataPacket[][]>(
        "SELECT * FROM `users` WHERE username = ? AND pass = ?",
        [username, password],
        (err, res) => {
          if (err) reject(err);
          resolve(res?.[0]);
        }
      );
    });
  }

  createUser(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      db.query<OkPacket>(
        "INSERT INTO `users` (`username`, `pass`, `isAdmin`) VALUES ( ?, ?, '0');",
        [user.username, user.password],
        (err, res) => {
          if (err) reject(err);
          this.readById(res.insertId)
            .then((user) => resolve(user!))
            .catch(reject);
        }
      );
    });
  }

  updateUser(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      db.query<OkPacket>(
        "UPDATE `users` SET `username` = ?, `pass` = ? WHERE `user`.`id` = ?",
        [user.username, user.password, user.id],
        (err, res) => {
          if (err) reject(err);
          this.readById(res.insertId)
            .then((user) => resolve(user!))
            .catch(reject);
        }
      );
    });
  }

  createAdmin(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      db.query<OkPacket>(
        "INSERT INTO `users` (`username`, `pass`, `isAdmin`) VALUES ( ?, ?, '1');",
        [user.username, user.password],
        (err, res) => {
          if (err) reject(err);
          this.readById(res.insertId)
            .then((user) => resolve(user!))
            .catch(reject);
        }
      );
    });
  }
}

export class ProfileTable {
  readByIdUser(id_user: number): Promise<IProfile | undefined> {
    return new Promise((resolve, reject) => {
      db.query<IProfile[] & RowDataPacket[][]>(
        "SELECT `username`, `full_name`, `age`, `gender` FROM `profiles` INNER JOIN users ON profiles.id_user = users.id WHERE users.id = ?;",
        [id_user],
        (err, res) => {
          if (err) reject(err);
          resolve(res?.[0]);
        }
      );
    });
  }
}

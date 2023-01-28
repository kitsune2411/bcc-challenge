import { IRespon } from "../types";

export default class respon implements IRespon {
  success = false;
  message = "Invalid parameter";
  data?: unknown;
}

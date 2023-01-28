import { Router, Request, Response, NextFunction } from "express";
import { login, registrasi } from "../controller/authController";
import { getProfile } from "../controller/profileController";
const router = Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Controll-Allow-Headers",
    "authorization, Oringin, Content-Type, Accept"
  );
  next();
});

router.get("/", (req: Request, res: Response): void => {
  res.send("ts ni");
});
router.post("/register", registrasi);
router.post("/login", login);
router.get("/profile", getProfile);

export default router;

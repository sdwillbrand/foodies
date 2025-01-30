import { verifyJwt } from "../libs/auth.js";

export async function checkJWT(req, res, next) {
  const token = req.cookies["jwt"];
  const payload = verifyJwt(token);
  if (!payload) {
    res.sendStatus(401);
    return;
  } else {
    req.user = payload.id;
    next();
  }
}

export async function checkUser(req, res, next) {
  const token = req.cookies["jwt"];
  const payload = verifyJwt(token);
  if (payload) {
    req.user = payload.id;
  }
  next();
}

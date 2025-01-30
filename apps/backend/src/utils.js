export function createToken(user) {
  const { JWT_SECRET } = process.env;

  const payload = {
    uid: user._id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };
  const token = jwt.sign(payload, JWT_SECRET);

  return token;
}

import jwt from "jsonwebtoken";

const fetchuser = async (req, res, next) => {
  const token = await req.headers["auth-token"];
  if (!token) {
    return res.status(401).json({ message: "JWT Authentication Failed" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.id = await decoded.id;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

export default fetchuser;

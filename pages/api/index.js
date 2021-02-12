import { connectToDatabase } from "../../utils/mongodb";
import * as admin from "firebase-admin";
import serviceAccount from "../../utils/test-admin-f6680-firebase-adminsdk-gcfsb-453d45acad.json";

export default async (req, res) => {
  const {
    body: { token },
  } = req;
  try {
    const { db } = await connectToDatabase();
    if (req.method === "POST" && token) {
      const isTokenExists = await db.collection("apptokens").findOne({ token });
      if (isTokenExists) {
        res.statusCode = 200;
        res.json({ message: "Token exists" });
      } else {
        await db
          .collection("apptokens")
          .insertOne({ token, createdAt: new Date() });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Token added" });
      }
    } else {
      res.statusCode = 400;
      res.json({ error: `Token is undefined` });
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.json({ error: `Something went wrong. ${e}` });
  }
};

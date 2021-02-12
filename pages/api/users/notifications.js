import { connectToDatabase } from "../../../utils/mongodb";
import * as admin from "firebase-admin";

export default async (req, res) => {
  const {
    body: { user },
  } = req;
  try {
    const { db } = await connectToDatabase();
    if (req.method === "POST" && user) {
      const tokensDB = await db
        .collection("apptokens")
        .find({})
        .sort({ metacritic: -1 })
        .toArray();

      console.log(tokensDB);
      let array = [];
      tokensDB.forEach((element) => {
        array.push(element.token);
      });

      console.log(array);

      await admin.messaging().sendMulticast({
        tokens: array,
        notification: {
          title: `Notification from ${user}`,
          body: `This is a basic notification sent from ${user}`,
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "Notification sent" });
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.json({ error: `Something went wrong. ${e}` });
  }
};

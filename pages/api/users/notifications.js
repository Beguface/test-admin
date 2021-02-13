import { connectToDatabase } from "../../../utils/mongodb";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
        clientEmail: process.env.CLIENT_EMAIL,
      }),
    });
  } catch (e) {
    console.log(e);
  }
}

export default async (req, res) => {
  const {
    body: { user },
  } = req;
  try {
    const { db } = await connectToDatabase();
    if (req.method === "POST" && user) {
      const tokensDB = await db
        .collection("apptokens")
        .find()
        .project({ _id: 0, token: 1 })
        .toArray();

      let tokens = [];

      tokensDB.forEach(({ token }) => {
        tokens.push(token);
      });

      await admin.messaging().sendMulticast({
        tokens,
        notification: {
          title: `Notification from ${user}`,
          body: `This is a basic notification sent from ${user}`,
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: `Notification sent to ${user}` });
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.json({ error: `Something went wrong. ${e}` });
  }
};

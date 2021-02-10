import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const users = await db
      .collection("users")
      .find({})
      .sort({ metacritic: -1 })
      .toArray();
    const lenght = users.length;
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ lenght, data: users });
  } catch (error) {
    console.error(e);
    res.status(404).end();
  }
};

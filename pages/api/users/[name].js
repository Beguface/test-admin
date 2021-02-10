import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  const {
    query: { name },
  } = req;

  try {
    const { db } = await connectToDatabase();
    switch (req.method) {
      case "POST": {
        const newUser = await db
          .collection("users")
          .insertOne({ name: name.toLowerCase(), createdAt: new Date() });
        const lenght = newUser.ops.length;
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ lenght, data: newUser.ops });
        break;
      }
      case "GET": {
        const user = await db.collection("users").findOne({ name });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ data: user });

        break;
      }
    }
  } catch (error) {
    console.error(e);
    res.statusCode = 500;
    res.json({ length: 0, data: [], error: "Something went wrong" });
  }
};

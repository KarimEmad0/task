import dbConnect from "../../../utils/dbconnect";
import clients from "../../../models/client";
dbConnect();
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const client = await clients.find();
        res.status(200).json({ success: true, data: client });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const client = await clients.create(req.body);
        res.status(200).json({ success: true, data: client });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}

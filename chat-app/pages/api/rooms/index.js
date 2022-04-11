import dbConnect from "../../../utils/dbconnect";
import rooms from "../../../models/room";
dbConnect();
export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const room = await rooms.create(req.body);
        res.status(200).json({ success: true, data: room });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const room = await rooms.find().sort("created_at").where({ open: 0 });
        res.status(200).json({ success: true, data: room });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};

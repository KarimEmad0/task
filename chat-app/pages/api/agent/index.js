import dbConnect from "../../../utils/dbconnect";
import agents from "../../../models/agent";
dbConnect();
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const agent = await agents.create(req.body);
        res.status(200).json({ data: agent });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const agent = await agents.findOne();
        if (!agent) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: agent });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}

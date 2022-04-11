import dbConnect from "../../../utils/dbconnect";
import clients from "../../../models/client";
dbConnect();
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const client = await clients.findById(id);
        if (!client) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: client });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};

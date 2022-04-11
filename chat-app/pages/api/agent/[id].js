import dbConnect from "../../../utils/dbconnect";
import agents from "../../../models/agent";
dbConnect();
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const agent = await agents.findById(id);
        if (!agent) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ data: agent });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};

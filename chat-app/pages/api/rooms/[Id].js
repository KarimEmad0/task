import dbConnect from "../../../utils/dbconnect";
import rooms from "../../../models/room";
dbConnect();
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "PUT":
      try {
        const room = await rooms.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!room) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: room });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const room = await rooms.find();
        res.status(200).json({ success: true, data: room });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      break;
    default:
      res.status(400).json({ success: false });
  }
};

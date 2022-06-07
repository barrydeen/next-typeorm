import type { NextApiRequest, NextApiResponse } from "next";
import ensureConnection from "../../../database";
import { User } from "../../../database/entities";
import ShowUserDTO from "./dto/show.dto";

ensureConnection();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  const user = await User.findOne(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(new ShowUserDTO(user));
}

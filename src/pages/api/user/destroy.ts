import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../database/entities/User";
import { ensureConnection } from "../../../database/index";

ensureConnection();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const user: User | undefined = await User.findOne({ id: req.body.id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.remove();
  return res.status(200).json({ message: "User deleted" });
}

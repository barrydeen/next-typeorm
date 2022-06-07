import { NextApiRequest, NextApiResponse } from "next";
import { ensureConnection } from "../../../database/index";
import { User } from "../../../database/entities/User";
import UpdateUserDTO from "./dto/update.dto";

ensureConnection();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let user: User | undefined = await User.findOne({ id: req.body.id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updateUserDTO: UpdateUserDTO = new UpdateUserDTO(req.body);
  console.log(updateUserDTO);

  await User.save(updateUserDTO as any);

  return res.status(203).json(updateUserDTO);
}

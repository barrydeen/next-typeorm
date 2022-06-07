import type { NextApiRequest, NextApiResponse } from "next";
import ensureConnection from "../../../database";
import { User } from "../../../database/entities";
import StoreUserDTO from "./dto/store.dto";
import ShowUserDTO from "./dto/show.dto";
import { validate } from "class-validator";

ensureConnection();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const storeUserDTO: StoreUserDTO = req.body;
    let newUser = User.create(storeUserDTO);

    const validationErrors = await validate(newUser);

    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: validationErrors });
    }

    newUser = await newUser.save();

    const showUserDto: ShowUserDTO = new ShowUserDTO(newUser);

    return res.status(201).json(showUserDto);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

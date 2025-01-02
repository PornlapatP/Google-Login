import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/google`);
}

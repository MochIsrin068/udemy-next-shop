import cookie from "cookie";
import { fetchJson } from "@/lib/api";

const { CMS_URL } = process.env;

const handleRegister = async (req: any, res: any) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { email, password, username } = req.body;

  try {
    const { user, jwt } = await fetchJson(`${CMS_URL}/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });

    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          path: "/api",
          httpOnly: false,
        })
      )
      .json({
        id: user.id,
        name: user.username,
      });
  } catch (error) {
    res.status(401).end();
  }
};

export default handleRegister;

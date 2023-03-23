import cookie from "cookie";
import { fetchJson } from "@/lib/api";

const { CMS_URL } = process.env;

const handlerLogin = async (req: any, res: any) => {
  if (req.method !== "POST") {
    // Process a POST request
    res.status(405).end();
    return;
  }
  console.log("req data login", req.body);

  const { email, password } = req.body;

  try {
    const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });
    // SET JWT COOKIES

    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          path: "/api",
          httpOnly: true, // not be acces a cookie from the client / browser beaciuse the http only
        })
      ) // set cookies ( cookies serialize is parsing the object to serialize = )
      .json({
        id: user.id,
        name: user.username,
      });
  } catch (error) {
    res.status(401).end();
  }
};

export default handlerLogin;

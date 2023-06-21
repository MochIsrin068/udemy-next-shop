import Button from "@/components/Button";
import Field from "@/components/Field";
import Input from "@/components/Input";
import Page from "@/components/Page";
import { fetchJson } from "@/lib/api";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRegister } from "@/hooks/user";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const { register, registerError, resgiterLoading } = useRegister();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const valid = await register(userName, email, password);
    if (valid) {
      router.push("/");
    }
  };

  return (
    <Page title="Register">
      <form onSubmit={handleSubmit}>
        <Field label="Username">
          <Input
            type="text"
            value={userName}
            onChange={(event: any) => setUserName(event.target.value)}
            required
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            value={email}
            onChange={(event: any) => setEmail(event.target.value)}
            required
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            onChange={(event: any) => setPassword(event.target.value)}
            required
          />
        </Field>
        {registerError && <p className="text-red-700">Invalid creadential</p>}
        {resgiterLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Register</Button>
        )}
      </form>
    </Page>
  );
}

import Button from "@/components/Button";
import Field from "@/components/Field";
import Input from "@/components/Input";
import Page from "@/components/Page";
import { fetchJson } from "@/lib/api";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { useSigIn } from "@/hooks/user";
// import { useSigIn } from "@/hooks/useSignin";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [status, setStatus] = useState({
  //   loading: false,
  //   error: false,
  // });

  // const queryClient = useQueryClient();
  // const mutation = useMutation(() =>
  //   fetchJson("/api/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   })
  // );

  // const mutation = useMutation(({email, password}: any) =>
  //   fetchJson("/api/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   })
  // );

  const { signIn, signInError, signInLoading } = useSigIn();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const valid = await signIn(email, password);
    if (valid) {
      router.push("/");
    }

    // console.log("CMS URL", process.env.CMS_URL); // not found in clientside, solution is make NEXT_PUBLIC_{{env name}}
    // setStatus({
    //   error: false,
    //   loading: true,
    // });
    // try {
    // const user = await mutation.mutateAsync();
    // const user = await mutation.mutateAsync({email, password});
    // queryClient.setQueryData("user", user); // for refresh the user data with call the key from useQuery

    // await signIn(email, password)

    // const response = await fetchJson("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });
    // setStatus({
    //   error: false,
    //   loading: false,
    // });

    // router.push("/");
    // console.log("sign in:", user);
    // console.log("sign in:", response);
    // } catch (error) {
    // setStatus({
    //   error: true,
    //   loading: false,
    // });
    // mutation wiill be true
    // }
  };

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
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
        {/* {status.error && <p className="text-red-700">Invalid creadential</p>} */}
        {/* {mutation.isError && (
          <p className="text-red-700">Invalid creadential</p>
        )} */}
        {signInError && <p className="text-red-700">Invalid creadential</p>}
        {/* {status.loading ? ( */}
        {/* {mutation.isLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )} */}
        {signInLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
}

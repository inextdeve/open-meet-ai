"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { data: session } = authClient.useSession();

  const onSubmit = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        // image:"", // User image URL (optional)
        // callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log("Success ✅");
        },
        onError: (ctx) => {
          // display the error message
          console.log("❌Error", ctx.error.message);
        },
      }
    );
  };

  const SignOut = async () => {
    await authClient.signOut();
  };

  if (session) {
    return (
      <div>
        <Badge color="green">Signed In</Badge>
        {session.user.name}

        <Button onClick={SignOut}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col gap-2">
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="cursor-pointer" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}

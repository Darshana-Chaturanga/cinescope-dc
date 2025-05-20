"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { EMAIL_REGEX } from "@/lib/constants";
import { signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

//this is client side rendering component (CSR)
//Client Component
export function LoginForm() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(DEFAULT_ERROR);

  const validateForm = ({ email, password }) => {
    if (email === "") {
      setError({
        error: true,
        message: "Email is required",
      });
      return false;
    } else if (password === "") {
      setError({
        error: true,
        message: "Password is required",
      });
      return false;
    } else if (!EMAIL_REGEX.test(email)) {
      setError({
        error: true,
        message: "Email is invalid",
      });
      return false;
    }

    setError(DEFAULT_ERROR);

    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault(); //prevent default submission

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Validate : ", validateForm({ email, password }));

    if (validateForm({ email, password })) {
      await signIn.email(
        { email, password },
        {
          onSuccess: () => {
            setLoading(false);
            redirect("/admin");
          },
          onError: (ctx) => {
            setError({
              error: true,
              message: ctx.error.message,
            });
            setLoading(false);
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                ></Input>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center ">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forget-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
              {/* Error message here */}
              <div className="flex justify-center">
                {error.error && (
                  <span className="text-red-600 text-xs text-center animate-pulse duration-700">
                    {error.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading &&<Loader2 className="animate-spin"/>}Login
                </Button>
                <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { login } from "@/actions/auth";
import { loginSchema } from "@/lib/validations";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Get callbackUrl from query string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsPending(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("remember", values.remember ? "on" : "off");

      const result = await login(null, formData);

      if (!result.success) {
        setError(result.message || "Invalid email or password");
        setIsPending(false);
        return;
      }

      // Login successful, redirect will be handled by the login action
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setIsPending(false);
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-6">Log In</h1>
        <p className="text-gray-500">Welcome back to Simbrella Admin</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter address"
                    className="mt-1 mb-8 block h-12 w-full rounded-md border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#2d3192] hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="mt-1 mb-8 block h-12 w-full rounded-md border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                    className="border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel className="text-sm font-normal">
                    Remember me
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 bg-[#FF931d] hover:bg-[#e88c1d] text-white mb-3"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} /> Logging
                in...
              </>
            ) : (
              "Log In"
            )}
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#2d3192] hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}

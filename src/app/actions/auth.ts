"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success:
      "Account created! Check your email to confirm your account, then sign in.",
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const fullName = formData.get("fullName") as string | null;
  if (!fullName?.trim()) return { error: "Name is required" };
  const { error } = await supabase.auth.updateUser({
    data: { full_name: fullName.trim() },
  });
  if (error) return { error: error.message };
  return { success: true };
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  if (!newPassword || newPassword.length < 6)
    return { error: "Password must be at least 6 characters" };
  if (newPassword !== confirmPassword)
    return { error: "Passwords do not match" };
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: error.message };
  return { success: true };
}

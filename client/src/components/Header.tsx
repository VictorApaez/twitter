"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { extractNameFromEmail } from "../utils/extractNameFromEmail.js";

export const Header = () => {
  const { user } = useUser();

  return (
    <header className="bg-white shadow-sm fixed top-0 inset-x-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        <a href="/" className="text-lg font-bold text-blue-600">
          Twitter
        </a>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold">
                Welcome back, {extractNameFromEmail(user.name)}!
              </span>
              <a
                href="/api/auth/logout"
                className="text-sm text-blue-600 hover:underline"
              >
                Log out
              </a>
            </div>
          ) : (
            <a
              href="/api/auth/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Sign in
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

"use client";
import React from "react";
import { AuthModalProvider } from "@/context/AuthModalProvider";
import NewsFeed from "../../../components/newsfeed/NewsFeed";

export default function Feed() {
  return (
    <AuthModalProvider>
      <NewsFeed />
    </AuthModalProvider>
  );
}

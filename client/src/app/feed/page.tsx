"use client";
import { CreatePost } from "./post/CreatePost";
import React, { useState } from "react";
import Icon from "../../components/Icon";
import { Post } from "./post/Post";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { AuthModal } from "@/components/AuthModal";

const posts = [
  {
    id: 2,
    author: "Jane Smith",
    content: "Here is another post for the feed!",
    timestamp: "1d",
    likes: 45,
    comments: [
      {
        id: 1,
        author: "John Doe",
        content: "Thanks for sharing, Jane.",
        timestamp: "18h",
        likes: 12,
        replies: [
          {
            id: 1,
            author: "Alice Johnson",
            content: "It's an interesting post.",
            timestamp: "12h",
            likes: 12,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    author: "Emma Wilson",
    content: "Check out my latest travel photos!",
    timestamp: "2h",
    likes: 98,
    comments: [
      {
        id: 2,
        author: "Bob Brown",
        content: "Wow! Looks amazing, Emma!",
        timestamp: "1h",
        likes: 30,
        replies: [
          {
            id: 2,
            author: "Sophia Davis",
            content: "Where is this place?",
            timestamp: "45m",
            likes: 5,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    author: "Alex Johnson",
    content: "Anyone up for a weekend hiking trip?",
    timestamp: "3d",
    likes: 53,
    comments: [
      {
        id: 3,
        author: "Liam Taylor",
        content: "Count me in!",
        timestamp: "2d",
        likes: 10,
        replies: [
          {
            id: 3,
            author: "Olivia Brown",
            content: "Sounds fun! What's the plan?",
            timestamp: "1d",
            likes: 7,
          },
        ],
      },
    ],
  },
];

export default function Feed() {
  const { user, error, isLoading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-xl mx-4 my-16 md:mx-auto">
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {user && <div>Hi, {user.name}</div>}
      <a href="/api/auth/login">Log in</a>
      <a href="/api/auth/logout"> LOG OUT </a>
      <a href="/api/auth/signup">Sign Up</a>
      {/* New Post Section */}
      <CreatePost />

      {/* Posts */}
      {posts.map((post, i) => (
        <Post post={post} key={i} />
      ))}
    </div>
  );
}

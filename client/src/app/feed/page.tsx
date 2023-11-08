"use client";

import { CreatePost } from "./components/post/CreatePost";
import React from "react";
import Icon from "../../components/Icon";
import { Post } from "./components/post/Post";

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
  return (
    <div className="max-w-xl mx-4 md:mx-auto">
      {/* New Post Section */}
      <CreatePost />

      {/* Posts */}
      {posts.map((post, i) => (
        <Post post={post} key={i} />
      ))}
    </div>
  );
}

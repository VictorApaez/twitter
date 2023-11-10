import React from "react";
export function CreatePost({}) {
  return (
    <div className="mb-10 bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-4">Create a New Post</h3>
      <textarea
        placeholder="What's on your mind?"
        className="w-full p-3 border rounded mb-4 resize-none"
        rows={4}
      ></textarea>
      <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
        Post
      </button>
    </div>
  );
}

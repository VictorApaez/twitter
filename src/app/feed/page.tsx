import React from "react";
import Icon from "../../../components/Icon";
const posts = [
  {
    id: 1,
    author: "John Doe",
    content:
      "The best way to get better at coding isn't to learn yet another programming language. The best way to get better at coding isn't to hyper-optimize your IDE workflow",
    timestamp: "2h",
    likes: 123,
    comments: [
      {
        id: 1,
        author: "Jane Smith",
        content:
          "The best way to get better at coding isn't to learn yet another programming language. The best way to get better at coding isn't to hyper-optimize your IDE workflow",
        timestamp: "1h",
        replies: [
          {
            id: 1,
            author: "John Doe",
            content:
              "The best way to get better at coding isn't to learn yet another programming language. The best way to get better at coding isn't to hyper-optimize your IDE workflow",
            timestamp: "45m",
          },
          {
            id: 2,
            author: "Alice Johnson",
            content: "I agree with you, Jane.",
            timestamp: "30m",
          },
        ],
      },
      {
        id: 2,
        author: "Alice Johnson",
        content: "I agree with Jane.",
        timestamp: "1h",
        replies: [
          {
            id: 1,
            author: "John Doe",
            content: "Thanks, Alice!",
            timestamp: "20m",
          },
        ],
      },
    ],
  },
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
        replies: [
          {
            id: 1,
            author: "Alice Johnson",
            content: "It's an interesting post.",
            timestamp: "12h",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    author: "Alice Johnson",
    content: "Hello world from my awesome post.",
    timestamp: "2d",
    likes: 67,
    comments: [],
  },
];

export default function Feed() {
  return (
    <div className="max-w-xl mx-4 md:mx-auto">
      {/* New Post Section */}
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

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="mb-8 bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between">
            <div>
              <h3 className="text-md font-bold mb-2">{post.author}</h3>
              <p className="mb-4 text-sm">{post.content}</p>
            </div>
            <span className="text-sm text-gray-500 block mb-4">
              {post.timestamp}
            </span>
          </div>

          {/* Likes and Comments Count */}
          <div className="mb-4 flex justify-between text-xs">
            <span>{post.likes} Likes</span>
            <span>{post.comments.length} Comments</span>
          </div>

          {/* Action Buttons */}
          <div className="mb-4 flex justify-between border-t p-2">
            <Icon id="thumbs-up"></Icon>
            <button>Like</button>
            <button>Comment</button>
            <button>Share</button>
          </div>

          <div>
            {/* Comment Input */}
            <div className="mb-4">
              <textarea
                placeholder="Leave a comment..."
                className="w-full p-2 border rounded-lg resize-none"
                rows={2}
              ></textarea>
            </div>

            {/* Comments Section */}
            {post.comments.map((comment) => (
              <div key={comment.id} className="mb-3">
                <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-start">
                  <div>
                    <h5 className="text-sm font-bold mb-2">{comment.author}</h5>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {comment.timestamp}
                  </span>
                </div>
                <div className="mt-1 mb-2 pl-3 flex items-center">
                  <button className="text-xs">Like</button>
                  <span className="border-l h-4 mx-2 border-gray-200"></span>
                  <button className="text-xs">Reply</button>
                </div>

                {/* Replies Section */}
                {comment.replies.map((reply) => (
                  <div key={reply.id} className=" ml-6">
                    <div className="mt-2 p-4 bg-gray-100 rounded-lg flex justify-between items-start">
                      <div>
                        <h6 className="text-sm font-bold mb-2">
                          {reply.author}
                        </h6>
                        <p className="text-sm">{reply.content}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {reply.timestamp}
                      </span>
                    </div>
                    <div className="mt-1 mb-2 pl-3 flex items-center">
                      <button className="text-xs">Like</button>
                      <span className="border-l border-gray-200 h-4 mx-2"></span>
                      <button className="text-xs">Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

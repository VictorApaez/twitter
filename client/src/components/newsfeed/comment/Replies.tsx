import React from "react";
import { RepliesProps } from "../../../typeDefs/feedTypes";

export const Replies: React.FC<RepliesProps> = ({ replies }) => {
  return (
    <div>
      {replies.map((reply, i) => (
        <div key={reply.id} className=" ml-6">
          <div className="mt-2 p-4 bg-gray-100 rounded-lg flex justify-between items-start">
            <div>
              <h6 className="text-sm font-bold mb-2">{reply.author}</h6>
              <p className="text-sm">{reply.content}</p>
            </div>
            <span className="text-xs text-gray-500">{reply.timestamp}</span>
          </div>
          <div className="mt-1 mb-2 pl-3 flex items-center">
            <button className="text-xs">Like</button>
            <span className="border-l border-gray-200 h-4 mx-2"></span>
            <button className="text-xs">Reply</button>
          </div>
        </div>
      ))}
    </div>
  );
};

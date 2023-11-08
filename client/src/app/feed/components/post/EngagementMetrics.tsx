import React from "react";
import { EngagementMetricsProps } from "../../../typeDefs/feedTypes";

export const EngagementMetrics: React.FC<EngagementMetricsProps> = ({
  post,
  onCommentsClick,
}) => {
  return (
    <div className="mb-4 flex justify-between text-xs">
      <span className="cursor-pointer">{post.likes} Likes</span>
      <span className="cursor-pointer" onClick={onCommentsClick}>
        {post.comments.length} Comments
      </span>
    </div>
  );
};

import React from "react";

export interface ReplyType {
  author: string;
  content: string;
  id: number;
  timestamp: string;
  likes: number;
}

export interface CommentType {
  author: string;
  content: string;
  id: number;
  timestamp: string;
  likes: number;
  replies: ReplyType[];
}

export interface PostType {
  author: string;
  content: string;
  id: number;
  timestamp: string;
  likes: number;
  comments: CommentType[];
}
export interface PostProps {
  post: PostType;
}

export interface PostCommentsProps {
  comments: CommentType[];
  showComments: boolean;
  commentInputRef: React.RefObject<HTMLTextAreaElement>;
}

export interface CommentProps {
  comment: CommentType;
}

export interface RepliesProps {
  replies: ReplyType[];
}

export interface EngagementMetricsProps {
  post: PostType;
  onCommentsClick: () => void;
}

export interface CreateCommentProps {
  commentInputRef: React.RefObject<HTMLTextAreaElement>;
}

export interface PostActionButtonsProps {
  handleCommentInputFocus: () => void;
  showComments: () => void;
}

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

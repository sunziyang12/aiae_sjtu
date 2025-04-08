import { ReactNode } from 'react';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  title?: string;
  isFollowing: boolean;
  posts?: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  isBookmarked: boolean;
  isLiked: boolean;
  category?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isEdited: boolean;
  replies?: Comment[];
}

export interface Category {
  id: string;
  name: string;
}

export interface SortOption {
  id: string;
  name: string;
}

export interface ShareOption {
  id: string;
  name: string;
  icon: ReactNode;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
} 
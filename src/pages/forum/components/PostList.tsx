import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Chip, IconButton, Pagination } from '@mui/material';
import { Favorite, FavoriteBorder, Bookmark, BookmarkBorder, Share, Flag, Comment } from '@mui/icons-material';
import styles from '../styles/ForumPage.module.css';
import { Post } from '../types';

export interface PostListProps {
  posts: Post[];
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onViewPost: (postId: string) => void;
  onShare: (post: Post) => void;
  onReport: (post: Post) => void;
  onFollow: (userId: string) => void;
  onComment: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  page,
  totalPages,
  onPageChange,
  onLike,
  onBookmark,
  onViewPost,
  onShare,
  onReport,
  onFollow,
  onComment,
}) => {
  return (
    <Box className={styles.postList}>
      {posts.map((post) => (
        <Card key={post.id} className={styles.postCard}>
          <CardContent>
            <Box className={styles.postHeader}>
              <Box className={styles.authorInfo}>
                <Avatar
                  src={post.author.avatar}
                  alt={post.author.name}
                  className={styles.authorAvatar}
                />
                <Box>
                  <Typography variant="subtitle1" className={styles.authorName}>
                    {post.author.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {post.createdAt}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                size="small"
                onClick={() => onFollow(post.author.id)}
                className={styles.followButton}
              >
                {post.author.isFollowing ? '取消关注' : '关注'}
              </IconButton>
            </Box>

            <Typography variant="h6" className={styles.postTitle}>
              {post.title}
            </Typography>
            <Typography variant="body1" className={styles.postContent}>
              {post.content}
            </Typography>

            <Box className={styles.postTags}>
              {post.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" className={styles.tag} />
              ))}
            </Box>

            <Box className={styles.postActions}>
              <IconButton
                size="small"
                onClick={() => onLike(post.id)}
                className={styles.actionButton}
              >
                {post.isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
                <Typography variant="caption">{post.likes}</Typography>
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onComment(post)}
                className={styles.actionButton}
              >
                <Comment />
                <Typography variant="caption">{post.comments}</Typography>
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onBookmark(post.id)}
                className={styles.actionButton}
              >
                {post.isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onShare(post)}
                className={styles.actionButton}
              >
                <Share />
                <Typography variant="caption">{post.shares}</Typography>
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onReport(post)}
                className={styles.actionButton}
              >
                <Flag />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Box className={styles.pagination}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={onPageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default PostList; 
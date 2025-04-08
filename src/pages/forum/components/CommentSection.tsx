import React from 'react';
import { Box, Typography, Avatar, IconButton, TextField, Button } from '@mui/material';
import { Favorite, FavoriteBorder, Reply, Edit, Delete, Send } from '@mui/icons-material';
import styles from '../styles/ForumPage.module.css';
import { Comment } from '../types';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: () => void;
  onLikeComment: (commentId: string) => void;
  onReplyComment: (comment: Comment) => void;
  onEditComment: (comment: Comment) => void;
  onDeleteComment: (comment: Comment) => void;
  onFollow: (userId: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  onAddComment,
  onLikeComment,
  onReplyComment,
  onEditComment,
  onDeleteComment,
  onFollow,
}) => {
  const renderComment = (comment: Comment, isReply = false) => (
    <Box key={comment.id} className={`${styles.comment} ${isReply ? styles.reply : ''}`}>
      <Box className={styles.commentHeader}>
        <Box className={styles.commentAuthor}>
          <Avatar src={comment.author.avatar} alt={comment.author.name} />
          <Box>
            <Typography variant="subtitle2">{comment.author.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {comment.createdAt}
            </Typography>
          </Box>
        </Box>
        <Box className={styles.commentActions}>
          <IconButton
            size="small"
            onClick={() => onLikeComment(comment.id)}
            className={styles.actionButton}
          >
            {comment.isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
            <Typography variant="caption">{comment.likes}</Typography>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onReplyComment(comment)}
            className={styles.actionButton}
          >
            <Reply />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onEditComment(comment)}
            className={styles.actionButton}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDeleteComment(comment)}
            className={styles.actionButton}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="body2" className={styles.commentContent}>
        {comment.content}
      </Typography>
      {comment.isEdited && (
        <Typography variant="caption" color="text.secondary" className={styles.editedLabel}>
          已编辑
        </Typography>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <Box className={styles.replies}>
          {comment.replies.map((reply) => renderComment(reply, true))}
        </Box>
      )}
    </Box>
  );

  return (
    <Box className={styles.commentSection}>
      <Typography variant="h6" className={styles.commentSectionTitle}>
        评论 ({comments.length})
      </Typography>
      <Box className={styles.commentInput}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="写下你的评论..."
          variant="outlined"
          className={styles.commentTextField}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<Send />}
          onClick={onAddComment}
          className={styles.submitCommentButton}
        >
          发表评论
        </Button>
      </Box>
      <Box className={styles.commentsList}>
        {comments.map((comment) => renderComment(comment))}
      </Box>
    </Box>
  );
};

export default CommentSection; 
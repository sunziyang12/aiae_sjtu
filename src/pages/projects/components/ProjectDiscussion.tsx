import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import { Send as SendIcon, ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { Comment } from '../types';
import styles from '../styles/ProjectPage.module.css';

interface ProjectDiscussionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  onLikeComment: (commentId: number) => void;
}

const ProjectDiscussion: React.FC<ProjectDiscussionProps> = ({
  comments,
  onAddComment,
  onLikeComment,
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <Box className={styles.discussionSection}>
      <Typography variant="h6" className={styles.discussionTitle}>
        项目讨论
      </Typography>

      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="分享你的想法..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={styles.commentInput}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          className={styles.submitButton}
          disabled={!newComment.trim()}
        >
          发表评论
        </Button>
      </form>

      <List className={styles.commentList}>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start" className={styles.commentItem}>
              <ListItemAvatar>
                <Avatar src={comment.user.avatar} alt={comment.user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box className={styles.commentHeader}>
                    <Typography variant="subtitle2" className={styles.commentUser}>
                      {comment.user.name}
                    </Typography>
                    <Typography variant="caption" className={styles.commentTime}>
                      {comment.time}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" className={styles.commentContent}>
                      {comment.content}
                    </Typography>
                    <Box className={styles.commentActions}>
                      <IconButton
                        size="small"
                        onClick={() => onLikeComment(comment.id)}
                        className={styles.likeButton}
                      >
                        <ThumbUpIcon fontSize="small" />
                        <Typography variant="caption" className={styles.likeCount}>
                          {comment.likes || 0}
                        </Typography>
                      </IconButton>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ProjectDiscussion; 
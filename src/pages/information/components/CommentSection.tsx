import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  Reply as ReplyIcon,
} from '@mui/icons-material';

export interface Comment {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createTime: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string, replyTo?: number) => void;
  onLikeComment: (commentId: number) => void;
  onDeleteComment: (commentId: number) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  onLikeComment,
  onDeleteComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedComment, setSelectedComment] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim(), replyTo || undefined);
      setNewComment('');
      setReplyTo(null);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, commentId: number) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedComment(commentId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedComment(null);
  };

  const handleDelete = () => {
    if (selectedComment) {
      onDeleteComment(selectedComment);
      handleMenuClose();
    }
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <Box key={comment.id} sx={{ mb: isReply ? 0 : 2 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar
          src={comment.userAvatar}
          alt={comment.userName}
          sx={{ width: 40, height: 40 }}
        >
          {comment.userName[0]}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 0.5 }}
          >
            <Typography variant="subtitle2">
              {comment.userName}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => handleMenuOpen(e, comment.id)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {comment.content}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography variant="caption" color="text.secondary">
              {comment.createTime}
            </Typography>
            <Button
              size="small"
              startIcon={<ThumbUpIcon />}
              onClick={() => onLikeComment(comment.id)}
              color={comment.isLiked ? 'primary' : 'inherit'}
              sx={{ minWidth: 'auto' }}
            >
              {comment.likes}
            </Button>
            {!isReply && (
              <Button
                size="small"
                startIcon={<ReplyIcon />}
                onClick={() => setReplyTo(comment.id)}
                sx={{ minWidth: 'auto' }}
              >
                回复
              </Button>
            )}
          </Stack>
          {comment.replies && (
            <Stack spacing={2} sx={{ ml: 2, mt: 2 }}>
              {comment.replies.map((reply) => renderComment(reply, true))}
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        评论 ({comments.length})
      </Typography>

      {/* 评论列表 */}
      <Stack divider={<Divider />} spacing={2}>
        {comments.map((comment) => renderComment(comment))}
      </Stack>

      {/* 评论输入框 */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {replyTo && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              回复：{comments.find(c => c.id === replyTo)?.userName}
            </Typography>
            <Button
              size="small"
              onClick={() => setReplyTo(null)}
            >
              取消回复
            </Button>
          </Box>
        )}
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder={replyTo ? "写下你的回复..." : "写下你的评论..."}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!newComment.trim()}
          sx={{
            alignSelf: 'flex-end',
            borderRadius: 2,
          }}
        >
          {replyTo ? '回复' : '发表评论'}
        </Button>
      </Box>

      {/* 评论操作菜单 */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          删除
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CommentSection; 
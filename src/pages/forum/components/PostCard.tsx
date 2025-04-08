import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  Chip,
  Divider,
  useTheme,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  PersonAdd as PersonAddIcon,
  Report as ReportIcon
} from '@mui/icons-material';
import styles from '../styles/PostCard.module.css';

interface Author {
  name: string;
  avatar: string;
  title: string;
  id: string;
}

interface Post {
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
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onViewPost: (postId: string) => void;
  onShare?: (post: Post) => void;
  onReport?: (post: Post) => void;
  onFollow?: (userId: string) => void;
  onComment?: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onBookmark,
  onViewPost,
  onShare,
  onReport,
  onFollow,
  onComment
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <Card
      elevation={0}
      className={styles.postCard}
      sx={{
        borderRadius: 2,
        transition: 'all 0.3s',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        '&:hover': {
          boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
          transform: 'translateY(-4px)',
          borderColor: alpha(theme.palette.primary.main, 0.3)
        }
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={post.author.avatar}
            alt={post.author.name}
            className={styles.avatar}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" className={styles.authorName}>
              {post.author.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.author.title} · {post.createdAt}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="small"
            onClick={() => onBookmark(post.id)}
            className={styles.bookmarkButton}
            sx={{
              color: post.isBookmarked ? theme.palette.primary.main : 'action.active',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            {post.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
          <IconButton
            size="small"
            className={styles.moreButton}
            onClick={(e) => {
              e.stopPropagation();
              setAnchorEl(e.currentTarget);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem onClick={() => {
            onFollow && onFollow(post.author.id);
            setAnchorEl(null);
          }}>
            <ListItemIcon>
              <PersonAddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="关注作者" />
          </MenuItem>
          <MenuItem onClick={() => {
            onReport && onReport(post);
            setAnchorEl(null);
          }}>
            <ListItemIcon>
              <ReportIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="举报" />
          </MenuItem>
        </Menu>
        <Typography
          variant="h6"
          gutterBottom
          className={styles.title}
          onClick={() => onViewPost(post.id)}
          sx={{
            fontWeight: 600,
            cursor: 'pointer',
            '&:hover': {
              color: theme.palette.primary.main
            }
          }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.content}
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {post.content}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {post.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              className={styles.tag}
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2)
                }
              }}
            />
          ))}
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ px: 2, py: 1 }}>
        <Button
          size="small"
          startIcon={<ThumbUpIcon />}
          onClick={() => onLike(post.id)}
          className={styles.actionButton}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              color: theme.palette.primary.main
            }
          }}
        >
          {post.likes}
        </Button>
        <Button
          size="small"
          startIcon={<CommentIcon />}
          className={styles.actionButton}
          onClick={() => onComment && onComment(post)}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              color: theme.palette.primary.main
            }
          }}
        >
          {post.comments}
        </Button>
        <Button
          size="small"
          startIcon={<ShareIcon />}
          className={styles.actionButton}
          onClick={() => onShare && onShare(post)}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              color: theme.palette.primary.main
            }
          }}
        >
          {post.shares}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard; 
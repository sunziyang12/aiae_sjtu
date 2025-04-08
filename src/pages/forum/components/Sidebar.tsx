import React from 'react';
import { Box, Paper, Typography, Button, Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import styles from '../styles/ForumPage.module.css';
import { Author } from '../types';

interface SidebarProps {
  onCreatePost: () => void;
  hotTags: string[];
  activeUsers: Author[];
  onFollow: (userId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onCreatePost,
  hotTags,
  activeUsers,
  onFollow,
}) => {
  return (
    <Box className={styles.sidebar}>
      <Paper className={styles.sidebarSection}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<AddIcon />}
          onClick={onCreatePost}
          className={styles.createPostButton}
        >
          发布帖子
        </Button>
      </Paper>

      <Paper className={styles.sidebarSection}>
        <Typography variant="h6" className={styles.sectionTitle}>
          热门标签
        </Typography>
        <Box className={styles.tagsContainer}>
          {hotTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              className={styles.tag}
            />
          ))}
        </Box>
      </Paper>

      <Paper className={styles.sidebarSection}>
        <Typography variant="h6" className={styles.sectionTitle}>
          活跃用户
        </Typography>
        <List className={styles.activeUsersList}>
          {activeUsers.map((user) => (
            <ListItem key={user.id} className={styles.activeUserItem}>
              <ListItemAvatar>
                <Avatar src={user.avatar} alt={user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={`发帖数: ${user.posts}`}
              />
              <Button
                size="small"
                variant={user.isFollowing ? "outlined" : "contained"}
                onClick={() => onFollow(user.id)}
                className={styles.followButton}
              >
                {user.isFollowing ? '取消关注' : '关注'}
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Sidebar; 
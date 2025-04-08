import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import styles from '../styles/ForumPage.module.css';

interface ForumHeaderProps {
  onCreatePost: () => void;
}

const ForumHeader: React.FC<ForumHeaderProps> = ({ onCreatePost }) => {
  return (
    <Box className={styles.forumHeader}>
      <Typography variant="h4" component="h1" className={styles.forumTitle}>
        学术交流论坛
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onCreatePost}
        className={styles.createPostButton}
      >
        发布帖子
      </Button>
    </Box>
  );
};

export default ForumHeader; 
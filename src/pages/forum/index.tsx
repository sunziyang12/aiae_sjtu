import React from 'react';
import { Box, Container, Grid, Snackbar, Alert } from '@mui/material';
import { useForumState } from './hooks/useForumState';
import { useForumHandlers } from './hooks/useForumHandlers';
import ForumHeader from './components/ForumHeader';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';
import PostList from './components/PostList';
import Sidebar from './components/Sidebar';
import CommentSection from './components/CommentSection';
import styles from './styles/ForumPage.module.css';
import { MOCK_POSTS, MOCK_COMMENTS, CATEGORIES, SORT_OPTIONS, HOT_TAGS, ACTIVE_USERS, SHARE_OPTIONS } from './data/mockData';

const ForumPage: React.FC = () => {
  // 使用状态管理hook
  const {
    activeCategory,
    searchQuery,
    sortBy,
    page,
    posts,
    comments,
    postsPerPage,
    commentDialogOpen,
    shareDialogOpen,
    reportDialogOpen,
    editCommentDialogOpen,
    replyDialogOpen,
    selectedPost,
    selectedComment,
    replyToComment,
    newComment,
    editedComment,
    newReply,
    reportReason,
    snackbar,
    filteredPosts,
    totalPages,
    paginatedPosts,
    setActiveCategory,
    setSearchQuery,
    setSortBy,
    setPage,
    setPosts,
    setComments,
    setCommentDialogOpen,
    setShareDialogOpen,
    setReportDialogOpen,
    setEditCommentDialogOpen,
    setReplyDialogOpen,
    setSelectedPost,
    setSelectedComment,
    setReplyToComment,
    setNewComment,
    setEditedComment,
    setNewReply,
    setReportReason,
    setSnackbar,
  } = useForumState();

  // 使用事件处理hook
  const {
    handleSearch,
    handleCategoryChange,
    handleSortMenuClose,
    handleSortChange,
    handlePageChange,
    handleLikePost,
    handleBookmarkPost,
    handleFollowUser,
    handleCreatePost,
    handleViewPost,
    handleSharePost,
    handleReportPost,
    handleShareOption,
    handleSubmitReport,
    handleOpenCommentDialog,
    handleCloseCommentDialog,
    handleSubmitComment,
    handleLikeComment,
    handleReplyComment,
    handleSubmitReply,
    handleEditComment,
    handleSubmitEditComment,
    handleDeleteComment,
    handleCloseSnackbar,
  } = useForumHandlers(
    setPosts,
    setComments,
    setSnackbar,
    setCommentDialogOpen,
    setShareDialogOpen,
    setReportDialogOpen,
    setEditCommentDialogOpen,
    setReplyDialogOpen,
    setSelectedPost,
    setSelectedComment,
    setReplyToComment,
    setNewComment,
    setEditedComment,
    setNewReply,
    setReportReason,
    setSearchQuery,
    setActiveCategory,
    setSortBy,
    setPage,
    posts,
    comments,
    selectedPost,
    selectedComment,
    replyToComment,
    newComment,
    editedComment,
    newReply,
    reportReason,
    snackbar
  );

  return (
    <Box className={styles.forumPage}>
      <Container className={styles.container}>
        <ForumHeader onCreatePost={handleCreatePost} />

        <Grid container className={styles.contentGrid}>
          {/* 左侧内容区 */}
          <Grid item className={styles.mainContent}>
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              sortOptions={SORT_OPTIONS}
            />

            <CategoryTabs
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            <PostList
              posts={paginatedPosts}
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onLike={handleLikePost}
              onBookmark={handleBookmarkPost}
              onViewPost={handleViewPost}
              onShare={handleSharePost}
              onReport={handleReportPost}
              onFollow={handleFollowUser}
              onComment={handleOpenCommentDialog}
            />

            {/* 评论区域 */}
            <CommentSection
              postId="1"
              comments={comments}
              onAddComment={handleSubmitComment}
              onLikeComment={handleLikeComment}
              onReplyComment={handleReplyComment}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
              onFollow={handleFollowUser}
            />
          </Grid>

          {/* 右侧边栏 */}
          <Grid item className={styles.sideContent}>
            <Sidebar
              onCreatePost={handleCreatePost}
              hotTags={HOT_TAGS}
              activeUsers={ACTIVE_USERS}
              onFollow={handleFollowUser}
            />
          </Grid>
        </Grid>
      </Container>

      {/* 通知提示 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForumPage; 
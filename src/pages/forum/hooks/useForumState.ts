import { useState, useMemo } from 'react';
import { Post, Comment, SnackbarState } from '../types';
import { MOCK_POSTS, MOCK_COMMENTS } from '../data/mockData';

export const useForumState = () => {
  // 状态管理
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [postsPerPage] = useState(10);

  // 对话框状态
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [editCommentDialogOpen, setEditCommentDialogOpen] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);

  // 当前选中的帖子/评论
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [replyToComment, setReplyToComment] = useState<Comment | null>(null);

  // 表单状态
  const [newComment, setNewComment] = useState('');
  const [editedComment, setEditedComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [reportReason, setReportReason] = useState('');

  // 通知状态
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  // 过滤和排序帖子
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // 分类过滤
    if (activeCategory !== 'all') {
      result = result.filter(post => post.tags.includes(activeCategory));
    }

    // 排序
    switch (sortBy) {
      case 'hot':
        result.sort((a, b) => b.likes - a.likes);
        break;
      case 'most_commented':
        result.sort((a, b) => b.comments - a.comments);
        break;
      case 'latest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [searchQuery, activeCategory, sortBy, posts]);

  // 分页
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return {
    // 状态
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

    // 设置函数
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
  };
}; 
import { useNavigate } from 'react-router-dom';
import { Post, Comment } from '../types';

export const useForumHandlers = (
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' | 'warning' }>>,
  setCommentDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setShareDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setReportDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setEditCommentDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setReplyDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>,
  setReplyToComment: React.Dispatch<React.SetStateAction<Comment | null>>,
  setNewComment: React.Dispatch<React.SetStateAction<string>>,
  setEditedComment: React.Dispatch<React.SetStateAction<string>>,
  setNewReply: React.Dispatch<React.SetStateAction<string>>,
  setReportReason: React.Dispatch<React.SetStateAction<string>>,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>,
  setSortBy: React.Dispatch<React.SetStateAction<string>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  posts: Post[],
  comments: Comment[],
  selectedPost: Post | null,
  selectedComment: Comment | null,
  replyToComment: Comment | null,
  newComment: string,
  editedComment: string,
  newReply: string,
  reportReason: string,
  snackbar: { open: boolean; message: string; severity: 'success' | 'error' | 'info' | 'warning' }
) => {
  const navigate = useNavigate();

  // 显示通知
  const showSnackbar = (severity: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // 处理搜索
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  // 处理分类切换
  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue);
    setPage(1);
  };

  // 处理排序菜单
  const handleSortMenuClose = () => {
    // No need to implement this as anchorEl is not used in the new code
  };

  const handleSortChange = (option: string) => {
    setSortBy(option);
    handleSortMenuClose();
  };

  // 处理分页
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // 处理点赞帖子
  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));

    showSnackbar('success', postId ? '点赞成功' : '取消点赞成功');
  };

  // 处理收藏帖子
  const handleBookmarkPost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));

    showSnackbar('success', postId ? '收藏成功' : '取消收藏成功');
  };

  // 处理关注用户
  const handleFollowUser = (userId: string) => {
    // 更新帖子作者关注状态
    setPosts(posts.map(post => {
      if (post.author.id === userId) {
        return {
          ...post,
          author: {
            ...post.author,
            isFollowing: !post.author.isFollowing
          }
        };
      }
      return post;
    }));

    // 更新评论作者关注状态
    setComments(comments.map(comment => {
      if (comment.author.id === userId) {
        return {
          ...comment,
          author: {
            ...comment.author,
            isFollowing: !comment.author.isFollowing
          }
        };
      }

      // 更新回复作者关注状态
      if (comment.replies) {
        comment.replies = comment.replies.map(reply => {
          if (reply.author.id === userId) {
            return {
              ...reply,
              author: {
                ...reply.author,
                isFollowing: !reply.author.isFollowing
              }
            };
          }
          return reply;
        });
      }

      return comment;
    }));

    showSnackbar('success', userId ? '关注成功' : '取消关注成功');
  };

  // 处理发帖
  const handleCreatePost = () => {
    // 实现创建帖子逻辑
    console.log('Create new post');
    navigate('/forum/create');
  };

  // 处理查看帖子详情
  const handleViewPost = (postId: string) => {
    // 实现查看帖子逻辑
    console.log('View post:', postId);
    navigate(`/forum/post/${postId}`);
  };

  // 处理分享帖子
  const handleSharePost = (post: Post) => {
    setSelectedPost(post);
    setShareDialogOpen(true);
  };

  // 处理举报帖子
  const handleReportPost = (post: Post) => {
    setSelectedPost(post);
    setReportDialogOpen(true);
  };

  // 处理分享选项
  const handleShareOption = (option: string) => {
    // 实际应用中，这里会根据不同平台调用相应的分享API
    console.log(`分享到${option}:`, selectedPost?.title);
    showSnackbar('success', `已分享到${option}`);
    setShareDialogOpen(false);
  };

  // 处理提交举报
  const handleSubmitReport = () => {
    if (!reportReason.trim()) {
      showSnackbar('error', '请填写举报原因');
      return;
    }

    console.log('举报内容:', {
      postId: selectedPost?.id,
      reason: reportReason
    });

    showSnackbar('success', '举报已提交，我们会尽快处理');
    setReportDialogOpen(false);
    setReportReason('');
  };

  // 处理打开评论对话框
  const handleOpenCommentDialog = (post: Post) => {
    setSelectedPost(post);
    setCommentDialogOpen(true);
  };

  // 处理关闭评论对话框
  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
    setNewComment('');
  };

  // 处理提交评论
  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      showSnackbar('error', '评论内容不能为空');
      return;
    }

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: {
        id: 'current-user',
        name: '当前用户',
        avatar: 'https://i.pravatar.cc/150?img=8',
        isFollowing: false,
      },
      createdAt: new Date().toLocaleString(),
      likes: 0,
      isLiked: false,
      isEdited: false,
      replies: [],
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
    showSnackbar('success', '评论发布成功');
  };

  // 处理点赞评论
  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }

      // 处理回复的点赞
      if (comment.replies) {
        comment.replies = comment.replies.map(reply => {
          if (reply.id === commentId) {
            return {
              ...reply,
              likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
              isLiked: !reply.isLiked
            };
          }
          return reply;
        });
      }

      return comment;
    }));

    showSnackbar('success', commentId ? '点赞成功' : '取消点赞成功');
  };

  // 处理回复评论
  const handleReplyComment = (comment: Comment) => {
    setReplyToComment(comment);
    setReplyDialogOpen(true);
  };

  // 处理提交回复
  const handleSubmitReply = () => {
    if (!newReply.trim()) {
      showSnackbar('error', '回复内容不能为空');
      return;
    }

    const newReplyObj: Comment = {
      id: `${replyToComment?.id}-${Date.now()}`,
      content: newReply,
      author: {
        id: 'current-user',
        name: '当前用户',
        avatar: 'https://i.pravatar.cc/150?img=8',
        isFollowing: false,
      },
      createdAt: new Date().toLocaleString(),
      likes: 0,
      isLiked: false,
      isEdited: false,
    };

    setComments(comments.map(comment => {
      if (comment.id === replyToComment?.id) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReplyObj]
        };
      }
      return comment;
    }));

    setNewReply('');
    setReplyDialogOpen(false);
    showSnackbar('success', '回复发布成功');
  };

  // 处理编辑评论
  const handleEditComment = (comment: Comment) => {
    setSelectedComment(comment);
    setEditedComment(comment.content);
    setEditCommentDialogOpen(true);
  };

  // 处理提交编辑评论
  const handleSubmitEditComment = () => {
    if (!editedComment.trim()) {
      showSnackbar('error', '评论内容不能为空');
      return;
    }

    setComments(comments.map(comment => {
      if (comment.id === selectedComment?.id) {
        return {
          ...comment,
          content: editedComment,
          isEdited: true
        };
      }

      // 处理回复的编辑
      if (comment.replies) {
        comment.replies = comment.replies.map(reply => {
          if (reply.id === selectedComment?.id) {
            return {
              ...reply,
              content: editedComment,
              isEdited: true
            };
          }
          return reply;
        });
      }

      return comment;
    }));

    setEditCommentDialogOpen(false);
    showSnackbar('success', '评论编辑成功');
  };

  // 处理删除评论
  const handleDeleteComment = (comment: Comment) => {
    // 检查是否是回复
    const isReply = comment.id.includes('-');

    if (isReply) {
      // 删除回复
      const [parentId] = comment.id.split('-');
      setComments(comments.map(parentComment => {
        if (parentComment.id === parentId) {
          return {
            ...parentComment,
            replies: (parentComment.replies || []).filter(reply => reply.id !== comment.id)
          };
        }
        return parentComment;
      }));
    } else {
      // 删除主评论
      setComments(comments.filter(c => c.id !== comment.id));
    }

    showSnackbar('success', '评论删除成功');
  };

  // 关闭通知
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return {
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
    showSnackbar,
  };
}; 
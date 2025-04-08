import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  LinearProgress,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
  Badge,
  Tooltip,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { alpha } from '@mui/material/styles';
import { Project, Comment } from '../types';
import styles from '../styles/ProjectPage.module.css';

interface ProjectDialogProps {
  project: Project;
  comments: Comment[];
  onClose: () => void;
  onCommentSubmit: (content: string) => void;
  onContactSubmit: (message: string) => void;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  project,
  comments,
  onClose,
  onCommentSubmit,
  onContactSubmit,
}) => {
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [isContactMode, setIsContactMode] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleButtonClick = (isContact: boolean) => {
    setIsContactMode(isContact);
    setShowRightPanel(true);
  };

  const handleCommentSubmit = () => {
    if (commentContent.trim()) {
      onCommentSubmit(commentContent);
      setCommentContent('');
    }
  };

  const handleContactSubmit = () => {
    if (contactMessage.trim()) {
      onContactSubmit(contactMessage);
      setContactMessage('');
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      className={styles.dialog}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 500 }}
    >
      <DialogContent className={styles.dialogContent}>
        <IconButton
          className={styles.closeButton}
          onClick={onClose}
          size="large"
        >
          <CloseIcon />
        </IconButton>

        <Box className={styles.projectMedia}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.projectImage}
          />
          <Box className={styles.mediaOverlay} />
          <Box className={styles.actionButtons}>
            <Tooltip title="联系项目团队" arrow>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleButtonClick(true)}
                className={styles.actionButton}
                startIcon={<ContactMailIcon />}
              >
                一键联系
              </Button>
            </Tooltip>
            <Tooltip title="参与项目讨论" arrow>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleButtonClick(false)}
                className={styles.actionButton}
                startIcon={<CommentIcon />}
              >
                公开讨论
              </Button>
            </Tooltip>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={showRightPanel ? 8 : 12}>
            <Box className={styles.projectInfo}>
              <Typography variant="h4" className={styles.projectTitle}>
                {project.title}
              </Typography>
              <Typography variant="body1" className={styles.projectDescription}>
                {project.description}
              </Typography>

              <Box className={styles.projectDetails}>
                <Paper elevation={0} className={styles.detailSection}>
                  <Typography variant="h6" className={styles.sectionTitle}>
                    项目信息
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        项目类型：<span className={styles.highlightText}>{project.type}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        所属行业：<span className={styles.highlightText}>{project.industry}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        项目阶段：<span className={styles.highlightText}>{project.stage}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        项目进度：<span className={styles.highlightText}>{project.progress}%</span>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box className={styles.progressSection}>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      className={styles.progressBar}
                    />
                  </Box>
                </Paper>

                <Paper elevation={0} className={styles.detailSection}>
                  <Typography variant="h6" className={styles.sectionTitle}>
                    团队信息
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        团队规模：<span className={styles.highlightText}>{project.team.size}人</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        团队状态：<span className={styles.highlightText}>{project.team.status}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        团队介绍：<span className={styles.highlightText}>{project.team.description}</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper elevation={0} className={styles.detailSection}>
                  <Typography variant="h6" className={styles.sectionTitle}>
                    项目标签
                  </Typography>
                  <Box className={styles.tags}>
                    {project.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        className={styles.tag}
                      />
                    ))}
                  </Box>
                </Paper>

                <Paper elevation={0} className={styles.detailSection}>
                  <Typography variant="h6" className={styles.sectionTitle}>
                    资源需求
                  </Typography>
                  <Grid container spacing={2}>
                    {project.resourceNeeds.map((need, index) => (
                      <Grid item xs={6} key={index}>
                        <Box className={styles.needItem}>
                          <Typography variant="body2" color="text.secondary">
                            {need}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                <Paper elevation={0} className={styles.detailSection}>
                  <Typography variant="h6" className={styles.sectionTitle}>
                    联系方式
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        联系人：<span className={styles.highlightText}>{project.contact.name}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        邮箱：<span className={styles.highlightText}>{project.contact.email}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        电话：<span className={styles.highlightText}>{project.contact.phone}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        微信：<span className={styles.highlightText}>{project.contact.wechat}</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Box>
          </Grid>

          {showRightPanel && (
            <Grid item xs={4}>
              <Paper elevation={0} className={styles.rightPanel}>
                {isContactMode ? (
                  <Box className={styles.contactInfo}>
                    <Typography variant="h6" className={styles.contactTitle}>
                      联系项目团队
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="请输入您的留言..."
                      className={styles.formField}
                      variant="outlined"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleContactSubmit}
                      className={styles.submitButton}
                      endIcon={<SendIcon />}
                    >
                      发送留言
                    </Button>
                  </Box>
                ) : (
                  <Box className={styles.discussionSection}>
                    <Typography variant="h6" className={styles.discussionTitle}>
                      项目讨论
                    </Typography>
                    <Box className={styles.commentForm}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="发表您的评论..."
                        className={styles.commentInput}
                        variant="outlined"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCommentSubmit}
                        className={styles.submitButton}
                        endIcon={<SendIcon />}
                      >
                        发表评论
                      </Button>
                    </Box>
                    <List className={styles.commentList}>
                      {comments.map((comment) => (
                        <React.Fragment key={comment.id}>
                          <ListItem alignItems="flex-start" className={styles.commentItem}>
                            <ListItemAvatar>
                              <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                  <Box className={styles.badgeContent}>
                                    <ThumbUpIcon fontSize="small" />
                                  </Box>
                                }
                              >
                                <Avatar src={comment.user.avatar} className={styles.commentAvatar} />
                              </Badge>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box className={styles.commentHeader}>
                                  <Typography
                                    variant="subtitle2"
                                    className={styles.commentUser}
                                  >
                                    {comment.user.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    className={styles.commentTime}
                                  >
                                    {comment.time}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <>
                                  <Typography
                                    variant="body2"
                                    className={styles.commentContent}
                                  >
                                    {comment.content}
                                  </Typography>
                                  <Box className={styles.commentActions}>
                                    <IconButton
                                      size="small"
                                      className={styles.likeButton}
                                    >
                                      <ThumbUpIcon fontSize="small" />
                                    </IconButton>
                                    <Typography
                                      variant="caption"
                                      className={styles.likeCount}
                                    >
                                      {comment.likes}
                                    </Typography>
                                  </Box>
                                </>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                )}
              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog; 
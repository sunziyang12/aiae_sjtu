import React from 'react';
import { Card, CardContent, Box, Avatar, Typography, Stack, Chip, IconButton } from '@mui/material';
import { LocationOn, School, Work, Bookmark, BookmarkBorder } from '@mui/icons-material';
import { Talent } from '../types/talent';
import styles from '../styles/TalentCard.module.css';

interface TalentCardProps {
  talent: Talent;
  onClick: (talent: Talent) => void;
  onCollect: (talentId: number) => void;
}

const TalentCard: React.FC<TalentCardProps> = ({ talent, onClick, onCollect }) => {
  const handleCollectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCollect(talent.id);
  };

  return (
    <Card className={styles.card} onClick={() => onClick(talent)}>
      <CardContent className={styles.cardContent}>
        <Box className={styles.header}>
          <Avatar src={talent.avatar} className={styles.avatar} />
          <Box className={styles.titleContainer}>
            <Box className={styles.nameContainer}>
              <Typography variant="h6" className={styles.name}>
                {talent.name}
              </Typography>
              <IconButton
                className={styles.collectButton}
                onClick={handleCollectClick}
                size="small"
              >
                {talent.isCollected ? (
                  <Bookmark className={styles.collectedIcon} />
                ) : (
                  <BookmarkBorder className={styles.collectIcon} />
                )}
              </IconButton>
            </Box>
            <Typography variant="body2" className={styles.title}>
              {talent.title}
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" className={styles.skillContainer}>
          {talent.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              className={styles.skillChip}
            />
          ))}
        </Stack>

        <Stack spacing={1} className={styles.infoContainer}>
          <Box className={styles.infoItem}>
            <Work className={styles.icon} />
            <Typography variant="body2">
              {talent.status}
            </Typography>
          </Box>
          <Box className={styles.infoItem}>
            <School className={styles.icon} />
            <Typography variant="body2">{talent.education}</Typography>
          </Box>
          <Box className={styles.infoItem}>
            <LocationOn className={styles.icon} />
            <Typography variant="body2">{talent.location}</Typography>
          </Box>
        </Stack>

        <Box className={styles.statusContainer}>
          <Chip
            label={talent.status}
            className={`${styles.statusChip} ${talent.status.includes('找项目') || talent.status.includes('可加入')
              ? styles.activeStatus
              : ''
              }`}
          />
        </Box>

        <Box className={styles.achievementContainer}>
          <Typography variant="body2" className={styles.achievementTitle}>
            主要成就
          </Typography>
          <Typography variant="body2" className={styles.achievement}>
            {talent.achievements[0]}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TalentCard; 
import React from 'react';
import { Card, CardContent, Box, Typography, Chip, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from '../styles/ProfilePage.module.css';

/**
 * 标签级别类型
 */
export type TagLevel = 'expert' | 'advanced' | 'intermediate';

/**
 * 标签接口
 */
export interface Tag {
  name: string;
  level: TagLevel;
}

/**
 * 标签分组接口
 */
export interface TagSection {
  title: string;
  tags: Tag[];
}

interface TagsCardProps {
  title: string;
  sections: TagSection[];
  onMoreClick?: () => void;
}

const TagsCard: React.FC<TagsCardProps> = ({ title, sections, onMoreClick }) => {
  const getTagColor = (level: TagLevel) => {
    switch (level) {
      case 'expert':
        return 'primary';
      case 'advanced':
        return 'secondary';
      case 'intermediate':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Card className={styles.tagsCard}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton size="small" onClick={onMoreClick}>
            <MoreHorizIcon />
          </IconButton>
        </Box>

        {sections.map((section: TagSection, index: number) => (
          <Box key={index} className={styles.tagSection}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
              {section.title}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {section.tags.map((tag: Tag, tagIndex: number) => (
                <Chip
                  key={tagIndex}
                  label={tag.name}
                  className={styles.tagChip}
                  color={getTagColor(tag.level)}
                />
              ))}
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default TagsCard; 
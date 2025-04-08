import React from 'react';
import { Box, Grid, Typography, Stack, Chip } from '@mui/material';
import { SkillTag, TalentStatus } from '../types/talent';
import styles from '../styles/TalentFilters.module.css';

interface TalentFiltersProps {
  selectedSkills: SkillTag[];
  selectedStatus: TalentStatus | '';
  onSkillChange: (skill: SkillTag) => void;
  onStatusChange: (status: TalentStatus | '') => void;
}

const skillTags: SkillTag[] = [
  '商业运营',
  '嵌入式开发',
  '机械建模',
  '软件开发',
  '人工智能',
  '产品设计',
  '市场营销',
  '项目管理'
];

const statusOptions: (TalentStatus | '')[] = [
  '',
  '找项目中',
  '可加入新团队',
  '在校-本科生',
  '在校-硕士生',
  '在校-博士生',
  '已有项目',
  '已就业'
];

const TalentFilters: React.FC<TalentFiltersProps> = ({
  selectedSkills,
  selectedStatus,
  onSkillChange,
  onStatusChange,
}) => {
  return (
    <Box className={styles.filterContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" className={styles.filterTitle}>
            能力标签
          </Typography>
          <Stack direction="row" className={styles.chipContainer}>
            {skillTags.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() => onSkillChange(skill)}
                className={`${styles.filterChip} ${selectedSkills.includes(skill) ? styles.selectedChip : ''
                  }`}
              />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" className={styles.filterTitle}>
            目前状态
          </Typography>
          <Stack direction="row" className={styles.chipContainer}>
            <Chip
              key="all"
              label="全部"
              onClick={() => onStatusChange('')}
              className={`${styles.filterChip} ${selectedStatus === '' ? styles.selectedChip : ''
                }`}
            />
            {statusOptions.filter(status => status !== '').map((status) => (
              <Chip
                key={status}
                label={status}
                onClick={() => onStatusChange(status)}
                className={`${styles.filterChip} ${selectedStatus === status ? styles.selectedChip : ''
                  }`}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TalentFilters; 
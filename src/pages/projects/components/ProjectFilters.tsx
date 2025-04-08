import React from 'react';
import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import { FilterOption } from '../types';
import styles from '../styles/ProjectPage.module.css';

interface ProjectFiltersProps {
  selectedStage: string;
  selectedIndustry: string;
  selectedType: string;
  selectedResource: string;
  selectedTeamStatus: string;
  onStageChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onResourceChange: (value: string) => void;
  onTeamStatusChange: (value: string) => void;
  startupStages: FilterOption[];
  industries: FilterOption[];
  projectTypes: FilterOption[];
  resourceNeeds: FilterOption[];
  teamStatus: FilterOption[];
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  selectedStage,
  selectedIndustry,
  selectedType,
  selectedResource,
  selectedTeamStatus,
  onStageChange,
  onIndustryChange,
  onTypeChange,
  onResourceChange,
  onTeamStatusChange,
  startupStages,
  industries,
  projectTypes,
  resourceNeeds,
  teamStatus,
}) => {
  return (
    <Box className={styles.filters}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box className={styles.filterSection}>
            <Typography variant="subtitle1" className={styles.filterTitle}>
              创业阶段
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
              {startupStages.map((stage) => (
                <Chip
                  key={stage.value}
                  label={stage.label}
                  onClick={() => onStageChange(stage.value)}
                  variant={selectedStage === stage.value ? "filled" : "outlined"}
                  color={selectedStage === stage.value ? "primary" : "default"}
                  className={styles.chip}
                  sx={{
                    '&.MuiChip-filled': {
                      bgcolor: '#2196F3',
                      color: 'white',
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
          <Box className={styles.filterSection}>
            <Typography variant="subtitle1" className={styles.filterTitle}>
              所属行业
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
              {industries.map((industry) => (
                <Chip
                  key={industry.value}
                  label={industry.label}
                  onClick={() => onIndustryChange(industry.value)}
                  variant={selectedIndustry === industry.value ? "filled" : "outlined"}
                  color={selectedIndustry === industry.value ? "primary" : "default"}
                  className={styles.chip}
                  sx={{
                    '&.MuiChip-filled': {
                      bgcolor: '#2196F3',
                      color: 'white',
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box className={styles.filterSection}>
            <Typography variant="subtitle1" className={styles.filterTitle}>
              项目类型
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
              {projectTypes.map((type) => (
                <Chip
                  key={type.value}
                  label={type.label}
                  onClick={() => onTypeChange(type.value)}
                  variant={selectedType === type.value ? "filled" : "outlined"}
                  color={selectedType === type.value ? "primary" : "default"}
                  className={styles.chip}
                  sx={{
                    '&.MuiChip-filled': {
                      bgcolor: '#2196F3',
                      color: 'white',
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
          <Box className={styles.filterSection}>
            <Typography variant="subtitle1" className={styles.filterTitle}>
              资源需求
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
              {resourceNeeds.map((need) => (
                <Chip
                  key={need.value}
                  label={need.label}
                  onClick={() => onResourceChange(need.value)}
                  variant={selectedResource === need.value ? "filled" : "outlined"}
                  color={selectedResource === need.value ? "primary" : "default"}
                  className={styles.chip}
                  sx={{
                    '&.MuiChip-filled': {
                      bgcolor: '#2196F3',
                      color: 'white',
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box className={styles.filterSection}>
            <Typography variant="subtitle1" className={styles.filterTitle}>
              团队状态
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
              {teamStatus.map((status) => (
                <Chip
                  key={status.value}
                  label={status.label}
                  onClick={() => onTeamStatusChange(status.value)}
                  variant={selectedTeamStatus === status.value ? "filled" : "outlined"}
                  color={selectedTeamStatus === status.value ? "primary" : "default"}
                  className={styles.chip}
                  sx={{
                    '&.MuiChip-filled': {
                      bgcolor: '#2196F3',
                      color: 'white',
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectFilters; 
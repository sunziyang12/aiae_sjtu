import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

/**
 * 技能标签卡片组件
 * 展示用户的技能标签
 * 
 * @component
 * @param {Object} props - 组件属性
 * @param {string[]} props.skills - 用户技能列表
 * @returns {JSX.Element} 返回技能标签卡片组件
 */
const SkillsCard: React.FC<{ skills: string[] }> = ({ skills }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        backgroundColor: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        mb: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            技能标签
          </Typography>
          <Button
            size="small"
            startIcon={<AddIcon />}
            sx={{ color: '#1a237e' }}
          >
            添加技能
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              sx={{
                backgroundColor: '#f0f7ff',
                color: '#1a237e',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkillsCard; 
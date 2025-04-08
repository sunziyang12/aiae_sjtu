import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const GuidancePage: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          创业指导
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* 主要内容区域将在这里实现 */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                导师咨询
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* 侧边栏将在这里实现 */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                创业资源
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GuidancePage; 
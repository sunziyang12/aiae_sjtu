import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Avatar,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  MonetizationOn as MoneyIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import { Investor, InvestorType } from '../types/investor';
import styles from '../styles/InvestorsPage.module.css';

interface InvestorCardProps {
  investor: Investor;
  onClick: (investor: Investor) => void;
}

const getTypeTag = (type: InvestorType) => {
  const typeMap = {
    [InvestorType.GOVERNMENT]: {
      label: '政府基金',
      className: styles.governmentTag,
    },
    [InvestorType.PRIVATE_EQUITY]: {
      label: '私募基金',
      className: styles.privateEquityTag,
    },
    [InvestorType.INCUBATOR]: {
      label: '孵化器',
      className: styles.incubatorTag,
    },
    [InvestorType.INDIVIDUAL]: {
      label: '个人投资者',
      className: styles.individualTag,
    },
  };

  return typeMap[type];
};

const InvestorCard: React.FC<InvestorCardProps> = ({ investor, onClick }) => {
  const typeInfo = getTypeTag(investor.type);

  return (
    <Box className={styles.investorCard} onClick={() => onClick(investor)}>
      <Box className={styles.cardHeader}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Avatar src={investor.avatar} className={styles.avatar} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                {investor.name}
              </Typography>
              {investor.verificationStatus === 'verified' && (
                <Box className={styles.verifiedBadge}>
                  <VerifiedIcon sx={{ fontSize: 16 }} />
                  已认证
                </Box>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {investor.title}
            </Typography>
            <Box className={`${styles.typeTag} ${typeInfo.className}`}>
              {typeInfo.label}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.cardContent}>
        <Stack spacing={2}>
          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
              {investor.areas.slice(0, 3).map((area, index) => (
                <Chip
                  key={index}
                  label={area}
                  size="small"
                  className={styles.areaChip}
                />
              ))}
              {investor.areas.length > 3 && (
                <Typography variant="caption" color="text.secondary">
                  +{investor.areas.length - 3}
                </Typography>
              )}
            </Stack>
          </Box>

          <Stack spacing={1}>
            <Box className={styles.infoItem}>
              <MoneyIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">
                投资范围：{investor.sizes.map(size => {
                  switch (size) {
                    case '0-100': return '100万以下';
                    case '100-500': return '100-500万';
                    case '500-2000': return '500-2000万';
                    case '2000+': return '2000万以上';
                    default: return size;
                  }
                }).join('、')}
              </Typography>
            </Box>
            <Box className={styles.infoItem}>
              <BusinessIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">{investor.organization}</Typography>
            </Box>
            <Box className={styles.infoItem}>
              <LocationIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">{investor.location}</Typography>
            </Box>
          </Stack>

          {investor.successfulExits && (
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              成功退出：{investor.successfulExits}个项目
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default InvestorCard; 
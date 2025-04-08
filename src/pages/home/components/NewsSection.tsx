import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Chip,
  Link,
  CardContent,
} from '@mui/material';
import styles from './styles/NewsSection.module.css';
import './styles/carousel.css';

/**
 * 新闻项目接口
 */
interface NewsItem {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  type: string;
  imageUrl: string;
  description: string;
  link?: string;
}

// 子组件
const NewsCard: React.FC<{ news: NewsItem }> = ({ news }) => {
  return (
    <Link href={news.link} className={styles.cardLink}>
      <Card className={styles.card}>
        <Box className={styles.imageWrapper}>
          <CardMedia
            component="img"
            image={news.imageUrl}
            alt={news.title}
            className={styles.image}
          />
          <Chip
            label={news.type}
            size="small"
            className={styles.tag}
          />
        </Box>
        <Box className={styles.content}>
          <Typography className={styles.title}>
            {news.title}
          </Typography>
          <Typography className={styles.subtitle}>
            {news.subtitle}
          </Typography>
          <Typography className={styles.description}>
            {news.description}
          </Typography>
          <Box className={styles.footer}>
            <Typography className={styles.date}>
              {news.date}
            </Typography>
            <Typography className={styles.readMore}>
              阅读更多
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
};

// 主组件
const NewsSection: React.FC = () => {
  return (
    <Box className={styles.section}>
      <Container>
        <Grid container spacing={3}>
          {newsData.map((news) => (
            <Grid item xs={12} md={4} key={news.id}>
              <NewsCard news={news} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// 新闻数据
const newsData: NewsItem[] = [
  {
    id: 1,
    title: '2024年全国大学生人工智能创新创业大赛启动',
    subtitle: '激发创新活力，培养AI人才',
    date: '2024-03-15',
    type: '赛事活动',
    imageUrl: '/assets/images/news/赛事活动/ai-competition.webp',
    description: '本次大赛旨在发掘和培养人工智能领域的创新人才，推动高校创新创业教育发展。',
    link: '/news/1'
  },
  {
    id: 2,
    title: 'AI创业团队"智创未来"获千万级融资',
    subtitle: '技术创新引领行业发展',
    date: '2024-03-14',
    type: '创业故事',
    imageUrl: '/assets/images/news/创业故事/ai-startup.webp',
    description: '该团队专注于AI教育领域，开发了多个创新性教育产品，获得市场广泛认可。',
    link: '/news/2'
  },
  {
    id: 3,
    title: '教育部发布AI教育新政策',
    subtitle: '推动人工智能教育普及',
    date: '2024-03-13',
    type: '政策解读',
    imageUrl: '/assets/images/news/政策解读/education-policy.webp',
    description: '新政策强调将人工智能教育纳入中小学课程体系，培养未来AI人才。',
    link: '/news/3'
  },
  {
    id: 4,
    title: '2024年AI教育创新论坛圆满结束',
    subtitle: '探讨AI教育发展趋势',
    date: '2024-03-12',
    type: '赛事活动',
    imageUrl: '/assets/images/news/赛事活动/ai-forum.webp',
    description: '来自全国各地的教育专家和企业家共同探讨AI教育的发展方向和机遇。',
    link: '/news/4'
  },
  {
    id: 5,
    title: '青年创业者张明：用AI改变教育',
    subtitle: '从0到1的创业之路',
    date: '2024-03-11',
    type: '创业故事',
    imageUrl: '/assets/images/news/创业故事/young-founder.webp',
    description: '90后创业者张明分享了他的AI教育创业经历，以及如何克服创业过程中的各种挑战。',
    link: '/news/5'
  },
  {
    id: 6,
    title: '解读《人工智能教育发展指导意见》',
    subtitle: '政策要点分析',
    date: '2024-03-10',
    type: '政策解读',
    imageUrl: '/assets/images/news/政策解读/ai-guidelines.webp',
    description: '详细解读最新发布的AI教育发展指导意见，分析其对教育行业的影响。',
    link: '/news/6'
  }
];

export default NewsSection; 
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  IconButton,
  Stack,
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// 轮播图数据
const carouselItems = [
  {
    image: '/images/nagano.jpg',
    location: 'Japan Alps',
    title: 'NAGANO\nPREFECTURE',
    description: 'Where the preservation of japan forest ecosystem thrives. Warmth and art at a concentrated form mix to be seen.'
  },
  {
    image: '/images/sahara.jpg',
    location: 'Africa',
    title: 'SAHARA\nDESERTLAND',
    description: 'Vast expanse of golden sands stretching endlessly beneath the scorching sun.'
  },
  {
    image: '/images/yosemite.jpg',
    location: 'United States',
    title: 'YOSEMITE\nNATIONAL PARK',
    description: 'Majestic granite cliffs, thundering waterfalls, and ancient sequoia groves.'
  },
  {
    image: '/images/lances.jpg',
    location: 'Australia',
    title: 'LOS LANCES\nBEACH',
    description: 'Crystal-clear waters meet golden sands under perfect kitesurfing conditions.'
  },
  {
    image: '/images/drome.jpg',
    location: 'France',
    title: 'DROME\nVALLEY',
    description: 'Picturesque landscapes dotted with lavender fields and historic villages.'
  }
];

interface HomeCarouselProps {
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const HomeCarousel: React.FC<HomeCarouselProps> = ({ currentSlide, onSlideChange }) => {
  return (
    <Box sx={{ height: '100vh', position: 'relative', bgcolor: '#1a1a1a' }}>
      <Carousel
        selectedItem={currentSlide}
        onChange={onSlideChange}
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={5000}
        showStatus={false}
        showArrows={true}
        showIndicators={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <IconButton
            onClick={clickHandler}
            sx={{
              position: 'absolute',
              left: '5%',
              bottom: '10%',
              zIndex: 2,
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(4px)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <IconButton
            onClick={clickHandler}
            sx={{
              position: 'absolute',
              left: 'calc(5% + 50px)',
              bottom: '10%',
              zIndex: 2,
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(4px)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        )}
      >
        {carouselItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              height: '100vh',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.8)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                left: '5%',
                textAlign: 'left',
                color: 'white',
                zIndex: 1,
              }}
            >
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      opacity: 0.8,
                      letterSpacing: 1,
                      fontWeight: 500,
                    }}
                  >
                    {item.location}
                  </Typography>
                </Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: -1,
                    fontSize: { xs: '3rem', md: '4.5rem' },
                    lineHeight: 1.1,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: 400,
                    opacity: 0.8,
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </Typography>
              </Stack>
            </Box>
          </Box>
        ))}
      </Carousel>

      {/* 底部预览卡片 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '50%',
          zIndex: 2,
        }}
      >
        <Grid container spacing={2}>
          {carouselItems.map((item, index) => (
            <Grid item xs={2.4} key={index}>
              <Card
                onClick={() => onSlideChange(index)}
                sx={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  opacity: currentSlide === index ? 1 : 0.6,
                  transform: currentSlide === index ? 'translateY(-10px)' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {currentSlide === index && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      bgcolor: '#ffd700',
                    }}
                  />
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 页码指示器 */}
      <Typography
        variant="h2"
        sx={{
          position: 'absolute',
          right: '5%',
          top: '20%',
          color: 'white',
          opacity: 0.5,
          fontWeight: 700,
          fontSize: '8rem',
        }}
      >
        {String(currentSlide + 1).padStart(2, '0')}
      </Typography>
    </Box>
  );
};

export default HomeCarousel; 
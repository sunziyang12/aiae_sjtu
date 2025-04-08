import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import styles from '../styles/ForumPage.module.css';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <Box className={styles.categoryTabs}>
      <Tabs
        value={activeCategory}
        onChange={onCategoryChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="论坛分类"
      >
        {categories.map((category) => (
          <Tab
            key={category.id}
            label={category.name}
            value={category.id}
            className={styles.categoryTab}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryTabs; 
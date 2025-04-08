import React from 'react';
import {
  Paper,
  TextField,
  InputAdornment,
  Button,
  Box,
  Menu,
  MenuItem,
  useTheme,
  alpha,
  useMediaQuery,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import styles from '../styles/SearchBar.module.css';
import { SortOption } from '../types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortBy: string;
  onSortChange: (option: string) => void;
  sortOptions: SortOption[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOptions
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (sortId: string) => {
    onSortChange(sortId);
    handleSortMenuClose();
  };

  return (
    <Paper
      elevation={0}
      className={styles.searchBar}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: 2,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
      }}
    >
      <TextField
        fullWidth
        placeholder="搜索帖子、标签或内容..."
        value={searchQuery}
        onChange={onSearchChange}
        variant="outlined"
        size="small"
        className={styles.searchInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.primary.main, 0.3)
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main
            }
          }
        }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          size="small"
          className={styles.filterButton}
          sx={{
            borderRadius: 2,
            borderColor: alpha(theme.palette.primary.main, 0.3),
            color: theme.palette.primary.main,
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.05)
            }
          }}
        >
          筛选
        </Button>
        <FormControl variant="outlined" className={styles.sortSelect}>
          <InputLabel id="sort-select-label">排序方式</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            label="排序方式"
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default SearchBar; 
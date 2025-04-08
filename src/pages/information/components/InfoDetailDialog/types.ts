import { InfoItem } from '../../types';

export interface InfoHeaderProps {
  info: InfoItem;
  onClose: () => void;
}

export interface InfoSideCardProps {
  info: InfoItem;
}

export interface InfoActionsProps {
  info: InfoItem;
  isFavorited: boolean;
  loading: boolean;
  onFavorite: () => void;
  onShare: () => void;
  onRegister: () => void;
} 
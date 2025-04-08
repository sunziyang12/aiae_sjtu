declare module 'react-responsive-carousel' {
  import { ComponentType, ReactNode } from 'react';

  export interface CarouselProps {
    showArrows?: boolean;
    showStatus?: boolean;
    showIndicators?: boolean;
    showThumbs?: boolean;
    infiniteLoop?: boolean;
    autoPlay?: boolean;
    interval?: number;
    selectedItem?: number;
    onChange?: (index: number) => void;
    children?: ReactNode;
    renderArrowPrev?: (clickHandler: () => void, hasPrev: boolean) => ReactNode;
    renderArrowNext?: (clickHandler: () => void, hasNext: boolean) => ReactNode;
  }

  export const Carousel: ComponentType<CarouselProps>;
} 
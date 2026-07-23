import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Drop-in carousel wrapper built on Swiper (React 19 compatible).
 * Accepts both react-multi-carousel API (responsive prop)
 * and react-elastic-carousel API (itemsToShow prop).
 */
const Carousel = ({
  children,
  responsive,
  itemsToShow,
  autoPlay,
  infinite,
  pagination = false,
  removeArrowOnDeviceType = [],
  ...rest
}) => {
  // Convert react-multi-carousel `responsive` config to Swiper `breakpoints`
  const breakpoints = responsive
    ? Object.values(responsive).reduce((acc, val) => {
        if (val.breakpoint.min >= 0) {
          acc[val.breakpoint.min] = { slidesPerView: val.items };
        }
        return acc;
      }, {})
    : {};

  const slides = React.Children.toArray(children);

  return (
    <Swiper
      modules={[Navigation, ...(autoPlay ? [Autoplay] : []), ...(pagination ? [Pagination] : [])]}
      navigation
      autoplay={autoPlay ? { delay: 3000, disableOnInteraction: false } : false}
      loop={!!infinite}
      spaceBetween={10}
      slidesPerView={itemsToShow || 2}
      breakpoints={breakpoints}
      pagination={pagination ? { clickable: true } : false}
      style={{ paddingBottom: pagination ? '30px' : '0' }}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

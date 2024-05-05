import { useEffect } from 'react';

const useHorizontalScroll = (ref:any) => {
  useEffect(() => {
    const element = ref.current;
    if (element) {
      const onWheel = (e:any) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        element.scrollTo({
          left: element.scrollLeft + e.deltaY * 1.5,
          behavior: 'smooth'
        });
      };
      element.addEventListener('wheel', onWheel);
      return () => element.removeEventListener('wheel', onWheel);
    }
  }, [ref]);
};

export default useHorizontalScroll;

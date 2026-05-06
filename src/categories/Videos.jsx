import React from 'react';
import DynamicCategory from '../components/DynamicCategory';

const Videos = () => {
  return (
    <DynamicCategory 
      categoryName="Videos" 
      initialProducts={[]} 
      placeholder="Search videos..." 
    />
  );
};

export default Videos;

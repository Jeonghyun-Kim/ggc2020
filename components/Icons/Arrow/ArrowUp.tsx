import React from 'react';

interface props {
  color?: string;
}
const ArrowUp: React.FC<props> = ({ color = '#515253', ...props }) => {
  return (
    <svg
      id="arrow-up"
      data-name="Arrow Up"
      xmlns="http://www.w3.org/2000/svg"
      width="48.2812"
      height="21.9009"
      viewBox="0 0 48.2812 21.9009"
      {...props}>
      <path
        style={{ fill: color }}
        d="M46.8347,15.5669,26.2517.6538a3.7381,3.7381,0,0,0-4.2222,0L1.4465,15.5669a3.5,3.5,0,1,0,4.1074,5.668L24.1406,7.7682,42.7273,21.2349a3.5,3.5,0,1,0,4.1074-5.668Z"
      />
    </svg>
  );
};

export default ArrowUp;

import React from 'react';

const ArrowDown: React.FC = ({ ...props }) => {
  return (
    <svg
      id="arrow-down"
      data-name="Arrow Down"
      xmlns="http://www.w3.org/2000/svg"
      width="85"
      height="39"
      viewBox="0 0 85 39"
      {...props}>
      <defs />
      <path
        style={{ fill: '#21535f' }}
        d="M83.0906,3.6685a4.78,4.78,0,0,0-6.6743-1.0661L42.2019,27.3929,7.9875,2.6024a4.7792,4.7792,0,1,0-5.6081,7.74L39.2957,37.0908a4.7544,4.7544,0,0,0,2.8.9092c.0354,0,.0706-.0053.106-.0061.0354.0008.0706.0061.106.0061a4.7569,4.7569,0,0,0,2.8-.9092L82.0245,10.3427A4.7791,4.7791,0,0,0,83.0906,3.6685Z"
      />
    </svg>
  );
};

export default ArrowDown;

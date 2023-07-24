import React from 'react';

interface ProgressBarProps {
  value: number;
  maxValue: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, maxValue, color }) => {
  const progress = (value / maxValue) * 100; // Calculate the progress percentage

  const barStyle = {
    width: `${progress}%`,
    backgroundColor: color,
    height: '45px',
    transition: 'width 0.5s ease',
    borderRadius: '15px',
  };

  return (
    <div>
      <div style={{ width: '100%', height: '45px', backgroundColor: '#f1f1f1', borderRadius: '15px' }}>
        <div style={barStyle}><p className='label-progress'>{`${progress}%`}</p></div>
      </div>
      
    </div>
  );
};

export default ProgressBar;

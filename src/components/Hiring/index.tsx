import React from 'react';
import './styles.scss';

interface HiringPositionsProps {
    positions: {
        position: string;
        available: number;
    }[];
}

const HiringPositions: React.FC<HiringPositionsProps> = ({ positions }) => {
    return (
        <div className="hiring-positions-box-container">
            <div className="hiring-positions-container">
                {positions.map(({ position, available }) => (
                    <div key={position} className="hiring-positions-item">
                        <span>{position}</span>
                        <span>{` ${available}`}</span>
                        <span className="hiring-positions-next-icon">➡️</span>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default HiringPositions;

import React, { useState, useEffect } from 'react';
import { TileProps } from '../../Utils/types';
import './styles.scss';
import UserDetailModal from '../../modals/userDetails/userDetail';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

interface DroppableColumnProps {
  header: string;
  tiles: TileProps[];
  onTileDrop: (id: string, columnIndex: number) => void;
  columnIndex: number;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ header, tiles, onTileDrop, columnIndex }) => {
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false); // Add the loading state

  const handleTileDragStart = (id: string, e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', id);
  };

  const handleTileClick = (id: string) => {
    setSelectedTileId(id);
  };

  const handleTileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    console.log('Dropped tile with ID:', id);
    e.currentTarget.classList.add('tile-dropped');
    onTileDrop(id, columnIndex);
  };

  useEffect(() => {
    tiles.forEach(tile => {
      if (tile.id === selectedTileId) {
        const tilePosition = tile.positionApplied;
        setLoading(true); // Set loading to true when fetching data
        axios
          .get(`https://empireone-global-inc.uc.r.appspot.com/api/applicants/list/${selectedTileId}`)
          .then(response => {
            console.log('Fetched user data:', response.data);
            setUserData({ ...response.data, position: tilePosition });
            setLoading(false); // Set loading to false after fetching data
          })
          .catch(error => {
            console.error(error);
            setUserData(null);
            setLoading(false); // Set loading to false if there's an error
          });
      }
    });
  }, [selectedTileId, tiles]);

  return (
    <div className="droppable-column">
      <h2>{header}</h2>
      <div className="droppable-area" onDrop={handleTileDrop} onDragOver={(e) => e.preventDefault()}>
        {/* Render loading state while fetching data */}
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          tiles.map((tile) => {
            const createdAt = new Date(tile.createdAt); // Add type assertion
            const now = new Date();
            const timeDifference = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
            let backgroundColorClass = '';
            let textColorClass = '';

            if (timeDifference >= 0 && timeDifference <= 11) {
              backgroundColorClass = 'tile-background-0-2';
              textColorClass = 'tile-text-0-2';
            } else if (timeDifference >= 12 && timeDifference <= 48) {
              backgroundColorClass = 'tile-background-3-5';
              textColorClass = 'tile-text-3-5';
            } else {
              backgroundColorClass = 'tile-background-6';
              textColorClass = 'tile-text-6';
            }

            return (
              <div
                key={tile.id}
                draggable
                onDragStart={(e) => handleTileDragStart(tile.id, e)}
                className={`tile-user ${backgroundColorClass} ${textColorClass}`}
                onClick={() => handleTileClick(tile.id)}
              >
                <img src={tile.imageUrl} alt="" className="picture-placeholder" />
                <span className="name-user">{tile.name}</span>
                <span className="position-user">{tile.positionApplied}</span>
                <span className="created-time">{formatDistanceToNow(new Date(tile.createdAt))}
                </span>
              </div>
            );
          })
        )}
      </div>
      {/* Render the UserDetailModal conditionally based on the selectedTileId */}
      {selectedTileId && userData !== null && (
        <UserDetailModal showModal={true} onClose={() => setSelectedTileId(null)} formData={userData} />
      )}
    </div>
  );
};

export default DroppableColumn;

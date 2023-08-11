import React, { useState, useEffect } from 'react';
import { TileProps } from '../../Utils/types';
import './styles.scss';
import UserDetailModal from '../../modals/userDetails/userDetail';
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
    onTileDrop(id, columnIndex);
  };

  useEffect(() => {
    if (selectedTileId) {
      const tile = tiles.find(tile => tile.id === selectedTileId);
      if (tile) {
        axios.get(`http://empireone-global-inc.uc.r.appspot.com/api/applicants/list/${selectedTileId}`)
          .then(response => {
            console.log('Fetched user data:', response.data); // Add this line
            setUserData(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }, [selectedTileId, tiles]);

  return (
    <div className="droppable-column">
      <h2>{header}</h2>
      <div
        className="droppable-area"
        onDrop={handleTileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            draggable
            onDragStart={(e) => handleTileDragStart(tile.id, e)}
            className="tile-user"
            onClick={() => handleTileClick(tile.id)}
          >
            <img src={tile.picture} alt="" className="picture-placeholder" />
            <span className="name-user">{tile.name}</span>
          </div>
        ))}
      </div>
      {/* Render the UserDetailModal conditionally based on the selectedTileId */}
      {selectedTileId && userData !== null && (
        <UserDetailModal
          showModal={true}
          onClose={() => setSelectedTileId(null)}
          formData={userData}
        />
      )}
    </div>
  );
};

export default DroppableColumn;

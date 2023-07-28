import React, { useState } from 'react';
import { TileProps } from '../../types';
import './styles.scss';
import UserDetailModal from '../../modals/userDetails/userDetail'; // Import the UserDetailModal component

interface DroppableColumnProps {
  header: string;
  tiles: TileProps[];
  onTileDrop: (id: string, columnIndex: number) => void;
  columnIndex: number;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ header, tiles, onTileDrop, columnIndex }) => {
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);

  const handleTileDragStart = (id: string, e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', id); // Set the tile ID as the data being dragged
  };

  const handleTileClick = (id: string) => {
    setSelectedTileId(id); // Set the selectedTileId when a tile is clicked
  };

  const handleTileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text'); // Get the tile ID from the dragged tile
    onTileDrop(id, columnIndex);
  };

  return (
    <div className="droppable-column">
      <h2>{header}</h2>
      <div
        className="droppable-area"
        onDrop={handleTileDrop}
        onDragOver={(e) => e.preventDefault()} // Prevent default behavior to allow drop
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            draggable
            onDragStart={(e) => handleTileDragStart(tile.id, e)}
            className="tile-user"
            onClick={() => handleTileClick(tile.id)} // Add onClick handler to handleTileClick
          >
            {/* Display the picture and name */}
            <img src={tile.picture} alt="" className="picture-placeholder" />
            <span className="name-user">{tile.name}</span>
          </div>
        ))}
      </div>
      {/* Render the UserDetailModal conditionally based on the selectedTileId */}
      <UserDetailModal showModal={!!selectedTileId} onClose={() => setSelectedTileId(null)} />
    </div>
  );
};

export default DroppableColumn;
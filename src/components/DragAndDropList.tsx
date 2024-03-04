// DragAndDropList.tsx
import * as React from 'react' 
import { useState } from 'react';
import './DragAndDropList.css';

interface Item {
  id: string;
  content: string;
}

interface DragAndDropListProps {
  items: Item[];
  onReorder: (items: Item[]) => void;
}

const DragAndDropList: React.FC<DragAndDropListProps> = ({ items, onReorder }) => {
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>, id: string) => {
    event.dataTransfer.setData('text/plain', id);
    setDraggingItemId(id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLIElement>, targetId: string) => {
    const sourceId = event.dataTransfer.getData('text/plain');
    const updatedItems = items.slice();
    const sourceIndex = updatedItems.findIndex((item) => item.id === sourceId);
    const targetIndex = updatedItems.findIndex((item) => item.id === targetId);

    const [removedItem] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(targetIndex, 0, removedItem);

    onReorder(updatedItems);
    setDraggingItemId(null);
  };

  return (
    <ul className="drag-and-drop-list">
      {items.map((item) => (
        <li
          key={item.id}
          draggable
          onDragStart={(event) => handleDragStart(event, item.id)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, item.id)}
          className={item.id === draggingItemId ? 'dragging' : ''}
        >
          {item.content}
        </li>
      ))}
    </ul>
  );
};

export  {DragAndDropList};

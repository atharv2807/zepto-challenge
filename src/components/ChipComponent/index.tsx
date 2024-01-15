import React, { useState, ChangeEvent, KeyboardEvent, useRef } from 'react';
import './../../stylesheets/chip-component.css';

type Chip = {
  id: number;
  label: string;
};

const ChipComponent: React.FC = () => {
  const initialItems: Chip[] = [
    { id: 1, label: "Apple" },
    { id: 2, label: "Banana" },
    { id: 3, label: "India" },
    { id: 4, label: "America" },
    { id: 5, label: "Grapes" },
    { id: 6, label: "Pineapple" },
  ];

  const [items, setItems] = useState<Chip[]>(initialItems);
  const [selectedItems, setSelectedItems] = useState<Chip[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showItemList, setShowItemList] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleItemClick = (item: Chip) => {
    setSelectedItems([...selectedItems, item]);
    setItems(items.filter(i => i.id !== item.id));
    setInputValue('');
  };

  const handleAddItem = (label: string) => {
    if (!items.some(item => item.label === label) && !selectedItems.some(item => item.label === label)) {
      const newItem: Chip = { id: Date.now(), label };
      setItems([...items, newItem]);
    }
  };

  const handleDeleteChip = (item: Chip) => {
    setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    setItems([...items, item]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowItemList(true);
  };

  const handleInputFocus = () => {
    setShowItemList(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowItemList(false), 200);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue && !items.some(item => item.label === inputValue)) {
      handleAddItem(inputValue);
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '' && selectedItems.length > 0) {
      const lastItem = selectedItems[selectedItems.length - 1];
      handleDeleteChip(lastItem);
    }
  };


  return (
    <div className="chip-container">
      <div className="chip-list">
        {selectedItems.map(item => (
          <span key={item.id} className="chip">
            {item.label} <span className="chip-delete" onClick={() => handleDeleteChip(item)}>x</span>
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        className="chip-input"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        placeholder="Type or select an item"
      />
      {showItemList && (
        <ul className="item-list">
          {items.filter(item => item.label.toLowerCase().includes(inputValue.toLowerCase())).map(item => (
            <li key={item.id} className="item" onClick={() => handleItemClick(item)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipComponent;

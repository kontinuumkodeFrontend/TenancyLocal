import React from "react";

const MovableItem = (props) => {
  const handleDragStart = (event) => {
    // This method runs when the dragging starts
    console.log(event, event.target.value, ">>>>>>>>>>");
  };

  const handleDrag = (event) => {
    // This method runs when the component is being dragged
    console.log("Dragging...");
  };

  const handleDragEnd = (event) => {
    // This method runs when the dragging stops
    console.log("Ended");
  };

  return (
    <li
      className="movable-item"
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      value={props.title}
    >
      {props.title}
    </li>
  );
};

export default MovableItem;

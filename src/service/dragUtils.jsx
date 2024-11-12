const getSourceContainer = (prevItems, activeId) => {
  return prevItems.AwaitingFeedback.includes(activeId)
    ? 'AwaitingFeedback'
    : Object.keys(prevItems).find((key) => prevItems[key].includes(activeId));
};

const moveDraggable = (prevItems, activeId, sourceContainer, destinationContainer) => {
  return {
    ...prevItems,
    [sourceContainer]: prevItems[sourceContainer].filter((id) => id !== activeId),
    [destinationContainer]: [...prevItems[destinationContainer], activeId]
  };
};

const moveDraggableBackToAwaiting = (prevItems, activeId, sourceContainer) => {
  return {
    ...prevItems,
    [sourceContainer]: prevItems[sourceContainer].filter((id) => id !== activeId),
    AwaitingFeedback: [...prevItems.AwaitingFeedback, activeId]
  };
};

export { getSourceContainer, moveDraggable, moveDraggableBackToAwaiting };

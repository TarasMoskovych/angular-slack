export const mockFirestore = () => {
  return {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
  };
};

export const mockEventEmitter = () => {
  return {
    emit: jest.fn(),
  };
};

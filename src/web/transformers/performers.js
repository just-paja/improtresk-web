
export const aggregatePerformerFrontImage = photos => (
  photos[0] ? photos[0].image : null
);

export const aggregatePerformerData = performer => (
  performer && performer.photos ? {
    ...performer,
    frontImage: aggregatePerformerFrontImage(performer.photos),
  } : performer
);

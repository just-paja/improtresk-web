export const aggregatePollAnswerData = answer => (
  answer.performer ? ({
    ...answer,
    performer: null,
    image: answer.performer.photos[0] ?
      answer.performer.photos[0].image :
      null,
    links: answer.performer.links,
    description: answer.performer.text,
  }) : answer
);

export const aggregatePollData = poll => ({
  ...poll,
  answers: poll.answers.map(aggregatePollAnswerData),
});

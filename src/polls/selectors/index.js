const hasVoted = id =>
  global.localStorage && !!global.localStorage.getItem(`votedPoll${id}`);

export default { hasVoted };

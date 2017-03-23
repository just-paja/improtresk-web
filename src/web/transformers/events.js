export const aggregateWorkshops = (ids, workshops) => (
  workshops ? ids
    .map(id => workshops.find(ws => ws.id === id))
    .filter(item => item) :
  []
);

export const aggregatePerformer = (id, performers) => (
  performers ?
    (performers.find(perf => perf.id === id) || null) :
    null
);

export const aggregateEventData = (workshops, performers) => event => ({
  ...event,
  performer: aggregatePerformer(event.performer, performers),
  workshops: aggregateWorkshops(event.workshops, workshops),
});

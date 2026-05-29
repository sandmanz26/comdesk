export const respondentItems = [
  { id: 1, valid: true,  label: 'The person himself',                               parentId: null },
  { id: 2, valid: true,  label: 'test',                                             parentId: 1    },
  { id: 3, valid: true,  label: 'CEO',                                              parentId: 2    },
  { id: 4, valid: true,  label: 'Family',                                           parentId: null },
  { id: 5, valid: true,  label: 'reception',                                        parentId: null },
  { id: 6, valid: true,  label: 'Out of service',                                   parentId: null },
  { id: 7, valid: false, label: 'Update the name of the person who answered the call.', parentId: null },
  { id: 8, valid: true,  label: 'Corprate',                                         parentId: null },
]

export const statusItems = [
  { id: 1, valid: true, label: 'Out of service',      parentId: null },
  { id: 2, valid: true, label: 'appointment',          parentId: null },
  { id: 3, valid: true, label: 'absence',              parentId: null },
  { id: 4, valid: true, label: 'Test state newline',   parentId: null },
]

export const callItems = []

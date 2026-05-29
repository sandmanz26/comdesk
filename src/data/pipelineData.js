export const pipelineStandardItems = [
  { id: 1,  valid: true,  displayLabel: 'Lead',                       fieldRef: 'supply_id',           dataType: 'Selection list (search select box)', dataValues: '',                              hasToggle: false },
  { id: 2,  valid: true,  displayLabel: 'stage',                      fieldRef: 'pipeline_stage_id',   dataType: 'Selection list (select box)',        dataValues: '',                              hasToggle: false },
  { id: 3,  valid: true,  displayLabel: 'Transaction amount',         fieldRef: 'price',               dataType: 'text',                              dataValues: '',                              hasToggle: false },
  { id: 4,  valid: true,  displayLabel: 'label',                      fieldRef: 'label',               dataType: 'text',                              dataValues: '',                              hasToggle: true  },
  { id: 5,  valid: true,  displayLabel: 'Product name',               fieldRef: 'product_name',        dataType: 'text',                              dataValues: '',                              hasToggle: true  },
  { id: 6,  valid: true,  displayLabel: 'Closing date',               fieldRef: 'Photo_end_at',        dataType: 'date',                              dataValues: '',                              hasToggle: false },
  { id: 7,  valid: true,  displayLabel: 'First business meeting date',fieldRef: 'first_negotiated_at', dataType: 'date',                              dataValues: '',                              hasToggle: true  },
  { id: 8,  valid: true,  displayLabel: 'Contact Person',             fieldRef: 'contact_name',        dataType: 'text',                              dataValues: '',                              hasToggle: true  },
  { id: 9,  valid: true,  displayLabel: 'Memo',                       fieldRef: 'memo',                dataType: 'Text area',                         dataValues: '5 lines',                       hasToggle: false },
]

export const pipelineCustomFields = [
  { id: 101, valid: true,  displayLabel: 'Text editing',              fieldRef: 'text',                dataType: 'text',                              dataValues: '',                              hasToggle: true  },
  { id: 102, valid: true,  displayLabel: 'Text area',                 fieldRef: 'textArea',            dataType: 'Text area',                         dataValues: '1 line',                        hasToggle: true  },
  { id: 103, valid: true,  displayLabel: 'Checkbox (T/F)',            fieldRef: 'checkbox',            dataType: 'Checkbox (T/F)',                     dataValues: 'True or False',                 hasToggle: true  },
  { id: 104, valid: true,  displayLabel: 'numerical values',          fieldRef: 'number',              dataType: 'numerical values',                  dataValues: '',                              hasToggle: true  },
  { id: 105, valid: true,  displayLabel: 'Selection list (radio buttons)', fieldRef: 'Radio Button',  dataType: 'Selection list (radio buttons)',     dataValues: 'Option1 Option2 Option3',       hasToggle: true  },
  { id: 106, valid: false, displayLabel: 'Selection list (select box)', fieldRef: 'selectBox',        dataType: 'Selection list (select box)',        dataValues: 'Option1 Option2',               hasToggle: true  },
]

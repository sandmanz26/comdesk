export const workgroups = [
  {
    id: 1,
    name: 'widsley-dev_workgroup',
    collapsed: false,
    projects: [
      { id: 1, name: 'Development Test Project', called: 0, total: 0, percent: 0 },
      { id: 2, name: 'Test Kawashima (list import)', called: 0, total: 0, percent: 0 },
      { id: 3, name: 'playwright_prj', called: 1, total: 1, percent: 100 },
      { id: 4, name: '20251017', called: 0, total: 0, percent: 0 },
      { id: 5, name: '20251017_Division A', called: 12, total: 88, percent: 13 },
      { id: 6, name: '20251017_Division B', called: 2, total: 53, percent: 3 },
      { id: 7, name: 'Test Arakawa', called: 'twenty two', total: null, percent: 100 },
      { id: 8, name: 'Alvin Test', called: 'twenty three', total: null, percent: 66 }
    ]
  },
  {
    id: 2,
    name: '1/12 Used for AWS migration testing',
    collapsed: false,
    projects: [
      { id: 9, name: 'AWS Migration Project', called: 1, total: 12, percent: 8 }
    ]
  }
]

export const callModes = [
  { id: 'normal', label: 'Normal call mode' },
  { id: 'auto', label: 'Automatic distribution call mode' },
  { id: 'new', label: 'New Call Mode' }
]

export const formFields = [
  [{ label: 'post code', key: 'postCode' }, { label: 'prefectures', key: 'prefectures' }],
  [{ label: 'Address 1', key: 'address1' }, { label: 'Address 2', key: 'address2' }],
  [{ label: 'Address (in kana)', key: 'addressKana' }, { label: 'Tel1', key: 'tel1' }],
  [{ label: 'Tel2', key: 'tel2' }, { label: 'Tel3', key: 'tel3' }],
  [{ label: 'Tel4', key: 'tel4' }, { label: 'FAX', key: 'fax' }],
  [{ label: 'URL', key: 'url' }, { label: 'Former company name', key: 'formerCompany' }],
  [{ label: 'Lead source', key: 'leadSource' }, null]
]

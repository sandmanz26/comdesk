const BASE_UUID_SUFFIX = 'b883-11ef-acf5-42010a5d4042'

const NAMES = [
  'Hyakushiro Yamaguchi', 'Hyakugoro Yamaguchi', 'Hyakurokuro Yamaguchi',
  'Yamaguchi Hyakushichiro', 'Yamaguchi Hyakuhachiro', 'Hyakuro Yamaguchi',
  'Yamaguchi Hyakujiro', 'Hyakujiro Yamaguchi', 'Yamaguchi Hyakujuro',
  'Yamaguchi Hyakuju', 'Yamaguchi Hyakujusaburo', 'Hyakujuro Yamaguchi',
  'Yamaguchi Hyakujugo', 'Yamaguchi Hyakujuroku', 'Yamaguchi Hyakujushichiro',
  'Yamaguchi Hyakujuhachi', 'Yamaguchi Hyakujuro', 'Yamaguchi Hyakunijuro',
  'Yamaguchi Hyakunijuichiro', 'Yamaguchi Hyakunijuro', 'Yamaguchi Hyakunisaburo',
  'Yamaguchi Hyakunishiro', 'Yamaguchi Hyakunigoro', 'Yamaguchi Hyakunijuro',
  'Yamaguchi Hyakunijushichiro', 'Yamaguchi Hyakunijuhachiro', 'Yamaguchi Hyakunijukuro',
  'Yamaguchi Hyakusanjuro', 'Yamaguchi Hyakusanjuichiro', 'Yamaguchi Hyakusanjuro',
  'Yamaguchi Hyakusanjusaburo', 'Yamaguchi Hyakusanshiro', 'Yamaguchi Hyakusangoro',
  'Yamaguchi Hyakusanrokuro', 'Yamaguchi Hyakusanshichiro', 'Yamaguchi Hyakusanhachiro',
  'Yamaguchi Hyakusankuro', 'Yamaguchi Hyakuyonjuro', 'Yamaguchi Hyakuyonjuichiro',
  'Yamaguchi Hyakuyonjuro'
]

const UUID_PREFIXES = [
  '6cd42d14', '6cd65526', '6cd8ca7b', '6cdacf3', '6cdce2f4', '6cdfdf30',
  '6ce2d2c1', '6ce520a0', '6ce821d9', '6cea503b', '6cecb197', '6ceeb002',
  '6cf0b76d', '6cf31ef2', '6cf5052a', '6cf70d62', '6cfb6874', '6cfd8088',
  '6cff9637', '6d01edbf', '6d04033a', '6d0601a6', '6d084814', '6d0aa8cf',
  '6d0ceb5a', '6d0f7d09', '6d13845a', '6d15959c', '6d17b10d', '6d19d2d8',
  '6d1c42e7', '6d1e4d93', '6d205711', '6d2257eb', '6d247972', '6d26c0e0',
  '6d290cf3', '6d2b3d1a', '6d2d6e8f', '6d2f9ab2'
]

export const masterDataRows = NAMES.map((name, i) => ({
  id: i + 1,
  selected: false,
  rate: 0,
  status: '',
  respondent: '',
  lastCallDate: '',
  lastCaller: '',
  mybox: '',
  myboxRepresentative: '',
  prohibited: 'no',
  numberOfCalls: 0,
  project: 'No duplicate check',
  uuid: `${UUID_PREFIXES[i] || '6d' + (300000 + i).toString(16)}-${BASE_UUID_SUFFIX}`,
  type: 'organization',
  name,
  kana: '',
  postCode: '',
  prefectures: 'Tokyo',
  address1: 'Mishuku, Setagaya Ward',
  address2: '',
  addressKana: '',
  tel1: `0900000${(100 + i + 4).toString().padStart(4, '0')}`,
  tel2: '',
  tel3: '',
  tel4: '',
  fax: '',
  url: 'https://comdesklead.zendesk.com/hc/j...'
}))

// ── Deleted records (shown when "Deleted" mode is active) ────────────────
const DELETED_SUFFIX = '9f11-0aefaa667d5b'

const DELETED_NAMES = [
  // Rows with real data
  { name: "Minamida's mobile phone (personal device 1)", status: 'Out of service',  respondent: 'The person himself', lastCallDate: '2024-12-11 11:20:13', lastCaller: 'Atsushi Minamida', numberOfCalls: 3,  project: '',                  uuid: 'c0262e17-4fac-4c7f-9b46-f3f86bc98329', kana: '', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: "Minamida's mobile phone (personal device 2)", status: 'appointment',     respondent: 'The person himself', lastCallDate: '2024-12-24 15:49:58', lastCaller: 'Atsushi Minamida', numberOfCalls: 11, project: 'No duplicate check', uuid: 'b41035f8-5416-4c79-b7b7-66fbca87351f', kana: '', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  // Validation test rows
  { name: 'Name 255 characters',                    uuid: 'd6902072-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Names 256 characters or more aa',        uuid: 'd6ff8681-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: 'Aa', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Up to 29 kana characters',               uuid: 'd6950656-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: 'Aa', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'More than 30 kana characters',           uuid: 'd6c7a9a-dddd-11ef-9f11-0aefaa667d5b',  postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: 'Aa', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Postal code (30 characters or less)',    uuid: 'd6a2af81-dddd-11ef-9f11-0aefaa667d5b', postCode: '1111111111111111111111111111111', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Postal code 31 characters or more',      uuid: 'd6a8d3cf-dddd-11ef-9f11-0aefaa667d5b', postCode: '11111111111111111111111111111111', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address within 255',                     uuid: 'd6aefcdd-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: 'Aa', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address 256 or more',                    uuid: 'd6b55c2a-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: 'Aa', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address 2 within 255',                   uuid: 'd6c256e0-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address 2: 256 or higher',               uuid: 'd6c8c207-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address (within 256 kana characters)',   uuid: 'd6cec57f-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address in kana 256 or more',            uuid: 'd6d450f-dddd-11ef-9f11-0aefaa667d5b',  postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL 1 or less',                          uuid: 'd6db3f50-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL 2 or less',                          uuid: 'd6e4e23a-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL2 or higher',                         uuid: 'd6eac3b7-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL 3 or less',                          uuid: 'd6f10398-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL 3 or higher',                        uuid: 'd6f729a9-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL within 4',                           uuid: 'd6feacef-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL 4 or higher',                        uuid: 'd760b5-dddd-11ef-9f11-0aefaa667d5b',   postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'FAX within',                             uuid: 'd7f0ac7d-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'FAX 4 or higher',                        uuid: 'd7f15918-dddd-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Name 230 characters',                    uuid: '8109cb92-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Names 256 characters or more aa',        uuid: '81147a1-dd87-11ef-9f11-0aefaa667d5b',  postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Up to 29 kana characters',               uuid: '8118c249-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: 'Aa', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'More than 30 kana characters',           uuid: '811eaa96-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: 'Aa', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Postal code (30 characters or less)',    uuid: '8124da4b-dd87-11ef-9f11-0aefaa667d5b', postCode: '1111111111111111111111111111111', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Postal code 31 characters or more',      uuid: '812b7f83-dd87-11ef-9f11-0aefaa667d5b', postCode: '11111111111111111111111111111111', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address within 255',                     uuid: '8131b61a-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: 'Aa', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address 256 or more',                    uuid: '8137d646-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: 'Aa', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address 2 within 255',                   uuid: '813e4199-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address 2: 256 or higher',               uuid: '8144fb6b-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address (within 256 kana characters)',   uuid: '814b4fba-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'Address in kana 256 or more',            uuid: '8151e0a2-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL 1 or less',                          uuid: '815e6fe5-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL 1 or less',                          uuid: '8165aa1ff-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL 2 or less',                          uuid: '816b6435-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL2 or higher',                         uuid: '81724453-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL 3 or less',                          uuid: '8178823b-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' },
  { name: 'TEL 3 or higher',                        uuid: '817ec2c7-dd87-11ef-9f11-0aefaa667d5b', postCode: '', prefectures: '', address1: '', address2: '', addressKana: '', kana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '' }
]

// Dev Test Project rows (first 5 empty name rows from screenshot)
const devTestRows = [
  { uuid: '4802e7fc-8f74-4890-a067-d5c7018d7434', name: '' },
  { uuid: '80d04c9e-f462-49c6-97c0-31ec1977bb58', name: '' },
  { uuid: '8e5a1cf7-7bf6-4313-844e-3210b477c7a8', name: '' },
  { uuid: '76936c1f-6cf8-4d02-4f99-f6a792ce1bb9', name: '', rate: 2 },
  { uuid: 'dda310e2-4c94-45d1-ac35-786dfb9b6670', name: '' }
]

export const deletedDataRows = [
  ...devTestRows.map((r, i) => ({
    id: i + 1, selected: false, rate: r.rate || 0,
    status: '', respondent: '', lastCallDate: '', lastCaller: '',
    mybox: '', myboxRepresentative: '', prohibited: 'no', numberOfCalls: 0,
    project: 'Development Test Project', uuid: r.uuid, type: 'organization',
    name: r.name, kana: '', postCode: '', prefectures: '', address1: '',
    address2: '', addressKana: '', tel1: '', tel2: '', tel3: '', tel4: '',
    fax: '', url: ''
  })),
  ...DELETED_NAMES.map((r, i) => ({
    id: i + 6, selected: false, rate: 0,
    status: r.status || '', respondent: r.respondent || '',
    lastCallDate: r.lastCallDate || '', lastCaller: r.lastCaller || '',
    mybox: '', myboxRepresentative: '', prohibited: 'no',
    numberOfCalls: r.numberOfCalls || 0,
    project: r.project || '',
    uuid: r.uuid, type: 'organization', name: r.name,
    kana: r.kana || '', postCode: r.postCode || '', prefectures: r.prefectures || '',
    address1: r.address1 || '', address2: r.address2 || '',
    addressKana: r.addressKana || '', tel1: r.tel1 || '',
    tel2: r.tel2 || '', tel3: r.tel3 || '', tel4: r.tel4 || '',
    fax: r.fax || '', url: ''
  }))
]

export const displayOptions = ['display100', 'display50', 'display20']

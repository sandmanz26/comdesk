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

export const displayOptions = ['display100', 'display50', 'display20']

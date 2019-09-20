/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" }
];

export const searchPath = "/app/pages/search";
export const servicePath = "https://api.coloredstrategies.com";

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const themeColorStorageKey = "__theme_color"
export const isMultiColorActive = false;
export const isDarkSwitchActive = true;
export const defaultColor = "light.blue";
export const defaultDirection = "ltr";

export const stateValues = [
  { label: "Adana", value: "Adana", key: 0 }, { label: "Adıyaman", value: "Adıyaman", key: 1 }, { label: "Afyon", value: "Afyon", key: 2 }, { label: "Ağrı", value: "Ağrı", key: 3 }, { label: "Amasya", value: "Amasya", key: 4 }, { label: "Ankara", value: "Ankara", key: 5 }, { label: "Antalya", value: "Antalya", key: 6 }, { label: "Artvin", value: "Artvin", key: 7 }, { label: "Aydın", value: "Aydın", key: 8 }, { label: "Balıkesir", value: "Balıkesir", key: 9 }, { label: "Bilecik", value: "Bilecik", key: 10 }, { label: "Bingöl", value: "Bingöl", key: 11 }, { label: "Bitlis", value: "Bitlis", key: 12 }, { label: "Bolu", value: "Bolu", key: 13 }, { label: "Burdur", value: "Burdur", key: 14 }, { label: "Bursa", value: "Bursa", key: 15 }, { label: "Çanakkale", value: "Çanakkale", key: 16 }, { label: "Çankırı", value: "Çankırı", key: 17 }, { label: "Çorum", value: "Çorum", key: 18 }, { label: "Denizli", value: "Denizli", key: 19 }, { label: "Diyarbakır", value: "Diyarbakır", key: 20 }, { label: "Edirne", value: "Edirne", key: 21 }, { label: "Elazığ", value: "Elazığ", key: 22 }, { label: "Erzincan", value: "Erzincan", key: 23 }, { label: "Erzurum", value: "Erzurum", key: 24 }, { label: "Eskişehir", value: "Eskişehir", key: 25 }, { label: "Gaziantep", value: "Gaziantep", key: 26 }, { label: "Giresun", value: "Giresun", key: 27 }, { label: "Gümüşhane", value: "Gümüşhane", key: 28 }, { label: "Hakkari", value: "Hakkari", key: 29 }, { label: "Hatay", value: "Hatay", key: 30 }, { label: "Isparta", value: "Isparta", key: 31 }, { label: "Mersin", value: "Mersin", key: 32 }, { label: "İstanbul", value: "İstanbul", key: 33 }, { label: "İzmir", value: "İzmir", key: 34 }, { label: "Kars", value: "Kars", key: 35 }, { label: "Kastamonu", value: "Kastamonu", key: 36 }, { label: "Kayseri", value: "Kayseri", key: 37 }, { label: "Kırklareli", value: "Kırklareli", key: 38 }, { label: "Kırşehir", value: "Kırşehir", key: 39 }, { label: "Kocaeli", value: "Kocaeli", key: 40 }, { label: "Konya", value: "Konya", key: 41 }, { label: "Kütahya", value: "Kütahya", key: 42 }, { label: "Malatya", value: "Malatya", key: 43 }, { label: "Manisa", value: "Manisa", key: 44 }, { label: "K.maraş", value: "K.maraş", key: 45 }, { label: "Mardin", value: "Mardin", key: 46 }, { label: "Muğla", value: "Muğla", key: 47 }, { label: "Muş", value: "Muş", key: 48 }, { label: "Nevşehir", value: "Nevşehir", key: 49 }, { label: "Niğde", value: "Niğde", key: 50 }, { label: "Ordu", value: "Ordu", key: 51 }, { label: "Rize", value: "Rize", key: 52 }, { label: "Sakarya", value: "Sakarya", key: 53 }, { label: "Samsun", value: "Samsun", key: 54 }, { label: "Siirt", value: "Siirt", key: 55 }, { label: "Sinop", value: "Sinop", key: 56 }, { label: "Sivas", value: "Sivas", key: 57 }, { label: "Tekirdağ", value: "Tekirdağ", key: 58 }, { label: "Tokat", value: "Tokat", key: 59 }, { label: "Trabzon", value: "Trabzon", key: 60 }, { label: "Tunceli", value: "Tunceli", key: 61 }, { label: "Şanlıurfa", value: "Şanlıurfa", key: 62 }, { label: "Uşak", value: "Uşak", key: 63 }, { label: "Van", value: "Van", key: 64 }, { label: "Yozgat", value: "Yozgat", key: 65 }, { label: "Zonguldak", value: "Zonguldak", key: 66 }, { label: "Aksaray", value: "Aksaray", key: 67 }, { label: "Bayburt", value: "Bayburt", key: 68 }, { label: "Karaman", value: "Karaman", key: 69 }, { label: "Kırıkkale", value: "Kırıkkale", key: 70 }, { label: "Batman", value: "Batman", key: 71 }, { label: "Şırnak", value: "Şırnak", key: 72 }, { label: "Bartın", value: "Bartın", key: 73 }, { label: "Ardahan", value: "Ardahan", key: 74 }, { label: "Iğdır", value: "Iğdır", key: 75 }, { label: "Yalova", value: "Yalova", key: 76 }, { label: "Karabük", value: "Karabük", key: 77 }, { label: "Kilis", value: "Kilis", key: 78 }, { label: "Osmaniye", value: "Osmaniye", key: 79 }, { label: "Düzce", value: "Düzce", key: 80 }
]

export const surveyValues = [
  { label: "Sürekli kullandı", value: "Sürekli", key: 0 },
  { label: "Dönemsel olarak kullandı", value: "Dönemsel", key: 1 },
  { label: "Hiç kullanmadı", value: "Hiç", key: 2 }
]

export const survey2Values = [
  { label: "Google veya çevirimiçi aramalardan", value: "Çevrimiçi", key: 0 },
  { label: "Basın veya medya", value: "Basın", key: 1 },
  { label: "Arkadaş, aile veya iş arkadaşı", value: "Öneri", key: 2 },
  { label: "Youtube veya Facebook", value: "YT | FB", key: 3 },
  { label: "Diğer", value: "Diğer", key: 4 }
]

export const priceData = [
  {
    icon: 'fas fa-boxes',
    title: 'Standart',
    price: '₺x',
    detail: 'Kullanıcı/Ay',
    link: '#',
    features: [
      'Sürpriz Kutular',
      'Sinema Bileti',
      'Hediye Kahve',
      'Premium İndirimler'
    ]
  },
  {
    icon: 'fas fa-gift',
    title: 'Özel Günler',
    price: '₺x',
    detail: 'Kullanıcı/Ay',
    link: '#',
    features: [
      'Doğum Günü Sürprizleri',
      'Çalışma Yıl Dönümü Sürprizleri'
    ]
  },
  {
    icon: 'fas fa-gifts',
    title: 'Premium',
    price: '₺x',
    detail: 'Kullanıcı/Ay',
    link: '#',
    features: [
      'Sürpriz Kutular',
      'Sinema Bileti',
      'Hediye Kahve',
      'Premium İndirimler',
      'Doğum Günü Sürprizleri',
      'Yıl Dönümü Sürprizleri',
    ]
  }
]
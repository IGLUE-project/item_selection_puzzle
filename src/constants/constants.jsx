export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  backgroundImg: "",
  title: "selecciona los items correctos",
  rounds: [
    [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }],
    [
      { label: "Item A" },
      { label: "Item B" },
      { label: "Item C" },
      { label: "Item D" },
      { label: "Item E" },
      { label: "Item F" },
    ],
    [
      { img: "https://png.pngtree.com/png-clipart/20220111/original/pngtree-pear-png-image_7086642.png" },
      { img: "https://cdn.pixabay.com/photo/2016/02/23/17/42/orange-1218158_1280.png" },
      {
        img: "https://images.vexels.com/media/users/3/131878/isolated/preview/384b201e3c4076950837a47f417fcddf-icono-de-manzana-roja.png",
      },
    ],
  ],
};

export const THEMES = {
  STANDARD: "STANDARD",
  RETRO: "RETRO",
  FUTURISTIC: "FUTURISTIC",
};

export const THEME_ASSETS = {
  [THEMES.STANDARD]: {
    backgroundImg: "images/basic_bg.png",
    buttonAudio: "sounds/button.wav",
  },
  [THEMES.RETRO]: {
    backgroundImg: "images/retro_bg.png",
    torchAudio: "sounds/torch.wav",
  },
  [THEMES.FUTURISTIC]: {
    backgroundImg: "images/futuristic_bg.png",
    buttonAudio: "sounds/button.wav",
  },
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

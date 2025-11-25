//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  // backgroundImg: "", //background can be "NONE" or a URL.
  message: "¡Has superado el reto! presiona continuar para seguir jugando.",
  title: "selecciona los items correctos",
  actionAfterSolve: "SHOW_MESSAGE", //actionAfterSolve can be "NONE" or "SHOW_MESSAGE".
  //Settings that will be automatically specified by the Escapp server
  rounds: [
    [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }],
    [
      { label: "Item A" },
      { label: "Item B" },
      { label: "Item C" },
      { label: "Item D" },
      { label: "Item E" },
      { label: "Item F" },
      { label: "Item A" },
      { label: "Item aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
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
  //Settings that will be automatically specified by the Escapp server
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [8],
    rtc: false,
  },
};

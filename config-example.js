//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  // backgroundImg: "", //background can be "NONE" or a URL.
  //failureMessage: "The selection of elements is not correct.",
  //successMessage: "The selection of elements is correct.",
  actionAfterSolve: "SHOW_MESSAGE", //actionAfterSolve can be "NONE" or "SHOW_MESSAGE".
  rounds: [
    {
      title: "Round 1: Select the correct items",
      img: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Fruit-3882_640.jpg",
      items: [
        { img: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Golden_Asian_Pear.png" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/8/86/Strawberry_%28transparent_background%29.png" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Apricot_Icon.png" },
      ],
    },
    {
      title: "Round 2: Select the correct items",
      items: [
        { label: "Item A" },
        { label: "Item B" },
        { label: "Item C" },
        { label: "Item D" },
        { label: "Item E" },
        { label: "Item F" },
        { label: "Item G" },
        { label: "Item Haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
        { label: "Item I" },
        { label: "Item J" },
        { label: "Item K" },
        { label: "Item L" },
      ],
    },
    {
      title: "Round 3: Select the correct items",
      img: "",
      items: [
        { label: "Item A" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/8/86/Strawberry_%28transparent_background%29.png" },
        { label: "Item C" },
      ],
    },
  ],

  //Settings that will be automatically specified by the Escapp server
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
  },
};
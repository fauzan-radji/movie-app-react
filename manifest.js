export default {
  registerType: "prompt",
  manifest: {
    name: "Sea Cinema",
    short_name: "Sea Cinema",
    description:
      "An application where you can book yourself tickets for a movie",
    icons: [
      {
        src: "public/icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "public/icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "public/icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "public/icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#fcd7a5",
    background_color: "#fcd7a5",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

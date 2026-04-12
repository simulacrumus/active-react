export const config = {
  app: {
    title: import.meta.env.VITE_APP_TITLE || "Active",
    description:
      import.meta.env.VITE_APP_DESCRIPTION ||
      "City of Ottawa Drop-in Activity Schedules",
    version: import.meta.env.VITE_APP_VERSION || "1.0.2",
  },
  author: {
    name: import.meta.env.VITE_AUTHOR_NAME || "Emrah Kinay",
    url: import.meta.env.VITE_AUTHOR_URL || "https://emrahkinay.com",
  },
};

export const environment = {
  production: true,
  firebase: process.env.FIREBASE,
  origins: process.env.ORIGINS.split(' '),
  redirectURL: 'https://ng11-slack.web.app',
  webRtc: {
    AppID: process.env.AGORA_KEY,
    AppCertificate: process.env.AGORA_CERT,
  },
};

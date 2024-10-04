// channels.js

const channels = {
  TODOS: [], // Será preenchido automaticamente no App.js

  "LISTA DE FAVORITOS": [], // Inicialmente vazia, o usuário pode adicionar canais aqui

  CULTURA: [
    {
      id: 301,
      name: "TV Cultura",
      link: "https://player-tvcultura.stream.uol.com.br/live/tvcultura.m3u8",
    },
    { id: 302, name: "Top Hits", link: "https://example.com/top_hits.m3u8" },
    {
      id: 303,
      name: "Novidades da Semana",
      link: "https://example.com/novidades.m3u8",
    },
  ],
  ANIME: [
    {
      id: 601,
      name: "geek dot.",
      link: "https://stream.ichibantv.com:3764/hybrid/play.m3u8",
    },
    {
      id: 602,
      name: "AnimaX",
      link: "https://stream.ichibantv.com:3547/hybrid/play.m3u8",
    },
    {
      id: 26,
      name: "Otaku Sign TV",
      link: "https://stmv1.srvif.com/otaku/otaku/playlist.m3u8",
    },
    {
      id: 27,
      name: "Loading...TV HD",
      link: "https://stmv1.srvif.com/loadingtv/loadingtv/playlist.m3u8",
    },
    {
      id: 29,
      name: "WORDING TV",
      link: "https://tv02.zas.media:1936/wordingtv/wordingtv/chunklist_w1264551258.m3u8",
    },
    {
      id: 31,
      name: "Animes TV",
      link: "https://stmv1.srvif.com/animetv/animetv/playlist.m3u8?ManoTV",
    },
    {
      id: 3,
      name: "One Piece",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/624b1c8d4321e200073ee421/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
    },
    {
      id: 4,
      name: "Naruto",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5f6df5a173d7340007c559f7/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
    },
    {
      id: 5,
      name: "Naruto Shippuden",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/64c92f965580090008084968/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
    },
    {
      id: 7,
      name: "Hunter x Hunter",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/65d9167818036500080e8780/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
    },
    {
      id: 8,
      name: "Captain Tsubasa",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/646663b01593940008990a57/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
    },
    {
      id: 9,
      name: "Beyblade",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/633dc392e0282400071b0d39/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
    },
    {
      id: 10,
      name: "Tokusato",
      link: "https://cors-anywhere-d1oq.onrender.com/http://service-stitcher.clusters.pluto.tv/stitch/hls/channel/5ff609de50ab210008025c1b/master.m3u8?advertisingId=&appName=web&appVersion=unknown&appStoreUrl=&architecture=&buildVersion=&clientTime=0&deviceDNT=0&deviceId=967d46f0-96bd-11eb-b493-ab25b5b88dc0&deviceMake=Chrome&deviceModel=web&deviceType=web&deviceVersion=unknown&includeExtendedEvents=false&sid=e8619d5a-ac5a-4804-8d5e-84812ad7686b&userId=&serverSideAds=true",
    },
    {
      id: 11,
      name: "Death Note",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/625464a945b6a200079257d1/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&device",
    },
  ],

  SÉRIES: [
    {
      id: 38,
      name: "Icarly",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/620ff46e0a576e0007dc2f89/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
    },
    {
      id: 401,
      name: "Nick Clássicos",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f12151794c1800007a8ae63/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
    },
    {
      id: 402,
      name: "Os Padrinhos Magicos",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/63221e41af69b500076f84e7/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=18",
    },
    {
      id: 1,
      name: "Cine Sucessos",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f120e94a5714d00074576a1/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
    },
    {
      id: 2,
      name: "Cine Família",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f171f032cd22e0007f17f3d/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
    },
    {
      id: 3,
      name: "Cine Comédia",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f12101f0b12f00007844c7c/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
    },
    {
      id: 4,
      name: "Clube do Terror",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/64e501eec630a900088ed0f8/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
    },
    {
      id: 5,
      name: "Cine Comédia Romântica",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/62545ed3dab4380007582f7c/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
    },
    {
      id: 6,
      name: "Cine Drama",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1210d14ae1f80007bafb1d/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
    },
  ],

  "NOTÍCIAS COVID-19": [
    {
      id: 13,
      name: "BAND NEWS HD",
      link: "https://hls.hunter.fm/gospel/64.m3u8?shtl=OR99PlKze7mgR_U1AF_NVQZ0.dLFtA%2FSwg6Gi%2Fh77nRQTbBFiELSZm%2BOueXvqQcHVqGs",
    },
    { id: 17, name: "BBC", link: "https://8mwx.short.gy/CANALOFF/index.m3u8" },
    { id: 18, name: "BLOOMBERG", link: "https://example.com/bloomberg.m3u8" },
    {
      id: 26,
      name: "CNN BRASIL",
      link: "https://d25usgadhphvwi.cloudfront.net/hls/main.m3u8",
    },
    {
      id: 27,
      name: "CNN ESPANOL",
      link: "https://stream.ichibantv.com:3764/hybrid/play.m3u8",
    },
    {
      id: 28,
      name: "CNN INTERNATIONAL",
      link: "https://stream.ichibantv.com:3764/hybrid/play.m3u8",
    },
    { id: 35, name: "DIGI 24", link: "https://example.com/digi24.m3u8" },
  ],

  ESPORTE: [
    {
      id: 101,
      name: "ESPN Brasil",
      link: "http://s1.1-cup.net:2095/solucao111hgfgh77hu78/xplus1111XXhjgyu87/7",
    },
    {
      id: 102,
      name: "SporTV",
      link: "http://216.230.233.87:80/m3u8/sportv.m3u8",
    },
    {
      id: 102,
      name: "Band Sports",
      link: "https://sportscdn.me/bandsports/index.m3u8",
    },
  ],

  FILMES: [
    {
      id: 201,
      name: "Runtime Ação HD",
      link: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=2552",
    },
    {
      id: 202,
      name: "Runtime Comédia",
      link: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=2553",
    },
    {
      id: 203,
      name: "Runtime investigação",
      link: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=4864",
    },
    {
      id: 204,
      name: "Pluto tv cine sucessos",
      link: "https://r.mjh.nz/PlutoTV/5f120e94a5714d00074576a1-alt.m3u8",
    },
  ],

  ABERTOS: [
    {
      id: 501,
      name: "TV Globo RJ",
      link: "http://216.230.233.87:80/m3u8/globorj.m3u8",
    },
    {
      id: 507,
      name: "Band",
      link: "https://5b7f3c45ab7c2.streamlock.net/arapuan/ngrp:arapuan_all/chunklist.m3u8",
    },
    {
      id: 502,
      name: "SBT",
      link: "https://aovivo.maissbt.com/channel_360.m3u8",
    },
    {
      id: 503,
      name: "Record",
      link: "https://cdn.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8?ManoTV",
    },
    {
      id: 504,
      name: "RedeTV",
      link: "https://cdn.jmvstream.com/w/AVJ-15235/playlist/chunklist.m3u8",
    },
  ],
  "CANAIS DE RADIO": [
    {
      id: 13,
      name: "Gospel",
      link: "https://hls.hunter.fm/gospel/64.m3u8?shtl=OR99PlKze7mgR_U1AF_NVQZ0.dLFtA%2FSwg6Gi%2Fh77nRQTbBFiELSZm%2BOueXvqQcHVqGs",
    },
    {
      id: 17,
      name: "Radio rock",
      link: "https://hls.hunter.fm/rock/64.m3u8?shtl=OR99PlKze7mgR_U1AF_NVQZ0.dLFtA%2FSwg6Gi%2Fh77nRQTbBFiELSZm%2BOueXvqQcHVqGs",
    },
    {
      id: 26,
      name: "Gospel Internacional",
      link: "https://stream.vagalume.fm/hls/1470245767122628/aac.m3u8",
    },
    {
      id: 27,
      name: "Sertanejo/Piseiro",
      link: "https://hls.hunter.fm/pisadinha/64.m3u8?shtl=rLegrEjjYDLNiSScageIw8HO.tFEvhucVcOviAxNp1EnuCrAm7v1GpVOQdCA6q2VZ0CA",
    },
    {
      id: 28,
      name: "Anos 80",
      link: "https://hls.hunter.fm/80s/64.m3u8?shtl=OR99PlKze7mgR_U1AF_NVQZ0.dLFtA%2FSwg6Gi%2Fh77nRQTbBFiELSZm%2BOueXvqQcHVqGs",
    },
    {
      id: 35,
      name: "Samba",
      link: "https://hls.hunter.fm/pagode/64.m3u8?shtl=rLegrEjjYDLNiSScageIw8HO.tFEvhucVcOviAxNp1EnuCrAm7v1GpVOQdCA6q2VZ0CA",
    },
  ],
};

export default channels;

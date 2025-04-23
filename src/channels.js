// channels.js

const channels = {
  TODOS: [], // Será preenchido automaticamente no App.js

  "LISTA DE FAVORITOS": [], // Inicialmente vazia, o usuário pode adicionar canais aqui

  CULTURA: [
    {
      id: 601,
      name: "24H Todo Mundo Odeia o Cris",
      link: "http://ultrazrv.me:80/21407895/17306527/3920425",
      logo: "https://imagizer.imageshack.com/v2/320x240q90/923/HUmzYG.png"
    },{
      id: 301,
      name: "TV Cultura",
      link: "https://player-tvcultura.stream.uol.com.br/live/tvcultura.m3u8",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cultura_logo_2013.svg/240px-Cultura_logo_2013.svg.png"
    },
    {
      id: 127,
      name: "viagens",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f32d432d612e50007e56133/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://i.pinimg.com/736x/77/da/ed/77daed8daff67ab9e074e75eada1934e.jpg"
    },
    {
      id: 108,
      name: "tv escola",
      link: "https://5c483b9d1019c.streamlock.net/8054/8054/playlist.m3u8",
      logo: "https://statics.otvfoco.com.br/2015/06/TV-escola1.png"
    },
    {
      id: 29,
      name: "TV Brasil",
      link: "http://streaming.procergs.com.br:1935/tve/stve/playlist.m3u8",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/TV_Brasil_logo_2019.svg"
    },
    {
      id: 290,
      name: "Retro Tv",
      link: "http://stream.mediawork.cz/retrotv//retrotvHQ1/playlist.m3u8",
      logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-l/7c8320451943ed08265872510644e800.webp"
    },
  ],
  ANIME: [
    {
      id: 601,
      name: "geek dot.",
      link: "https://stream.ichibantv.com:3764/hybrid/play.m3u8",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwYn2PrsXrdl_NLY1O9zr0U7lhvWLMXktCcQ&usqp=CAU"
    },
    {
      id: 602,
      name: "AnimaX",
      link: "https://stream.ichibantv.com:3547/hybrid/play.m3u8",
      logo: "https://indiantelevision.com/sites/default/files/styles/smartcrop_800x800/public/images/tv-images/2016/07/08/Untitled-1_11.jpg?itok=G9CLuAX7"
    },
    {
      id: 26,
      name: "Otaku Sign TV",
      link: "https://stmv1.srvif.com/otaku/otaku/playlist.m3u8",
      logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhWzsaBbPTqt4Y65Q5dWlHOkqeTjU7YEbHGOSMzQVUqCxyFC9xHUo-7ZVK6Tzd1Ea_uDuF_cNEd94yD2t3MRv2XG9nHjqZ_OUy8O21z0h2gn83tfI1SMXb7lmYGgPF-NejpcZWOmlBqIT1nszsVfuTmNd5Gwm_AMGob8wIUDWsv7HvLgbNeKnjpzJRbzmc/w200-h100/OTAKU%20SIGN%20TV.webp"
    },
    {
      id: 29,
      name: "WORDING TV",
      link: "https://tv02.zas.media:1936/wordingtv/wordingtv/chunklist_w1264551258.m3u8",
      logo: "https://play-lh.googleusercontent.com/fvJuM-bjJiCcItUjedG-eGDRdF0qrjJabAhgp3ag8fcB1Kpmfai6DjTOiCu6_9DNTA=w240-h480-rw"
    },
    {
      id: 31,
      name: "Animes TV",
      link: "https://stmv1.srvif.com/animetv/animetv/playlist.m3u8?ManoTV",
      logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjpSDumzlxKREPdG7me7Aj2q6-Bms3dLL-oZRRYDFQvNfW5fONEsm7dkN8lB-GNzDTNYYyRitOb6t5YyAUqQdUDd5oqnenOvq8ZkhPsd6qzf21RC2r__4NqUyQspI7U3i3v462JIsgAa9nZUeeacR3VnZgTPM_Dh6MdhuUDCkOt8NBzwGoPDnFtS5KSYvo/w200-h100/ANIME%20TV.webp"
    },
    {
      id: 101,
      name: "Anime e Tokusatsu",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/604b79c558393100078faeef/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: "https://w7.pngwing.com/pngs/33/470/png-transparent-tokusatsu-drawing-ninja-cartoon-art-super-sentai.png"
    },
    {
      id: 3,
      name: "One Piece",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/624b1c8d4321e200073ee421/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
      logo: "https://i.pinimg.com/736x/81/b8/1b/81b81b38c72e148ce4ddfcae172733f0.jpg"
    },
    {
      id: 4,
      name: "Naruto",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5f6df5a173d7340007c559f7/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
      logo: "https://i.pinimg.com/736x/5f/60/34/5f60349f6b0980548907a7a81a8f3aed.jpg"
    },
    {
      id: 9,
      name: "Beyblade",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/633dc392e0282400071b0d39/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
      logo: ""
    },
    {
      id: 10,
      name: "Tokusato",
      link: "https://cors-anywhere-d1oq.onrender.com/http://service-stitcher.clusters.pluto.tv/stitch/hls/channel/5ff609de50ab210008025c1b/master.m3u8?advertisingId=&appName=web&appVersion=unknown&appStoreUrl=&architecture=&buildVersion=&clientTime=0&deviceDNT=0&deviceId=967d46f0-96bd-11eb-b493-ab25b5b88dc0&deviceMake=Chrome&deviceModel=web&deviceType=web&deviceVersion=unknown&includeExtendedEvents=false&sid=e8619d5a-ac5a-4804-8d5e-84812ad7686b&userId=&serverSideAds=true",
      logo: ""
    },
  ],
  DESENHOS: [
    {
      id: 601,
      name: "geek dot.",
      link: "https://stream.ichibantv.com:3764/hybrid/play.m3u8",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwYn2PrsXrdl_NLY1O9zr0U7lhvWLMXktCcQ&usqp=CAU"
    },
    {
      id: 27,
      name: "Loading...TV HD",
      link: "https://stmv1.srvif.com/loadingtv/loadingtv/playlist.m3u8",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN8-DtUJ-9pOvnxuoDYmFOhs-7RKJtzLwQGg&s" 
    },
    {
      id: 110,
      name: "Fox Kids",
      link: "https://stmv1.srvif.com/emlsilva/emlsilva/playlist.m3u8",
      logo: "https://imgur.com/9X7XBlD.png"
    },
    {
      id: 29,
      name: "WORDING TV",
      link: "https://tv02.zas.media:1936/wordingtv/wordingtv/chunklist_w1264551258.m3u8",
      logo: "https://play-lh.googleusercontent.com/fvJuM-bjJiCcItUjedG-eGDRdF0qrjJabAhgp3ag8fcB1Kpmfai6DjTOiCu6_9DNTA=w240-h480-rw"
    },
    {
      id: 401,
      name: "Nick Clássicos",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f12151794c1800007a8ae63/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS58QoW1lwg5B5_xnkmwyVV7VlZH5iHCrQ3IQ&s"
    },
    {
      id: 402,
      name: "Os Padrinhos Magicos",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/63221e41af69b500076f84e7/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=18",
      logo: "https://pm1.aminoapps.com/6521/c912be7f39bd142b2a5a581b61374bd75c48f504_hq.jpg"
    },
    {
      id: 119,
      name: "os jetsons",
      link: "https://stmv1.srvif.com/jetsontv/jetsontv/chunklist.m3u8",
      logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/a/aa/Jetsons.jpg/250px-Jetsons.jpg"
    },
    {
      id: 237,
      name: "Desenho Retro",
      link: "https://stmv1.srvif.com/xtremetv/xtremetv/playlist.m3u8",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0dC6w-BykeuhCZZJxBxZiREAqztdjmOoXWofwZn5Gsw3dsEmki4I6G_IzUSX1VRapUk&usqp=CAU"
    }
  ],
  SÉRIES: [
    {
      id: 38,
      name: "Icarly",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/620ff46e0a576e0007dc2f89/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEFNWW-pUGWSwIfwBgNeAyq26RB4cWgDCElQ&s"
    },
    {
      id: 128,
      name: "kenan e kel",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5ffcc5130fd98c0007f2e216/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg6JkfblhUxc0IqhSiK_3QvrrtXpSmTxJu6A&s"
    },
    {
      id: 4,
      name: "Clube do Terror",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/64e501eec630a900088ed0f8/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
      logo: "https://images.pluto.tv/channels/64e501eec630a900088ed0f8/thumbnail.jpg"
    },
    {
      id: 117,
      name: "nickelodeon",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/645951c0e94c38000802d2cb/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Nickelodeon_2023_logo.png"
    },
    {
      id: 102,
      name: "Tokusatsu",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5ff609de50ab210008025c1b/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://images.seeklogo.com/logo-png/47/2/jiban-tokusatsu-logo-png_seeklogo-478538.png"
    },
    {
      id: 129,
      name: "macgayver",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/63eb9dc84e83e70008abea92/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgLYwVooj5XwhcPiY-iu0Iul7QvzPLBbrRTvMSfrA2wADv8Pf-oLfuAyP2yxI6X5zomBk&usqp=CAU"
    },
    {
      id: 112,
      name: "series criminais",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/6474ab5cdc7a760008745008/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fseries%2F348064%2Fposters%2F5ebc59fd010b7.jpg&w=640&q=75"
    },
    {
      id: 114,
      name: "series sci fi",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/63d2ba2f60bc8f0008981a0e/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD4U9Ap0cZaLdDtTVjLJsHVdrRjSSugX2jzHN4PSYpKffYjm-n-H3bbqKY2_h2MbDD99Y&usqp=CAU"
    },
    
  ],
  "NOTÍCIAS": [
    {
      id: 17,
      name: "BBC",
      link: "https://8mwx.short.gy/CANALOFF/index.m3u8",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9k3ptv01t22FykL-FGCVmreWYzLPXRNHcmg&s"
    },
    {
      id: 26,
      name: "CNN BRASIL",
      link: "https://d25usgadhphvwi.cloudfront.net/hls/main.m3u8",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg5PspLuS1V8Q2fEsHLKXteg402IGXUqD3eQ&s"
    },
    {
      id: 29,
      name: "Record news",
      link: "https://cors-anywhere-d1oq.onrender.com/https://5cf4a2c2512a2.streamlock.net/8016/8016/chunklist_w1121778449.m3u8",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Record_News_logo_2022.svg"
    },
  ],
  ESPORTE: [
    {
      id: 101,
      name: "ESPN Brasil",
      link: "http://s1.1-cup.net:2095/solucao111hgfgh77hu78/xplus1111XXhjgyu87/7",
      logo: "https://i.imgur.com/CkoAvYH.png"
    },
    {
      id: 102,
      name: "Band Sports",
      link: "https://sportscdn.me/bandsports/index.m3u8",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSodXTv1mbD_cghEakWiLZ-QiZrqpR7Bw2H7Q&s"
    },
    {
      id: 109,
      name: "all sports",
      link: "https://5cf4a2c2512a2.streamlock.net/dgrau/dgrau/chunklist.m3u8",
      logo: "https://pbs.twimg.com/profile_images/1212859696383696896/ljdBfeUQ_400x400.jpg"
    },
    {
      id: 110,
      name: "fuel tv",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/6144d088516ea8000739076a/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: "https://seeklogo.com/images/F/fuel-tv-logo-3C3716497D-seeklogo.com.png"
    },
  ],
  FILMES: [
    {
      id: 1,
      name: "Cine Sucessos",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f120e94a5714d00074576a1/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://images.pluto.tv/channels/5f120e94a5714d00074576a1/colorLogoPNG.png"
    },
    {
      id: 2,
      name: "Extreme",
      link: "https://stmv1.srvif.com/xtremetv/xtremetv/playlist.m3u8",
      logo: "https://t3.ftcdn.net/jpg/01/01/95/04/360_F_101950431_ofa3YsAmc4Nw85q4laiTJxsSnqdjYexC.jpg"
    },
    {
      id: 3,
      name: "Cine Comédia",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f12101f0b12f00007844c7c/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://images.pluto.tv/channels/5f12101f0b12f00007844c7c/colorLogoPNG.png"
    },
  
    {
      id: 5,
      name: "Cine Comédia Romântica",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/62545ed3dab4380007582f7c/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://images.pluto.tv/channels/62545ed3dab4380007582f7c/colorLogoPNG.png"
    },
    {
      id: 201,
      name: "Runtime Ação HD",
      link: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=2552",
      logo: "https://images.samsung.com/is/image/samsung/assets/br/tvs/smart-tv/channel-list/RuntimeAcao_b_1000x1000_circle.png?$ORIGIN_PNG$"
    },
    {
      id: 202,
      name: "Runtime Comédia",
      link: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=2553",
      logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-l/d8e9cfe9b910731a2ba29ede0a63cacd.webp"
    },
    {
      id: 203,
      name: "Runtime investigação",
      link: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=4864",
      logo: "https://www.cxtv.com.br/img/Tvs/Logo/webp-l/ae540b891b4a0d073b39ae0bb693f5c3.webp"
    },
    {
      id: 103,
      name: "Soultv darkflix",
      link: "https://video01.soultv.com.br/darkflix/darkflix/playlist.m3u8",
      logo: "https://t.ctcdn.com.br/QmtiW8SWjm0OE823LBJ4NxF2dEU=/1200x675/smart/i477075.jpeg"
    },
    
  ],
  DOCUMENTÁRIOS: [

  
    {
      id: 104,
      name: "Ficção cientifica",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5fa15ad6367e170007cdd098/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q9DakA6Q673G3eEcVOZzm3t-LdwrTArz8w&s"
    },
    {
      id: 126,
      name: "Negócio fechado",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/64ad7394798def00087b2bfe/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/HCP-chicago6.jpg"
    },
    {
      id: 105,
      name: "Misterios sem solução",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/62b5c5a064163d0007b2efe6/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwREj4eOU7Ti6R2GAFiRdtsjxALPRuC9Emg&s"
    },
    {
      id: 106,
      name: "Space today tv",
      link: "https://service.webvideocore.net/CL1olYogIrDWvwqiIKK7eHbBxDyYany25g-L4QOVH5_l5daXY9tfEZPDJS0YHgpW/a_50acwl5q0f0g.m3u8",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBFexTm6rQhVFqscb2j56RaW2pWwqhKsGXg&s"
    },
    {
      id: 121,
      name: "Acumuladores",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/656e2a4b4261ca00083aa99e/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: "https://img.nbc.com/files/images/2020/3/01/AC_S1-Logo-1920x1080.jpg"
    },
    {
      id: 122,
      name: "Caçadores de ovnis",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/656e2a10954b020008ed167c/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
      logo: "https://resizing.flixster.com/rq_mVXfw8xkcTMKO1ROXKj9zOo4=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p185955_b_v9_au.jpg"
    },
    {
      id: 123,
      name: "Misterios",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/656e2a10954b020008ed167c/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
      logo: "https://images.pluto.tv/channels/5fac52f142044f00078e2a51/featuredImage.jpg"
    },
    {
      id: 125,
      name: "Catfish",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/626c2a3502d84a0007cec817/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://ih1.redbubble.net/image.723342440.0066/ls,13inch,x750-pad,750x1000,f8f8f8.u3.jpg"
    },
  
  ],
  ABERTOS: [
    {
      id: 501,
      name: "TV Globo RJ",
      link: "http://216.230.233.87:80/m3u8/globorj.m3u8",
      logo: "https://w7.pngwing.com/pngs/55/116/png-transparent-rede-globo-globo-tv-international-logo-television-telenovela-l-american-football-balloon-sphere-film-streaming-media-thumbnail.png"
    },
    {
      id: 507,
      name: "Band",
      link: "https://5b7f3c45ab7c2.streamlock.net/arapuan/ngrp:arapuan_all/chunklist.m3u8",
      logo: "https://e7.pngegg.com/pngimages/492/597/png-clipart-brazil-tv-bandeirantes-television-channel-band-television-logo-thumbnail.png" 
    },
    {
      id: 502,
      name: "SBT",
      link: "https://aovivo.maissbt.com/channel_360.m3u8",
      logo: "https://logodownload.org/wp-content/uploads/2017/04/sbt-interior-logo-5.png"
    },
    {
      id: 131,
      name: "sbt sp",
      link: "https://cdn.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/chunklist.m3u8",
      logo: "https://cdn.mitvstatic.com/channels/br_sbt-s-o-paulo-hd_m.png"
    },
    {
      id: 503,
      name: "Record",
      link: "https://cdn.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8?ManoTV",
      logo: "https://upload.wikimedia.org/wikipedia/pt/1/13/Logotipo_da_Rede_Record.png"
    },
    {
      id: 130,
      name: "Rede tv",
      link: "https://tv02.zas.media:1936/redetvparana/redetvparana/playlist.m3u8",
      logo: "https://e7.pngegg.com/pngimages/927/549/png-clipart-redetv-rondonia-television-channel-sistema-brasileiro-de-televisao-tv-television-text-thumbnail.png"
    },
  ],
  "CANAIS DE RADIO": [
    {
      id: 13,
      name: "Gospel",
      link: "https://hls.hunter.fm/gospel/64.m3u8?shtl=OR99PlKze7mgR_U1AF_NVQZ0.dLFtA%2FSwg6Gi%2Fh77nRQTbBFiELSZm%2BOueXvqQcHVqGs",
      logo: ""
    },
    {
      id: 17,
      name: "Radio rock",
      link: "https://hls.hunter.fm/rock/64.m3u8?shtl=OR99PlKze7mgR_U1AF_NVQZ0.dLFtA%2FSwg6Gi%2Fh77nRQTbBFiELSZm%2BOueXvqQcHVqGs",
      logo: ""
    },
    {
      id: 26,
      name: "Gospel Internacional",
      link: "https://stream.vagalume.fm/hls/1470245767122628/aac.m3u8",
      logo: ""
    },
    {
      id: 27,
      name: "Sertanejo/Piseiro",
      link: "https://hls.hunter.fm/pisadinha/64.m3u8?shtl=rLegrEjjYDLNiSScageIw8HO.tFEvhucVcOviAxNp1EnuCrAm7v1GpVOQdCA6q2VZ0CA",
      logo: ""
    },
    {
      id: 28,
      name: "Anos 80",
      link: "https://hls.hunter.fm/80s/64.m3u8?shtl=OR99PlKze7mgR_U1AF_NVQZ0.dLFtA%2FSwg6Gi%2Fh77nRQTbBFiELSZm%2BOueXvqQcHVqGs",
      logo: ""
    },
    {
      id: 35,
      name: "Samba",
      link: "https://hls.hunter.fm/pagode/64.m3u8?shtl=rLegrEjjYDLNiSScageIw8HO.tFEvhucVcOviAxNp1EnuCrAm7v1GpVOQdCA6q2VZ0CA",
      logo: ""
    },
  ],
  "ADICIONADOS RECENTEMENTE": [
    {
      id: 101,
      name: "anime e tokusatsu",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/604b79c558393100078faeef/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: ""
    },
    {
      id: 103,
      name: "soultv darkflix",
      link: "https://video01.soultv.com.br/darkflix/darkflix/playlist.m3u8",
      logo: ""
    },
    {
      id: 104,
      name: "ficção cientifica",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5fa15ad6367e170007cdd098/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: ""
    },
    {
      id: 105,
      name: "misterios sem solução",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/62b5c5a064163d0007b2efe6/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: ""
    },
    {
      id: 106,
      name: "space today tv",
      link: "https://service.webvideocore.net/CL1olYogIrDWvwqiIKK7eHbBxDyYany25g-L4QOVH5_l5daXY9tfEZPDJS0YHgpW/a_50acwl5q0f0g.m3u8",
      logo: ""
    },
    {
      id: 107,
      name: "tv cultura",
      link: "https://player-tvcultura.stream.uol.com.br/live/tvcultura_lsd.m3u8",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cultura_logo_2013.svg/240px-Cultura_logo_2013.svg.png"
    },
   
    {
      id: 111,
      name: "series comedia",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/6001f3018502100007f528ac/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: ""
    },
    {
      id: 112,
      name: "series criminais",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/6474ab5cdc7a760008745008/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: ""
    },
    {
      id: 113,
      name: "series de comedia pluto(verificar se é o mesmo de cima)",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/655e5bc94261ca000810cb17/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=s",  
      logo: ""
    },
    {
      id: 114,
      name: "series sci fi",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/63d2ba2f60bc8f0008981a0e/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: ""
    },
    {
      id: 115,
      name: "clube do terror",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/64e501eec630a900088ed0f8/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: "https://images.pluto.tv/channels/64e501eec630a900088ed0f8/colorLogoPNG.png"
    },
    {
      id: 116,
      name: "cocorico",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/62d969fd8451a30007f0fd94/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: ""
    },
    {
      id: 117,
      name: "nickelodeon",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/645951c0e94c38000802d2cb/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: ""
    },
    {
      id: 118,
      name: "nickelodeon classico",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f12151794c1800007a8ae63/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: ""
    },
    {
      id: 120,
      name: "teletubies",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/64e50055286f6b000838c067/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: ""
    },
    {
      id: 121,
      name: "acumuladores",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/656e2a4b4261ca00083aa99e/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: ""
    },
    {
      id: 122,
      name: "caçadores de ovnis",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/656e2a10954b020008ed167c/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
      logo: ""
    },
    {
      id: 123,
      name: "misterios",
      link: "https://cors-anywhere-d1oq.onrender.com/http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/656e2a10954b020008ed167c/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus",
      logo: ""
    },
    {
      id: 124,
      name: "misterios sem solução",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/62b5c5a064163d0007b2efe6/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: ""
    },
    {
      id: 125,
      name: "catfish",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/626c2a3502d84a0007cec817/master.m3u8?advertisingId={PSID}&appVersion=unknown&deviceDNT={TARGETOPT}&deviceId={PSID}&deviceLat=0&deviceLon=0&deviceMake=samsung&deviceModel=samsung&deviceType=samsung-tvplus&deviceVersion=unknown",
      logo: ""
    },
    {
      id: 126,
      name: "negocio fechado",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/64ad7394798def00087b2bfe/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: ""
    },
    {
      id: 128,
      name: "kenan e kel",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5ffcc5130fd98c0007f2e216/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: ""
    },
    {
      id: 129,
      name: "macgayver",
      link: "https://cors-anywhere-d1oq.onrender.com/https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/63eb9dc84e83e70008abea92/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1",
      logo: ""
    },
  ],
};

export default channels;

export function useragent_parser(ua) {
  let family = "Other";
  let major = "";
  let minor = "";
  let patch = "";
  let result;
  if (!ua) {
    // empty
  } else if (
    (result =
      /(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+)|).* like Gecko\) (?!Version\/[\d.]+)[A-Za-z]+\/[\d.]+/.exec(
        ua
      ))
  ) {
    let family = "Mobile Safari UI/WKWebView";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(ESPN)[%20| ]+Radio\/(\d+)\.(\d+)\.(\d+) CFNetwork/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Antenna)\/(\d+) CFNetwork/.exec(ua))) {
    let family = "AntennaPod";
    let major = result[2];
    return {family,major,minor,patch};
  } else if ((result = /(TopPodcasts)Pro\/(\d+) CFNetwork/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    return {family,major,minor,patch};
  } else if (
    (result = /(MusicDownloader)Lite\/(\d+)\.(\d+)\.(\d+) CFNetwork/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /^(.*)-iPad\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|) CFNetwork/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /^(.*)-iPhone\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|) CFNetwork/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /^(.*)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|) CFNetwork/.exec(
      ua
    ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(espn\.go)/.exec(ua))) {
    let family = "ESPN";
    return {family,major,minor,patch};
  } else if ((result = /(espnradio\.com)/.exec(ua))) {
    let family = "ESPN";
    return {family,major,minor,patch};
  } else if ((result = /ESPN APP$/.exec(ua))) {
    let family = "ESPN";
    return {family,major,minor,patch};
  } else if ((result = /(audioboom\.com)/.exec(ua))) {
    let family = "AudioBoom";
    return {family,major,minor,patch};
  } else if ((result = / (Rivo) RHYTHM/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(CFNetwork)(?:\/(\d+)\.(\d+)(?:\.(\d+)|)|)/.exec(ua))) {
    let family = "CFNetwork";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Pingdom\.com_bot_version_)(\d+)\.(\d+)/.exec(ua))) {
    let family = "PingdomBot";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(PingdomTMS)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "PingdomBot";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = / (PTST)\/(\d+)(?:\.(\d+)|)$/.exec(ua))) {
    let family = "WebPageTest.org bot";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /X11; (Datanyze); Linux/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(NewRelicPinger)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "NewRelicPingerBot";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Tableau)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Tableau";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Salesforce)(?:.)\/(\d+)\.(\d?)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(\(StatusCake\))/.exec(ua))) {
    let family = "StatusCakeBot";
    return {family,major,minor,patch};
  } else if ((result = /(facebookexternalhit)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "FacebookBot";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /Google.*\/\+\/web\/snippet/.exec(ua))) {
    let family = "GooglePlusBot";
    return {family,major,minor,patch};
  } else if ((result = /via ggpht\.com GoogleImageProxy/.exec(ua))) {
    let family = "GmailImageProxy";
    return {family,major,minor,patch};
  } else if (
    (result =
      /YahooMailProxy; https:\/\/help\.yahoo\.com\/kb\/yahoo-mail-proxy-SLN28749\.html/.exec(
        ua
      ))
  ) {
    let family = "YahooMailProxy";
    return {family,major,minor,patch};
  } else if ((result = /(Twitterbot)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Twitterbot";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if (
    (result =
      /\/((?:Ant-|)Nutch|[A-z]+[Bb]ot|[A-z]+[Ss]pider|Axtaris|fetchurl|Isara|ShopSalad|Tailsweep)[ -](\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /\b(008|Altresium|Argus|BaiduMobaider|BoardReader|DNSGroup|DataparkSearch|EDI|Goodzer|Grub|INGRID|Infohelfer|LinkedInBot|LOOQ|Nutch|OgScrper|PathDefender|Peew|PostPost|Steeler|Twitterbot|VSE|WebCrunch|WebZIP|Y!J-BR[A-Z]|YahooSeeker|envolk|sproose|wminer)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(MSIE) (\d+)\.(\d+)([a-z]\d|[a-z]|);.* MSIECrawler/.exec(ua))
  ) {
    let family = "MSIECrawler";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(DAVdroid)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(Google-HTTP-Java-Client|Apache-HttpClient|Go-http-client|scalaj-http|http%20client|Python-urllib|HttpMonitor|TLSProber|WinHTTP|JNLP|okhttp|aihttp|reqwest|axios|unirest-(?:java|python|ruby|nodejs|php|net))(?:[ /](\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(Pinterest(?:bot|))\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)[;\s(]+\+https:\/\/www\.pinterest\.com\/bot\.html/.exec(
        ua
      ))
  ) {
    let family = "Pinterestbot";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(CSimpleSpider|Cityreview Robot|CrawlDaddy|CrawlFire|Finderbots|Index crawler|Job Roboter|KiwiStatus Spider|Lijit Crawler|QuerySeekerSpider|ScollSpider|Trends Crawler|USyd-NLP-Spider|SiteCat Webbot|BotName\/\$BotVersion|123metaspider-Bot|1470\.net crawler|50\.nu|8bo Crawler Bot|Aboundex|Accoona-[A-z]{1,30}-Agent|AdsBot-Google(?:-[a-z]{1,30}|)|altavista|AppEngine-Google|archive.{0,30}\.org_bot|archiver|Ask Jeeves|[Bb]ai[Dd]u[Ss]pider(?:-[A-Za-z]{1,30})(?:-[A-Za-z]{1,30}|)|bingbot|BingPreview|blitzbot|BlogBridge|Bloglovin|BoardReader Blog Indexer|BoardReader Favicon Fetcher|boitho.com-dc|BotSeer|BUbiNG|\b\w{0,30}favicon\w{0,30}\b|\bYeti(?:-[a-z]{1,30}|)|Catchpoint(?: bot|)|[Cc]harlotte|Checklinks|clumboot|Comodo HTTP\(S\) Crawler|Comodo-Webinspector-Crawler|ConveraCrawler|CRAWL-E|CrawlConvera|Daumoa(?:-feedfetcher|)|Feed Seeker Bot|Feedbin|findlinks|Flamingo_SearchEngine|FollowSite Bot|furlbot|Genieo|gigabot|GomezAgent|gonzo1|(?:[a-zA-Z]{1,30}-|)Googlebot(?:-[a-zA-Z]{1,30}|)|Google SketchUp|grub-client|gsa-crawler|heritrix|HiddenMarket|holmes|HooWWWer|htdig|ia_archiver|ICC-Crawler|Icarus6j|ichiro(?:\/mobile|)|IconSurf|IlTrovatore(?:-Setaccio|)|InfuzApp|Innovazion Crawler|InternetArchive|IP2[a-z]{1,30}Bot|jbot\b|KaloogaBot|Kraken|Kurzor|larbin|LEIA|LesnikBot|Linguee Bot|LinkAider|LinkedInBot|Lite Bot|Llaut|lycos|Mail\.RU_Bot|masscan|masidani_bot|Mediapartners-Google|Microsoft .{0,30} Bot|mogimogi|mozDex|MJ12bot|msnbot(?:-media {0,2}|)|msrbot|Mtps Feed Aggregation System|netresearch|Netvibes|NewsGator[^/]{0,30}|^NING|Nutch[^/]{0,30}|Nymesis|ObjectsSearch|OgScrper|Orbiter|OOZBOT|PagePeeker|PagesInventory|PaxleFramework|Peeplo Screenshot Bot|PlantyNet_WebRobot|Pompos|Qwantify|Read%20Later|Reaper|RedCarpet|Retreiver|Riddler|Rival IQ|scooter|Scrapy|Scrubby|searchsight|seekbot|semanticdiscovery|SemrushBot|Simpy|SimplePie|SEOstats|SimpleRSS|SiteCon|Slackbot-LinkExpanding|Slack-ImgProxy|Slurp|snappy|Speedy Spider|Squrl Java|Stringer|TheUsefulbot|ThumbShotsBot|Thumbshots\.ru|Tiny Tiny RSS|Twitterbot|WhatsApp|URL2PNG|Vagabondo|VoilaBot|^vortex|Votay bot|^voyager|WASALive.Bot|Web-sniffer|WebThumb|WeSEE:[A-z]{1,30}|WhatWeb|WIRE|WordPress|Wotbox|www\.almaden\.ibm\.com|Xenu(?:.s|) Link Sleuth|Xerka [A-z]{1,30}Bot|yacy(?:bot|)|YahooSeeker|Yahoo! Slurp|Yandex\w{1,30}|YodaoBot(?:-[A-z]{1,30}|)|YottaaMonitor|Yowedo|^Zao|^Zao-Crawler|ZeBot_www\.ze\.bz|ZooShot|ZyBorg)(?:[ /]v?(\d+)(?:\.(\d+)(?:\.(\d+)|)|)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /\b(Boto3?|JetS3t|aws-(?:cli|sdk-(?:cpp|go|java|nodejs|ruby2?|dotnet-(?:\d{1,2}|core)))|s3fs)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /\[(FBAN\/MessengerForiOS|FB_IAB\/MESSENGER);FBAV\/(\d+)(?:\.(\d+)(?:\.(\d+)|)|)/.exec(
        ua
      ))
  ) {
    let family = "Facebook Messenger";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /\[FB.*;(FBAV)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua))
  ) {
    let family = "Facebook";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /\[FB.*;/.exec(ua))) {
    let family = "Facebook";
    return {family,major,minor,patch};
  } else if (
    (result =
      /(?:\/[A-Za-z0-9.]+|) {0,5}([A-Za-z0-9 \-_![\]:]{0,50}(?:[Aa]rchiver|[Ii]ndexer|[Ss]craper|[Bb]ot|[Ss]pider|[Cc]rawl[a-z]{0,50}))[/ ](\d+)(?:\.(\d+)(?:\.(\d+)|)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /((?:[A-Za-z][A-Za-z0-9 -]{0,50}|)[^C][^Uu][Bb]ot)\b(?:(?:[ /]| v)(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /((?:[A-z0-9]{1,50}|[A-z-]{1,50} ?|)(?: the |)(?:[Ss][Pp][Ii][Dd][Ee][Rr]|[Ss]crape|[Cc][Rr][Aa][Ww][Ll])[A-z0-9]{0,50})(?:(?:[ /]| v)(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(HbbTV)\/(\d+)\.(\d+)\.(\d+) \(/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(Chimera|SeaMonkey|Camino|Waterfox)\/(\d+)\.(\d+)\.?([ab]?\d+[a-z]*|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(SailfishBrowser)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))
  ) {
    let family = "Sailfish Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /\[(Pinterest)\/[^\]]+\]/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(Pinterest)(?: for Android(?: Tablet|)|)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /Mozilla.*Mobile.*(Instagram).(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /Mozilla.*Mobile.*(Flipboard).(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /Mozilla.*Mobile.*(Flipboard-Briefing).(\d+)\.(\d+)\.(\d+)/.exec(
      ua
    ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /Mozilla.*Mobile.*(Onefootball)\/Android.(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Snapchat)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Firefox)\/(\d+)\.(\d+) Basilisk\/(\d+)/.exec(ua))) {
    let family = "Basilisk";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(PaleMoon)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))) {
    let family = "Pale Moon";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Fennec)\/(\d+)\.(\d+)\.?([ab]?\d+[a-z]*)/.exec(ua))) {
    let family = "Firefox Mobile";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Fennec)\/(\d+)\.(\d+)(pre)/.exec(ua))) {
    let family = "Firefox Mobile";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Fennec)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Firefox Mobile";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if (
    (result = /(?:Mobile|Tablet);.*(Firefox)\/(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "Firefox Mobile";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(Namoroka|Shiretoko|Minefield)\/(\d+)\.(\d+)\.(\d+(?:pre|))/.exec(ua))
  ) {
    let family = "Firefox (" + result[1] + ")";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Firefox)\/(\d+)\.(\d+)(a\d+[a-z]*)/.exec(ua))) {
    let family = "Firefox Alpha";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Firefox)\/(\d+)\.(\d+)(b\d+[a-z]*)/.exec(ua))) {
    let family = "Firefox Beta";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Firefox)-(?:\d+\.\d+|)\/(\d+)\.(\d+)(a\d+[a-z]*)/.exec(ua))
  ) {
    let family = "Firefox Alpha";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Firefox)-(?:\d+\.\d+|)\/(\d+)\.(\d+)(b\d+[a-z]*)/.exec(ua))
  ) {
    let family = "Firefox Beta";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(Namoroka|Shiretoko|Minefield)\/(\d+)\.(\d+)([ab]\d+[a-z]*|)/.exec(ua))
  ) {
    let family = "Firefox (" + result[1] + ")";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Firefox).*Tablet browser (\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "MicroB";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(MozillaDeveloperPreview)\/(\d+)\.(\d+)([ab]\d+[a-z]*|)/.exec(
      ua
    ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(FxiOS)\/(\d+)\.(\d+)(\.(\d+)|)(\.(\d+)|)/.exec(ua))) {
    let family = "Firefox iOS";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Flock)\/(\d+)\.(\d+)(b\d+?)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(RockMelt)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Navigator)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Netscape";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Navigator)\/(\d+)\.(\d+)([ab]\d+)/.exec(ua))) {
    let family = "Netscape";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Netscape6)\/(\d+)\.(\d+)\.?([ab]?\d+|)/.exec(ua))) {
    let family = "Netscape";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(MyIBrow)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "My Internet Browser";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if (
    (result = /(UC? ?Browser|UCWEB|U3)[ /]?(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "UC Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Opera Tablet).*Version\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Opera Mini)(?:\/att|)\/?(\d+|)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(
      ua
    ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Opera)\/.+Opera Mobi.+Version\/(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "Opera Mobile";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Opera)\/(\d+)\.(\d+).+Opera Mobi/.exec(ua))) {
    let family = "Opera Mobile";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /Opera Mobi.+(Opera)(?:\/|\s+)(\d+)\.(\d+)/.exec(ua))) {
    let family = "Opera Mobile";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /Opera Mobi/.exec(ua))) {
    let family = "Opera Mobile";
    return {family,major,minor,patch};
  } else if (
    (result = /(Opera)\/9.80.*Version\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(?:Mobile Safari).*(OPR)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "Opera Mobile";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(?:Chrome).*(OPR)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Opera";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Coast)\/(\d+).(\d+).(\d+)/.exec(ua))) {
    let family = "Opera Coast";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(OPiOS)\/(\d+).(\d+).(\d+)/.exec(ua))) {
    let family = "Opera Mini";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /Chrome\/.+( MMS)\/(\d+).(\d+).(\d+)/.exec(ua))) {
    let family = "Opera Neon";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(hpw|web)OS\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))) {
    let family = "webOS Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(luakit)/.exec(ua))) {
    let family = "LuaKit";
    return {family,major,minor,patch};
  } else if ((result = /(Snowshoe)\/(\d+)\.(\d+).(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /Gecko\/\d+ (Lightning)\/(\d+)\.(\d+)\.?((?:[ab]?\d+[a-z]*)|(?:\d*))/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Firefox)\/(\d+)\.(\d+)\.(\d+(?:pre|)) \(Swiftfox\)/.exec(ua))
  ) {
    let family = "Swiftfox";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Firefox)\/(\d+)\.(\d+)([ab]\d+[a-z]*|) \(Swiftfox\)/.exec(ua))
  ) {
    let family = "Swiftfox";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(rekonq)\/(\d+)\.(\d+)(?:\.(\d+)|) Safari/.exec(ua))) {
    let family = "Rekonq";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /rekonq/.exec(ua))) {
    let family = "Rekonq";
    return {family,major,minor,patch};
  } else if (
    (result = /(conkeror|Conkeror)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))
  ) {
    let family = "Conkeror";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(konqueror)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Konqueror";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(WeTab)-Browser/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(Comodo_Dragon)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Comodo Dragon";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Symphony) (\d+).(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /PLAYSTATION 3.+WebKit/.exec(ua))) {
    let family = "NetFront NX";
    return {family,major,minor,patch};
  } else if ((result = /PLAYSTATION 3/.exec(ua))) {
    let family = "NetFront";
    return {family,major,minor,patch};
  } else if ((result = /(PlayStation Portable)/.exec(ua))) {
    let family = "NetFront";
    return {family,major,minor,patch};
  } else if ((result = /(PlayStation Vita)/.exec(ua))) {
    let family = "NetFront NX";
    return {family,major,minor,patch};
  } else if ((result = /AppleWebKit.+ (NX)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "NetFront NX";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Nintendo 3DS)/.exec(ua))) {
    let family = "NetFront NX";
    return {family,major,minor,patch};
  } else if ((result = /(Silk)\/(\d+)\.(\d+)(?:\.([0-9-]+)|)/.exec(ua))) {
    let family = "Amazon Silk";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Puffin)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /Windows Phone .*(Edge)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Edge Mobile";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(SamsungBrowser)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Samsung Internet";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(SznProhlizec)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))) {
    let family = "Seznam prohl%u00ED%u017Ee%u010D";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(coc_coc_browser)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))
  ) {
    let family = "Coc Coc";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(baidubrowser)[/\s](\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua))
  ) {
    let family = "Baidu Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(FlyFlow)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Baidu Explorer";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(MxBrowser)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))) {
    let family = "Maxthon";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Crosswalk)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Line)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "LINE";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(MiuiBrowser)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "MiuiBrowser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Mint Browser)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Mint Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /Mozilla.+Android.+(GSA)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "Google";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /Version\/.+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "Chrome Mobile WebView";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /; wv\).+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "Chrome Mobile WebView";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(CrMo)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Chrome Mobile";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(CriOS)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Chrome Mobile iOS";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+) Mobile(?:[ /]|$)/.exec(ua))
  ) {
    let family = "Chrome Mobile";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = / Mobile .*(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "Chrome Mobile";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(chromeframe)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Chrome Frame";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(SLP Browser)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Tizen Browser";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(SE 2\.X) MetaSr (\d+)\.(\d+)/.exec(ua))) {
    let family = "Sogou Explorer";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if (
    (result = /(MQQBrowser\/Mini)(?:(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(ua))
  ) {
    let family = "QQ Browser Mini";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(MQQBrowser)(?:\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(ua))
  ) {
    let family = "QQ Browser Mobile";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(QQBrowser)(?:\/(\d+)(?:\.(\d+)\.(\d+)(?:\.(\d+)|)|)|)/.exec(ua))
  ) {
    let family = "QQ Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Rackspace Monitoring)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "RackspaceBot";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(PyAMF)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(YaBrowser)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Yandex Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Chrome)\/(\d+)\.(\d+)\.(\d+).* MRCHROME/.exec(ua))) {
    let family = "Mail.ru Chromium Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(AOL) (\d+)\.(\d+); AOLBuild (\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(PodCruncher|Downcast)[ /]?(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = / (BoxNotes)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Whale)\/(\d+)\.(\d+)\.(\d+)\.(\d+) Mobile(?:[ /]|$)/.exec(ua))
  ) {
    let family = "Whale";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Whale)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Whale";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Ghost)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Slack_SSB)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Slack Desktop Client";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(HipChat)\/?(\d+|)/.exec(ua))) {
    let family = "HipChat Desktop Client";
    let major = result[2];
    return {family,major,minor,patch};
  } else if (
    (result =
      /\b(MobileIron|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Epiphany|Shiira|Sunrise|Spotify|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iris|UP\.Browser|Bunjalloo|Google Earth|Raven for Mac|Openwave|MacOutlook|Electron|OktaMobile)\/(\d+)\.(\d+)\.(\d+)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /Microsoft Office Outlook 12\.\d+\.\d+|MSOffice 12/.exec(ua))
  ) {
    let family = "Outlook";
    let major = "2007";
    return {family,major,minor,patch};
  } else if ((result = /Microsoft Outlook 14\.\d+\.\d+|MSOffice 14/.exec(ua))) {
    let family = "Outlook";
    let major = "2010";
    return {family,major,minor,patch};
  } else if ((result = /Microsoft Outlook 15\.\d+\.\d+/.exec(ua))) {
    let family = "Outlook";
    let major = "2013";
    return {family,major,minor,patch};
  } else if (
    (result = /Microsoft Outlook (?:Mail )?16\.\d+\.\d+|MSOffice 16/.exec(ua))
  ) {
    let family = "Outlook";
    let major = "2016";
    return {family,major,minor,patch};
  } else if ((result = /Microsoft Office (Word) 2014/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /Outlook-Express\/7\.0.*/.exec(ua))) {
    let family = "Windows Live Mail";
    return {family,major,minor,patch};
  } else if ((result = /(Airmail) (\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Thunderbird)\/(\d+)\.(\d+)(?:\.(\d+(?:pre|))|)/.exec(ua))
  ) {
    let family = "Thunderbird";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Postbox)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Postbox";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Barca(?:Pro)?)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))) {
    let family = "Barca";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Lotus-Notes)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))) {
    let family = "Lotus Notes";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Vivaldi)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Edge?)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua))
  ) {
    let family = "Edge";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(brave)\/(\d+)\.(\d+)\.(\d+) Chrome/.exec(ua))) {
    let family = "Brave";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Chrome)\/(\d+)\.(\d+)\.(\d+)[\d.]* Iron[^/]/.exec(ua))
  ) {
    let family = "Iron";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /\b(Dolphin)(?: |HDCN\/|\/INT-)(\d+)\.(\d+)(?:\.(\d+)|)/.exec(
      ua
    ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(HeadlessChrome)(?:\/(\d+)\.(\d+)\.(\d+)|)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Evolution)\/(\d+)\.(\d+)\.(\d+\.\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(RCM CardDAV plugin)\/(\d+)\.(\d+)\.(\d+(?:-dev|))/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(bingbot|Bolt|AdobeAIR|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|iTunes|MacAppStore|NetNewsWire|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris|Abrowser|Planetweb|ICE Browser|mDolphin|qutebrowser|Otter|QupZilla|MailBar|kmail2|YahooMobileMail|ExchangeWebServices|ExchangeServicesClient|Dragon|Outlook-iOS-Android)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Chromium|Chrome)\/(\d+)\.(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(
      ua
    ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(IEMobile)[ /](\d+)\.(\d+)/.exec(ua))) {
    let family = "IE Mobile";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(BacaBerita App)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /^(bPod|Pocket Casts|Player FM)$/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if (
    (result = /^(AlexaMediaPlayer|VLC)\/(\d+)\.(\d+)\.([^.\s]+)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /^(AntennaPod|WMPlayer|Zune|Podkicker|Radio|ExoPlayerDemo|Overcast|PocketTunes|NSPlayer|okhttp|DoggCatcher|QuickNews|QuickTime|Peapod|Podcasts|GoldenPod|VLC|Spotify|Miro|MediaGo|Juice|iPodder|gPodder|Banshee)\/(\d+)\.(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /^(Peapod|Liferea)\/([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /^(bPod|Player FM) BMID\/(\S+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    return {family,major,minor,patch};
  } else if ((result = /^(Podcast ?Addict)\/v(\d+) /.exec(ua))) {
    let family = result[1];
    let major = result[2];
    return {family,major,minor,patch};
  } else if ((result = /^(Podcast ?Addict) /.exec(ua))) {
    let family = "PodcastAddict";
    return {family,major,minor,patch};
  } else if ((result = /(Replay) AV/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(VOX) Music Player/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(CITA) RSS Aggregator\/(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Pocket Casts)$/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(Player FM)$/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(LG Player|Doppler|FancyMusic|MediaMonkey|Clementine) (\d+)\.(\d+)\.?([^.\s]+|)\.?([^.\s]+|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(philpodder)\/(\d+)\.(\d+)\.?([^.\s]+|)\.?([^.\s]+|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(Player FM|Pocket Casts|DoggCatcher|Spotify|MediaMonkey|MediaGo|BashPodder)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(QuickTime)\.(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Kinoma)(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    return {family,major,minor,patch};
  } else if ((result = /(Fancy) Cloud Music (\d+)\.(\d+)/.exec(ua))) {
    let family = "FancyMusic";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /EspnDownloadManager/.exec(ua))) {
    let family = "ESPN";
    return {family,major,minor,patch};
  } else if (
    (result = /(ESPN) Radio (\d+)\.(\d+)(?:\.(\d+)|) ?(?:rv:(\d+)|) /.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(podracer|jPodder) v ?(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(ZDM)\/(\d+)\.(\d+)[; ]?/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Zune|BeyondPod) (\d+)(?:\.(\d+)|)[);]/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(WMPlayer)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /^(Lavf)/.exec(ua))) {
    let family = "WMPlayer";
    return {family,major,minor,patch};
  } else if ((result = /^(RSSRadio)[ /]?(\d+|)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    return {family,major,minor,patch};
  } else if ((result = /(RSS_Radio) (\d+)\.(\d+)/.exec(ua))) {
    let family = "RSSRadio";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Podkicker) \S+\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Podkicker";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /^(HTC) Streaming Player \S+ \/ \S+ \/ \S+ \/ (\d+)\.(\d+)(?:\.(\d+)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /^(Stitcher)\/iOS/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /^(Stitcher)\/Android/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /^(VLC) .*version (\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = / (VLC) for/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(vlc)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "VLC";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /^(foobar)\S+\/([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /^(Clementine)\S+ ([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(amarok)\/([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)/.exec(ua))
  ) {
    let family = "Amarok";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Custom)-Feed Reader/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\d+)\.(\d+)\.(\d+)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(iCab|Lunascape|Opera|Android|Jasmine|Polaris|Microsoft SkyDriveSync|The Bat!) (\d+)\.(\d+)(?:\.(\d+)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Kindle)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Android) Donut/.exec(ua))) {
    let family = result[1];
    let major = "1";
    let minor = "2";
    return {family,major,minor,patch};
  } else if ((result = /(Android) Eclair/.exec(ua))) {
    let family = result[1];
    let major = "2";
    let minor = "1";
    return {family,major,minor,patch};
  } else if ((result = /(Android) Froyo/.exec(ua))) {
    let family = result[1];
    let major = "2";
    let minor = "2";
    return {family,major,minor,patch};
  } else if ((result = /(Android) Gingerbread/.exec(ua))) {
    let family = result[1];
    let major = "2";
    let minor = "3";
    return {family,major,minor,patch};
  } else if ((result = /(Android) Honeycomb/.exec(ua))) {
    let family = result[1];
    let major = "3";
    return {family,major,minor,patch};
  } else if ((result = /(MSIE) (\d+)\.(\d+).*XBLWP7/.exec(ua))) {
    let family = "IE Large Screen";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Nextcloud)/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(mirall)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(ownCloud-android)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Owncloud";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(OC)\/(\d+)\.(\d+)\.(\d+)\.(\d+) \(Skype for Business\)/.exec(
      ua
    ))
  ) {
    let family = "Skype";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Obigo)InternetBrowser/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(Obigo)-Browser/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(Obigo|OBIGO)[^\d]*(\d+)(?:.(\d+)|)/.exec(ua))) {
    let family = "Obigo";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(MAXTHON|Maxthon) (\d+)\.(\d+)/.exec(ua))) {
    let family = "Maxthon";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Maxthon|MyIE2|Uzbl|Shiira)/.exec(ua))) {
    let family = result[1];
    let major = "0";
    return {family,major,minor,patch};
  } else if ((result = /(BrowseX) \((\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(NCSA_Mosaic)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "NCSA Mosaic";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(POLARIS)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Polaris";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Embider)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Polaris";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(BonEcho)\/(\d+)\.(\d+)\.?([ab]?\d+|)/.exec(ua))) {
    let family = "Bon Echo";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(iPod|iPhone|iPad).+GSA\/(\d+)\.(\d+)\.(\d+) Mobile/.exec(ua))
  ) {
    let family = "Google";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(iPod|iPhone|iPad).+Version\/(\d+)\.(\d+)(?:\.(\d+)|).*[ +]Safari/.exec(
        ua
      ))
  ) {
    let family = "Mobile Safari";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+)|).* AppleNews\/\d+\.\d+\.\d+?/.exec(
        ua
      ))
  ) {
    let family = "Mobile Safari UI/WKWebView";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(iPod|iPhone|iPad).+Version\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua))
  ) {
    let family = "Mobile Safari UI/WKWebView";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+)|).*Mobile.*[ +]Safari/.exec(
        ua
      ))
  ) {
    let family = "Mobile Safari";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+)|).*Mobile/.exec(
        ua
      ))
  ) {
    let family = "Mobile Safari UI/WKWebView";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(iPod|iPhone|iPad).* Safari/.exec(ua))) {
    let family = "Mobile Safari";
    return {family,major,minor,patch};
  } else if ((result = /(iPod|iPhone|iPad)/.exec(ua))) {
    let family = "Mobile Safari UI/WKWebView";
    return {family,major,minor,patch};
  } else if ((result = /(Watch)(\d+),(\d+)/.exec(ua))) {
    let family = "Apple " + result[1] + " App";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if (
    (result =
      /(Outlook-iOS)\/\d+\.\d+\.prod\.iphone \((\d+)\.(\d+)\.(\d+)\)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(AvantGo) (\d+).(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(OneBrowser)\/(\d+).(\d+)/.exec(ua))) {
    let family = "ONE Browser";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Avant)/.exec(ua))) {
    let family = result[1];
    let major = "1";
    return {family,major,minor,patch};
  } else if ((result = /(QtCarBrowser)/.exec(ua))) {
    let family = result[1];
    let major = "1";
    return {family,major,minor,patch};
  } else if ((result = /^(iBrowser\/Mini)(\d+).(\d+)/.exec(ua))) {
    let family = "iBrowser Mini";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /^(iBrowser|iRAPP)\/(\d+).(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /^(Nokia)/.exec(ua))) {
    let family = "Nokia Services (WAP) Browser";
    return {family,major,minor,patch};
  } else if ((result = /(NokiaBrowser)\/(\d+)\.(\d+).(\d+)\.(\d+)/.exec(ua))) {
    let family = "Nokia Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(NokiaBrowser)\/(\d+)\.(\d+).(\d+)/.exec(ua))) {
    let family = "Nokia Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(NokiaBrowser)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Nokia Browser";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(BrowserNG)\/(\d+)\.(\d+).(\d+)/.exec(ua))) {
    let family = "Nokia Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Series60)\/5\.0/.exec(ua))) {
    let family = "Nokia Browser";
    let major = "7";
    let minor = "0";
    return {family,major,minor,patch};
  } else if ((result = /(Series60)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Nokia OSS Browser";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if (
    (result = /(S40OviBrowser)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "Ovi Browser";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Nokia)[EN]?(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    return {family,major,minor,patch};
  } else if (
    (result = /(PlayBook).+RIM Tablet OS (\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "BlackBerry WebKit";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Black[bB]erry|BB10).+Version\/(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = "BlackBerry WebKit";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Black[bB]erry)\s?(\d+)/.exec(ua))) {
    let family = "BlackBerry";
    let major = result[2];
    return {family,major,minor,patch};
  } else if ((result = /(OmniWeb)\/v(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Blazer)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Palm Blazer";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Pre)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Palm Pre";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(ELinks)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(ELinks) \((\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Links) \((\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(QtWeb) Internet Browser\/(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(PhantomJS)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(AppleWebKit)\/(\d+)(?:\.(\d+)|)\+ .* Safari/.exec(ua))
  ) {
    let family = "WebKit Nightly";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if (
    (result = /(Version)\/(\d+)\.(\d+)(?:\.(\d+)|).*Safari\//.exec(ua))
  ) {
    let family = "Safari";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Safari)\/\d+/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if ((result = /(OLPC)\/Update(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(OLPC)\/Update()\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = "0";
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(SEMC-Browser)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Teleca)/.exec(ua))) {
    let family = "Teleca Browser";
    return {family,major,minor,patch};
  } else if ((result = /(Phantom)\/V(\d+)\.(\d+)/.exec(ua))) {
    let family = "Phantom Browser";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Trident)\/(7|8)\.(0)/.exec(ua))) {
    let family = "IE";
    let major = "11";
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Trident)\/(6)\.(0)/.exec(ua))) {
    let family = "IE";
    let major = "10";
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Trident)\/(5)\.(0)/.exec(ua))) {
    let family = "IE";
    let major = "9";
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Trident)\/(4)\.(0)/.exec(ua))) {
    let family = "IE";
    let major = "8";
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Espial)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(AppleWebKit)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Apple Mail";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(Firefox)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Firefox)\/(\d+)\.(\d+)(pre|[ab]\d+[a-z]*|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /([MS]?IE) (\d+)\.(\d+)/.exec(ua))) {
    let family = "IE";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(python-requests)\/(\d+)\.(\d+)/.exec(ua))) {
    let family = "Python Requests";
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if (
    (result =
      /\b(Windows-Update-Agent|Microsoft-CryptoAPI|SophosUpdateManager|SophosAgent|Debian APT-HTTP|Ubuntu APT-HTTP|libcurl-agent|libwww-perl|urlgrabber|curl|PycURL|Wget|aria2|Axel|OpenBSD ftp|lftp|jupdate|insomnia|fetch libfetch|akka-http|got)(?:[ /](\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Python\/3\.\d{1,3} aiohttp)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /(Java)[/ ]{0,1}\d+\.(\d+)\.(\d+)[_-]*([a-zA-Z0-9]+|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /^(Cyberduck)\/(\d+)\.(\d+)\.(\d+)(?:\.\d+|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result =
      /^(S3 Browser) (\d+)-(\d+)-(\d+)(?:\s*http:\/\/s3browser\.com|)/.exec(ua))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /(S3Gof3r)/.exec(ua))) {
    let family = result[1];
    return {family,major,minor,patch};
  } else if (
    (result =
      /\b(ibm-cos-sdk-(?:core|java|js|python))\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(
        ua
      ))
  ) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /^(rusoto)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /^(rclone)\/v(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /^(Roku)\/DVP-(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    return {family,major,minor,patch};
  } else if ((result = /(Kurio)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = "Kurio App";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if ((result = /^(Box(?: Sync)?)\/(\d+)\.(\d+)\.(\d+)/.exec(ua))) {
    let family = result[1];
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  } else if (
    (result = /^(ViaFree|Viafree)-(?:tvOS-)?[A-Z]{2}\/(\d+)\.(\d+)\.(\d+)/.exec(
      ua
    ))
  ) {
    let family = "ViaFree";
    let major = result[2];
    let minor = result[3];
    let patch = result[4];
    return {family,major,minor,patch};
  }
  return { family, major, minor, patch };
}

export function UA(ua) {
  if (ua) {
    // # Longest genuine UA seen so far: 255 chars (Facebook in-app on iOS):
    if (ua.length > 300) {
      ua = "other/0.0.0";
    }

    // # Remove UA tokens that unnecessarily complicate UA parsing

    // # Chrome and Opera on iOS uses a UIWebView of the underlying platform to render
    // # content. By stripping the CriOS or OPiOS strings, the useragent parser will alias the
    // # user agent to ios_saf for the UIWebView, which is closer to the actual renderer
    ua = ua.replace(
      /((CriOS|OPiOS)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|(FxiOS\/(\d+)\.(\d+)))/,
      ""
    );

    // # # Vivaldi browser is recognised by UA module but is actually identical to Chrome, so
    // # # the best way to get accurate targeting is to remove the vivaldi token from the UA
    ua = ua.replace(/ vivaldi\/[\d.]+\d+/i, "");

    // # # Facebook in-app browser `[FBAN/.....]` or `[FB_IAB/.....]` (see #990)
    ua = ua.replace(/ \[(FB_IAB|FBAN|FBIOS|FB4A)\/[^\]]+\]/i, "");

    // # # Electron ` Electron/X.Y.Z` (see #1129)
    ua = ua.replace(/ Electron\/[\d.]+\d+/i, "");

    let { family, major, minor, patch } = useragent_parser(ua);

    patch = "0";
    family = family.toLowerCase();

    // # Aliases
    if (family == "blackberry webkit") {
      family = "bb";
    }
    if (family == "blackberry") {
      family = "bb";
    }
    if (family == "pale moon (firefox variant)") {
      family = "firefox";
    }
    if (family == "pale moon") {
      family = "firefox";
    }
    if (family == "firefox mobile") {
      family = "firefox_mob";
    }
    if (family == "firefox namoroka") {
      family = "firefox";
    }
    if (family == "firefox shiretoko") {
      family = "firefox";
    }
    if (family == "firefox minefield") {
      family = "firefox";
    }
    if (family == "firefox alpha") {
      family = "firefox";
    }
    if (family == "firefox beta") {
      family = "firefox";
    }
    if (family == "microb") {
      family = "firefox";
    }
    if (family == "mozilladeveloperpreview") {
      family = "firefox";
    }
    if (family == "iceweasel") {
      family = "firefox";
    }
    if (family == "opera tablet") {
      family = "opera";
    }
    if (family == "opera mobile") {
      family = "op_mob";
    }
    if (family == "opera mini") {
      family = "op_mini";
    }
    if (family == "chrome mobile") {
      family = "chrome";
    }
    if (family == "chrome frame") {
      family = "chrome";
    }
    if (family == "chromium") {
      family = "chrome";
    }
    if (family == "ie mobile") {
      family = "ie_mob";
    }
    if (family == "ie large screen") {
      family = "ie";
    }
    if (family == "internet explorer") {
      family = "ie";
    }
    if (family == "edge") {
      family = "ie";
    }
    if (family == "edge mobile") {
      family = "ie";
    }
    if (family == "uc browser" && major == "9" && minor == "9") {
        family = "ie";
        major = "10";
      }
    if (family == "chrome mobile ios") {
      family = "ios_chr";
    }

    if (family == "mobile safari") {
      family = "ios_saf";
    }
    if (family == "iphone") {
      family = "ios_saf";
    }
    if (family == "iphone simulator") {
      family = "ios_saf";
    }
    if (family == "mobile safari uiwebview") {
      family = "ios_saf";
    }
    if (family == "mobile safari ui/wkwebview") {
      family = "ios_saf";
    }

    if (family == "samsung internet") {
      family = "samsung_mob";
    }

    if (family == "phantomjs") {
      family = "safari";
      major = "5";
    }

    if (family == "yandex browser") {
      if (major == "14" && minor == "10") {
        family = "chrome";
        major = "37";
      }
      if (major == "14" && minor == "10") {
        family = "chrome";
        major = "36";
      }
      if (major == "14" && minor == "10") {
        family = "chrome";
        major = "35";
      }
      if (major == "14" && minor == "10") {
        family = "chrome";
        major = "34";
      }
      if (major == "14" && minor == "10") {
        family = "chrome";
        major = "33";
      }
      if (major == "14" && minor == "10") {
        family = "chrome";
        major = "32";
      }
      if (major == "14" && minor == "10") {
        family = "chrome";
        major = "30";
      }
      if (major == "14" && minor == "10") {
        family = "chrome";
        major = "28";
      }
      if (major == "14" && minor == "10") {
        family = "chrome";
        major = "60";
      }
    }

    if (family == "opera") {
      if (major == "20") {
        family = "chrome";
        major = "33";
      }
      if (major == "21") {
        family = "chrome";
        major = "34";
      }
      if (major == "22") {
        family = "chrome";
        major = "35";
      }
      if (major == "23") {
        family = "chrome";
        major = "36";
      }
      if (major == "24") {
        family = "chrome";
        major = "37";
      }
      if (major == "25") {
        family = "chrome";
        major = "38";
      }
      if (major == "26") {
        family = "chrome";
        major = "39";
      }
      if (major == "27") {
        family = "chrome";
        major = "40";
      }
      if (major == "28") {
        family = "chrome";
        major = "41";
      }
      if (major == "29") {
        family = "chrome";
        major = "42";
      }
      if (major == "30") {
        family = "chrome";
        major = "43";
      }
      if (major == "31") {
        family = "chrome";
        major = "44";
      }
      if (major == "32") {
        family = "chrome";
        major = "45";
      }
      if (major == "33") {
        family = "chrome";
        major = "46";
      }
      if (major == "34") {
        family = "chrome";
        major = "47";
      }
      if (major == "35") {
        family = "chrome";
        major = "48";
      }
      if (major == "36") {
        family = "chrome";
        major = "49";
      }
      if (major == "37") {
        family = "chrome";
        major = "50";
      }
      if (major == "38") {
        family = "chrome";
        major = "51";
      }
      if (major == "39") {
        family = "chrome";
        major = "52";
      }
      if (major == "40") {
        family = "chrome";
        major = "53";
      }
      if (major == "41") {
        family = "chrome";
        major = "54";
      }
      if (major == "42") {
        family = "chrome";
        major = "55";
      }
      if (major == "43") {
        family = "chrome";
        major = "56";
      }
      if (major == "44") {
        family = "chrome";
        major = "57";
      }
      if (major == "45") {
        family = "chrome";
        major = "58";
      }
      if (major == "46") {
        family = "chrome";
        major = "59";
      }
      if (major == "47") {
        family = "chrome";
        major = "60";
      }
    }

    if (family == "googlebot" && major == "2" && minor == "1") {
        family = "chrome";
        major = "41";
      }

    // # Supported Browsers and minimum supported versions.
    if (
      // # ie: ">=7",
      (family == "ie" && Number.parseInt(major, 10) >= 7) ||
      // # ie_mob: ">=8",
      (family == "ie_mob" && Number.parseInt(major, 10) >= 8) ||
      // # chrome: "*",
      family == "chrome" ||
      // # safari: ">=4",
      (family == "safari" && Number.parseInt(major, 10) >= 4) ||
      // # ios_saf: ">=4",
      (family == "ios_saf" && Number.parseInt(major, 10) >= 4) ||
      // # ios_chr: ">=4",
      (family == "ios_chr" && Number.parseInt(major, 10) >= 4) ||
      // # firefox: ">=3.6",
      (family == "firefox" && Number.parseInt(major, 10) >= 4) ||
      (family == "firefox" &&
        Number.parseInt(major, 10) == 3 &&
        Number.parseInt(minor, 10) >= 6) ||
      // # firefox_mob: ">=4",
      (family == "firefox_mob" && Number.parseInt(major, 10) >= 4) ||
      // # android: ">=3",
      (family == "android" && Number.parseInt(major, 10) >= 3) ||
      // # opera: ">=11",
      (family == "opera" && Number.parseInt(major, 10) >= 11) ||
      // # op_mob: ">=10",
      (family == "op_mob" && Number.parseInt(major, 10) >= 10) ||
      // # op_mini: ">=5",
      (family == "op_mini" && Number.parseInt(major, 10) >= 5) ||
      // # bb: ">=6",
      (family == "bb" && Number.parseInt(major, 10) >= 6) ||
      // # samsung_mob: ">=4"
      (family == "samsung_mob" && Number.parseInt(major, 10) >= 4)
    ) {
      return family + "/" + major + "." + minor + "." + patch;
    } else {
      let family = "other";
      let major = "0";
      let minor = "0";
      return family + "/" + major + "." + minor + "." + patch;
    }
  } else {
    return "other/0.0.0";
  }
}

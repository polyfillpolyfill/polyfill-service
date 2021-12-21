export function useragent_parser(ua) {
  let family = "Other";
  let major;
  let minor;
  let patch;
  let result;
  if (!ua) {
	return {family,major,minor,patch}
  } else if (result = /Opera\/9\.80 \(.+(Opera Mini)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Opera\/9\.80 \(.+(Opera Mini)\/(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/525\.18(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "3";
		const minor="1";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/528\.18(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "4";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/531\.21(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "4";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/532\.9(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "4";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/532\+/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "5";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/533\.17(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "5";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/534\.12(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "5";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/534\.46(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "5";
		const minor="1";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/536\.26(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "6";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/537\.51(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "7";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/600\.1(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "8";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/601\.1(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "9";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/601\.5(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "9";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/602\.1(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "10";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/602\.2(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "10";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/602\.3(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "10";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/602\.4(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "10";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/603\.1(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "10";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/603\.2(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "10";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/604\.1(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "11";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/604\.2(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "11";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/604\.3(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "11";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/604\.5(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "11";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/605\.1(?:\.\d+|) \(KHTML, like Gecko\) Version\/(\d+)\.?(\d+)?\.?(\d+)?.+?Mobile\/\w+\s(Safari)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/605\.1(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "11";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/606\.1(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "12";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/607\.1(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "12";
		const minor="1";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+AppleWebKit\/608\.2(?:\.\d+|)/.exec(ua)) {
		const family = "Mobile Safari/WKWebView";
		const major = "13";
		return {family,major,minor,patch};
	} else if (result = /(MQQBrowser\/Mini)(?:(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(ua)) {
		const family = "QQ Browser Mini";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(MQQBrowser)(?:\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(ua)) {
		const family = "QQ Browser Mobile";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(QQBrowser)(?:\/(\d+)(?:\.(\d+)\.(\d+)(?:\.(\d+)|)|)|)/.exec(ua)) {
		const family = "QQ Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(ESPN)[%20| ]+Radio\/(\d+)\.(\d+)\.(\d+) CFNetwork/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Antenna)\/(\d+) CFNetwork/.exec(ua)) {
		const family = "AntennaPod";
		const major = result[2];
		return {family,major,minor,patch};
	} else if (result = /(TopPodcasts)Pro\/(\d+) CFNetwork/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		return {family,major,minor,patch};
	} else if (result = /(MusicDownloader)Lite\/(\d+)\.(\d+)\.(\d+) CFNetwork/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(.*)-iPad\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|) CFNetwork/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(.*)-iPhone\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|) CFNetwork/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(.*)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|) CFNetwork/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(espn\.go)/.exec(ua)) {
		const family = "ESPN";
		return {family,major,minor,patch};
	} else if (result = /(espnradio\.com)/.exec(ua)) {
		const family = "ESPN";
		return {family,major,minor,patch};
	} else if (result = /ESPN APP$/.exec(ua)) {
		const family = "ESPN";
		return {family,major,minor,patch};
	} else if (result = /(audioboom\.com)/.exec(ua)) {
		const family = "AudioBoom";
		return {family,major,minor,patch};
	} else if (result = / (Rivo) RHYTHM/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(CFNetwork)(?:\/(\d+)\.(\d+)(?:\.(\d+)|)|)/.exec(ua)) {
		const family = "CFNetwork";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Pingdom\.com_bot_version_)(\d+)\.(\d+)/.exec(ua)) {
		const family = "PingdomBot";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(PingdomTMS)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "PingdomBot";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = / (PTST)\/(\d+)(?:\.(\d+)|)$/.exec(ua)) {
		const family = "WebPageTest.org bot";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /X11; (Datanyze); Linux/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(NewRelicPinger)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "NewRelicPingerBot";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Tableau)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Tableau";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Salesforce)(?:.)\/(\d+)\.(\d?)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(\(StatusCake\))/.exec(ua)) {
		const family = "StatusCakeBot";
		return {family,major,minor,patch};
	} else if (result = /(facebookexternalhit)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "FacebookBot";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /Google.*\/\+\/web\/snippet/.exec(ua)) {
		const family = "GooglePlusBot";
		return {family,major,minor,patch};
	} else if (result = /via ggpht\.com GoogleImageProxy/.exec(ua)) {
		const family = "GmailImageProxy";
		return {family,major,minor,patch};
	} else if (result = /YahooMailProxy; https:\/\/help\.yahoo\.com\/kb\/yahoo-mail-proxy-SLN28749\.html/.exec(ua)) {
		const family = "YahooMailProxy";
		return {family,major,minor,patch};
	} else if (result = /(Twitterbot)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Twitterbot";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /\/((?:Ant-|)Nutch|[A-z]+[Bb]ot|[A-z]+[Ss]pider|Axtaris|fetchurl|Isara|ShopSalad|Tailsweep)[ -](\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /\b(008|Altresium|Argus|BaiduMobaider|BoardReader|DNSGroup|DataparkSearch|EDI|Goodzer|Grub|INGRID|Infohelfer|LinkedInBot|LOOQ|Nutch|OgScrper|PathDefender|Peew|PostPost|Steeler|Twitterbot|VSE|WebCrunch|WebZIP|Y!J-BR[A-Z]|YahooSeeker|envolk|sproose|wminer)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(MSIE) (\d+)\.(\d+)([a-z]\d|[a-z]|);.* MSIECrawler/.exec(ua)) {
		const family = "MSIECrawler";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(DAVdroid)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Google-HTTP-Java-Client|Apache-HttpClient|Go-http-client|scalaj-http|http%20client|Python-urllib|HttpMonitor|TLSProber|WinHTTP|JNLP|okhttp|aihttp|reqwest|axios|unirest-(?:java|python|ruby|nodejs|php|net))(?:[ /](\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Pinterest(?:bot|))\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)[;\s(]+\+https:\/\/www.pinterest.com\/bot.html/.exec(ua)) {
		const family = "Pinterestbot";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(CSimpleSpider|Cityreview Robot|CrawlDaddy|CrawlFire|Finderbots|Index crawler|Job Roboter|KiwiStatus Spider|Lijit Crawler|QuerySeekerSpider|ScollSpider|Trends Crawler|USyd-NLP-Spider|SiteCat Webbot|BotName\/\$BotVersion|123metaspider-Bot|1470\.net crawler|50\.nu|8bo Crawler Bot|Aboundex|Accoona-[A-z]{1,30}-Agent|AdsBot-Google(?:-[a-z]{1,30}|)|altavista|AppEngine-Google|archive.{0,30}\.org_bot|archiver|Ask Jeeves|[Bb]ai[Dd]u[Ss]pider(?:-[A-Za-z]{1,30})(?:-[A-Za-z]{1,30}|)|bingbot|BingPreview|blitzbot|BlogBridge|Bloglovin|BoardReader Blog Indexer|BoardReader Favicon Fetcher|boitho.com-dc|BotSeer|BUbiNG|\b\w{0,30}favicon\w{0,30}\b|\bYeti(?:-[a-z]{1,30}|)|Catchpoint(?: bot|)|[Cc]harlotte|Checklinks|clumboot|Comodo HTTP\(S\) Crawler|Comodo-Webinspector-Crawler|ConveraCrawler|CRAWL-E|CrawlConvera|Daumoa(?:-feedfetcher|)|Feed Seeker Bot|Feedbin|findlinks|Flamingo_SearchEngine|FollowSite Bot|furlbot|Genieo|gigabot|GomezAgent|gonzo1|(?:[a-zA-Z]{1,30}-|)Googlebot(?:-[a-zA-Z]{1,30}|)|Google SketchUp|grub-client|gsa-crawler|heritrix|HiddenMarket|holmes|HooWWWer|htdig|ia_archiver|ICC-Crawler|Icarus6j|ichiro(?:\/mobile|)|IconSurf|IlTrovatore(?:-Setaccio|)|InfuzApp|Innovazion Crawler|InternetArchive|IP2[a-z]{1,30}Bot|jbot\b|KaloogaBot|Kraken|Kurzor|larbin|LEIA|LesnikBot|Linguee Bot|LinkAider|LinkedInBot|Lite Bot|Llaut|lycos|Mail\.RU_Bot|masscan|masidani_bot|Mediapartners-Google|Microsoft .{0,30} Bot|mogimogi|mozDex|MJ12bot|msnbot(?:-media {0,2}|)|msrbot|Mtps Feed Aggregation System|netresearch|Netvibes|NewsGator[^/]{0,30}|^NING|Nutch[^/]{0,30}|Nymesis|ObjectsSearch|OgScrper|Orbiter|OOZBOT|PagePeeker|PagesInventory|PaxleFramework|Peeplo Screenshot Bot|PlantyNet_WebRobot|Pompos|Qwantify|Read%20Later|Reaper|RedCarpet|Retreiver|Riddler|Rival IQ|scooter|Scrapy|Scrubby|searchsight|seekbot|semanticdiscovery|SemrushBot|Simpy|SimplePie|SEOstats|SimpleRSS|SiteCon|Slackbot-LinkExpanding|Slack-ImgProxy|Slurp|snappy|Speedy Spider|Squrl Java|Stringer|TheUsefulbot|ThumbShotsBot|Thumbshots\.ru|Tiny Tiny RSS|Twitterbot|WhatsApp|URL2PNG|Vagabondo|VoilaBot|^vortex|Votay bot|^voyager|WASALive.Bot|Web-sniffer|WebThumb|WeSEE:[A-z]{1,30}|WhatWeb|WIRE|WordPress|Wotbox|www\.almaden\.ibm\.com|Xenu(?:.s|) Link Sleuth|Xerka [A-z]{1,30}Bot|yacy(?:bot|)|YahooSeeker|Yahoo! Slurp|Yandex\w{1,30}|YodaoBot(?:-[A-z]{1,30}|)|YottaaMonitor|Yowedo|^Zao|^Zao-Crawler|ZeBot_www\.ze\.bz|ZooShot|ZyBorg)(?:[ /]v?(\d+)(?:\.(\d+)(?:\.(\d+)|)|)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /\b(Boto3?|JetS3t|aws-(?:cli|sdk-(?:cpp|go|java|nodejs|ruby2?|dotnet-(?:\d{1,2}|core)))|s3fs)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /\[(FBAN\/MessengerForiOS|FB_IAB\/MESSENGER);FBAV\/(\d+)(?:\.(\d+)(?:\.(\d+)|)|)/.exec(ua)) {
		const family = "Facebook Messenger";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /\[FB.*;(FBAV)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Facebook";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /\[FB.*;/.exec(ua)) {
		const family = "Facebook";
		return {family,major,minor,patch};
	} else if (result = /(?:\/[A-Za-z0-9.]+|) {0,5}([A-Za-z0-9 \-_![\]:]{0,50}(?:[Aa]rchiver|[Ii]ndexer|[Ss]craper|[Bb]ot|[Ss]pider|[Cc]rawl[a-z]{0,50}))[/ ](\d+)(?:\.(\d+)(?:\.(\d+)|)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /((?:[A-Za-z][A-Za-z0-9 -]{0,50}|)[^C][^Uu][Bb]ot)\b(?:(?:[ /]| v)(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /((?:[A-z0-9]{1,50}|[A-z-]{1,50} ?|)(?: the |)(?:[Ss][Pp][Ii][Dd][Ee][Rr]|[Ss]crape|[Cc][Rr][Aa][Ww][Ll])[A-z0-9]{0,50})(?:(?:[ /]| v)(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(HbbTV)\/(\d+)\.(\d+)\.(\d+) \(/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Chimera|SeaMonkey|Camino|Waterfox)\/(\d+)\.(\d+)\.?([ab]?\d+[a-z]*|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(SailfishBrowser)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Sailfish Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /\[(Pinterest)\/[^\]]+\]/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(Pinterest)(?: for Android(?: Tablet|)|)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Mozilla.*Mobile.*(Instagram).(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Mozilla.*Mobile.*(Flipboard).(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Mozilla.*Mobile.*(Flipboard-Briefing).(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Mozilla.*Mobile.*(Onefootball)\/Android.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Snapchat)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Firefox)\/(\d+)\.(\d+) Basilisk\/(\d+)/.exec(ua)) {
		const family = "Basilisk";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(PaleMoon)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Pale Moon";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Fennec)\/(\d+)\.(\d+)\.?([ab]?\d+[a-z]*)/.exec(ua)) {
		const family = "Firefox Mobile";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Fennec)\/(\d+)\.(\d+)(pre)/.exec(ua)) {
		const family = "Firefox Mobile";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Fennec)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Firefox Mobile";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(?:Mobile|Tablet);.*(Firefox)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Firefox Mobile";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Namoroka|Shiretoko|Minefield)\/(\d+)\.(\d+)\.(\d+(?:pre|))/.exec(ua)) {
		const family = "Firefox ($1)".replace('$1', result[1]);
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Firefox)\/(\d+)\.(\d+)(a\d+[a-z]*)/.exec(ua)) {
		const family = "Firefox Alpha";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Firefox)\/(\d+)\.(\d+)(b\d+[a-z]*)/.exec(ua)) {
		const family = "Firefox Beta";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Firefox)-(?:\d+\.\d+|)\/(\d+)\.(\d+)(a\d+[a-z]*)/.exec(ua)) {
		const family = "Firefox Alpha";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Firefox)-(?:\d+\.\d+|)\/(\d+)\.(\d+)(b\d+[a-z]*)/.exec(ua)) {
		const family = "Firefox Beta";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Namoroka|Shiretoko|Minefield)\/(\d+)\.(\d+)([ab]\d+[a-z]*|)/.exec(ua)) {
		const family = "Firefox ($1)".replace('$1', result[1]);
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Firefox).*Tablet browser (\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "MicroB";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(MozillaDeveloperPreview)\/(\d+)\.(\d+)([ab]\d+[a-z]*|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(FxiOS)\/(\d+)\.(\d+)(\.(\d+)|)(\.(\d+)|)/.exec(ua)) {
		const family = "Firefox iOS";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Flock)\/(\d+)\.(\d+)(b\d+?)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(RockMelt)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Navigator)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Netscape";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Navigator)\/(\d+)\.(\d+)([ab]\d+)/.exec(ua)) {
		const family = "Netscape";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Netscape6)\/(\d+)\.(\d+)\.?([ab]?\d+|)/.exec(ua)) {
		const family = "Netscape";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(MyIBrow)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "My Internet Browser";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(UC? ?Browser|UCWEB|U3)[ /]?(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "UC Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Opera Tablet).*Version\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Opera Mini)(?:\/att|)\/?(\d+|)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Opera)\/.+Opera Mobi.+Version\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Opera Mobile";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Opera)\/(\d+)\.(\d+).+Opera Mobi/.exec(ua)) {
		const family = "Opera Mobile";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /Opera Mobi.+(Opera)(?:\/|\s+)(\d+)\.(\d+)/.exec(ua)) {
		const family = "Opera Mobile";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /Opera Mobi/.exec(ua)) {
		const family = "Opera Mobile";
		return {family,major,minor,patch};
	} else if (result = /(Opera)\/9.80.*Version\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(?:Mobile Safari).*(OPR)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Opera Mobile";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(?:Chrome).*(OPR)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Opera";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Coast)\/(\d+).(\d+).(\d+)/.exec(ua)) {
		const family = "Opera Coast";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(OPiOS)\/(\d+).(\d+).(\d+)/.exec(ua)) {
		const family = "Opera Mini";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Chrome\/.+( MMS)\/(\d+).(\d+).(\d+)/.exec(ua)) {
		const family = "Opera Neon";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(hpw|web)OS\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = "webOS Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(luakit)/.exec(ua)) {
		const family = "LuaKit";
		return {family,major,minor,patch};
	} else if (result = /(Snowshoe)\/(\d+)\.(\d+).(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Gecko\/\d+ (Lightning)\/(\d+)\.(\d+)\.?((?:[ab]?\d+[a-z]*)|(?:\d*))/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Firefox)\/(\d+)\.(\d+)\.(\d+(?:pre|)) \(Swiftfox\)/.exec(ua)) {
		const family = "Swiftfox";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Firefox)\/(\d+)\.(\d+)([ab]\d+[a-z]*|) \(Swiftfox\)/.exec(ua)) {
		const family = "Swiftfox";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(rekonq)\/(\d+)\.(\d+)(?:\.(\d+)|) Safari/.exec(ua)) {
		const family = "Rekonq";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /rekonq/.exec(ua)) {
		const family = "Rekonq";
		return {family,major,minor,patch};
	} else if (result = /(conkeror|Conkeror)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Conkeror";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(konqueror)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Konqueror";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(WeTab)-Browser/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(Comodo_Dragon)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Comodo Dragon";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Symphony) (\d+).(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /PLAYSTATION 3.+WebKit/.exec(ua)) {
		const family = "NetFront NX";
		return {family,major,minor,patch};
	} else if (result = /PLAYSTATION 3/.exec(ua)) {
		const family = "NetFront";
		return {family,major,minor,patch};
	} else if (result = /(PlayStation Portable)/.exec(ua)) {
		const family = "NetFront";
		return {family,major,minor,patch};
	} else if (result = /(PlayStation Vita)/.exec(ua)) {
		const family = "NetFront NX";
		return {family,major,minor,patch};
	} else if (result = /AppleWebKit.+ (NX)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "NetFront NX";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Nintendo 3DS)/.exec(ua)) {
		const family = "NetFront NX";
		return {family,major,minor,patch};
	} else if (result = /(Silk)\/(\d+)\.(\d+)(?:\.([0-9-]+)|)/.exec(ua)) {
		const family = "Amazon Silk";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Puffin)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Windows Phone .*(Edge)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Edge Mobile";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(SamsungBrowser)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Samsung Internet";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(SznProhlizec)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Seznam prohlížeč";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(coc_coc_browser)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Coc Coc";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(baidubrowser)[/\s](\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Baidu Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(FlyFlow)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Baidu Explorer";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(MxBrowser)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Maxthon";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Crosswalk)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Line)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "LINE";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(MiuiBrowser)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "MiuiBrowser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Mint Browser)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Mint Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Mozilla.+Android.+(GSA)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Google";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Version\/.+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Chrome Mobile WebView";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /; wv\).+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Chrome Mobile WebView";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(CrMo)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Chrome Mobile";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(CriOS)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Chrome Mobile iOS";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+) Mobile(?:[ /]|$)/.exec(ua)) {
		const family = "Chrome Mobile";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = / Mobile .*(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Chrome Mobile";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(chromeframe)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Chrome Frame";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(SLP Browser)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Tizen Browser";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(SE 2\.X) MetaSr (\d+)\.(\d+)/.exec(ua)) {
		const family = "Sogou Explorer";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Rackspace Monitoring)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "RackspaceBot";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(PyAMF)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(YaBrowser)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Yandex Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Chrome)\/(\d+)\.(\d+)\.(\d+).* MRCHROME/.exec(ua)) {
		const family = "Mail.ru Chromium Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(AOL) (\d+)\.(\d+); AOLBuild (\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(PodCruncher|Downcast)[ /]?(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = / (BoxNotes)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Whale)\/(\d+)\.(\d+)\.(\d+)\.(\d+) Mobile(?:[ /]|$)/.exec(ua)) {
		const family = "Whale";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Whale)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Whale";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Ghost)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Slack_SSB)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Slack Desktop Client";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(HipChat)\/?(\d+|)/.exec(ua)) {
		const family = "HipChat Desktop Client";
		const major = result[2];
		return {family,major,minor,patch};
	} else if (result = /\b(MobileIron|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Epiphany|Shiira|Sunrise|Spotify|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iris|UP\.Browser|Bunjalloo|Google Earth|Raven for Mac|Openwave|MacOutlook|Electron|OktaMobile)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /Microsoft Office Outlook 12\.\d+\.\d+|MSOffice 12/.exec(ua)) {
		const family = "Outlook";
		const major = "2007";
		return {family,major,minor,patch};
	} else if (result = /Microsoft Outlook 14\.\d+\.\d+|MSOffice 14/.exec(ua)) {
		const family = "Outlook";
		const major = "2010";
		return {family,major,minor,patch};
	} else if (result = /Microsoft Outlook 15\.\d+\.\d+/.exec(ua)) {
		const family = "Outlook";
		const major = "2013";
		return {family,major,minor,patch};
	} else if (result = /Microsoft Outlook (?:Mail )?16\.\d+\.\d+|MSOffice 16/.exec(ua)) {
		const family = "Outlook";
		const major = "2016";
		return {family,major,minor,patch};
	} else if (result = /Microsoft Office (Word) 2014/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /Outlook-Express\/7\.0.*/.exec(ua)) {
		const family = "Windows Live Mail";
		return {family,major,minor,patch};
	} else if (result = /(Airmail) (\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Thunderbird)\/(\d+)\.(\d+)(?:\.(\d+(?:pre|))|)/.exec(ua)) {
		const family = "Thunderbird";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Postbox)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Postbox";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Barca(?:Pro)?)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Barca";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Lotus-Notes)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Lotus Notes";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Vivaldi)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Edge?)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Edge";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(brave)\/(\d+)\.(\d+)\.(\d+) Chrome/.exec(ua)) {
		const family = "Brave";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Chrome)\/(\d+)\.(\d+)\.(\d+)[\d.]* Iron[^/]/.exec(ua)) {
		const family = "Iron";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /\b(Dolphin)(?: |HDCN\/|\/INT-)(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(HeadlessChrome)(?:\/(\d+)\.(\d+)\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Evolution)\/(\d+)\.(\d+)\.(\d+\.\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(RCM CardDAV plugin)\/(\d+)\.(\d+)\.(\d+(?:-dev|))/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(bingbot|Bolt|AdobeAIR|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|iTunes|MacAppStore|NetNewsWire|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris|Abrowser|Planetweb|ICE Browser|mDolphin|qutebrowser|Otter|QupZilla|MailBar|kmail2|YahooMobileMail|ExchangeWebServices|ExchangeServicesClient|Dragon|Outlook-iOS-Android)\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Chromium|Chrome)\/(\d+)\.(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(IEMobile)[ /](\d+)\.(\d+)/.exec(ua)) {
		const family = "IE Mobile";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(BacaBerita App)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(bPod|Pocket Casts|Player FM)$/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /^(AlexaMediaPlayer|VLC)\/(\d+)\.(\d+)\.([^.\s]+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(AntennaPod|WMPlayer|Zune|Podkicker|Radio|ExoPlayerDemo|Overcast|PocketTunes|NSPlayer|okhttp|DoggCatcher|QuickNews|QuickTime|Peapod|Podcasts|GoldenPod|VLC|Spotify|Miro|MediaGo|Juice|iPodder|gPodder|Banshee)\/(\d+)\.(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(Peapod|Liferea)\/([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(bPod|Player FM) BMID\/(\S+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		return {family,major,minor,patch};
	} else if (result = /^(Podcast ?Addict)\/v(\d+) /.exec(ua)) {
		const family = result[1];
		const major = result[2];
		return {family,major,minor,patch};
	} else if (result = /^(Podcast ?Addict) /.exec(ua)) {
		const family = "PodcastAddict";
		return {family,major,minor,patch};
	} else if (result = /(Replay) AV/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(VOX) Music Player/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(CITA) RSS Aggregator\/(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Pocket Casts)$/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(Player FM)$/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(LG Player|Doppler|FancyMusic|MediaMonkey|Clementine) (\d+)\.(\d+)\.?([^.\s]+|)\.?([^.\s]+|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(philpodder)\/(\d+)\.(\d+)\.?([^.\s]+|)\.?([^.\s]+|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Player FM|Pocket Casts|DoggCatcher|Spotify|MediaMonkey|MediaGo|BashPodder)/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(QuickTime)\.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Kinoma)(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		return {family,major,minor,patch};
	} else if (result = /(Fancy) Cloud Music (\d+)\.(\d+)/.exec(ua)) {
		const family = "FancyMusic";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /EspnDownloadManager/.exec(ua)) {
		const family = "ESPN";
		return {family,major,minor,patch};
	} else if (result = /(ESPN) Radio (\d+)\.(\d+)(?:\.(\d+)|) ?(?:rv:(\d+)|) /.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(podracer|jPodder) v ?(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(ZDM)\/(\d+)\.(\d+)[; ]?/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Zune|BeyondPod) (\d+)(?:\.(\d+)|)[);]/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(WMPlayer)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(Lavf)/.exec(ua)) {
		const family = "WMPlayer";
		return {family,major,minor,patch};
	} else if (result = /^(RSSRadio)[ /]?(\d+|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		return {family,major,minor,patch};
	} else if (result = /(RSS_Radio) (\d+)\.(\d+)/.exec(ua)) {
		const family = "RSSRadio";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Podkicker) \S+\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Podkicker";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(HTC) Streaming Player \S+ \/ \S+ \/ \S+ \/ (\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(Stitcher)\/iOS/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /^(Stitcher)\/Android/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /^(VLC) .*version (\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = / (VLC) for/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(vlc)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "VLC";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(foobar)\S+\/([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(Clementine)\S+ ([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(amarok)\/([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)/.exec(ua)) {
		const family = "Amarok";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Custom)-Feed Reader/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(iCab|Lunascape|Opera|Android|Jasmine|Polaris|Microsoft SkyDriveSync|The Bat!) (\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Kindle)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Android) Donut/.exec(ua)) {
		const family = result[1];
		const major = "1";
		const minor="2";
		return {family,major,minor,patch};
	} else if (result = /(Android) Eclair/.exec(ua)) {
		const family = result[1];
		const major = "2";
		const minor="1";
		return {family,major,minor,patch};
	} else if (result = /(Android) Froyo/.exec(ua)) {
		const family = result[1];
		const major = "2";
		const minor="2";
		return {family,major,minor,patch};
	} else if (result = /(Android) Gingerbread/.exec(ua)) {
		const family = result[1];
		const major = "2";
		const minor="3";
		return {family,major,minor,patch};
	} else if (result = /(Android) Honeycomb/.exec(ua)) {
		const family = result[1];
		const major = "3";
		return {family,major,minor,patch};
	} else if (result = /(MSIE) (\d+)\.(\d+).*XBLWP7/.exec(ua)) {
		const family = "IE Large Screen";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Nextcloud)/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(mirall)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(ownCloud-android)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Owncloud";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(OC)\/(\d+)\.(\d+)\.(\d+)\.(\d+) \(Skype for Business\)/.exec(ua)) {
		const family = "Skype";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Obigo)InternetBrowser/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(Obigo)-Browser/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(Obigo|OBIGO)[^\d]*(\d+)(?:.(\d+)|)/.exec(ua)) {
		const family = "Obigo";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(MAXTHON|Maxthon) (\d+)\.(\d+)/.exec(ua)) {
		const family = "Maxthon";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Maxthon|MyIE2|Uzbl|Shiira)/.exec(ua)) {
		const family = result[1];
		const major = "0";
		return {family,major,minor,patch};
	} else if (result = /(BrowseX) \((\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(NCSA_Mosaic)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "NCSA Mosaic";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(POLARIS)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Polaris";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Embider)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Polaris";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(BonEcho)\/(\d+)\.(\d+)\.?([ab]?\d+|)/.exec(ua)) {
		const family = "Bon Echo";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+GSA\/(\d+)\.(\d+)\.(\d+) Mobile/.exec(ua)) {
		const family = "Google";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+Version\/(\d+)\.(\d+)(?:\.(\d+)|).*[ +]Safari/.exec(ua)) {
		const family = "Mobile Safari";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+)|).* AppleNews\/\d+\.\d+\.\d+?/.exec(ua)) {
		const family = "Mobile Safari UI/WKWebView";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).+Version\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = "Mobile Safari UI/WKWebView";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+)|).*Mobile.*[ +]Safari/.exec(ua)) {
		const family = "Mobile Safari";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+)|).*Mobile/.exec(ua)) {
		const family = "Mobile Safari UI/WKWebView";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad).* Safari/.exec(ua)) {
		const family = "Mobile Safari";
		return {family,major,minor,patch};
	} else if (result = /(iPod|iPhone|iPad)/.exec(ua)) {
		const family = "Mobile Safari UI/WKWebView";
		return {family,major,minor,patch};
	} else if (result = /(Watch)(\d+),(\d+)/.exec(ua)) {
		const family = "Apple $1 App".replace('$1', result[1]);
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Outlook-iOS)\/\d+\.\d+\.prod\.iphone \((\d+)\.(\d+)\.(\d+)\)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(AvantGo) (\d+).(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(OneBrowser)\/(\d+).(\d+)/.exec(ua)) {
		const family = "ONE Browser";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Avant)/.exec(ua)) {
		const family = result[1];
		const major = "1";
		return {family,major,minor,patch};
	} else if (result = /(QtCarBrowser)/.exec(ua)) {
		const family = result[1];
		const major = "1";
		return {family,major,minor,patch};
	} else if (result = /^(iBrowser\/Mini)(\d+).(\d+)/.exec(ua)) {
		const family = "iBrowser Mini";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /^(iBrowser|iRAPP)\/(\d+).(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /^(Nokia)/.exec(ua)) {
		const family = "Nokia Services (WAP) Browser";
		return {family,major,minor,patch};
	} else if (result = /(NokiaBrowser)\/(\d+)\.(\d+).(\d+)\.(\d+)/.exec(ua)) {
		const family = "Nokia Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(NokiaBrowser)\/(\d+)\.(\d+).(\d+)/.exec(ua)) {
		const family = "Nokia Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(NokiaBrowser)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Nokia Browser";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(BrowserNG)\/(\d+)\.(\d+).(\d+)/.exec(ua)) {
		const family = "Nokia Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Series60)\/5\.0/.exec(ua)) {
		const family = "Nokia Browser";
		const major = "7";
		const minor="0";
		return {family,major,minor,patch};
	} else if (result = /(Series60)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Nokia OSS Browser";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(S40OviBrowser)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Ovi Browser";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Nokia)[EN]?(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		return {family,major,minor,patch};
	} else if (result = /(PlayBook).+RIM Tablet OS (\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "BlackBerry WebKit";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Black[bB]erry|BB10).+Version\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "BlackBerry WebKit";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Black[bB]erry)\s?(\d+)/.exec(ua)) {
		const family = "BlackBerry";
		const major = result[2];
		return {family,major,minor,patch};
	} else if (result = /(OmniWeb)\/v(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Blazer)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Palm Blazer";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Pre)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Palm Pre";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(ELinks)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(ELinks) \((\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Links) \((\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(QtWeb) Internet Browser\/(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(PhantomJS)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(AppleWebKit)\/(\d+)(?:\.(\d+)|)\+ .* Safari/.exec(ua)) {
		const family = "WebKit Nightly";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Version)\/(\d+)\.(\d+)(?:\.(\d+)|).*Safari\//.exec(ua)) {
		const family = "Safari";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Safari)\/\d+/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /(OLPC)\/Update(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(OLPC)\/Update()\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = "0";
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(SEMC-Browser)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Teleca)/.exec(ua)) {
		const family = "Teleca Browser";
		return {family,major,minor,patch};
	} else if (result = /(Phantom)\/V(\d+)\.(\d+)/.exec(ua)) {
		const family = "Phantom Browser";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Trident)\/(7|8)\.(0)/.exec(ua)) {
		const family = "IE";
		const major = "11";
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Trident)\/(6)\.(0)/.exec(ua)) {
		const family = "IE";
		const major = "10";
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Trident)\/(5)\.(0)/.exec(ua)) {
		const family = "IE";
		const major = "9";
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Trident)\/(4)\.(0)/.exec(ua)) {
		const family = "IE";
		const major = "8";
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Espial)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(AppleWebKit)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Apple Mail";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Firefox)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Firefox)\/(\d+)\.(\d+)(pre|[ab]\d+[a-z]*|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /([MS]?IE) (\d+)\.(\d+)/.exec(ua)) {
		const family = "IE";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(python-requests)\/(\d+)\.(\d+)/.exec(ua)) {
		const family = "Python Requests";
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /\b(Windows-Update-Agent|Microsoft-CryptoAPI|SophosUpdateManager|SophosAgent|Debian APT-HTTP|Ubuntu APT-HTTP|libcurl-agent|libwww-perl|urlgrabber|curl|PycURL|Wget|aria2|Axel|OpenBSD ftp|lftp|jupdate|insomnia|fetch libfetch|akka-http|got)(?:[ /](\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Python\/3\.\d{1,3} aiohttp)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(Java)[/ ]{0,1}\d+\.(\d+)\.(\d+)[_-]*([a-zA-Z0-9]+|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(Cyberduck)\/(\d+)\.(\d+)\.(\d+)(?:\.\d+|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(S3 Browser) (\d+)-(\d+)-(\d+)(?:\s*http:\/\/s3browser\.com|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /(S3Gof3r)/.exec(ua)) {
		const family = result[1];
		return {family,major,minor,patch};
	} else if (result = /\b(ibm-cos-sdk-(?:core|java|js|python))\/(\d+)\.(\d+)(?:\.(\d+)|)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(rusoto)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(rclone)\/v(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /^(Roku)\/DVP-(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		return {family,major,minor,patch};
	} else if (result = /(Kurio)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "Kurio App";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(Box(?: Sync)?)\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = result[1];
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	} else if (result = /^(ViaFree|Viafree)-(?:tvOS-)?[A-Z]{2}\/(\d+)\.(\d+)\.(\d+)/.exec(ua)) {
		const family = "ViaFree";
		const major = result[2];
		const minor = result[3];
		patch = result[4];
		return {family,major,minor,patch};
	}
	return {family,major,minor,patch};
}

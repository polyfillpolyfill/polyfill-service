sub useragent_parser {
  declare local var.Family STRING;
  set var.Family = "Other";
  declare local var.Major STRING;
  set var.Major = "";
  declare local var.Minor STRING;
  set var.Minor = "";
  declare local var.Patch STRING;
  set var.Patch = "";
  if (!req.http.User-Agent) {
  } else if (req.http.User-Agent ~ "(ESPN)[%20| ]+Radio/(\d+)\.(\d+)\.(\d+) CFNetwork") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Antenna)/(\d+) CFNetwork") {
		set var.Family = "AntennaPod";
		set var.Major = re.group.2;
	} else if (req.http.User-Agent ~ "(TopPodcasts)Pro/(\d+) CFNetwork") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
	} else if (req.http.User-Agent ~ "(MusicDownloader)Lite/(\d+)\.(\d+)\.(\d+) CFNetwork") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(.*)-iPad/(\d+)\.?(\d+)?.?(\d+)?.?(\d+)? CFNetwork") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(.*)-iPhone/(\d+)\.?(\d+)?.?(\d+)?.?(\d+)? CFNetwork") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(.*)/(\d+)\.?(\d+)?.?(\d+)?.?(\d+)? CFNetwork") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(espn\.go)") {
		set var.Family = "ESPN";
	} else if (req.http.User-Agent ~ "(espnradio\.com)") {
		set var.Family = "ESPN";
	} else if (req.http.User-Agent ~ "ESPN APP$") {
		set var.Family = "ESPN";
	} else if (req.http.User-Agent ~ "(audioboom\.com)") {
		set var.Family = "AudioBoom";
	} else if (req.http.User-Agent ~ " (Rivo) RHYTHM") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(CFNetwork)(?:/(\d+)\.(\d+)\.?(\d+)?)?") {
		set var.Family = "CFNetwork";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Pingdom.com_bot_version_)(\d+)\.(\d+)") {
		set var.Family = "PingdomBot";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(PingdomTMS)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "PingdomBot";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(NewRelicPinger)/(\d+)\.(\d+)") {
		set var.Family = "NewRelicPingerBot";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Tableau)/(\d+)\.(\d+)") {
		set var.Family = "Tableau";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(\(StatusCake\))") {
		set var.Family = "StatusCakeBot";
	} else if (req.http.User-Agent ~ "(facebookexternalhit)/(\d+)\.(\d+)") {
		set var.Family = "FacebookBot";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "Google.*/\+/web/snippet") {
		set var.Family = "GooglePlusBot";
	} else if (req.http.User-Agent ~ "via ggpht.com GoogleImageProxy") {
		set var.Family = "GmailImageProxy";
	} else if (req.http.User-Agent ~ "(Twitterbot)/(\d+)\.(\d+)") {
		set var.Family = "TwitterBot";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "/((?:Ant-)?Nutch|[A-z]+[Bb]ot|[A-z]+[Ss]pider|Axtaris|fetchurl|Isara|ShopSalad|Tailsweep)[ \-](\d+)(?:\.(\d+)(?:\.(\d+))?)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "\b(008|Altresium|Argus|BaiduMobaider|BoardReader|DNSGroup|DataparkSearch|EDI|Goodzer|Grub|INGRID|Infohelfer|LinkedInBot|LOOQ|Nutch|PathDefender|Peew|PostPost|Steeler|Twitterbot|VSE|WebCrunch|WebZIP|Y!J-BR[A-Z]|YahooSeeker|envolk|sproose|wminer)/(\d+)(?:\.(\d+)(?:\.(\d+))?)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(MSIE) (\d+)\.(\d+)([a-z]\d?)?;.* MSIECrawler") {
		set var.Family = "MSIECrawler";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(DAVdroid)/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Google-HTTP-Java-Client|Apache-HttpClient|Go-http-client|scalaj-http|http%20client|Python-urllib|HttpMonitor|TLSProber|WinHTTP|JNLP|okhttp|aihttp|reqwest)(?:[ /](\d+)(?:\.(\d+)(?:\.(\d+))?)?)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Pinterest(?:bot)?)/(\d+)(?:\.(\d+)(?:\.(\d+))?)?[;\s\(]+\+https://www.pinterest.com/bot.html") {
		set var.Family = "Pinterestbot";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(1470\.net crawler|50\.nu|8bo Crawler Bot|Aboundex|Accoona-[A-z]+-Agent|AdsBot-Google(?:-[a-z]+)?|altavista|AppEngine-Google|archive.*?\.org_bot|archiver|Ask Jeeves|[Bb]ai[Dd]u[Ss]pider(?:-[A-Za-z]+)*|bingbot|BingPreview|blitzbot|BlogBridge|Bloglovin|BoardReader(?: [A-Za-z]+)*|boitho.com-dc|BotSeer|BUbiNG|\b\w*favicon\w*\b|\bYeti(?:-[a-z]+)?|Catchpoint(?: bot)?|[Cc]harlotte|Checklinks|clumboot|Comodo HTTP\(S\) Crawler|Comodo-Webinspector-Crawler|ConveraCrawler|CRAWL-E|CrawlConvera|Daumoa(?:-feedfetcher)?|Feed Seeker Bot|Feedbin|findlinks|Flamingo_SearchEngine|FollowSite Bot|furlbot|Genieo|gigabot|GomezAgent|gonzo1|(?:[a-zA-Z]+-)?Googlebot(?:-[a-zA-Z]+)?|Google SketchUp|grub-client|gsa-crawler|heritrix|HiddenMarket|holmes|HooWWWer|htdig|ia_archiver|ICC-Crawler|Icarus6j|ichiro(?:/mobile)?|IconSurf|IlTrovatore(?:-Setaccio)?|InfuzApp|Innovazion Crawler|InternetArchive|IP2[a-z]+Bot|jbot\b|KaloogaBot|Kraken|Kurzor|larbin|LEIA|LesnikBot|Linguee Bot|LinkAider|LinkedInBot|Lite Bot|Llaut|lycos|Mail\.RU_Bot|masscan|masidani_bot|Mediapartners-Google|Microsoft .*? Bot|mogimogi|mozDex|MJ12bot|msnbot(?:-media *)?|msrbot|Mtps Feed Aggregation System|netresearch|Netvibes|NewsGator[^/]*|^NING|Nutch[^/]*|Nymesis|ObjectsSearch|Orbiter|OOZBOT|PagePeeker|PagesInventory|PaxleFramework|Peeplo Screenshot Bot|PlantyNet_WebRobot|Pompos|Qwantify|Read%20Later|Reaper|RedCarpet|Retreiver|Riddler|Rival IQ|scooter|Scrapy|Scrubby|searchsight|seekbot|semanticdiscovery|SemrushBot|Simpy|SimplePie|SEOstats|SimpleRSS|SiteCon|Slackbot-LinkExpanding|Slack-ImgProxy|Slurp|snappy|Speedy Spider|Squrl Java|Stringer|TheUsefulbot|ThumbShotsBot|Thumbshots\.ru|Tiny Tiny RSS|TwitterBot|WhatsApp|URL2PNG|Vagabondo|VoilaBot|^vortex|Votay bot|^voyager|WASALive.Bot|Web-sniffer|WebThumb|WeSEE:[A-z]+|WhatWeb|WIRE|WordPress|Wotbox|www\.almaden\.ibm\.com|Xenu(?:.s)? Link Sleuth|Xerka [A-z]+Bot|yacy(?:bot)?|Yahoo[a-z]*Seeker|Yahoo! Slurp|Yandex\w+|YodaoBot(?:-[A-z]+)?|YottaaMonitor|Yowedo|^Zao|^Zao-Crawler|ZeBot_www\.ze\.bz|ZooShot|ZyBorg)(?:[ /]v?(\d+)(?:\.(\d+)(?:\.(\d+))?)?)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "\b(Boto3?|JetS3t|aws-(?:cli|sdk-(?:cpp|go|java|nodejs|ruby2?))|s3fs)/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(?:\/[A-Za-z0-9\.]+)? *([A-Za-z0-9 \-_\!\[\]:]*(?:[Aa]rchiver|[Ii]ndexer|[Ss]craper|[Bb]ot|[Ss]pider|[Cc]rawl[a-z]*))/(\d+)(?:\.(\d+)(?:\.(\d+))?)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(?:\/[A-Za-z0-9\.]+)? *([A-Za-z0-9 _\!\[\]:]*(?:[Aa]rchiver|[Ii]ndexer|[Ss]craper|[Bb]ot|[Ss]pider|[Cc]rawl[a-z]*)) (\d+)(?:\.(\d+)(?:\.(\d+))?)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "((?:[A-z0-9]+|[A-z\-]+ ?)?(?: the )?(?:[Ss][Pp][Ii][Dd][Ee][Rr]|[Ss]crape|[A-Za-z0-9-]*(?:[^C][^Uu])[Bb]ot|[Cc][Rr][Aa][Ww][Ll])[A-z0-9]*)(?:(?:[ /]| v)(\d+)(?:\.(\d+)(?:\.(\d+))?)?)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(HbbTV)/(\d+)\.(\d+)\.(\d+) \(") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Chimera|SeaMonkey|Camino|Waterfox)/(\d+)\.(\d+)\.?([ab]?\d+[a-z]*)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "\[FB.*;(FBAV)/(\d+)(?:\.(\d+)(?:\.(\d+))?)?") {
		set var.Family = "Facebook";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "\[(Pinterest)/[^\]]+\]") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(Pinterest)(?: for Android(?: Tablet)?)?/(\d+)(?:\.(\d+)(?:\.(\d+))?)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "Mozilla.*Mobile.*(Instagram).(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "Mozilla.*Mobile.*(Flipboard).(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "Mozilla.*Mobile.*(Flipboard-Briefing).(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "Mozilla.*Mobile.*(Onefootball)\/Android.(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Firefox)/(\d+)\.(\d+) Basilisk/(\d+)") {
		set var.Family = "Basilisk";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(PaleMoon)/(\d+)\.(\d+)\.?(\d+)?") {
		set var.Family = "Pale Moon";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Fennec)/(\d+)\.(\d+)\.?([ab]?\d+[a-z]*)") {
		set var.Family = "Firefox Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Fennec)/(\d+)\.(\d+)(pre)") {
		set var.Family = "Firefox Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Fennec)/(\d+)\.(\d+)") {
		set var.Family = "Firefox Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(?:Mobile|Tablet);.*(Firefox)/(\d+)\.(\d+)") {
		set var.Family = "Firefox Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Namoroka|Shiretoko|Minefield)/(\d+)\.(\d+)\.(\d+(?:pre)?)") {
		set var.Family = "Firefox (" re.group.1 ")";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Firefox)/(\d+)\.(\d+)(a\d+[a-z]*)") {
		set var.Family = "Firefox Alpha";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Firefox)/(\d+)\.(\d+)(b\d+[a-z]*)") {
		set var.Family = "Firefox Beta";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Firefox)-(?:\d+\.\d+)?/(\d+)\.(\d+)(a\d+[a-z]*)") {
		set var.Family = "Firefox Alpha";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Firefox)-(?:\d+\.\d+)?/(\d+)\.(\d+)(b\d+[a-z]*)") {
		set var.Family = "Firefox Beta";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Namoroka|Shiretoko|Minefield)/(\d+)\.(\d+)([ab]\d+[a-z]*)?") {
		set var.Family = "Firefox (" re.group.1 ")";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Firefox).*Tablet browser (\d+)\.(\d+)\.(\d+)") {
		set var.Family = "MicroB";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(MozillaDeveloperPreview)/(\d+)\.(\d+)([ab]\d+[a-z]*)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(FxiOS)/(\d+)\.(\d+)(\.(\d+))?(\.(\d+))?") {
		set var.Family = "Firefox iOS";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Flock)/(\d+)\.(\d+)(b\d+?)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(RockMelt)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Navigator)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Netscape";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Navigator)/(\d+)\.(\d+)([ab]\d+)") {
		set var.Family = "Netscape";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Netscape6)/(\d+)\.(\d+)\.?([ab]?\d+)?") {
		set var.Family = "Netscape";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(MyIBrow)/(\d+)\.(\d+)") {
		set var.Family = "My Internet Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(UC? ?Browser|UCWEB|U3)[ /]?(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "UC Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Opera Tablet).*Version/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Opera Mini)(?:/att)?/?(\d+)?(?:\.(\d+))?(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Opera)/.+Opera Mobi.+Version/(\d+)\.(\d+)") {
		set var.Family = "Opera Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Opera)/(\d+)\.(\d+).+Opera Mobi") {
		set var.Family = "Opera Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "Opera Mobi.+(Opera)(?:/|\s+)(\d+)\.(\d+)") {
		set var.Family = "Opera Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "Opera Mobi") {
		set var.Family = "Opera Mobile";
	} else if (req.http.User-Agent ~ "(Opera)/9.80.*Version/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(?:Mobile Safari).*(OPR)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Opera Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(?:Chrome).*(OPR)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Opera";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Coast)/(\d+).(\d+).(\d+)") {
		set var.Family = "Opera Coast";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(OPiOS)/(\d+).(\d+).(\d+)") {
		set var.Family = "Opera Mini";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "Chrome/.+( MMS)/(\d+).(\d+).(\d+)") {
		set var.Family = "Opera Neon";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(hpw|web)OS/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = "webOS Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(luakit)") {
		set var.Family = "LuaKit";
	} else if (req.http.User-Agent ~ "(Snowshoe)/(\d+)\.(\d+).(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "Gecko/\d+ (Lightning)/(\d+)\.(\d+)\.?((?:[ab]?\d+[a-z]*)|(?:\d*))") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Firefox)/(\d+)\.(\d+)\.(\d+(?:pre)?) \(Swiftfox\)") {
		set var.Family = "Swiftfox";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Firefox)/(\d+)\.(\d+)([ab]\d+[a-z]*)? \(Swiftfox\)") {
		set var.Family = "Swiftfox";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(rekonq)/(\d+)\.(\d+)\.?(\d+)? Safari") {
		set var.Family = "Rekonq";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "rekonq") {
		set var.Family = "Rekonq";
	} else if (req.http.User-Agent ~ "(conkeror|Conkeror)/(\d+)\.(\d+)\.?(\d+)?") {
		set var.Family = "Conkeror";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(konqueror)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Konqueror";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(WeTab)-Browser") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(Comodo_Dragon)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Comodo Dragon";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Symphony) (\d+).(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "PLAYSTATION 3.+WebKit") {
		set var.Family = "NetFront NX";
	} else if (req.http.User-Agent ~ "PLAYSTATION 3") {
		set var.Family = "NetFront";
	} else if (req.http.User-Agent ~ "(PlayStation Portable)") {
		set var.Family = "NetFront";
	} else if (req.http.User-Agent ~ "(PlayStation Vita)") {
		set var.Family = "NetFront NX";
	} else if (req.http.User-Agent ~ "AppleWebKit.+ (NX)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "NetFront NX";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Nintendo 3DS)") {
		set var.Family = "NetFront NX";
	} else if (req.http.User-Agent ~ "(Silk)/(\d+)\.(\d+)(?:\.([0-9\-]+))?") {
		set var.Family = "Amazon Silk";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Puffin)/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "Windows Phone .*(Edge)/(\d+)\.(\d+)") {
		set var.Family = "Edge Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(SamsungBrowser)/(\d+)\.(\d+)") {
		set var.Family = "Samsung Internet";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(SznProhlizec)/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = "Seznam prohl%u00ED%u017Ee%u010D";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(coc_coc_browser)/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = "Coc Coc";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(baidubrowser)[/\s](\d+)(?:\.(\d+)(?:\.(\d+))?)?") {
		set var.Family = "Baidu Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(FlyFlow)/(\d+)\.(\d+)") {
		set var.Family = "Baidu Explorer";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(MxBrowser)/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = "Maxthon";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Crosswalk)/(\d+)\.(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "; wv\).+(Chrome)/(\d+)\.(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Chrome Mobile WebView";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(CrMo)/(\d+)\.(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Chrome Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(CriOS)/(\d+)\.(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Chrome Mobile iOS";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Chrome)/(\d+)\.(\d+)\.(\d+)\.(\d+) Mobile(?:[ /]|$)") {
		set var.Family = "Chrome Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ " Mobile .*(Chrome)/(\d+)\.(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Chrome Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(chromeframe)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Chrome Frame";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(SLP Browser)/(\d+)\.(\d+)") {
		set var.Family = "Tizen Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(SE 2\.X) MetaSr (\d+)\.(\d+)") {
		set var.Family = "Sogou Explorer";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(MQQBrowser/Mini)(?:(\d+)(?:\.(\d+)(?:\.(\d+))?)?)?") {
		set var.Family = "QQ Browser Mini";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(MQQBrowser)(?:/(\d+)(?:\.(\d+)(?:\.(\d+))?)?)?") {
		set var.Family = "QQ Browser Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(QQBrowser)(?:/(\d+)(?:\.(\d+)\.(\d+)(?:\.(\d+))?)?)?") {
		set var.Family = "QQ Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Rackspace Monitoring)/(\d+)\.(\d+)") {
		set var.Family = "RackspaceBot";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(PyAMF)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(YaBrowser)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Yandex Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Chrome)/(\d+)\.(\d+)\.(\d+).* MRCHROME") {
		set var.Family = "Mail.ru Chromium Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(AOL) (\d+)\.(\d+); AOLBuild (\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(PodCruncher|Downcast)[ /]?(\d+)\.?(\d+)?\.?(\d+)?\.?(\d+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ " (BoxNotes)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Slack_SSB)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Slack Desktop Client";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(HipChat)/?(\d+)?") {
		set var.Family = "HipChat Desktop Client";
		set var.Major = re.group.2;
	} else if (req.http.User-Agent ~ "\b(MobileIron|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Epiphany|Shiira|Sunrise|Spotify|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iris|UP\.Browser|Bunjalloo|Google Earth|Raven for Mac|Openwave|MacOutlook|Electron|OktaMobile)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "Microsoft Office Outlook 12\.\d+\.\d+|MSOffice 12") {
		set var.Family = "Outlook";
		set var.Major = "2007";
	} else if (req.http.User-Agent ~ "Microsoft Outlook 14\.\d+\.\d+|MSOffice 14") {
		set var.Family = "Outlook";
		set var.Major = "2010";
	} else if (req.http.User-Agent ~ "Microsoft Outlook 15\.\d+\.\d+") {
		set var.Family = "Outlook";
		set var.Major = "2013";
	} else if (req.http.User-Agent ~ "Microsoft Outlook (?:Mail )?16\.\d+\.\d+") {
		set var.Family = "Outlook";
		set var.Major = "2016";
	} else if (req.http.User-Agent ~ "Outlook-Express\/7\.0.*") {
		set var.Family = "Windows Live Mail";
	} else if (req.http.User-Agent ~ "(Airmail) (\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Thunderbird)/(\d+)\.(\d+)(?:\.(\d+(?:pre)?))?") {
		set var.Family = "Thunderbird";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Postbox)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Postbox";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Barca(?:Pro)?)/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = "Barca";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Lotus-Notes)/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = "Lotus Notes";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Vivaldi)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Edge)/(\d+)(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(brave)/(\d+)\.(\d+)\.(\d+) Chrome") {
		set var.Family = "Brave";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Chrome)/(\d+)\.(\d+)\.(\d+)[\d.]* Iron[^/]") {
		set var.Family = "Iron";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "\b(Dolphin)(?: |HDCN/|/INT\-)(\d+)\.(\d+)\.?(\d+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(HeadlessChrome)(?:/(\d+)\.(\d+)\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Evolution)/(\d+)\.(\d+)\.(\d+\.\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(RCM CardDAV plugin)/(\d+)\.(\d+)\.(\d+(?:-dev)?)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(bingbot|Bolt|AdobeAIR|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|iTunes|MacAppStore|NetNewsWire|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris|Abrowser|Planetweb|ICE Browser|mDolphin|qutebrowser|Otter|QupZilla|MailBar|kmail2|YahooMobileMail|ExchangeWebServices|ExchangeServicesClient|Dragon|Outlook-iOS-Android)/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Chromium|Chrome)/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(IEMobile)[ /](\d+)\.(\d+)") {
		set var.Family = "IE Mobile";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(BacaBerita App)\/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(bPod|Pocket Casts|Player FM)$") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "^(AlexaMediaPlayer|VLC)/(\d+)\.(\d+)\.([^.\s]+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(AntennaPod|WMPlayer|Zune|Podkicker|Radio|ExoPlayerDemo|Overcast|PocketTunes|NSPlayer|okhttp|DoggCatcher|QuickNews|QuickTime|Peapod|Podcasts|GoldenPod|VLC|Spotify|Miro|MediaGo|Juice|iPodder|gPodder|Banshee)/(\d+)\.(\d+)\.?(\d+)?\.?(\d+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(Peapod|Liferea)/([^.\s]+)\.([^.\s]+)?\.?([^.\s]+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(bPod|Player FM) BMID/(\S+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
	} else if (req.http.User-Agent ~ "^(Podcast ?Addict)/v(\d+) ") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
	} else if (req.http.User-Agent ~ "^(Podcast ?Addict) ") {
		set var.Family = "PodcastAddict";
	} else if (req.http.User-Agent ~ "(Replay) AV") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(VOX) Music Player") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(CITA) RSS Aggregator/(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Pocket Casts)$") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(Player FM)$") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(LG Player|Doppler|FancyMusic|MediaMonkey|Clementine) (\d+)\.(\d+)\.?([^.\s]+)?\.?([^.\s]+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(philpodder)/(\d+)\.(\d+)\.?([^.\s]+)?\.?([^.\s]+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Player FM|Pocket Casts|DoggCatcher|Spotify|MediaMonkey|MediaGo|BashPodder)") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(QuickTime)\.(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Kinoma)(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
	} else if (req.http.User-Agent ~ "(Fancy) Cloud Music (\d+)\.(\d+)") {
		set var.Family = "FancyMusic";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "EspnDownloadManager") {
		set var.Family = "ESPN";
	} else if (req.http.User-Agent ~ "(ESPN) Radio (\d+)\.(\d+)\.?(\d+)? ?(?:rv:(\d+))? ") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(podracer|jPodder) v ?(\d+)\.(\d+)\.?(\d+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(ZDM)/(\d+)\.(\d+)[; ]?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Zune|BeyondPod) (\d+)\.?(\d+)?[\);]") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(WMPlayer)/(\d+)\.(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(Lavf)") {
		set var.Family = "WMPlayer";
	} else if (req.http.User-Agent ~ "^(RSSRadio)[ /]?(\d+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
	} else if (req.http.User-Agent ~ "(RSS_Radio) (\d+)\.(\d+)") {
		set var.Family = "RSSRadio";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Podkicker) \S+/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Podkicker";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(HTC) Streaming Player \S+ / \S+ / \S+ / (\d+)\.(\d+)\.?(\d+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(Stitcher)/iOS") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "^(Stitcher)/Android") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "^(VLC) .*version (\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ " (VLC) for") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(vlc)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "VLC";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(foobar)\S+/([^.\s]+)\.([^.\s]+)?\.?([^.\s]+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(Clementine)\S+ ([^.\s]+)\.([^.\s]+)?\.?([^.\s]+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(amarok)/([^.\s]+)\.([^.\s]+)?\.?([^.\s]+)?") {
		set var.Family = "Amarok";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Custom)-Feed Reader") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(iCab|Lunascape|Opera|Android|Jasmine|Polaris|Microsoft SkyDriveSync|The Bat!) (\d+)\.(\d+)\.?(\d+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Kindle)/(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Android) Donut") {
		set var.Family = re.group.1;
		set var.Major = "1";
		set var.Minor="2";
	} else if (req.http.User-Agent ~ "(Android) Eclair") {
		set var.Family = re.group.1;
		set var.Major = "2";
		set var.Minor="1";
	} else if (req.http.User-Agent ~ "(Android) Froyo") {
		set var.Family = re.group.1;
		set var.Major = "2";
		set var.Minor="2";
	} else if (req.http.User-Agent ~ "(Android) Gingerbread") {
		set var.Family = re.group.1;
		set var.Major = "2";
		set var.Minor="3";
	} else if (req.http.User-Agent ~ "(Android) Honeycomb") {
		set var.Family = re.group.1;
		set var.Major = "3";
	} else if (req.http.User-Agent ~ "(MSIE) (\d+)\.(\d+).*XBLWP7") {
		set var.Family = "IE Large Screen";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Nextcloud)") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(mirall)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(ownCloud-android)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Owncloud";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Obigo)InternetBrowser") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(Obigo)\-Browser") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(Obigo|OBIGO)[^\d]*(\d+)(?:.(\d+))?") {
		set var.Family = "Obigo";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(MAXTHON|Maxthon) (\d+)\.(\d+)") {
		set var.Family = "Maxthon";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Maxthon|MyIE2|Uzbl|Shiira)") {
		set var.Family = re.group.1;
		set var.Major = "0";
	} else if (req.http.User-Agent ~ "(BrowseX) \((\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(NCSA_Mosaic)/(\d+)\.(\d+)") {
		set var.Family = "NCSA Mosaic";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(POLARIS)/(\d+)\.(\d+)") {
		set var.Family = "Polaris";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Embider)/(\d+)\.(\d+)") {
		set var.Family = "Polaris";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(BonEcho)/(\d+)\.(\d+)\.?([ab]?\d+)?") {
		set var.Family = "Bon Echo";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(iPod|iPhone|iPad).+Version/(\d+)\.(\d+)(?:\.(\d+))?.*[ +]Safari") {
		set var.Family = "Mobile Safari";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+))?.* AppleNews\/\d+\.\d+\.\d+?") {
		set var.Family = "Mobile Safari UI/WKWebView";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(iPod|iPhone|iPad).+Version/(\d+)\.(\d+)(?:\.(\d+))?") {
		set var.Family = "Mobile Safari UI/WKWebView";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+))?.*Mobile.*[ +]Safari") {
		set var.Family = "Mobile Safari";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+))?.*Mobile") {
		set var.Family = "Mobile Safari UI/WKWebView";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(iPod|iPhone|iPad).* Safari") {
		set var.Family = "Mobile Safari";
	} else if (req.http.User-Agent ~ "(iPod|iPhone|iPad)") {
		set var.Family = "Mobile Safari UI/WKWebView";
	} else if (req.http.User-Agent ~ "(Outlook-iOS)/\d+\.\d+\.prod\.iphone \((\d+)\.(\d+)\.(\d+)\)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(AvantGo) (\d+).(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(OneBrowser)/(\d+).(\d+)") {
		set var.Family = "ONE Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Avant)") {
		set var.Family = re.group.1;
		set var.Major = "1";
	} else if (req.http.User-Agent ~ "(QtCarBrowser)") {
		set var.Family = re.group.1;
		set var.Major = "1";
	} else if (req.http.User-Agent ~ "^(iBrowser/Mini)(\d+).(\d+)") {
		set var.Family = "iBrowser Mini";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "^(iBrowser|iRAPP)/(\d+).(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "^(Nokia)") {
		set var.Family = "Nokia Services (WAP) Browser";
	} else if (req.http.User-Agent ~ "(NokiaBrowser)/(\d+)\.(\d+).(\d+)\.(\d+)") {
		set var.Family = "Nokia Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(NokiaBrowser)/(\d+)\.(\d+).(\d+)") {
		set var.Family = "Nokia Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(NokiaBrowser)/(\d+)\.(\d+)") {
		set var.Family = "Nokia Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(BrowserNG)/(\d+)\.(\d+).(\d+)") {
		set var.Family = "Nokia Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Series60)/5\.0") {
		set var.Family = "Nokia Browser";
		set var.Major = "7";
		set var.Minor="0";
	} else if (req.http.User-Agent ~ "(Series60)/(\d+)\.(\d+)") {
		set var.Family = "Nokia OSS Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(S40OviBrowser)/(\d+)\.(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Ovi Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Nokia)[EN]?(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
	} else if (req.http.User-Agent ~ "(PlayBook).+RIM Tablet OS (\d+)\.(\d+)\.(\d+)") {
		set var.Family = "BlackBerry WebKit";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Black[bB]erry|BB10).+Version/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "BlackBerry WebKit";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Black[bB]erry)\s?(\d+)") {
		set var.Family = "BlackBerry";
		set var.Major = re.group.2;
	} else if (req.http.User-Agent ~ "(OmniWeb)/v(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Blazer)/(\d+)\.(\d+)") {
		set var.Family = "Palm Blazer";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Pre)/(\d+)\.(\d+)") {
		set var.Family = "Palm Pre";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(ELinks)/(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(ELinks) \((\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Links) \((\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(QtWeb) Internet Browser/(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(PhantomJS)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(AppleWebKit)/(\d+)\.?(\d+)?\+ .* Safari") {
		set var.Family = "WebKit Nightly";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Version)/(\d+)\.(\d+)(?:\.(\d+))?.*Safari/") {
		set var.Family = "Safari";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Safari)/\d+") {
		set var.Family = re.group.1;
	} else if (req.http.User-Agent ~ "(OLPC)/Update(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(OLPC)/Update()\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = "0";
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(SEMC\-Browser)/(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Teleca)") {
		set var.Family = "Teleca Browser";
	} else if (req.http.User-Agent ~ "(Phantom)/V(\d+)\.(\d+)") {
		set var.Family = "Phantom Browser";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Trident)/(7|8)\.(0)") {
		set var.Family = "IE";
		set var.Major = "11";
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Trident)/(6)\.(0)") {
		set var.Family = "IE";
		set var.Major = "10";
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Trident)/(5)\.(0)") {
		set var.Family = "IE";
		set var.Major = "9";
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Trident)/(4)\.(0)") {
		set var.Family = "IE";
		set var.Major = "8";
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Espial)/(\d+)(?:\.(\d+))?(?:\.(\d+))?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(AppleWebKit)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Apple Mail";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Firefox)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Firefox)/(\d+)\.(\d+)(pre|[ab]\d+[a-z]*)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "([MS]?IE) (\d+)\.(\d+)") {
		set var.Family = "IE";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(python-requests)/(\d+)\.(\d+)") {
		set var.Family = "Python Requests";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "\b(Windows-Update-Agent|Microsoft-CryptoAPI|SophosUpdateManager|SophosAgent|Debian APT-HTTP|Ubuntu APT-HTTP|libcurl-agent|libwww-perl|urlgrabber|curl|PycURL|Wget|aria2|Axel|OpenBSD ftp|lftp|jupdate)(?:[ /](\d+)(?:\.(\d+)(?:\.(\d+))?)?)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "(Java)[/ ]{0,1}\d+\.(\d+)\.(\d+)[_-]*([a-zA-Z0-9]+)*") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(Cyberduck)/(\d+)\.(\d+)\.(\d+)(?:\.\d+)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(S3 Browser) (\d+)-(\d+)-(\d+)(?:\s*http://s3browser\.com)?") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(rclone)/v(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "^(Roku)/DVP-(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
	} else if (req.http.User-Agent ~ "(Kurio)\/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = "Kurio App";
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	} else if (req.http.User-Agent ~ "^(Box(?: Sync)?)/(\d+)\.(\d+)\.(\d+)") {
		set var.Family = re.group.1;
		set var.Major = re.group.2;
		set var.Minor = re.group.3;
		set var.Patch = re.group.4;
	}
  set req.http.useragent_parser_family=var.Family;
  set req.http.useragent_parser_major=var.Major;
  set req.http.useragent_parser_minor=var.Minor;
  set req.http.useragent_parser_patch=var.Patch;
}
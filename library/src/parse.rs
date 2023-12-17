use regex::Regex;

pub fn parse(ua: &str) -> [String; 4] {
    if let Some(result) = Regex::new("(Rival IQ, rivaliq.com)").unwrap().captures(ua) {
        let family = "Rival IQ";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(ESPN)[%20| ]+Radio/(\\d+)\\.(\\d+)\\.(\\d+) CFNetwork")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Antenna)/(\\d+) CFNetwork")
        .unwrap()
        .captures(ua)
    {
        let family = "AntennaPod";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(TopPodcasts)Pro/(\\d+) CFNetwork")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(MusicDownloader)Lite/(\\d+)\\.(\\d+)\\.(\\d+) CFNetwork")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(.*)-iPad/(\\d+)\\.?(\\d+)?.?(\\d+)?.?(\\d+)? CFNetwork")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(.*)-iPhone/(\\d+)\\.?(\\d+)?.?(\\d+)?.?(\\d+)? CFNetwork")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(.*)/(\\d+)\\.?(\\d+)?.?(\\d+)?.?(\\d+)? CFNetwork")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(espn\\.go)").unwrap().captures(ua) {
        let family = "ESPN";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(espnradio\\.com)").unwrap().captures(ua) {
        let family = "ESPN";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("ESPN APP$").unwrap().captures(ua) {
        let family = "ESPN";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(audioboom\\.com)").unwrap().captures(ua) {
        let family = "AudioBoom";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (Rivo) RHYTHM").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)(?:/(\\d+)\\.(\\d+)\\.?(\\d+)?)?")
        .unwrap()
        .captures(ua)
    {
        let family = "CFNetwork";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Pingdom.com_bot_version_)(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "PingdomBot";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(PingdomTMS)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "PingdomBot";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(NewRelicPinger)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "NewRelicPingerBot";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(\\(StatusCake\\))").unwrap().captures(ua) {
        let family = "StatusCakeBot";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(facebookexternalhit)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "FacebookBot";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Google.*/\\+/web/snippet")
        .unwrap()
        .captures(ua)
    {
        let family = "GooglePlusBot";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("via ggpht.com GoogleImageProxy")
        .unwrap()
        .captures(ua)
    {
        let family = "GmailImageProxy";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Twitterbot)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "TwitterBot";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("/((?:Ant-)?Nutch|[A-z]+[Bb]ot|[A-z]+[Ss]pider|Axtaris|fetchurl|Isara|ShopSalad|Tailsweep)[ \\-](\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("\\b(008|Altresium|Argus|BaiduMobaider|BoardReader|DNSGroup|DataparkSearch|EDI|Goodzer|Grub|INGRID|Infohelfer|LinkedInBot|LOOQ|Nutch|PathDefender|Peew|PostPost|Steeler|Twitterbot|VSE|WebCrunch|WebZIP|Y!J-BR[A-Z]|YahooSeeker|envolk|sproose|wminer)/(\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(MSIE) (\\d+)\\.(\\d+)([a-z]\\d?)?;.* MSIECrawle")
        .unwrap()
        .captures(ua)
    {
        let family = "MSIECrawle";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(DAVdroid)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Google-HTTP-Java-Client|Apache-HttpClient|http%20client|Python-urllib|HttpMonitor|TLSProber|WinHTTP|JNLP|okhttp)(?:[ /](\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(Pinterest(?:bot)?)/(\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?[;\\s\\(]+\\+https://www.pinterest.com/bot.html").unwrap().captures(ua) {
    let family = "Pinterestbot";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(1470\\.net crawler|50\\.nu|8bo Crawler Bot|Aboundex|Accoona-[A-z]+-Agent|AdsBot-Google(?:-[a-z]+)?|altavista|AppEngine-Google|archive.*?\\.org_bot|archiver|Ask Jeeves|[Bb]ai[Dd]u[Ss]pider(?:-[A-Za-z]+)*|bingbot|BingPreview|blitzbot|BlogBridge|Bloglovin|BoardReader(?: [A-Za-z]+)*|boitho.com-dc|BotSeer|\\b\\w*favicon\\w*\\b|\\bYeti(?:-[a-z]+)?|Catchpoint(?: bot)?|[Cc]harlotte|Checklinks|clumboot|Comodo HTTP\\(S\\) Crawler|Comodo-Webinspector-Crawler|ConveraCrawler|CRAWL-E|CrawlConvera|Daumoa(?:-feedfetcher)?|Feed Seeker Bot|Feedbin|findlinks|Flamingo_SearchEngine|FollowSite Bot|furlbot|Genieo|gigabot|GomezAgent|gonzo1|(?:[a-zA-Z]+-)?Googlebot(?:-[a-zA-Z]+)?|Google SketchUp|grub-client|gsa-crawler|heritrix|HiddenMarket|holmes|HooWWWer|htdig|ia_archiver|ICC-Crawler|Icarus6j|ichiro(?:/mobile)?|IconSurf|IlTrovatore(?:-Setaccio)?|InfuzApp|Innovazion Crawler|InternetArchive|IP2[a-z]+Bot|jbot\\b|KaloogaBot|Kraken|Kurzor|larbin|LEIA|LesnikBot|Linguee Bot|LinkAider|LinkedInBot|Lite Bot|Llaut|lycos|Mail\\.RU_Bot|masscan|masidani_bot|Mediapartners-Google|Microsoft .*? Bot|mogimogi|mozDex|MJ12bot|msnbot(?:-media *)?|msrbot|Mtps Feed Aggregation System|netresearch|Netvibes|NewsGator[^/]*|^NING|Nutch[^/]*|Nymesis|ObjectsSearch|Orbiter|OOZBOT|PagePeeker|PagesInventory|PaxleFramework|Peeplo Screenshot Bot|PlantyNet_WebRobot|Pompos|Qwantify|Read%20Later|Reaper|RedCarpet|Retreiver|Riddler|Rival IQ|scooter|Scrapy|Scrubby|searchsight|seekbot|semanticdiscovery|Simpy|SimplePie|SEOstats|SimpleRSS|SiteCon|Slackbot-LinkExpanding|Slack-ImgProxy|Slurp|snappy|Speedy Spider|Squrl Java|Stringer|TheUsefulbot|ThumbShotsBot|Thumbshots\\.ru|Tiny Tiny RSS|TwitterBot|WhatsApp|URL2PNG|Vagabondo|VoilaBot|^vortex|Votay bot|^voyager|WASALive.Bot|Web-sniffer|WebThumb|WeSEE:[A-z]+|WhatWeb|WIRE|WordPress|Wotbox|www\\.almaden\\.ibm\\.com|Xenu(?:.s)? Link Sleuth|Xerka [A-z]+Bot|yacy(?:bot)?|Yahoo[a-z]*Seeker|Yahoo! Slurp|Yandex\\w+|YodaoBot(?:-[A-z]+)?|YottaaMonitor|Yowedo|^Zao|^Zao-Crawler|ZeBot_www\\.ze\\.bz|ZooShot|ZyBorg)(?:[ /]v?(\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(?:\\/[A-Za-z0-9\\.]+)? *([A-Za-z0-9 \\-_\\!\\[\\]:]*(?:[Aa]rchiver|[Ii]ndexer|[Ss]craper|[Bb]ot|[Ss]pider|[Cc]rawl[a-z]*))/(\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(?:\\/[A-Za-z0-9\\.]+)? *([A-Za-z0-9 _\\!\\[\\]:]*(?:[Aa]rchiver|[Ii]ndexer|[Ss]craper|[Bb]ot|[Ss]pider|[Cc]rawl[a-z]*)) (\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("((?:[A-z0-9]+|[A-z\\-]+ ?)?(?: the )?(?:[Ss][Pp][Ii][Dd][Ee][Rr]|[Ss]crape|[A-Za-z0-9-]*(?:[^C][^Uu])[Bb]ot|[Cc][Rr][Aa][Ww][Ll])[A-z0-9]*)(?:(?:[ /]| v)(\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(HbbTV)/(\\d+)\\.(\\d+)\\.(\\d+) \\(")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(Chimera|SeaMonkey|Camino)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)?")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\[FB.*;(FBAV)/(\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?")
        .unwrap()
        .captures(ua)
    {
        let family = "Facebook";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\[(Pinterest)/[^\\]]+\\]")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(Pinterest)(?: for Android(?: Tablet)?)?/(\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(PaleMoon)/(\\d+)\\.(\\d+)\\.?(\\d+)?")
        .unwrap()
        .captures(ua)
    {
        let family = "Pale Moon";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Fennec)/(\\d+)\\.(\\d+)(pre)")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Fennec)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:Mobile|Tablet);.*(Firefox)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)")
            .unwrap()
            .captures(ua)
    {
        let family = "Firefox ($1)";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Firefox)/(\\d+)\\.(\\d+)(a\\d+[a-z]*)")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox Alpha";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Firefox)/(\\d+)\\.(\\d+)(b\\d+[a-z]*)")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox Beta";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(a\\d+[a-z]*)")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox Alpha";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(b\\d+[a-z]*)")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox Beta";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?")
            .unwrap()
            .captures(ua)
    {
        let family = "Firefox ($1)";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "MicroB";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(MozillaDeveloperPreview)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(FxiOS)/(\\d+)\\.(\\d+)(\\.(\\d+))?(\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Flock)/(\\d+)\\.(\\d+)(b\\d+?)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(RockMelt)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Netscape";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Netscape";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Netscape6)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+)?")
        .unwrap()
        .captures(ua)
    {
        let family = "Netscape";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(MyIBrow)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "My Internet Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(UC? ?Browser|UCWEB|U3)[ /]?(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "UC Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Opera Tablet).*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Opera Mini)(?:/att)?/?(\\d+)?(?:\\.(\\d+))?(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Opera Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Opera)/(\\d+)\\.(\\d+).+Opera Mobi")
        .unwrap()
        .captures(ua)
    {
        let family = "Opera Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Opera Mobi.+(Opera)(?:/|\\s+)(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Opera Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Opera Mobi").unwrap().captures(ua) {
        let family = "Opera Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:Mobile Safari).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Opera Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:Chrome).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Opera";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Coast)/(\\d+).(\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Opera Coast";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(OPiOS)/(\\d+).(\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Opera Mini";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Chrome/.+( MMS)/(\\d+).(\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Opera Neon";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(hpw|web)OS/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "webOS Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(luakit)").unwrap().captures(ua) {
        let family = "LuaKit";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Snowshoe)/(\\d+)\\.(\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("Gecko/\\d+ (Lightning)/(\\d+)\\.(\\d+)\\.?((?:[ab]?\\d+[a-z]*)|(?:\\d*))")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)")
        .unwrap()
        .captures(ua)
    {
        let family = "Swiftfox";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)")
        .unwrap()
        .captures(ua)
    {
        let family = "Swiftfox";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(rekonq)/(\\d+)\\.(\\d+)\\.?(\\d+)? Safari")
        .unwrap()
        .captures(ua)
    {
        let family = "Rekonq";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("rekonq").unwrap().captures(ua) {
        let family = "Rekonq";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(conkeror|Conkeror)/(\\d+)\\.(\\d+)\\.?(\\d+)?")
        .unwrap()
        .captures(ua)
    {
        let family = "Conkero";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Konquero";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(WeTab)-Browse").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Comodo_Dragon)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Comodo Dragon";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Symphony) (\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("PLAYSTATION 3.+WebKit").unwrap().captures(ua) {
        let family = "NetFront NX";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("PLAYSTATION 3").unwrap().captures(ua) {
        let family = "NetFront";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(PlayStation Portable)").unwrap().captures(ua) {
        let family = "NetFront";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(PlayStation Vita)").unwrap().captures(ua) {
        let family = "NetFront NX";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("AppleWebKit.+ (NX)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "NetFront NX";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Nintendo 3DS)").unwrap().captures(ua) {
        let family = "NetFront NX";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Amazon Silk";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Puffin)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Windows Phone .*(Edge)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Edge Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(SamsungBrowser)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung Internet";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(SznProhlizec)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Seznam.cz";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(coc_coc_browser)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Coc Coc";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(baidubrowser)[/\\s](\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?")
        .unwrap()
        .captures(ua)
    {
        let family = "Baidu Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(FlyFlow)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Baidu Explore";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(MxBrowser)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Maxthon";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Crosswalk)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; wv\\).+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Chrome Mobile WebView";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Chrome Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Chrome Mobile iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile(?:[ /]|$)")
        .unwrap()
        .captures(ua)
    {
        let family = "Chrome Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" Mobile .*(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Chrome Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(chromeframe)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Chrome Frame";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(SLP Browser)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Tizen Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(SE 2\\.X) MetaSr (\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Sogou Explore";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(MQQBrowser/Mini)(?:(\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?)?")
        .unwrap()
        .captures(ua)
    {
        let family = "QQ Browser Mini";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(MQQBrowser)(?:/(\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?)?")
        .unwrap()
        .captures(ua)
    {
        let family = "QQ Browser Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(QQBrowser)(?:/(\\d+)(?:\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?)?)?")
        .unwrap()
        .captures(ua)
    {
        let family = "QQ Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Rackspace Monitoring)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "RackspaceBot";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(PyAMF)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Yandex Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+).* MRCHROME")
        .unwrap()
        .captures(ua)
    {
        let family = "Mail.ru Chromium Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(AOL) (\\d+)\\.(\\d+); AOLBuild (\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(PodCruncher|Downcast)[ /]?(\\d+)\\.?(\\d+)?\\.?(\\d+)?\\.?(\\d+)?")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (BoxNotes)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Slack_SSB)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Slack Desktop Client";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(HipChat)/?(\\d+)?").unwrap().captures(ua) {
        let family = "HipChat Desktop Client";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(MobileIron|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Epiphany|Shiira|Sunrise|Spotify|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iris|UP\\.Browser|Bunjalloo|Google Earth|Raven for Mac|Openwave|MacOutlook|Electron)/(\\d+)\\.(\\d+)\\.(\\d+)").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Microsoft Office Outlook 12\\.\\d+\\.\\d+|MSOffice 12")
        .unwrap()
        .captures(ua)
    {
        let family = "Outlook";
        let major = "2007";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Microsoft Outlook 14\\.\\d+\\.\\d+|MSOffice 14")
        .unwrap()
        .captures(ua)
    {
        let family = "Outlook";
        let major = "2010";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Microsoft Outlook 15\\.\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "Outlook";
        let major = "2013";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Microsoft Outlook (?:Mail )?16\\.\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "Outlook";
        let major = "2016";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Outlook-Express\\/7\\.0.*")
        .unwrap()
        .captures(ua)
    {
        let family = "Windows Live Mail";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Airmail) (\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Thunderbird)/(\\d+)\\.(\\d+)(?:\\.(\\d+(?:pre)?))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Thunderbird";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Postbox)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Postbox";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Barca(?:Pro)?)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Barca";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Lotus-Notes)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Lotus Notes";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Vivaldi)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Edge)/(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(brave)/(\\d+)\\.(\\d+)\\.(\\d+) Chrome")
        .unwrap()
        .captures(ua)
    {
        let family = "Brave";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)[\\d.]* Iron[^/]")
        .unwrap()
        .captures(ua)
    {
        let family = "Iron";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(Dolphin)(?: |HDCN/|/INT\\-)(\\d+)\\.(\\d+)\\.?(\\d+)?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(HeadlessChrome)(?:/(\\d+)\\.(\\d+)\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Evolution)/(\\d+)\\.(\\d+)\\.(\\d+\\.\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(RCM CardDAV plugin)/(\\d+)\\.(\\d+)\\.(\\d+(?:-dev)?)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(bingbot|Bolt|AdobeAIR|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|iTunes|MacAppStore|NetNewsWire|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris|Abrowser|Planetweb|ICE Browser|mDolphin|qutebrowser|Otter|QupZilla|MailBar|kmail2|YahooMobileMail|ExchangeWebServices|ExchangeServicesClient|Dragon|Outlook-iOS-Android)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(Chromium|Chrome)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(IEMobile)[ /](\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "IE Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(BacaBerita App)\\/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(bPod|Pocket Casts|Player FM)$")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(AlexaMediaPlayer|VLC)/(\\d+)\\.(\\d+)\\.([^.\\s]+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(AntennaPod|WMPlayer|Zune|Podkicker|Radio|ExoPlayerDemo|Overcast|PocketTunes|NSPlayer|okhttp|DoggCatcher|QuickNews|QuickTime|Peapod|Podcasts|GoldenPod|VLC|Spotify|Miro|MediaGo|Juice|iPodder|gPodder|Banshee)/(\\d+)\\.(\\d+)\\.?(\\d+)?\\.?(\\d+)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("^(Peapod|Liferea)/([^.\\s]+)\\.([^.\\s]+)?\\.?([^.\\s]+)?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(bPod|Player FM) BMID/(\\S+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Podcast ?Addict)/v(\\d+) ")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Podcast ?Addict) ").unwrap().captures(ua) {
        let family = "PodcastAddict";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Replay) AV").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(VOX) Music Playe").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CITA) RSS Aggregator/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Pocket Casts)$").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Player FM)$").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(LG Player|Doppler|FancyMusic|MediaMonkey|Clementine) (\\d+)\\.(\\d+)\\.?([^.\\s]+)?\\.?([^.\\s]+)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(philpodder)/(\\d+)\\.(\\d+)\\.?([^.\\s]+)?\\.?([^.\\s]+)?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(Player FM|Pocket Casts|DoggCatcher|Spotify|MediaMonkey|MediaGo|BashPodder)")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(QuickTime)\\.(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Kinoma)(\\d+)").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Fancy) Cloud Music (\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "FancyMusic";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("EspnDownloadManage").unwrap().captures(ua) {
        let family = "ESPN";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(ESPN) Radio (\\d+)\\.(\\d+)\\.?(\\d+)? ?[rv:]?(\\d+)? ")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(podracer|jPodder) v ?(\\d+)\\.(\\d+)\\.?(\\d+)?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(ZDM)/(\\d+)\\.(\\d+)[; ]?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Zune|BeyondPod) (\\d+)\\.?(\\d+)?[\\);]")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(WMPlayer)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Lavf)").unwrap().captures(ua) {
        let family = "WMPlaye";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(RSSRadio)[ /]?(\\d+)?").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(RSS_Radio) (\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "RSSRadio";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Podkicker) \\S+/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Podkicke";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("^(HTC) Streaming Player \\S+ / \\S+ / \\S+ / (\\d+)\\.(\\d+)\\.?(\\d+)?")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Stitcher)/iOS").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Stitcher)/Android").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(VLC) .*version (\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (VLC) fo").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(vlc)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "VLC";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(foobar)\\S+/([^.\\s]+)\\.([^.\\s]+)?\\.?([^.\\s]+)?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Clementine)\\S+ ([^.\\s]+)\\.([^.\\s]+)?\\.?([^.\\s]+)?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(amarok)/([^.\\s]+)\\.([^.\\s]+)?\\.?([^.\\s]+)?")
        .unwrap()
        .captures(ua)
    {
        let family = "Amarok";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Custom)-Feed Reade").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(iCab|Lunascape|Opera|Android|Jasmine|Polaris|Microsoft SkyDriveSync|The Bat!) (\\d+)\\.(\\d+)\\.?(\\d+)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(Kindle)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Android) Donut").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "1";
        let minor = "2";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Android) Eclai").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2";
        let minor = "1";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Android) Froyo").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2";
        let minor = "2";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Android) Gingerbread").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2";
        let minor = "3";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Android) Honeycomb").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "3";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(MSIE) (\\d+)\\.(\\d+).*XBLWP7")
        .unwrap()
        .captures(ua)
    {
        let family = "IE Large Screen";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Nextcloud)").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(mirall)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(ownCloud-android)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Owncloud";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Obigo)InternetBrowse").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Obigo)\\-Browse").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Obigo";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(MAXTHON|Maxthon) (\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Maxthon";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Maxthon|MyIE2|Uzbl|Shiira)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "0";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(NCSA_Mosaic)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "NCSA Mosaic";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(POLARIS)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Polaris";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Embider)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Polaris";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(BonEcho)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+)?")
        .unwrap()
        .captures(ua)
    {
        let family = "Bon Echo";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(iPod|iPhone|iPad).+Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*[ +]Safari")
            .unwrap()
            .captures(ua)
    {
        let family = "Mobile Safari";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+))?.* AppleNews\\/\\d+\\.\\d+\\.\\d+?").unwrap().captures(ua) {
    let family = "Mobile Safari UI/WKWebView";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(iPod|iPhone|iPad).+Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Mobile Safari UI/WKWebView";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+))?.*Mobile.*[ +]Safari",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "Mobile Safari";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+))?.*Mobile")
            .unwrap()
            .captures(ua)
    {
        let family = "Mobile Safari UI/WKWebView";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(iPod|iPhone|iPad).* Safari")
        .unwrap()
        .captures(ua)
    {
        let family = "Mobile Safari";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(iPod|iPhone|iPad)").unwrap().captures(ua) {
        let family = "Mobile Safari UI/WKWebView";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(AvantGo) (\\d+).(\\d+)").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(OneBrowser)/(\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "ONE Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Avant)").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "1";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(QtCarBrowser)").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "1";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(iBrowser/Mini)(\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "iBrowser Mini";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(iBrowser|iRAPP)/(\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Nokia)").unwrap().captures(ua) {
        let family = "Nokia Services (WAP) Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Nokia Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Nokia Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(NokiaBrowser)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Nokia Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(BrowserNG)/(\\d+)\\.(\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Nokia Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Series60)/5\\.0").unwrap().captures(ua) {
        let family = "Nokia Browse";
        let major = "7";
        let minor = "0";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Series60)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Nokia OSS Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(S40OviBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Ovi Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Nokia)[EN]?(\\d+)").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(PlayBook).+RIM Tablet OS (\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "BlackBerry WebKit";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Black[bB]erry|BB10).+Version/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "BlackBerry WebKit";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Black[bB]erry)\\s?(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "BlackBerry";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(OmniWeb)/v(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Blazer)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Palm Blaze";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Pre)/(\\d+)\\.(\\d+)").unwrap().captures(ua) {
        let family = "Palm Pre";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(ELinks)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(ELinks) \\((\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Links) \\((\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(QtWeb) Internet Browser/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(PhantomJS)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Safari")
        .unwrap()
        .captures(ua)
    {
        let family = "WebKit Nightly";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/")
        .unwrap()
        .captures(ua)
    {
        let family = "Safari";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Safari)/\\d+").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(OLPC)/Update(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(OLPC)/Update()\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "0";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(SEMC\\-Browser)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Teleca)").unwrap().captures(ua) {
        let family = "Teleca Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Phantom)/V(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Phantom Browse";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Trident)/(7)\\.(0)").unwrap().captures(ua) {
        let family = "IE";
        let major = "11";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Trident)/(6)\\.(0)").unwrap().captures(ua) {
        let family = "IE";
        let major = "10";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Trident)/(5)\\.(0)").unwrap().captures(ua) {
        let family = "IE";
        let major = "9";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Trident)/(4)\\.(0)").unwrap().captures(ua) {
        let family = "IE";
        let major = "8";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Espial)/(\\d+)(?:\\.(\\d+))?(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(AppleWebKit)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Apple Mail";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("([MS]?IE) (\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "IE";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(python-requests)/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Python Requests";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(Windows-Update-Agent|Microsoft-CryptoAPI|SophosUpdateManager|SophosAgent|Debian APT-HTTP|Ubuntu APT-HTTP|libcurl-agent|libwww-perl|urlgrabber|curl|Wget|OpenBSD ftp|jupdate)(?:[ /](\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(Java)[/ ]{0,1}\\d+\\.(\\d+)\\.(\\d+)[_-]*([a-zA-Z0-9]+)*")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Roku)/DVP-(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Kurio)\\/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Kurio App";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Box(?: Sync)?)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Wget)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(curl)/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "cURL";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);

        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Rival IQ, rivaliq.com)").unwrap().captures(ua) {
        let family = "Spide";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:(?:iPhone|Windows CE|Windows Phone|Android).*(?:(?:Bot|Yeti)-Mobile|YRSpider|BingPreview|bots?/\\d|(?:bot|spider)\\.html)|AdsBot-Google-Mobile.*iPhone)").unwrap().captures(ua) {
    let family = "Spide";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(?:DoCoMo|\\bMOT\\b|\\bLG\\b|Nokia|Samsung|SonyEricsson).*(?:(?:Bot|Yeti)-Mobile|bots?/\\d|(?:bot|crawler)\\.html|(?:jump|google|Wukong)bot|ichiro/mobile|/spider|YahooSeeker)").unwrap().captures(ua) {
    let family = "Spide";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("\\bSmartWatch *\\( *([^;]+) *; *([^;]+) *;")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("Android Application[^\\-]+ - (Sony) ?(Ericsson)? (.+) \\w+ - ")
            .unwrap()
            .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Android Application[^\\-]+ - (?:HTC|HUAWEI|LGE|LENOVO|MEDION|TCT) (HTC|HUAWEI|LG|LENOVO|MEDION|ALCATEL)[ _\\-](.+) \\w+ - ").unwrap().captures(ua) {
    let family = "$1 $2";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Android Application[^\\-]+ - ([^ ]+) (.+) \\w+ - ")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([BLRQ]C\\d{4}[A-Z]+) +Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "3Q $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:3Q_)([^;/]+) +Build")
        .unwrap()
        .captures(ua)
    {
        let family = "3Q $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Android [34].*; *(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700(?: Lite| 3G)?|A701|B1-A71|A1-\\d{3}|B1-\\d{3}|V360|V370|W500|W500P|W501|W501P|W510|W511|W700|Slider SL101|DA22[^;/]+) Build").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *Acer Iconia Tab ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(Z1[1235]0|E320[^/]*|S500|S510|Liquid[^;/]*|Iconia A\\d+) Build")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Acer |ACER )([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Advent )?(Vega(?:Bean|Comb)?).* Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Ainol )?((?:NOVO|[Nn]ovo)[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *AIRIS[ _\\-]?([^/;\\)]+) *(?:;|\\)|Build)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(OnePAD[^;/]+) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Airpad[ \\-]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Airpad $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(one ?touch) (EVO7|T10|T20) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Alcatel One Touch $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(?:alcatel[ _])?(?:(?:one[ _]?touch[ _])|ot[ \\-])([^;/]+);? Build")
            .unwrap()
            .captures(ua)
    {
        let family = "Alcatel One Touch $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TCL)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Vodafone Smart II|Optimus_Madrid) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Alcatel $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *BASE_Lutea_3 Build").unwrap().captures(ua) {
        let family = "Alcatel One Touch 998";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *BASE_Varia Build").unwrap().captures(ua) {
        let family = "Alcatel One Touch 918D";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:FINE|Fine)\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ALLVIEW[ _]?|Allview[ _]?)((?:Speed|SPEED).*) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ALLVIEW[ _]?|Allview[ _]?)?(AX1_Shine|AX2_Frenzy) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ALLVIEW[ _]?|Allview[ _]?)([^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(A13-MID) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Allwinner)[ _\\-]?([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(A651|A701B?|A702|A703|A705|A706|A707|A711|A712|A713|A717|A722|A785|A801|A802|A803|A901|A902|A1002|A1003|A1006|A1007|A9701|A9703|Q710|Q80) Build").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(?:AMOI|Amoi)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Amoi $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(?:AMOI|Amoi)[ _]([^;/]+) Linux")
        .unwrap()
        .captures(ua)
    {
        let family = "Amoi $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(MW(?:0[789]|10)[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(G7|M1013|M1015G|M11[CG]?|M-?12[B]?|M15|M19[G]?|M30[ACQ]?|M31[GQ]|M32|M33[GQ]|M36|M37|M38|M701T|M710|M712B|M713|M715G|M716G|M71(?:G|GS|T)?|M72[T]?|M73[T]?|M75[GT]?|M77G|M79T|M7L|M7LN|M81|M810|M81T|M82|M92|M92KS|M92S|M717G|M721|M722G|M723|M725G|M739|M785|M791|M92SK|M93D) Build").unwrap().captures(ua) {
    let family = "Aoson $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *Aoson ([^;/]+) Build").unwrap().captures(ua) {
        let family = "Aoson $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *[Aa]panda[ _\\-]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Apanda $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:ARCHOS|Archos) ?(GAMEPAD.*?)(?: Build|[;/\\(\\)\\-])")
        .unwrap()
        .captures(ua)
    {
        let family = "Archos $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("ARCHOS; GOGI; ([^;]+);").unwrap().captures(ua) {
        let family = "Archos $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:ARCHOS|Archos)[ _]?(.*?)(?: Build|[;/\\(\\)\\-]|$)")
        .unwrap()
        .captures(ua)
    {
        let family = "Archos $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(AN(?:7|8|9|10|13)[A-Z0-9]{1,4}) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Archos $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "; *(A28|A32|A43|A70(?:BHT|CHT|HB|S|X)|A101(?:B|C|IT)|A7EB|A7EB-WK|101G9|80G9) Build",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "Archos $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(PAD-FMD[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(BioniQ) ?([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(AN\\d[^;/]+|ARCHM\\d+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Arnova $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:ARNOVA|Arnova) ?([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Arnova $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:ASSISTANT )?(AP)-?([1789]\\d{2}[A-Z]{0,2}|80104) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Assistant $1-$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ME17\\d[^;/]*|ME3\\d{2}[^;/]+|K00[A-Z]|Nexus 10|Nexus 7(?: 2013)?|PadFone[^;/]*|Transformer[^;/]*|TF\\d{3}[^;/]*|eeepc) Build").unwrap().captures(ua) {
    let family = "Asus $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *ASUS[ _]*([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Asus $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Garmin-Asus ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Garmin-Asus $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Garminfone) Build").unwrap().captures(ua) {
        let family = "Garmin $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; (@TAB-[^;/]+) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T-(?:07|[^0]\\d)[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Axioo[ _\\-]([^;/]+)|(picopad)[ _\\-]([^;/]+)) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Axioo $1$2 $3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(V(?:100|700|800)[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IBAK\\-[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(HY5001|HY6501|X12|X21|I5) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Bedove $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(JC-[^;/]*) Build").unwrap().captures(ua) {
        let family = "Benss $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(BB) ([^;/]+) Build").unwrap().captures(ua) {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(BlackBird)[ _](I8.*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(BlackBird)[ _](.*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([0-9]+BP[EM][^;/]*|Endeavour[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Blaupunkt $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:BLU|Blu)[ _\\-])([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(?:BMOBILE )?(Blu|BLU|DASH [^;/]+|VIVO 4\\.3|TANK 4\\.5) Build")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TOUCH\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(AX5\\d+) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([Bb]q) ([^;/]+);? Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Maxwell [^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:B-Tab|B-TAB) ?\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Broncho) ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *CAPTIVA ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Captiva $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(C771|CAL21|IS11CA) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Cat|CAT) ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Cat $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Cat)(Nova.*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Cat $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(INM8002KP|ADM8000KP_[AB]) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(?:[Cc]elkon[ _\\*]|CELKON[ _\\*])([^;/\\)]+) ?(?:Build|;|\\))")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Build/(?:[Cc]elkon)+_?([^;/_\\)]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(CT)-?(\\d+) Build").unwrap().captures(ua) {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(A19|A19Q|A105|A107[^;/\\)]*) ?(?:Build|;|\\))")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TPC[0-9]{4,5}) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Cloudfone)[ _](Excite)([^ ][^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2 $3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Excite|ICE)[ _](\\d+[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Cloudfone $1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Cloudfone|CloudPad)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:Aquila|Clanga|Rapax)[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:CFW-|Kyros )?(MID[0-9]{4}(?:[ABC]|SR|TV)?)(\\(3G\\)-4G| GB 8K| 3G| 8K| GB)? *(?:Build|[;\\)])").unwrap().captures(ua) {
    let family = "CobyKyros $1$2";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *([^;/]*)Coolpad[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(CUBE[ _])?([KU][0-9]+ ?GT.*|A5300) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *CUBOT ([^;/]+) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(BOBBY) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Dslide [^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(XCD)[ _]?(28|35) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Dell $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(001DL) Build").unwrap().captures(ua) {
        let family = "Dell $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Dell|DELL) (Streak) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Dell $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(101DL|GS01|Streak Pro[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Dell $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([Ss]treak ?7) Build").unwrap().captures(ua) {
        let family = "Dell $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Mini-3iX) Build").unwrap().captures(ua) {
        let family = "Dell $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(?:Dell|DELL)[ _](Aero|Venue|Thunder|Mini.*|Streak[ _]Pro) Build")
            .unwrap()
            .captures(ua)
    {
        let family = "Dell $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Dell[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Dell $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Dell ([^;/]+) Build").unwrap().captures(ua) {
        let family = "Dell $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TA[CD]-\\d+[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(iP[789]\\d{2}(?:-3G)?|IP10\\d{2}(?:-8GB)?) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(AirTab)[ _\\-]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(F\\-\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(HT-03A) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(HT\\-\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(L\\-\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(N\\-\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(P\\-\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SC\\-\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SH\\-\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SO\\-\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T\\-0[12][^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(DOOV)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Enot|ENOT)[ -]?([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *[^;/]+ Build/(?:CROSS|Cross)+[ _\\-]([^\\)]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "CROSS $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(CROSS|Cross)[ _\\-]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Explay[_ ](.+?)(?:[\\)]| Build)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IQ.*) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Fly|FLY)[ _](IQ[^;]+|F[34]\\d+[^;]*);? Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(M532|Q572|FJL21) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(G1) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Geeksphone) ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(G[^F]?FIVE) ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Gionee)[ _\\-]([^;/]+)(?:/[^;/]+)? Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(GN\\d+[A-Z]?|INFINITY_PASSION|Ctrl_V1) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Gionee $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(E3) Build/JOP40D").unwrap().captures(ua) {
        let family = "Gionee $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\sGIONEE[-\\s_](\\w*)").unwrap().captures(ua) {
        let family = "Gionee $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:FONE|QUANTUM|INSIGNIA) \\d+[^;/]*|PLAYTAB) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "GoClever $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *GOCLEVER ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "GoClever $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Glass \\d+) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Pixel \\w+) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(GSmart)[ -]([^/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(imx5[13]_[^/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Freescale $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Haier[ _\\-]([^/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Haier $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(PAD1016) Build").unwrap().captures(ua) {
        let family = "Haipad $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(M701|M7|M8|M9) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Haipad $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SN\\d+T[^;\\)/]*)(?: Build|[;\\)])")
        .unwrap()
        .captures(ua)
    {
        let family = "Hannspree $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Build/HCL ME Tablet ([^;\\)]+)[\\);]")
        .unwrap()
        .captures(ua)
    {
        let family = "HCLme $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([^;\\/]+) Build/HCL").unwrap().captures(ua) {
        let family = "HCLme $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(MID-?\\d{4}C[EM]) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Hena $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(EG\\d{2,}|HS-[^;/]+|MIRA[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Hisense $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(andromax[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Hisense $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:AMAZE[ _](S\\d+)|(S\\d+)[ _]AMAZE) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "AMAZE $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(PlayBook) Build").unwrap().captures(ua) {
        let family = "HP $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *HP ([^/]+) Build").unwrap().captures(ua) {
        let family = "HP $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([^/]+_tenderloin) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "HP TouchPad";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(HUAWEI |Huawei-)?([UY][^;/]+) Build/(?:Huawei|HUAWEI)([UY][^\\);]+)\\)")
            .unwrap()
            .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *([^;/]+) Build[/ ]Huawei(MT1-U06|[A-Z]+\\d+[^\\);]+)[^\\);]*\\)")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(S7|M860) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:HUAWEI|Huawei)[ \\-]?)(MediaPad) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:HUAWEI[ _]?|Huawei[ _])?Ascend[ _])([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:HUAWEI|Huawei)[ _\\-]?)((?:G700-|MT-)[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:HUAWEI|Huawei)[ _\\-]?)([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(MediaPad[^;]+|SpringBoard) Build/Huawei")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([^;]+) Build/(?:Huawei|HUAWEI)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([Uu])([89]\\d{3}) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Ideos |IDEOS )(S7) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Huawei Ideos$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Ideos |IDEOS )([^;/]+\\s*|\\s*)Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Huawei Ideos$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Orange Daytona|Pulse|Pulse Mini|Vodafone 858|C8500|C8600|C8650|C8660|Nexus 6P|ATH-.+?) Build[/ ]").unwrap().captures(ua) {
    let family = "Huawei $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *HTC[ _]([^;]+); Windows Phone")
        .unwrap()
        .captures(ua)
    {
        let family = "HTC $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "; *(?:HTC[ _/])+([^ _/]+)(?:[/\\\\]1\\.0 | V|/| +)\\d+\\.\\d[\\d\\.]*(?: *Build|\\))",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "HTC $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:HTC[ _/])+([^ _/]+)(?:[ _/]([^ _/]+))?(?:[/\\\\]1\\.0 | V|/| +)\\d+\\.\\d[\\d\\.]*(?: *Build|\\))").unwrap().captures(ua) {
    let family = "HTC $1 $2";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(?:HTC[ _/])+([^ _/]+)(?:[ _/]([^ _/]+)(?:[ _/]([^ _/]+))?)?(?:[/\\\\]1\\.0 | V|/| +)\\d+\\.\\d[\\d\\.]*(?: *Build|\\))").unwrap().captures(ua) {
    let family = "HTC $1 $2 $3";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(?:HTC[ _/])+([^ _/]+)(?:[ _/]([^ _/]+)(?:[ _/]([^ _/]+)(?:[ _/]([^ _/]+))?)?)?(?:[/\\\\]1\\.0 | V|/| +)\\d+\\.\\d[\\d\\.]*(?: *Build|\\))").unwrap().captures(ua) {
    let family = "HTC $1 $2 $3 $4";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) =
        Regex::new("; *(?:(?:HTC|htc)(?:_blocked)*[ _/])+([^ _/;]+)(?: *Build|[;\\)]| - )")
            .unwrap()
            .captures(ua)
    {
        let family = "HTC $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:(?:HTC|htc)(?:_blocked)*[ _/])+([^ _/]+)(?:[ _/]([^ _/;\\)]+))?(?: *Build|[;\\)]| - )").unwrap().captures(ua) {
    let family = "HTC $1 $2";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(?:(?:HTC|htc)(?:_blocked)*[ _/])+([^ _/]+)(?:[ _/]([^ _/]+)(?:[ _/]([^ _/;\\)]+))?)?(?: *Build|[;\\)]| - )").unwrap().captures(ua) {
    let family = "HTC $1 $2 $3";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(?:(?:HTC|htc)(?:_blocked)*[ _/])+([^ _/]+)(?:[ _/]([^ _/]+)(?:[ _/]([^ _/]+)(?:[ _/]([^ /;]+))?)?)?(?: *Build|[;\\)]| - )").unwrap().captures(ua) {
    let family = "HTC $1 $2 $3 $4";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("HTC Streaming Player [^\\/]*/[^\\/]*/ htc_([^/]+) /")
        .unwrap()
        .captures(ua)
    {
        let family = "HTC $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:[;,] *|^)(?:htccn_chs-)?HTC[ _-]?([^;]+?)(?: *Build|clay|Android|-?Mozilla| Opera| Profile| UNTRUSTED|[;/\\(\\)]|$)").unwrap().captures(ua) {
    let family = "HTC $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(A6277|ADR6200|ADR6300|ADR6350|ADR6400[A-Z]*|ADR6425[A-Z]*|APX515CKT|ARIA|Desire[^_ ]*|Dream|EndeavorU|Eris|Evo|Flyer|HD2|Hero|HERO200|Hero CDMA|HTL21|Incredible|Inspire[A-Z0-9]*|Legend|Liberty|Nexus ?(?:One|HD2)|One|One S C2|One[ _]?(?:S|V|X\\+?)\\w*|PC36100|PG06100|PG86100|S31HT|Sensation|Wildfire)(?: Build|[/;\\(\\)])").unwrap().captures(ua) {
    let family = "HTC $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(ADR6200|ADR6400L|ADR6425LVW|Amaze|DesireS?|EndeavorU|Eris|EVO|Evo\\d[A-Z]+|HD2|IncredibleS?|Inspire[A-Z0-9]*|Inspire[A-Z0-9]*|Sensation[A-Z0-9]*|Wildfire)[ _-](.+?)(?:[/;\\)]|Build|MIUI|1\\.0)").unwrap().captures(ua) {
    let family = "HTC $1 $2";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *HYUNDAI (T\\d[^/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Hyundai $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *HYUNDAI ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Hyundai $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(X700|Hold X|MB-6900) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Hyundai $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:iBall[ _\\-])?(Andi)[ _]?(\\d[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IBall)(?:[ _]([^;/]+)|) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "; *(NT-\\d+[^ ;/]*|Net[Tt]AB [^;/]+|Mercury [A-Z]+|iconBIT)(?: S/N:[^;/]+)? Build",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IMO)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *i-?mobile[ _]([^/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "i-mobile $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(i-(?:style|note)[^/]*) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "i-mobile $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ImPAD) ?(\\d+(?:.)*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Infinix)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Informer)[ \\-]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TAB) ?([78][12]4) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Intenso $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(?:Intex[ _])?(AQUA|Aqua)([ _\\.\\-])([^;/]+) *(?:Build|;)")
            .unwrap()
            .captures(ua)
    {
        let family = "$1$2$3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(?:INTEX|Intex)(?:[_ ]([^\\ _;/]+))(?:[_ ]([^\\ _;/]+))? *(?:Build|;)")
            .unwrap()
            .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *([iI]Buddy)[ _]?(Connect)(?:_|\\?_| )?([^;/]*) *(?:Build|;)")
            .unwrap()
            .captures(ua)
    {
        let family = "$1 $2 $3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(I-Buddy)[ _]([^;/]+) *(?:Build|;)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(iOCEAN) ([^/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TP\\d+(?:\\.\\d+)?\\-\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "ionik $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(M702pro) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(DE88Plus|MD70) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *IVIO[_\\-]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TPC-\\d+|JAY-TECH) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(JY-[^;/]+|G[234]S?) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(JXD)[ _\\-]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Karbonn[ _]?([^;/]+) *(?:Build|;)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([^;]+) Build/Karbonn")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(A11|A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2|Titanium S\\d) +Build")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS01|IS03|IS05|IS\\d{2}SH) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS04) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS06|IS\\d{2}PT) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS11S) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS11CA) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS11LG) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS11N) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS11PT) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS12F) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS12M) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IS12S) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ISW11F) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ISW11HT) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ISW11K) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ISW11M) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ISW11SC) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ISW12HT) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ISW13HT) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ISW?[0-9]{2}[A-Z]{0,2}) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(INFOBAR [^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(JOYPAD|Joypad)[ _]([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Vox|VOX|Arc|K080) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(Kobo Touch)\\b").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(K-Touch)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:EV|KM)-S\\d+[A-Z]?) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Zio|Hydro|Torque|Event|EVENT|Echo|Milano|Rise|URBANO PROGRESSO|WX04K|WX06K|WX10K|KYL21|101K|C5[12]\\d{2}) Build/").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(?:LAVA[ _])?IRIS[ _\\-]?([^/;\\)]+) *(?:;|\\)|Build)")
        .unwrap()
        .captures(ua)
    {
        let family = "Iris $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *LAVA[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:(Aspire A1)|(?:LEMON|Lemon)[ _]([^;/]+))_? Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Lemon $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TAB-1012) Build/").unwrap().captures(ua) {
        let family = "Lenco $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; Lenco ([^;/]+) Build/").unwrap().captures(ua) {
        let family = "Lenco $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(A1_07|A2107A-H|S2005A-H|S1-37AH0) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Idea[Tp]ab)[ _]([^;/]+);? Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Lenovo $1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Idea(?:Tab|pad)) ?([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Lenovo $1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ThinkPad) ?(Tablet) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Lenovo $1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(?:LNV-)?(?:=?[Ll]enovo[ _\\-]?|LENOVO[ _])+(.+?)(?:Build|[;/\\)])")
            .unwrap()
            .captures(ua)
    {
        let family = "Lenovo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("[;,] (?:Vodafone )?(SmartTab) ?(II) ?(\\d+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Lenovo $1 $2 $3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Ideapad )?K1 Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Lenovo Ideapad K1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(3GC101|3GW10[01]|A390) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(?:Lenovo|LENOVO)+[ _\\-]?([^,;:/ ]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Lenovo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(MFC\\d+)[A-Z]{2}([^;,/]*),? Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(E[34][0-9]{2}|LS[6-8][0-9]{2}|VS[6-9][0-9]+[^;/]+|Nexus 4|Nexus 5X?|GT540f?|Optimus (?:2X|G|4X HD)|OptimusX4HD) *(?:Build|;)").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) =
        Regex::new("[;:] *(L-\\d+[A-Z]|LGL\\d+[A-Z]?)(?:/V\\d+)? *(?:Build|[;\\)])")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(LG-)([A-Z]{1,2}\\d{2,}[^,;/\\)\\(]*?)(?:Build| V\\d+|[,;/\\)\\(]|$)")
            .unwrap()
            .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(LG[ \\-]|LG)([^;/]+)[;/]? Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(LG)-([^;/]+)/ Mozilla/.*; Android")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Web0S); Linux/(SmartTV)")
        .unwrap()
        .captures(ua)
    {
        let family = "LG $1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:SMB|smb)[^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Malata|MALATA) ([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "; *(MS[45][0-9]{3}|MID0[568][NS]?|MID[1-9]|MID[78]0[1-9]|MID970[1-9]|MID100[1-9]) Build/",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(M1052|M806|M9000|M9100|M9701|MID100|MID120|MID125|MID130|MID135|MID140|MID701|MID710|MID713|MID727|MID728|MID731|MID732|MID733|MID735|MID736|MID737|MID760|MID800|MID810|MID820|MID830|MID833|MID835|MID860|MID900|MID930|MID933|MID960|MID980) Build/").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(GenxDroid7|MSD7.*|AX\\d.*|Tab 701|Tab 722) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Maxx $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(M-PP[^;/]+|PhonePad ?\\d{2,}[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Mediacom $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(M-MP[^;/]+|SmartPad ?\\d{2,}[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Mediacom $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:MD_)?LIFETAB[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Medion Lifetab $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *MEDION ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Medion $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(M030|M031|M035|M040|M065|m9) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Meizu $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:meizu_|MEIZU )(.+?) *(?:Build|[;\\)])")
        .unwrap()
        .captures(ua)
    {
        let family = "Meizu $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Micromax[ _](A111|A240)|(A111|A240)) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Micromax $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Micromax[ _](A\\d{2,3}[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Micromax $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(A\\d{2}|A[12]\\d{2}|A90S|A110Q) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Micromax $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Micromax[ _](P\\d{3}[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Micromax $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(P\\d{3}|P\\d{3}\\(Funbook\\)) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Micromax $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(MITO)[ _\\-]?([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Cynus)[ _](F5|T\\d|.+?) *(?:Build|[;/\\)])")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(MODECOM )?(FreeTab) ?([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2 $3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(MODECOM )([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(MZ\\d{3}\\+?|MZ\\d{3} 4G|Xoom|XOOM[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Motorola $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Milestone )(XT[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Motorola $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Motoroi ?x|Droid X|DROIDX) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Motorola $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "; *(Droid[^;/]*|DROID[^;/]*|Milestone[^;/]*|Photon|Triumph|Devour|Titanium) Build",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "Motorola $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(A555|A85[34][^;/]*|A95[356]|ME[58]\\d{2}\\+?|ME600|ME632|ME722|MB\\d{3}\\+?|MT680|MT710|MT870|MT887|MT917|WX435|WX453|WX44[25]|XT\\d{3,4}[A-Z\\+]*|CL[iI]Q|CL[iI]Q XT) Build").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(Motorola MOT-|Motorola[ _\\-]|MOT\\-?)([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Moto[_ ]?|MOT\\-)([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:MP[DQ]C|MPG\\d{1,4}|MP\\d{3,4}|MID(?:(?:10[234]|114|43|7[247]|8[24]|7)C|8[01]1))[^;/]*) Build").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(?:MSI[ _])?(Primo\\d+|Enjoy[ _\\-][^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Multilaser[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(My)[_]?(Pad)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2 $3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(My)\\|?(Phone)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2 $3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(A\\d+)[ _](Duo)? Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(myTab[^;/]*) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(NABI2?-)([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(N-\\d+[CDE]) Build/").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(NEC-)(.*) Build/").unwrap().captures(ua) {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(LT-NA7) Build/").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(NXM\\d+[A-z0-9_]*|Next\\d[A-z0-9_ \\-]*|NEXT\\d[A-z0-9_ \\-]*|Nextbook [A-z0-9_ ]*|DATAM803HC|M805)(?: Build|[\\);])").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(Nokia)([ _\\-]*)([^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2$3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Nook ?|Barnes & Noble Nook |BN )([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "; *(NOOK )?(BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2) Build",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; Build/(Nook)").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(OP110|OliPad[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Olivetti $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *OMEGA[ _\\-](MID[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Omega $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(MID7500|MID\\d+) Mozilla/5\\.0 \\(iPad;")
        .unwrap()
        .captures(ua)
    {
        let family = "Omega $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:CIUS|cius)[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Openpeak $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "; *(Find ?(?:5|7a)|R8[012]\\d{1,2}|T703\\d{0,1}|U70\\d{1,2}T?|X90\\d{1,2}) Build",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "Oppo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *OPPO ?([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Oppo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Odys\\-|ODYS\\-|ODYS )([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Odys $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SELECT) ?(7) Build").unwrap().captures(ua) {
        let family = "Odys $1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(PEDI)_(PLUS)_(W) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Odys $1 $2 $3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(AEON|BRAVIO|FUSION|FUSION2IN1|Genio|EOS10|IEOS[^;/]*|IRON|Loox|LOOX|LOOX Plus|Motion|NOON|NOON_PRO|NEXT|OPOS|PEDI[^;/]*|PRIME[^;/]*|STUDYTAB|TABLO|Tablet-PC-4|UNO_X8|XELIO[^;/]*|Xelio ?\\d+ ?[Pp]ro|XENO10|XPRESS PRO) Build").unwrap().captures(ua) {
    let family = "Odys $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; (ONE [a-zA-Z]\\d+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "OnePlus $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; (ONEPLUS [a-zA-Z]\\d+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "OnePlus $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TP-\\d+) Build/").unwrap().captures(ua) {
        let family = "Orion $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(G100W?) Build/").unwrap().captures(ua) {
        let family = "PackardBell $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Panasonic)[_ ]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(FZ-A1B|JT-B1) Build").unwrap().captures(ua) {
        let family = "Panasonic $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(dL1|DL1) Build").unwrap().captures(ua) {
        let family = "Panasonic $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SKY[ _])?(IM\\-[AT]\\d{3}[^;/]+).* Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Pantech $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *((?:ADR8995|ADR910L|ADR930L|ADR930VW|PTL21|P8000)(?: 4G)?) Build/")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Pantech([^;/]+).* Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Pantech $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(papyre)[ _\\-]([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Touchlet )?(X10\\.[^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Pearl $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; PHICOMM (i800) Build/").unwrap().captures(ua) {
        let family = "Phicomm $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; PHICOMM ([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Phicomm $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(FWS\\d{3}[^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Phicomm $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(D633|D822|D833|T539|T939|V726|W335|W336|W337|W3568|W536|W5510|W626|W632|W6350|W6360|W6500|W732|W736|W737|W7376|W820|W832|W8355|W8500|W8510|W930) Build").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(?:Philips|PHILIPS)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Philips $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("Android 4\\..*; *(M[12356789]|U[12368]|S[123])\\ ?(pro)? Build")
            .unwrap()
            .captures(ua)
    {
        let family = "Pipo $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(MOMO[^;/]+) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "; *(?:Polaroid[ _])?((?:MIDC\\d{3,}|PMID\\d{2,}|PTAB\\d{3,})[^;/]*)(\\/[^;/]*)? Build/",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Polaroid )(Tablet) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(POMP)[ _\\-](.+?) *(?:Build|[;/\\)])")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TB07STA|TB10STA|TB07FTA|TB10FTA) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Positivo )?((?:YPY|Ypy)[^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(MOB-[^;/]+) Build/").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *POV[ _\\-]([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "POV $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "; *((?:TAB-PLAYTAB|TAB-PROTAB|PROTAB|PlayTabPro|Mobii[ _\\-]|TAB-P)[^;/]*) Build/",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "POV $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Prestigio )?((?:PAP|PMP)\\d[^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Prestigio $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(PLT[0-9]{4}.*) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(A2|A5|A8|A900)_?(Classic)? Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Q[Mm]obile)_([^_]+)_([^_]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Qmobile $2 $3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Q\\-?[Mm]obile)[_ ](A[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Qmobile $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Q\\-Smart)[ _]([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Q\\-?[Mm]obile)[ _\\-](S[^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TA1013) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; (RCT\\w+) Build/").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(RK\\d+),? Build/").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" Build/(RK\\d+)").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SAMSUNG |Samsung )?((?:Galaxy (?:Note II|S\\d)|GT-I9082|GT-I9205|GT-N7\\d{3}|SM-N9005)[^;/]*)\\/?[^;/]* Build/").unwrap().captures(ua) {
    let family = "Samsung $1$2";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(Google )?(Nexus [Ss](?: 4G)?) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SAMSUNG |Samsung )([^\\/]*)\\/[^ ]* Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(Galaxy(?: Ace| Nexus| S ?II+|Nexus S| with MCR 1.2| Mini Plus 4G)?) Build/")
            .unwrap()
            .captures(ua)
    {
        let family = "Samsung $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SAMSUNG[ _\\-] *)+([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SAMSUNG-)?(GT\\-[BINPS]\\d{4}[^\\/]*)(\\/[^ ]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung $1$2$3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:; *|^)((?:GT\\-[BIiNPS]\\d{4}|I9\\d{2}0[A-Za-z\\+]?\\b)[^;/\\)]*?)(?:Build|Linux|MIUI|[;/\\)])").unwrap().captures(ua) {
    let family = "Samsung $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; (SAMSUNG-)([A-Za-z0-9\\-]+).* Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *((?:SCH|SGH|SHV|SHW|SPH|SC|SM)\\-[A-Za-z0-9 ]+)(/?[^ ]*)? Build")
            .unwrap()
            .captures(ua)
    {
        let family = "Samsung $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" ((?:SCH)\\-[A-Za-z0-9 ]+)(/?[^ ]*)? Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(Behold ?(?:2|II)|YP\\-G[^;/]+|EK-GC100|SCL21|I9300) Build")
            .unwrap()
            .captures(ua)
    {
        let family = "Samsung $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SH\\-?\\d\\d[^;/]+|SBM\\d[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SHARP[ -])([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SPX[_\\-]\\d[^;/]*) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SX7\\-PEARL\\.GmbH) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SP[T]?\\-\\d{2}[^;/]*) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SK\\-.*) Build/").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:SKYTEX|SX)-([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(IMAGINE [^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SmartQ) ?([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(WF7C|WF10C|SBT[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SBM(?:003SH|005SH|006SH|007SH|102SH)) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(003P|101P|101P11C|102P) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(00\\dZ) Build/").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; HTC(X06HT) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(001HT|X06HT) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(201M) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ST\\d{4}.*)Build/ST").unwrap().captures(ua) {
        let family = "Trekstor $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ST\\d{4}.*) Build/").unwrap().captures(ua) {
        let family = "Trekstor $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Sony ?Ericsson ?)([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *((?:SK|ST|E|X|LT|MK|MT|WT)\\d{2}[a-z0-9]*(?:-o)?|R800i|U20i) Build")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Xperia (?:A8|Arc|Acro|Active|Live with Walkman|Mini|Neo|Play|Pro|Ray|X\\d+)[^;/]*) Build").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; Sony (Tablet[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Sony $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; Sony ([^;/]+) Build").unwrap().captures(ua) {
        let family = "Sony $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Sony)([A-Za-z0-9\\-]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Xperia [^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(C(?:1[0-9]|2[0-9]|53|55|6[0-9])[0-9]{2}|D[25]\\d{3}|D6[56]\\d{2}) Build")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SGP\\d{3}|SGPT\\d{2}) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(NW-Z1000Series) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("PLAYSTATION 3").unwrap().captures(ua) {
        let family = "PlayStation 3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(PlayStation (?:Portable|Vita|\\d+))")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "; *((?:CSL_Spice|Spice|SPICE|CSL)[ _\\-]?)?([Mm][Ii])([ _\\-])?(\\d{3}[^;/]*) Build/",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "$1$2$3$4";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Sprint )(.+?) *(?:Build|[;/])")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(Sprint)[: ]([^;,/ ]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TAGI[ ]?)(MID) ?([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2$3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Oyster500|Opal 800) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Tecmobile $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TECNO[ _])([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Android for (Telechips|Techvision) ([^ ]+) ")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T-Hub2) Build/").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(PAD) ?(100[12]) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Terra $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T[BM]-\\d{3}[^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(tolino [^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *Build/.* (TOLINO_BROWSER)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:CJ[ -])?(ThL|THL)[ -]([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T100|T200|T5|W100|W200|W8s) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T-Mobile[ _]G2[ _]Touch) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T-Mobile[ _]G2) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T-Mobile myTouch Q) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T-Mobile myTouch) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T-Mobile_Espresso) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(T-Mobile G1) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("\\b(T-Mobile ?)?(myTouch)[ _]?([34]G)[ _]?([^\\/]*) (?:Mozilla|Build)")
            .unwrap()
            .captures(ua)
    {
        let family = "$1$2 $3 $4";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(T-Mobile)_([^_]+)_(.*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2 $3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(T-Mobile)[_ ]?(.*?)Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (ATP[0-9]{4}) Build").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" *(TOOKY)[ _\\-]([^;/]+) ?(?:Build|;)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(TOSHIBA_AC_AND_AZ|TOSHIBA_FOLIO_AND_A|FOLIO_AND_A)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([Ff]olio ?100) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(AT[0-9]{2,3}(?:\\-A|LE\\-A|PE\\-A|SE|a)?|AT7-A|AT1S0|Hikari-iFrame/WDPF-[^;/]+|THRiVE|Thrive) Build/").unwrap().captures(ua) {
    let family = "Toshiba $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *(TM-MID\\d+[^;/]+|TOUCHMATE|MID-750) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TM-SM\\d+[^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(A10 [Bb]asic2?) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(TREQ[ _\\-])([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(X-?5|X-?3) Build/").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(A502\\+?|A936|A603|X1|X2) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(TOUCH(?:TAB|PAD).+?) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Versus $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(VERTU) ([^;/]+) Build/").unwrap().captures(ua) {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Videocon)[ _\\-]([^;/]+) *(?:Build|;)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (VT\\d{2}[A-Za-z]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *((?:ViewPad|ViewPhone|VSD)[^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ViewSonic-)([^;/]+) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(GTablet.*) Build/").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *([Vv]ivo)[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Vodafone) (.*) Build/").unwrap().captures(ua) {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Walton[ _\\-])?(Primo[ _\\-][^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Walton $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:WIKO[ \\-])?(CINK\\+?|BARRY|BLOOM|DARKFULL|DARKMOON|DARKNIGHT|DARKSIDE|FIZZ|HIGHWAY|IGGY|OZZY|RAINBOW|STAIRWAY|SUBLIM|WAX|CINK [^;/]+) Build/").unwrap().captures(ua) {
    let family = "Wiko $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *WellcoM-([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Wellcom $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:(WeTab)-Browser|; (wetab) Build)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(AT-AS[^;/]+) Build").unwrap().captures(ua) {
        let family = "Wolfgang $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Woxter|Wxt) ([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Woxter $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Xenta |Luna )?(TAB[234][0-9]{2}|TAB0[78]-\\d{3}|TAB0?9-\\d{3}|TAB1[03]-\\d{3}|SMP\\d{2}-\\d{3}) Build/").unwrap().captures(ua) {
    let family = "Yarvik $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) =
        Regex::new("; *([A-Z]{2,4})(M\\d{3,}[A-Z]{2})([^;\\)\\/]*)(?: Build|[;\\)])")
            .unwrap()
            .captures(ua)
    {
        let family = "Yifang $1$2$3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *((MI|HM|MI-ONE|Redmi)[ -](NOTE |Note )?[^;/]*) (Build|MIUI)/")
            .unwrap()
            .captures(ua)
    {
        let family = "XiaoMi $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *XOLO[ _]([^;/]*tab.*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Xolo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *XOLO[ _]([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Xolo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(q\\d0{2,3}[a-z]?) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Xolo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(PAD ?[79]\\d+[^;/]*|TelePAD\\d+[^;/]) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "Xoro $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; *(?:(?:ZOPO|Zopo)[ _]([^;/]+)|(ZP ?(?:\\d{2}[^;/]+|C2))|(C[2379])) Build")
            .unwrap()
            .captures(ua)
    {
        let family = "$1$2$3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ZiiLABS) (Zii[^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Zii)_([^;/]*) Build").unwrap().captures(ua) {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(ARIZONA|(?:ATLAS|Atlas) W|D930|Grand (?:[SX][^;]*|Era|Memo[^;]*)|JOE|(?:Kis|KIS)\\b[^;]*|Libra|Light [^;]*|N8[056][01]|N850L|N8000|N9[15]\\d{2}|N9810|NX501|Optik|(?:Vip )Racer[^;]*|RacerII|RACERII|San Francisco[^;]*|V9[AC]|V55|V881|Z[679][0-9]{2}[A-z]?) Build").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("; *([A-Z]\\d+)_USA_[^;]* Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(SmartTab\\d+)[^;]* Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Blade|BLADE|ZTE-BLADE)([^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "ZTE Blade$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:Skate|SKATE|ZTE-SKATE)([^;/]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "ZTE Skate$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(Orange |Optimus )(Monte Carlo|San Francisco) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(?:ZXY-ZTE_|ZTE\\-U |ZTE[\\- _]|ZTE-C[_ ])([^;/]+) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "ZTE $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; (BASE) (lutea|Lutea 2|Tab[^;]*) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; (Avea inTouch 2|soft stone|tmn smart a7|Movistar[ _]Link) Build")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(vp9plus)\\)").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("; ?(Cloud[ _]Z5|z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900) Build/")
            .unwrap()
            .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(KFOT|Kindle Fire) Build\\b")
        .unwrap()
        .captures(ua)
    {
        let family = "Kindle Fire";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(KFOTE|Amazon Kindle Fire2) Build\\b")
        .unwrap()
        .captures(ua)
    {
        let family = "Kindle Fire 2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(KFTT) Build\\b").unwrap().captures(ua) {
        let family = "Kindle Fire HD";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(KFJWI) Build\\b").unwrap().captures(ua) {
        let family = "Kindle Fire HD 8.9\" WiFi";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(KFJWA) Build\\b").unwrap().captures(ua) {
        let family = "Kindle Fire HD 8.9\" 4G";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(KFSOWI) Build\\b").unwrap().captures(ua) {
        let family = "Kindle Fire HD 7\" WiFi";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(KFTHWI) Build\\b").unwrap().captures(ua) {
        let family = "Kindle Fire HDX 7\" WiFi";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(KFTHWA) Build\\b").unwrap().captures(ua) {
        let family = "Kindle Fire HDX 7\" 4G";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(KFAPWI) Build\\b").unwrap().captures(ua) {
        let family = "Kindle Fire HDX 8.9\" WiFi";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(KFAPWA) Build\\b").unwrap().captures(ua) {
        let family = "Kindle Fire HDX 8.9\" 4G";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?Amazon ([^;/]+) Build\\b")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(Kindle) Build\\b").unwrap().captures(ua) {
        let family = "Kindle";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ?(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))? Build\\b")
        .unwrap()
        .captures(ua)
    {
        let family = "Kindle Fire";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (Kindle)/(\\d+\\.\\d+)").unwrap().captures(ua) {
        let family = "Kindle";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (Silk|Kindle)/(\\d+)\\.")
        .unwrap()
        .captures(ua)
    {
        let family = "Kindle";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(sprd)\\-([^/]+)/").unwrap().captures(ua) {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(H\\d{2}00\\+?) Build")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(iphone|iPhone5) Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Xianghe $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; *(e\\d{4}[a-z]?_?v\\d+|v89_[^;/]+)[^;/]+ Build/")
        .unwrap()
        .captures(ua)
    {
        let family = "Xianghe $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\bUSCC[_\\-]?([^ ;/\\)]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?)?(?:ALCATEL)[^;]*; *([^;,\\)]+)").unwrap().captures(ua) {
    let family = "Alcatel $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?|WpsLondonTest; ?)?(?:ASUS|Asus)[^;]*; *([^;,\\)]+)").unwrap().captures(ua) {
    let family = "Asus $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?)?(?:DELL|Dell)[^;]*; *([^;,\\)]+)").unwrap().captures(ua) {
    let family = "Dell $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?|WpsLondonTest; ?)?(?:HTC|Htc|HTC_blocked[^;]*)[^;]*; *(?:HTC)?([^;,\\)]+)").unwrap().captures(ua) {
    let family = "HTC $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?)?(?:HUAWEI)[^;]*; *(?:HUAWEI )?([^;,\\)]+)").unwrap().captures(ua) {
    let family = "Huawei $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?)?(?:LG|Lg)[^;]*; *(?:LG[ \\-])?([^;,\\)]+)").unwrap().captures(ua) {
    let family = "LG $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?)?(?:rv:11; )?(?:NOKIA|Nokia)[^;]*; *(?:NOKIA ?|Nokia ?|LUMIA ?|[Ll]umia ?)*(\\d{3,}[^;\\)]*)").unwrap().captures(ua) {
    let family = "Lumia $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?)?(?:NOKIA|Nokia)[^;]*; *(RM-\\d{3,})").unwrap().captures(ua) {
    let family = "Nokia $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(?:Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)]|WPDesktop;) ?(?:ARM; ?Touch; ?|Touch; ?)?(?:NOKIA|Nokia)[^;]*; *(?:NOKIA ?|Nokia ?|LUMIA ?|[Ll]umia ?)*([^;\\)]+)").unwrap().captures(ua) {
    let family = "Nokia $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?)?(?:Microsoft(?: Corporation)?)[^;]*; *([^;,\\)]+)").unwrap().captures(ua) {
    let family = "Microsoft $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?|WpsLondonTest; ?)?(?:SAMSUNG)[^;]*; *(?:SAMSUNG )?([^;,\\.\\)]+)").unwrap().captures(ua) {
    let family = "Samsung $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?|WpsLondonTest; ?)?(?:TOSHIBA|FujitsuToshibaMobileCommun)[^;]*; *([^;,\\)]+)").unwrap().captures(ua) {
    let family = "Toshiba $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Windows Phone [^;]+; .*?IEMobile/[^;\\)]+[;\\)] ?(?:ARM; ?Touch; ?|Touch; ?|WpsLondonTest; ?)?([^;]+); *([^;,\\)]+)").unwrap().captures(ua) {
    let family = "$1 $2";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(?:^|; )SAMSUNG\\-([A-Za-z0-9\\-]+).* Bada/")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\(Mobile; ALCATEL ?(One|ONE) ?(Touch|TOUCH) ?([^;/]+)(?:/[^;]+)?; rv:[^\\)]+\\) Gecko/[^\\/]+ Firefox/").unwrap().captures(ua) {
    let family = "Alcatel $1 $2 $3";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) =
        Regex::new("\\(Mobile; (?:ZTE([^;]+)|(OpenC)); rv:[^\\)]+\\) Gecko/[^\\/]+ Firefox/")
            .unwrap()
            .captures(ua)
    {
        let family = "ZTE $1$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Nokia(N[0-9]+)([A-z_\\-][A-z0-9_\\-]*)")
        .unwrap()
        .captures(ua)
    {
        let family = "Nokia $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:NOKIA|Nokia)(?:\\-| *)(?:([A-Za-z0-9]+)\\-[0-9a-f]{32}|([A-Za-z0-9\\-]+)(?:UCBrowser)|([A-Za-z0-9\\-]+))").unwrap().captures(ua) {
    let family = "Nokia $1$2$3";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("Lumia ([A-Za-z0-9\\-]+)").unwrap().captures(ua) {
        let family = "Lumia $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "\\(Symbian; U; S60 V5; [A-z]{2}\\-[A-z]{2}; (SonyEricsson|Samsung|Nokia|LG)([^;/]+)\\)",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\(Symbian(?:/3)?; U; ([^;]+);")
        .unwrap()
        .captures(ua)
    {
        let family = "Nokia $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("BB10; ([A-Za-z0-9\\- ]+)\\)")
        .unwrap()
        .captures(ua)
    {
        let family = "BlackBerry $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Play[Bb]ook.+RIM Tablet OS")
        .unwrap()
        .captures(ua)
    {
        let family = "BlackBerry Playbook";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Black[Bb]erry ([0-9]+);").unwrap().captures(ua) {
        let family = "BlackBerry $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Black[Bb]erry([0-9]+)").unwrap().captures(ua) {
        let family = "BlackBerry $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Black[Bb]erry;").unwrap().captures(ua) {
        let family = "BlackBerry";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Pre|Pixi)/\\d+\\.\\d+").unwrap().captures(ua) {
        let family = "Palm $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Palm([0-9]+)").unwrap().captures(ua) {
        let family = "Palm $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Treo([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "Palm Treo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("webOS.*(P160U(?:NA)?)/(\\d+).(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "HP Vee";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Touch[Pp]ad)/\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "HP TouchPad";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("HPiPAQ([A-Za-z0-9]+)/\\d+.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "HP iPAQ $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("PDA; (PalmOS)/sony/model ([a-z]+)/Revision")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Apple\\s?TV)").unwrap().captures(ua) {
        let family = "AppleTV";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(QtCarBrowser)").unwrap().captures(ua) {
        let family = "Tesla Model S";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(iPhone|iPad|iPod)(\\d+,\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(iPad)(?:;| Simulator;)").unwrap().captures(ua) {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(iPod)(?:;| touch;| Simulator;)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(iPhone)(?:;| Simulator;)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("iPhone").unwrap().captures(ua) {
        let family = "iPhone";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "CFNetwork/.* Darwin/\\d.*\\(((?:Mac|iMac|PowerMac|PowerBook)[^\\d]*)(\\d+)(?:,|%2C)(\\d+)",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "$1$2,$3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/.* Darwin/\\d+\\.\\d+\\.\\d+ \\(x86_64\\)")
        .unwrap()
        .captures(ua)
    {
        let family = "Mac";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/.* Darwin/\\d").unwrap().captures(ua) {
        let family = "iOS-Device";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("acer_([A-Za-z0-9]+)_").unwrap().captures(ua) {
        let family = "Acer $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:ALCATEL|Alcatel)-([A-Za-z0-9\\-]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Alcatel $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:Amoi|AMOI)\\-([A-Za-z0-9]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Amoi $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "(?:; |\\/|^)((?:Transformer (?:Pad|Prime) |Transformer |PadFone[ _]?)[A-Za-z0-9]*)",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "Asus $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:asus.*?ASUS|Asus|ASUS|asus)[\\- ;]*((?:Transformer (?:Pad|Prime) |Transformer |Padfone |Nexus[ _])?[A-Za-z0-9]+)").unwrap().captures(ua) {
    let family = "Asus $1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("\\bBIRD[ \\-\\.]([A-Za-z0-9]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Bird $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\bDell ([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "Dell $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("DoCoMo/2\\.0 ([A-Za-z0-9]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "DoCoMo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("([A-Za-z0-9]+)_W;FOMA").unwrap().captures(ua) {
        let family = "DoCoMo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("([A-Za-z0-9]+);FOMA").unwrap().captures(ua) {
        let family = "DoCoMo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "\\b(?:HTC/|HTC/[a-z0-9]+/)?HTC[ _\\-;]? *(.*?)(?:-?Mozilla|fingerPrint|[;/\\(\\)]|$)",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "HTC $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Huawei([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "Huawei $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("HUAWEI-([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "Huawei $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("vodafone([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "Huawei Vodafone $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("i\\-mate ([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "i-mate $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Kyocera\\-([A-Za-z0-9]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Kyocera $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("KWC\\-([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "Kyocera $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Lenovo[_\\-]([A-Za-z0-9]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Lenovo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "(HbbTV)/[0-9]+\\.[0-9]+\\.[0-9]+ \\([^;]*; *(LG)E *; *([^;]*) *;[^;]*;[^;]*;\\)",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(HbbTV)/1\\.1\\.1.*CE-HTML/1\\.\\d;(Vendor/)*(THOM[^;]*?)[;\\s](?:.*SW-Version/.*)*(LF[^;]+);?").unwrap().captures(ua) {
    let family = "$1";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new(
        "(HbbTV)(?:/1\\.1\\.1)?(?: ?\\(;;;\\))?; *CE-HTML(?:/1\\.\\d)?; *([^ ]+) ([^;]+);",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(HbbTV)/1\\.1\\.1 \\(;;;\\) Maple_2011")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "(HbbTV)/[0-9]+\\.[0-9]+\\.[0-9]+ \\([^;]*; *(?:CUS:([^;]*)|([^;]+)) *; *([^;]*) *;.*;",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(HbbTV)/[0-9]+\\.[0-9]+\\.[0-9]+")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "LGE; (?:Media\\/)?([^;]*);[^;]*;[^;]*;?\\); \"?LG NetCast(\\.TV|\\.Media|)-\\d+",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "NetCast$2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("InettvBrowser/[0-9]+\\.[0-9A-Z]+ \\([^;]*;(Sony)([^;]*);[^;]*;[^\\)]*\\)")
            .unwrap()
            .captures(ua)
    {
        let family = "Inettv";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("InettvBrowser/[0-9]+\\.[0-9A-Z]+ \\([^;]*;([^;]*);[^;]*;[^\\)]*\\)")
            .unwrap()
            .captures(ua)
    {
        let family = "Inettv";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:InettvBrowser|TSBNetTV|NETTV|HBBTV)")
        .unwrap()
        .captures(ua)
    {
        let family = "Inettv";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Series60/\\d\\.\\d (LG)[\\-]?([A-Za-z0-9 \\-]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "\\b(?:LGE[ \\-]LG\\-(?:AX)?|LGE |LGE?-LG|LGE?[ \\-]|LG[ /\\-]|lg[\\-])([A-Za-z0-9]+)\\b",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "LG $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:^LG[\\-]?|^LGE[\\-/]?)([A-Za-z]+[0-9]+[A-Za-z]*)")
        .unwrap()
        .captures(ua)
    {
        let family = "LG $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^LG([0-9]+[A-Za-z]*)").unwrap().captures(ua) {
        let family = "LG $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(KIN\\.[^ ]+) (\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Microsoft $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:MSIE|XBMC).*\\b(Xbox)\\b")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("; ARM; Trident/6\\.0; Touch[\\);]")
        .unwrap()
        .captures(ua)
    {
        let family = "Microsoft Surface RT";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Motorola\\-([A-Za-z0-9]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Motorola $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("MOTO\\-([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "Motorola $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("MOT\\-([A-z0-9][A-z0-9\\-]*)")
        .unwrap()
        .captures(ua)
    {
        let family = "Motorola $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Nintendo WiiU").unwrap().captures(ua) {
        let family = "Nintendo Wii U";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Nintendo (DS|3DS|DSi|Wii);")
        .unwrap()
        .captures(ua)
    {
        let family = "Nintendo $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:Pantech|PANTECH)[ _-]?([A-Za-z0-9\\-]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Pantech $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Philips([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "Philips $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Philips ([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "Philips $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(SMART-TV); .* Tizen ").unwrap().captures(ua) {
        let family = "Samsung $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("SymbianOS/9\\.\\d.* Samsung[/\\-]([A-Za-z0-9 \\-]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Samsung)(SGH)(i[0-9]+)").unwrap().captures(ua) {
        let family = "$1 $2$3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("SAMSUNG-ANDROID-MMS/([^;/]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "$1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("SAMSUNG(?:; |[ -/])([A-Za-z0-9\\-]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Dreamcast)").unwrap().captures(ua) {
        let family = "Sega $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^SIE-([A-Za-z0-9]+)").unwrap().captures(ua) {
        let family = "Siemens $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Softbank/[12]\\.0/([A-Za-z0-9]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Softbank $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("SonyEricsson ?([A-Za-z0-9\\-]+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Ericsson $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Android [^;]+; ([^ ]+) (Sony)/")
        .unwrap()
        .captures(ua)
    {
        let family = "$2 $1";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Sony)(?:BDP\\/|\\/)?([^ /;\\)]+)[ /;\\)]")
        .unwrap()
        .captures(ua)
    {
        let family = "$1 $2";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Puffin/[\\d\\.]+IT").unwrap().captures(ua) {
        let family = "iPad";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Puffin/[\\d\\.]+IP").unwrap().captures(ua) {
        let family = "iPhone";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Puffin/[\\d\\.]+AT").unwrap().captures(ua) {
        let family = "Generic Tablet";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Puffin/[\\d\\.]+AP").unwrap().captures(ua) {
        let family = "Generic Smartphone";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "Android[\\- ][\\d]+\\.[\\d]+; [A-Za-z]{2}\\-[A-Za-z]{0,2}; WOWMobile (.+) Build[/ ]",
    )
    .unwrap()
    .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "Android[\\- ][\\d]+\\.[\\d]+\\-update1; [A-Za-z]{2}\\-[A-Za-z]{0,2} *; *(.+?) Build[/ ]",
    )
    .unwrap()
    .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Android[\\- ][\\d]+(?:\\.[\\d]+){1,2}; *[A-Za-z]{2}[_\\-][A-Za-z]{0,2}\\-? *; *(.+?) Build[/ ]").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) =
        Regex::new("Android[\\- ][\\d]+(?:\\.[\\d]+){1,2}; *[A-Za-z]{0,2}\\- *; *(.+?) Build[/ ]")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(
        "Android[\\- ][\\d]+(?:\\.[\\d]+){1,2}; *[a-z]{0,2}[_\\-]?[A-Za-z]{0,2};? Build[/ ]",
    )
    .unwrap()
    .captures(ua)
    {
        let family = "Generic Smartphone";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("Android[\\- ][\\d]+(?:\\.[\\d]+){1,2}; *\\-?[A-Za-z]{2}; *(.+?) Build[/ ]")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("Android[\\- ][\\d]+(?:\\.[\\d]+){1,2}(?:;.*)?; *(.+?) Build[/ ]")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(GoogleTV)").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(WebTV)/\\d+.\\d+").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Roku)/DVP-\\d+\\.\\d+").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(Android 3\\.\\d|Opera Tablet|Tablet; .+Firefox/|Android.*(?:Tab|Pad))")
            .unwrap()
            .captures(ua)
    {
        let family = "Generic Tablet";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Symbian|\\bS60(Version|V\\d)|\\bS60\\b|\\((Series 60|Windows Mobile|Palm OS|Bada); Opera Mini|Windows CE|Opera Mobi|BREW|Brew|Mobile; .+Firefox/|iPhone OS|Android|MobileSafari|Windows *Phone|\\(webOS/|PalmOS)").unwrap().captures(ua) {
    let family = "Generic Smartphone";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(hiptop|avantgo|plucker|xiino|blazer|elaine)")
        .unwrap()
        .captures(ua)
    {
        let family = "Generic Smartphone";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(bot|zao|borg|DBot|oegp|silk|Xenu|zeal|^NING|CCBot|crawl|htdig|lycos|slurp|teoma|voila|yahoo|Sogou|CiBra|Nutch|^Java/|^JNLP/|Daumoa|Genieo|ichiro|larbin|pompos|Scrapy|snappy|speedy|spider|msnbot|msrbot|vortex|^vortex|crawler|favicon|indexer|Riddler|scooter|scraper|scrubby|WhatWeb|WinHTTP|bingbot|BingPreview|openbot|gigabot|furlbot|polybot|seekbot|^voyager|archiver|Icarus6j|mogimogi|Netvibes|blitzbot|altavista|charlotte|findlinks|Retreiver|TLSProber|WordPress|SeznamBot|ProoXiBot|wsr\\-agent|Squrl Java|EtaoSpider|PaperLiBot|SputnikBot|A6\\-Indexer|netresearch|searchsight|baiduspider|YisouSpider|ICC\\-Crawler|http%20client|Python-urllib|dataparksearch|converacrawler|Screaming Frog|AppEngine-Google|YahooCacheSystem|fast\\-webcrawler|Sogou Pic Spider|semanticdiscovery|Innovazion Crawler|facebookexternalhit|Google.*/\\+/web/snippet|Google-HTTP-Java-Client|BlogBridge|IlTrovatore-Setaccio|InternetArchive|GomezAgent|WebThumbnail|heritrix|NewsGator|PagePeeker|Reaper|ZooShot|holmes|NL-Crawler|Pingdom|StatusCake|WhatsApp|masscan|Google Web Preview|Qwantify)").unwrap().captures(ua) {
    let family = "Spide";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("^(1207|3gso|4thp|501i|502i|503i|504i|505i|506i|6310|6590|770s|802s|a wa|acer|acs\\-|airn|alav|asus|attw|au\\-m|aur |aus |abac|acoo|aiko|alco|alca|amoi|anex|anny|anyw|aptu|arch|argo|bmobile|bell|bird|bw\\-n|bw\\-u|beck|benq|bilb|blac|c55/|cdm\\-|chtm|capi|comp|cond|dall|dbte|dc\\-s|dica|ds\\-d|ds12|dait|devi|dmob|doco|dopo|dorado|el(?:38|39|48|49|50|55|58|68)|el[3456]\\d{2}dual|erk0|esl8|ex300|ez40|ez60|ez70|ezos|ezze|elai|emul|eric|ezwa|fake|fly\\-|fly_|g\\-mo|g1 u|g560|gf\\-5|grun|gene|go.w|good|grad|hcit|hd\\-m|hd\\-p|hd\\-t|hei\\-|hp i|hpip|hs\\-c|htc |htc\\-|htca|htcg)").unwrap().captures(ua) {
    let family = "Generic Feature Phone";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("^(htcp|htcs|htct|htc_|haie|hita|huaw|hutc|i\\-20|i\\-go|i\\-ma|i\\-mobile|i230|iac|iac\\-|iac/|ig01|im1k|inno|iris|jata|kddi|kgt|kgt/|kpt |kwc\\-|klon|lexi|lg g|lg\\-a|lg\\-b|lg\\-c|lg\\-d|lg\\-f|lg\\-g|lg\\-k|lg\\-l|lg\\-m|lg\\-o|lg\\-p|lg\\-s|lg\\-t|lg\\-u|lg\\-w|lg/k|lg/l|lg/u|lg50|lg54|lge\\-|lge/|leno|m1\\-w|m3ga|m50/|maui|mc01|mc21|mcca|medi|meri|mio8|mioa|mo01|mo02|mode|modo|mot |mot\\-|mt50|mtp1|mtv |mate|maxo|merc|mits|mobi|motv|mozz|n100|n101|n102|n202|n203|n300|n302|n500|n502|n505|n700|n701|n710|nec\\-|nem\\-|newg|neon)").unwrap().captures(ua) {
    let family = "Generic Feature Phone";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("^(netf|noki|nzph|o2 x|o2\\-x|opwv|owg1|opti|oran|ot\\-s|p800|pand|pg\\-1|pg\\-2|pg\\-3|pg\\-6|pg\\-8|pg\\-c|pg13|phil|pn\\-2|pt\\-g|palm|pana|pire|pock|pose|psio|qa\\-a|qc\\-2|qc\\-3|qc\\-5|qc\\-7|qc07|qc12|qc21|qc32|qc60|qci\\-|qwap|qtek|r380|r600|raks|rim9|rove|s55/|sage|sams|sc01|sch\\-|scp\\-|sdk/|se47|sec\\-|sec0|sec1|semc|sgh\\-|shar|sie\\-|sk\\-0|sl45|slid|smb3|smt5|sp01|sph\\-|spv |spv\\-|sy01|samm|sany|sava|scoo|send|siem|smar|smit|soft|sony|t\\-mo|t218|t250|t600|t610|t618|tcl\\-|tdg\\-|telm|tim\\-|ts70|tsm\\-|tsm3|tsm5|tx\\-9|tagt)").unwrap().captures(ua) {
    let family = "Generic Feature Phone";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("^(talk|teli|topl|tosh|up.b|upg1|utst|v400|v750|veri|vk\\-v|vk40|vk50|vk52|vk53|vm40|vx98|virg|vertu|vite|voda|vulc|w3c |w3c\\-|wapj|wapp|wapu|wapm|wig |wapi|wapr|wapv|wapy|wapa|waps|wapt|winc|winw|wonu|x700|xda2|xdag|yas\\-|your|zte\\-|zeto|aste|audi|avan|blaz|brew|brvw|bumb|ccwa|cell|cldc|cmd\\-|dang|eml2|fetc|hipt|http|ibro|idea|ikom|ipaq|jbro|jemu|jigs|keji|kyoc|kyok|libw|m\\-cr|midp|mmef|moto|mwbp|mywa|newt|nok6|o2im|pant|pdxg|play|pluc|port|prox|rozo|sama|seri|smal|symb|treo|upsi|vx52|vx53|vx60|vx61|vx70|vx80|vx81|vx83|vx85|wap\\-|webc|whit|wmlb|xda\\-|xda_)").unwrap().captures(ua) {
    let family = "Generic Feature Phone";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("^(Ice)$").unwrap().captures(ua) {
        let family = "Generic Feature Phone";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(wap[\\-\\ ]browser|maui|netfront|obigo|teleca|up\\.browser|midp|Opera Mini)")
            .unwrap()
            .captures(ua)
    {
        let family = "Generic Feature Phone";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("HbbTV/\\d+\\.\\d+\\.\\d+ \\( ;(LG)E ;NetCast 4.0")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2013";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("HbbTV/\\d+\\.\\d+\\.\\d+ \\( ;(LG)E ;NetCast 3.0")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2012";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("HbbTV/1.1.1 \\(;;;\\) Maple_2011")
        .unwrap()
        .captures(ua)
    {
        let family = "Samsung";
        let major = "2011";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("HbbTV/\\d+\\.\\d+\\.\\d+ \\(;(Samsung);SmartTV([0-9]{4});.*FXPDEUC")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = "UE40F7000";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("HbbTV/\\d+\\.\\d+\\.\\d+ \\(;(Samsung);SmartTV([0-9]{4});.*MST12DEUC")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = "UE32F4500";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("HbbTV/1.1.1 \\(; (Philips);.*NETTV/4")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2013";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("HbbTV/1.1.1 \\(; (Philips);.*NETTV/3")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2012";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("HbbTV/1.1.1 \\(; (Philips);.*NETTV/2")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2011";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("HbbTV/\\d+\\.\\d+\\.\\d+.*(firetv)-firefox-plugin (\\d+).(\\d+).(\\d+)")
            .unwrap()
            .captures(ua)
    {
        let family = "FireHbbTV";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("HbbTV/\\d+\\.\\d+\\.\\d+ \\(.*; ?([a-zA-Z]+) ?;.*(201[1-9]).*\\)")
            .unwrap()
            .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows Phone) (?:OS[ /])?(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone)[ +]+(\\d+)[_\\.](\\d+)(?:[_\\.](\\d+))?.*Outlook-iOS-Android").unwrap().captures(ua) {
    let family = "iOS";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(Android)[ \\-/](\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Android) Donut").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "1";
        let minor = "2";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Android) Eclai").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2";
        let minor = "1";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Android) Froyo").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2";
        let minor = "2";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Android) Gingerbread").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "2";
        let minor = "3";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Android) Honeycomb").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = "3";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^UCWEB.*; (Adr) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?;")
        .unwrap()
        .captures(ua)
    {
        let family = "Android";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^UCWEB.*; (iPad|iPh|iPd) OS (\\d+)_(\\d+)(?:_(\\d+))?;")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^UCWEB.*; (wds) (\\d+)\\.(\\d+)(?:\\.(\\d+))?;")
        .unwrap()
        .captures(ua)
    {
        let family = "Windows Phone";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("^(JUC).*; ?U; ?(?:Android)?(\\d+)\\.(\\d+)(?:[\\.\\-]([a-z0-9]+))?")
            .unwrap()
            .captures(ua)
    {
        let family = "Android";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Silk-Accelerated=[a-z]{4,5})")
        .unwrap()
        .captures(ua)
    {
        let family = "Android";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(XBLWP7)").unwrap().captures(ua) {
        let family = "Windows Phone";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows ?Mobile)").unwrap().captures(ua) {
        let family = "Windows Mobile";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows (?:NT 5\\.2|NT 5\\.1))")
        .unwrap()
        .captures(ua)
    {
        let family = "Windows";
        let major = "XP";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows NT 6\\.1)").unwrap().captures(ua) {
        let family = "Windows";
        let major = "7";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows NT 6\\.0)").unwrap().captures(ua) {
        let family = "Windows";
        let major = "Vista";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Win 9x 4\\.90)").unwrap().captures(ua) {
        let family = "Windows";
        let major = "ME";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows 98|Windows XP|Windows ME|Windows 95|Windows CE|Windows 7|Windows NT 4\\.0|Windows Vista|Windows 2000|Windows 3.1)").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(Windows NT 6\\.2; ARM;)")
        .unwrap()
        .captures(ua)
    {
        let family = "Windows";
        let major = "RT";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows NT 6\\.2)").unwrap().captures(ua) {
        let family = "Windows";
        let major = "8";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows NT 6\\.3; ARM;)")
        .unwrap()
        .captures(ua)
    {
        let family = "Windows";
        let major = "RT 8.1";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows NT 6\\.3)").unwrap().captures(ua) {
        let family = "Windows";
        let major = "8.1";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows NT 6\\.4)").unwrap().captures(ua) {
        let family = "Windows";
        let major = "10";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows NT 10\\.0)").unwrap().captures(ua) {
        let family = "Windows";
        let major = "10";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows NT 5\\.0)").unwrap().captures(ua) {
        let family = "Windows";
        let major = "2000";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(WinNT4.0)").unwrap().captures(ua) {
        let family = "Windows";
        let major = "NT 4.0";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows ?CE)").unwrap().captures(ua) {
        let family = "Windows";
        let major = "CE";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Win ?(95|98|3.1|NT|ME|2000)")
        .unwrap()
        .captures(ua)
    {
        let family = "Windows";
        let major = "$1";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Win16").unwrap().captures(ua) {
        let family = "Windows";
        let major = "3.1";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Win32").unwrap().captures(ua) {
        let family = "Windows";
        let major = "95";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^Box.*Windows/([\\d.]+);")
        .unwrap()
        .captures(ua)
    {
        let family = "Windows";
        let major = "$1";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Tizen)[/ ](\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("((?:Mac[ +]?|; )OS[ +]X)[\\s+/](?:(\\d+)[_.](\\d+)(?:[_.](\\d+))?|Mach-O)")
            .unwrap()
            .captures(ua)
    {
        let family = "Mac OS X";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new(" (Dar)(win)/(9).(\\d+).*\\((?:i386|x86_64|Power Macintosh)\\)")
            .unwrap()
            .captures(ua)
    {
        let family = "Mac OS X";
        let major = "10";
        let minor = "5";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (Dar)(win)/(10).(\\d+).*\\((?:i386|x86_64)\\)")
        .unwrap()
        .captures(ua)
    {
        let family = "Mac OS X";
        let major = "10";
        let minor = "6";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (Dar)(win)/(11).(\\d+).*\\((?:i386|x86_64)\\)")
        .unwrap()
        .captures(ua)
    {
        let family = "Mac OS X";
        let major = "10";
        let minor = "7";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (Dar)(win)/(12).(\\d+).*\\((?:i386|x86_64)\\)")
        .unwrap()
        .captures(ua)
    {
        let family = "Mac OS X";
        let major = "10";
        let minor = "8";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new(" (Dar)(win)/(13).(\\d+).*\\((?:i386|x86_64)\\)")
        .unwrap()
        .captures(ua)
    {
        let family = "Mac OS X";
        let major = "10";
        let minor = "9";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Mac_PowerPC").unwrap().captures(ua) {
        let family = "Mac OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(?:PPC|Intel) (Mac OS X)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^Box.*;(Darwin)/(10)\\.(1\\d)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Mac OS X";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Apple\\s?TV)(?:/(\\d+)\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "ATV OS X";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(\\d+)[_\\.](\\d+)(?:[_\\.](\\d+))?").unwrap().captures(ua) {
    let family = "iOS";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(iPhone|iPad|iPod); Opera")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)/(5)48\\.0\\.3.* Darwin/11\\.0\\.0")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)/(5)48\\.(0)\\.4.* Darwin/(1)1\\.0\\.0")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)/(5)48\\.(1)\\.4")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)/(4)85\\.1(3)\\.9")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)/(6)09\\.(1)\\.4")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)/(6)(0)9").unwrap().captures(ua) {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)/6(7)2\\.(1)\\.13")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)/6(7)2\\.(1)\\.(1)4")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CF)(Network)/6(7)(2)\\.1\\.15")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "7";
        let minor = "1";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)/6(7)2\\.(0)\\.(?:2|8)")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CFNetwork)/709\\.1").unwrap().captures(ua) {
        let family = "iOS";
        let major = "8";
        let minor = "0.b5";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CF)(Network)/711\\.(\\d)")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "8";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CF)(Network)/(720)\\.(\\d)")
        .unwrap()
        .captures(ua)
    {
        let family = "Mac OS X";
        let major = "10";
        let minor = "10";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CF)(Network)/(760)\\.(\\d)")
        .unwrap()
        .captures(ua)
    {
        let family = "Mac OS X";
        let major = "10";
        let minor = "11";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CF)(Network)/758\\.(\\d)")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "9";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CF)(Network)/808\\.(\\d)")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "10";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/.* Darwin/16\\.\\d+.*\\(x86_64\\)")
        .unwrap()
        .captures(ua)
    {
        let family = "Mac OS X";
        let major = "10";
        let minor = "12";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/8.* Darwin/15\\.\\d+.*\\(x86_64\\)")
        .unwrap()
        .captures(ua)
    {
        let family = "Mac OS X";
        let major = "10";
        let minor = "11";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/.* Darwin/(9)\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "1";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/.* Darwin/(10)\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "4";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/.* Darwin/(11)\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "5";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/.* Darwin/(13)\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "6";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/6.* Darwin/(14)\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "7";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/7.* Darwin/(14)\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "8";
        let minor = "0";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/7.* Darwin/(15)\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "9";
        let minor = "0";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/8.* Darwin/16\\.5\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "10";
        let minor = "3";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/8.* Darwin/16\\.6\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "10";
        let minor = "3";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/8.* Darwin/16\\.7\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "10";
        let minor = "3";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/8.* Darwin/(16)\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "10";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/8.* Darwin/17\\.0\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "11";
        let minor = "0";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/8.* Darwin/17\\.2\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "11";
        let minor = "1";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/8.* Darwin/17\\.3\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "11";
        let minor = "2";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("CFNetwork/8.* Darwin/(17)\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "iOS";
        let major = "11";
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(iOS[ /]|iOS; |iPhone(?:/| v|[ _]OS[/,]|; | OS : |\\d,\\d/|\\d,\\d; )|iPad/)(\\d{1,2})[_\\.](\\d{1,2})(?:[_\\.](\\d+))?").unwrap().captures(ua) {
    let family = "iOS";
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("\\((iOS);").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(tvOS)/(\\d+).(\\d+)").unwrap().captures(ua) {
        let family = "tvOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "Chrome OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("([Dd]ebian)").unwrap().captures(ua) {
        let family = "Debian";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Linux Mint)(?:/(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Mandriva)(?: Linux)?/(?:[\\d.-]+m[a-z]{2}(\\d+).(\\d))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Symbian[Oo][Ss])[/ ](\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Symbian OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Symbian/3).+NokiaBrowser/7\\.3")
        .unwrap()
        .captures(ua)
    {
        let family = "Symbian^3 Anna";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Symbian/3).+NokiaBrowser/7\\.4")
        .unwrap()
        .captures(ua)
    {
        let family = "Symbian^3 Belle";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Symbian/3)").unwrap().captures(ua) {
        let family = "Symbian^3";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\b(Series 60|SymbOS|S60Version|S60V\\d|S60\\b)")
        .unwrap()
        .captures(ua)
    {
        let family = "Symbian OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(MeeGo)").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Symbian [Oo][Ss]").unwrap().captures(ua) {
        let family = "Symbian OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Series40;").unwrap().captures(ua) {
        let family = "Nokia Series 40";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("Series30Plus;").unwrap().captures(ua) {
        let family = "Nokia Series 30 Plus";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(BB10);.+Version/(\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "BlackBerry OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
            .unwrap()
            .captures(ua)
    {
        let family = "BlackBerry OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) =
        Regex::new("(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
            .unwrap()
            .captures(ua)
    {
        let family = "BlackBerry OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(RIM Tablet OS) (\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "BlackBerry Tablet OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Play[Bb]ook)").unwrap().captures(ua) {
        let family = "BlackBerry Tablet OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Black[Bb]erry)").unwrap().captures(ua) {
        let family = "BlackBerry OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\((?:Mobile|Tablet);.+Gecko/18.0 Firefox/\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox OS";
        let major = "1";
        let minor = "0";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\((?:Mobile|Tablet);.+Gecko/18.1 Firefox/\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox OS";
        let major = "1";
        let minor = "1";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\((?:Mobile|Tablet);.+Gecko/26.0 Firefox/\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox OS";
        let major = "1";
        let minor = "2";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\((?:Mobile|Tablet);.+Gecko/28.0 Firefox/\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox OS";
        let major = "1";
        let minor = "3";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\((?:Mobile|Tablet);.+Gecko/30.0 Firefox/\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox OS";
        let major = "1";
        let minor = "4";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\((?:Mobile|Tablet);.+Gecko/32.0 Firefox/\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox OS";
        let major = "2";
        let minor = "0";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\((?:Mobile|Tablet);.+Gecko/34.0 Firefox/\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox OS";
        let major = "2";
        let minor = "1";
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\((?:Mobile|Tablet);.+Firefox/\\d+\\.\\d+")
        .unwrap()
        .captures(ua)
    {
        let family = "Firefox OS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(BREW)[ /](\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(BREW);").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Brew MP|BMP)[ /](\\d+)\\.(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = "Brew MP";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("BMP;").unwrap().captures(ua) {
        let family = "Brew MP";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(GoogleTV)(?: (\\d+)\\.(\\d+)(?:\\.(\\d+))?|/[\\da-z]+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(WebTV)/(\\d+).(\\d+)").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(CrKey)(?:[/](\\d+)\\.(\\d+)(?:\\.(\\d+))?)?")
        .unwrap()
        .captures(ua)
    {
        let family = "Chromecast";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(hpw|web)OS/(\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = "webOS";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(VRE);").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Fedora|Red Hat|PCLinuxOS|Puppy|Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Slackware|(?:Free|Open|Net|\\b)BSD)[/ ](\\d+)\\.(\\d+)(?:\\.(\\d+)(?:\\.(\\d+))?)?").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(Linux)[ /](\\d+)\\.(\\d+)(?:\\.(\\d+))?.*gentoo")
        .unwrap()
        .captures(ua)
    {
        let family = "Gentoo";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("\\((Bada);").unwrap().captures(ua) {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Windows|Android|WeTab|Maemo|Web0S)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(Ubuntu|Kubuntu|Arch Linux|CentOS|Slackware|Gentoo|openSUSE|SUSE|Red Hat|Fedora|PCLinuxOS|Mageia|(?:Free|Open|Net|\\b)BSD)").unwrap().captures(ua) {
    let family = result.get(0).map_or_else(|| "", Into::<&str>::into);
    let major = result.get(1).map_or_else(|| "0", Into::<&str>::into);
    let minor = result.get(2).map_or_else(|| "0", Into::<&str>::into);
    let patch = result.get(3).map_or_else(|| "0", Into::<&str>::into);
    return [family.to_owned(),major.to_owned(),minor.to_owned(), patch.to_owned()];
}
    if let Some(result) = Regex::new("(Linux)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+))?)?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("SunOS").unwrap().captures(ua) {
        let family = "Solaris";
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("^(Roku)/DVP-(\\d+)\\.(\\d+)")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);
        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    if let Some(result) = Regex::new("(iOS) (\\d+)\\.(\\d+)(?:\\.(\\d+))?")
        .unwrap()
        .captures(ua)
    {
        let family = result
            .get(0).map_or_else(|| "", Into::<&str>::into);
        let major = result
            .get(1).map_or_else(|| "0", Into::<&str>::into);
        let minor = result
            .get(2).map_or_else(|| "0", Into::<&str>::into);
        let patch = result
            .get(3).map_or_else(|| "0", Into::<&str>::into);

        return [
            family.to_owned(),
            major.to_owned(),
            minor.to_owned(),
            patch.to_owned(),
        ];
    }
    [String::new(), String::new(), String::new(), String::new()]
}

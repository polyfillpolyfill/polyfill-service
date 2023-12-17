use regex::Regex;

#[must_use] pub fn useragent(ua: &str) -> [String; 4] {
    let family = "Other".to_owned();
    let major = "0".to_owned();
    let minor = "0".to_owned();
    let patch = "0".to_owned();
    if let Some(result) = Regex::new(r"Opera\/9\.80 \(.+(Opera Mini)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                Into::<&str>::into(r).to_string()
            },
            None => {
                "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Opera\/9\.80 \(.+(Opera Mini)\/(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                Into::<&str>::into(r).to_string()
            },
            None => {
                "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/525\.18(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "3".to_owned();
        let minor="1".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/528\.18(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "4".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/531\.21(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "4".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/532\.9(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "4".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/532\+").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "5".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/533\.17(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "5".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/534\.12(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "5".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/534\.46(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "5".to_owned();
        let minor="1".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/536\.26(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "6".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/537\.51(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "7".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/600\.1(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "8".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/601\.1(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "9".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/601\.5(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "9".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/602\.1(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "10".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/602\.2(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "10".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/602\.3(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "10".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/602\.4(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "10".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/603\.1(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "10".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/603\.2(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "10".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/604\.1(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "11".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/604\.2(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "11".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/604\.3(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "11".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/604\.5(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "11".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/605\.1(?:\.\d+|) \(KHTML, like Gecko\) Version\/(\d+)\.?(\d+)?\.?(\d+)?.+?Mobile\/\w+\s(Safari)").unwrap().captures(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                Into::<&str>::into(r).to_string()
            },
            None => {
                "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(iPod|iPhone|iPad).+OS (\d+)_(\d+) like Mac OS X\) AppleWebKit\/605\.1(?:\.\d+|) \(KHTML, like Gecko\) Mobile\/\w+").unwrap().captures(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/605\.1(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "11".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/606\.1(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "12".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/607\.1(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "12".to_owned();
        let minor="1".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).+AppleWebKit\/608\.2(?:\.\d+|)").unwrap().is_match(ua) {
        let family = "Mobile Safari/WKWebView".to_owned();
        let major = "13".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MQQBrowser\/Mini)(?:(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = "QQ Browser Mini".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MQQBrowser)(?:\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = "QQ Browser Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(QQBrowser)(?:\/(\d+)(?:\.(\d+)\.(\d+)(?:\.(\d+)|)|)|)").unwrap().captures(ua) {
        let family = "QQ Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(ESPN)[%20| ]+Radio\/(\d+)\.(\d+)\.(\d+) CFNetwork").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Antenna)\/(\d+) CFNetwork").unwrap().captures(ua) {
        let family = "AntennaPod".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(TopPodcasts)Pro\/(\d+) CFNetwork").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MusicDownloader)Lite\/(\d+)\.(\d+)\.(\d+) CFNetwork").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(.*)-iPad\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|) CFNetwork").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(.*)-iPhone\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|) CFNetwork").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(.*)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|) CFNetwork").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(espn\.go)").unwrap().is_match(ua) {
        let family = "ESPN".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(espnradio\.com)").unwrap().is_match(ua) {
        let family = "ESPN".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"ESPN APP$").unwrap().is_match(ua) {
        let family = "ESPN".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(audioboom\.com)").unwrap().is_match(ua) {
        let family = "AudioBoom".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r" (Rivo) RHYTHM").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(CFNetwork)(?:\/(\d+)\.(\d+)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = "CFNetwork".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Pingdom\.com_bot_version_)(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "PingdomBot".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(PingdomTMS)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "PingdomBot".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r" (PTST)\/(\d+)(?:\.(\d+)|)$").unwrap().captures(ua) {
        let family = "WebPageTest.org bot".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"X11; (Datanyze); Linux").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(NewRelicPinger)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "NewRelicPingerBot".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Tableau)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Tableau".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Salesforce)(?:.)\/(\d+)\.(\d?)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(\(StatusCake\))").unwrap().is_match(ua) {
        let family = "StatusCakeBot".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(facebookexternalhit)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "FacebookBot".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if Regex::new(r"Google.*\/\+\/web\/snippet").unwrap().is_match(ua) {
        let family = "GooglePlusBot".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"via ggpht\.com GoogleImageProxy").unwrap().is_match(ua) {
        let family = "GmailImageProxy".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"YahooMailProxy; https:\/\/help\.yahoo\.com\/kb\/yahoo-mail-proxy-SLN28749\.html").unwrap().is_match(ua) {
        let family = "YahooMailProxy".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Twitterbot)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Twitterbot".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"\/((?:Ant-|)Nutch|[A-z]+[Bb]ot|[A-z]+[Ss]pider|Axtaris|fetchurl|Isara|ShopSalad|Tailsweep)[ \-](\d+)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"\b(008|Altresium|Argus|BaiduMobaider|BoardReader|DNSGroup|DataparkSearch|EDI|Goodzer|Grub|INGRID|Infohelfer|LinkedInBot|LOOQ|Nutch|OgScrper|PathDefender|Peew|PostPost|Steeler|Twitterbot|VSE|WebCrunch|WebZIP|Y!J-BR[A-Z]|YahooSeeker|envolk|sproose|wminer)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MSIE) (\d+)\.(\d+)([a-z]\d|[a-z]|);.* MSIECrawler").unwrap().captures(ua) {
        let family = "MSIECrawler".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(DAVdroid)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Google-HTTP-Java-Client|Apache-HttpClient|Go-http-client|scalaj-http|http%20client|Python-urllib|HttpMonitor|TLSProber|WinHTTP|JNLP|okhttp|aihttp|reqwest|axios|unirest-(?:java|python|ruby|nodejs|php|net))(?:[ /](\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Pinterest(?:bot|))\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)[;\s(]+\+https:\/\/www.pinterest.com\/bot.html").unwrap().captures(ua) {
        let family = "Pinterestbot".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(CSimpleSpider|Cityreview Robot|CrawlDaddy|CrawlFire|Finderbots|Index crawler|Job Roboter|KiwiStatus Spider|Lijit Crawler|QuerySeekerSpider|ScollSpider|Trends Crawler|USyd-NLP-Spider|SiteCat Webbot|BotName\/\$BotVersion|123metaspider-Bot|1470\.net crawler|50\.nu|8bo Crawler Bot|Aboundex|Accoona-[A-z]{1,30}-Agent|AdsBot-Google(?:-[a-z]{1,30}|)|altavista|AppEngine-Google|archive.{0,30}\.org_bot|archiver|Ask Jeeves|[Bb]ai[Dd]u[Ss]pider(?:-[A-Za-z]{1,30})(?:-[A-Za-z]{1,30}|)|bingbot|BingPreview|blitzbot|BlogBridge|Bloglovin|BoardReader Blog Indexer|BoardReader Favicon Fetcher|boitho.com-dc|BotSeer|BUbiNG|\b\w{0,30}favicon\w{0,30}\b|\bYeti(?:-[a-z]{1,30}|)|Catchpoint(?: bot|)|[Cc]harlotte|Checklinks|clumboot|Comodo HTTP\(S\) Crawler|Comodo-Webinspector-Crawler|ConveraCrawler|CRAWL-E|CrawlConvera|Daumoa(?:-feedfetcher|)|Feed Seeker Bot|Feedbin|findlinks|Flamingo_SearchEngine|FollowSite Bot|furlbot|Genieo|gigabot|GomezAgent|gonzo1|(?:[a-zA-Z]{1,30}-|)Googlebot(?:-[a-zA-Z]{1,30}|)|Google SketchUp|grub-client|gsa-crawler|heritrix|HiddenMarket|holmes|HooWWWer|htdig|ia_archiver|ICC-Crawler|Icarus6j|ichiro(?:\/mobile|)|IconSurf|IlTrovatore(?:-Setaccio|)|InfuzApp|Innovazion Crawler|InternetArchive|IP2[a-z]{1,30}Bot|jbot\b|KaloogaBot|Kraken|Kurzor|larbin|LEIA|LesnikBot|Linguee Bot|LinkAider|LinkedInBot|Lite Bot|Llaut|lycos|Mail\.RU_Bot|masscan|masidani_bot|Mediapartners-Google|Microsoft .{0,30} Bot|mogimogi|mozDex|MJ12bot|msnbot(?:-media {0,2}|)|msrbot|Mtps Feed Aggregation System|netresearch|Netvibes|NewsGator[^/]{0,30}|^NING|Nutch[^/]{0,30}|Nymesis|ObjectsSearch|OgScrper|Orbiter|OOZBOT|PagePeeker|PagesInventory|PaxleFramework|Peeplo Screenshot Bot|PlantyNet_WebRobot|Pompos|Qwantify|Read%20Later|Reaper|RedCarpet|Retreiver|Riddler|Rival IQ|scooter|Scrapy|Scrubby|searchsight|seekbot|semanticdiscovery|SemrushBot|Simpy|SimplePie|SEOstats|SimpleRSS|SiteCon|Slackbot-LinkExpanding|Slack-ImgProxy|Slurp|snappy|Speedy Spider|Squrl Java|Stringer|TheUsefulbot|ThumbShotsBot|Thumbshots\.ru|Tiny Tiny RSS|Twitterbot|WhatsApp|URL2PNG|Vagabondo|VoilaBot|^vortex|Votay bot|^voyager|WASALive.Bot|Web-sniffer|WebThumb|WeSEE:[A-z]{1,30}|WhatWeb|WIRE|WordPress|Wotbox|www\.almaden\.ibm\.com|Xenu(?:.s|) Link Sleuth|Xerka [A-z]{1,30}Bot|yacy(?:bot|)|YahooSeeker|Yahoo! Slurp|Yandex\w{1,30}|YodaoBot(?:-[A-z]{1,30}|)|YottaaMonitor|Yowedo|^Zao|^Zao-Crawler|ZeBot_www\.ze\.bz|ZooShot|ZyBorg)(?:[ /]v?(\d+)(?:\.(\d+)(?:\.(\d+)|)|)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"\b(Boto3?|JetS3t|aws-(?:cli|sdk-(?:cpp|go|java|nodejs|ruby2?|dotnet-(?:\d{1,2}|core)))|s3fs)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"\[(FBAN\/MessengerForiOS|FB_IAB\/MESSENGER);FBAV\/(\d+)(?:\.(\d+)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = "Facebook Messenger".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"\[FB.*;(FBAV)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Facebook".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if Regex::new(r"\[FB.*;").unwrap().is_match(ua) {
        let family = "Facebook".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(?:\/[A-Za-z0-9\.]+|) {0,5}([A-Za-z0-9 \-_\!\[\]:]{0,50}(?:[Aa]rchiver|[Ii]ndexer|[Ss]craper|[Bb]ot|[Ss]pider|[Cc]rawl[a-z]{0,50}))[/ ](\d+)(?:\.(\d+)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"((?:[A-Za-z][A-Za-z0-9 -]{0,50}|)[^C][^Uu][Bb]ot)\b(?:(?:[ /]| v)(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"((?:[A-z0-9]{1,50}|[A-z\-]{1,50} ?|)(?: the |)(?:[Ss][Pp][Ii][Dd][Ee][Rr]|[Ss]crape|[Cc][Rr][Aa][Ww][Ll])[A-z0-9]{0,50})(?:(?:[ /]| v)(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(HbbTV)\/(\d+)\.(\d+)\.(\d+) \(").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Chimera|SeaMonkey|Camino|Waterfox)\/(\d+)\.(\d+)\.?([ab]?\d+[a-z]*|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(SailfishBrowser)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Sailfish Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"\[(Pinterest)\/[^\]]+\]").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Pinterest)(?: for Android(?: Tablet|)|)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Mozilla.*Mobile.*(Instagram).(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Mozilla.*Mobile.*(Flipboard).(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Mozilla.*Mobile.*(Flipboard-Briefing).(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Mozilla.*Mobile.*(Onefootball)\/Android.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Snapchat)\/(\d+)\.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Firefox)\/(\d+)\.(\d+) Basilisk\/(\d+)").unwrap().captures(ua) {
        let family = "Basilisk".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(PaleMoon)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Pale Moon".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Fennec)\/(\d+)\.(\d+)\.?([ab]?\d+[a-z]*)").unwrap().captures(ua) {
        let family = "Firefox Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Fennec)\/(\d+)\.(\d+)(pre)").unwrap().captures(ua) {
        let family = "Firefox Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Fennec)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Firefox Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(?:Mobile|Tablet);.*(Firefox)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Firefox Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Namoroka|Shiretoko|Minefield)\/(\d+)\.(\d+)\.(\d+(?:pre|))").unwrap().captures(ua) {
        let family = "Firefox ($1)".replace("$1", result.get(1).unwrap().into());
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Firefox)\/(\d+)\.(\d+)(a\d+[a-z]*)").unwrap().captures(ua) {
        let family = "Firefox Alpha".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Firefox)\/(\d+)\.(\d+)(b\d+[a-z]*)").unwrap().captures(ua) {
        let family = "Firefox Beta".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Firefox)-(?:\d+\.\d+|)\/(\d+)\.(\d+)(a\d+[a-z]*)").unwrap().captures(ua) {
        let family = "Firefox Alpha".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Firefox)-(?:\d+\.\d+|)\/(\d+)\.(\d+)(b\d+[a-z]*)").unwrap().captures(ua) {
        let family = "Firefox Beta".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Namoroka|Shiretoko|Minefield)\/(\d+)\.(\d+)([ab]\d+[a-z]*|)").unwrap().captures(ua) {
        let family = "Firefox ($1)".replace("$1", result.get(1).unwrap().into());
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Firefox).*Tablet browser (\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "MicroB".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MozillaDeveloperPreview)\/(\d+)\.(\d+)([ab]\d+[a-z]*|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(FxiOS)\/(\d+)\.(\d+)(\.(\d+)|)(\.(\d+)|)").unwrap().captures(ua) {
        let family = "Firefox iOS".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Flock)\/(\d+)\.(\d+)(b\d+?)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(RockMelt)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Navigator)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Netscape".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Navigator)\/(\d+)\.(\d+)([ab]\d+)").unwrap().captures(ua) {
        let family = "Netscape".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Netscape6)\/(\d+)\.(\d+)\.?([ab]?\d+|)").unwrap().captures(ua) {
        let family = "Netscape".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MyIBrow)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "My Internet Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(UC? ?Browser|UCWEB|U3)[ /]?(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "UC Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Opera Tablet).*Version\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Opera Mini)(?:\/att|)\/?(\d+|)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Opera)\/.+Opera Mobi.+Version\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Opera Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Opera)\/(\d+)\.(\d+).+Opera Mobi").unwrap().captures(ua) {
        let family = "Opera Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Opera Mobi.+(Opera)(?:\/|\s+)(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Opera Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if Regex::new(r"Opera Mobi").unwrap().is_match(ua) {
        let family = "Opera Mobile".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Opera)\/9.80.*Version\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(?:Mobile Safari).*(OPR)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Opera Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(?:Chrome).*(OPR)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Opera".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Coast)\/(\d+).(\d+).(\d+)").unwrap().captures(ua) {
        let family = "Opera Coast".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(OPiOS)\/(\d+).(\d+).(\d+)").unwrap().captures(ua) {
        let family = "Opera Mini".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Chrome\/.+( MMS)\/(\d+).(\d+).(\d+)").unwrap().captures(ua) {
        let family = "Opera Neon".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(hpw|web)OS\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "webOS Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"(luakit)").unwrap().is_match(ua) {
        let family = "LuaKit".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Snowshoe)\/(\d+)\.(\d+).(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Gecko\/\d+ (Lightning)\/(\d+)\.(\d+)\.?((?:[ab]?\d+[a-z]*)|(?:\d*))").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Firefox)\/(\d+)\.(\d+)\.(\d+(?:pre|)) \(Swiftfox\)").unwrap().captures(ua) {
        let family = "Swiftfox".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Firefox)\/(\d+)\.(\d+)([ab]\d+[a-z]*|) \(Swiftfox\)").unwrap().captures(ua) {
        let family = "Swiftfox".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(rekonq)\/(\d+)\.(\d+)(?:\.(\d+)|) Safari").unwrap().captures(ua) {
        let family = "Rekonq".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"rekonq").unwrap().is_match(ua) {
        let family = "Rekonq".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(conkeror|Conkeror)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Conkeror".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(konqueror)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Konqueror".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(WeTab)-Browser").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Comodo_Dragon)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Comodo Dragon".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Symphony) (\d+).(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"PLAYSTATION 3.+WebKit").unwrap().is_match(ua) {
        let family = "NetFront NX".to_owned();
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"PLAYSTATION 3").unwrap().is_match(ua) {
        let family = "NetFront".to_owned();
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"(PlayStation Portable)").unwrap().is_match(ua) {
        let family = "NetFront".to_owned();
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"(PlayStation Vita)").unwrap().is_match(ua) {
        let family = "NetFront NX".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"AppleWebKit.+ (NX)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "NetFront NX".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"(Nintendo 3DS)").unwrap().is_match(ua) {
        let family = "NetFront NX".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Silk)\/(\d+)\.(\d+)(?:\.([0-9\-]+)|)").unwrap().captures(ua) {
        let family = "Amazon Silk".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Puffin)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Windows Phone .*(Edge)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Edge Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(SamsungBrowser)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Samsung Internet".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(SznProhlizec)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Seznam prohlížeč".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(coc_coc_browser)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Coc Coc".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(baidubrowser)[/\s](\d+)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Baidu Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(FlyFlow)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Baidu Explorer".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MxBrowser)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Maxthon".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Crosswalk)\/(\d+)\.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Line)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "LINE".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MiuiBrowser)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "MiuiBrowser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Mint Browser)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Mint Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Mozilla.+Android.+(GSA)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Google".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Version\/.+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Chrome Mobile WebView".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"; wv\).+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Chrome Mobile WebView".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(CrMo)\/(\d+)\.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Chrome Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(CriOS)\/(\d+)\.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Chrome Mobile iOS".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+) Mobile(?:[ /]|$)").unwrap().captures(ua) {
        let family = "Chrome Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r" Mobile .*(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Chrome Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(chromeframe)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Chrome Frame".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(SLP Browser)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Tizen Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(SE 2\.X) MetaSr (\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Sogou Explorer".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MQQBrowser\/Mini)(?:(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = "QQ Browser Mini".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MQQBrowser)(?:\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = "QQ Browser Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(QQBrowser)(?:\/(\d+)(?:\.(\d+)\.(\d+)(?:\.(\d+)|)|)|)").unwrap().captures(ua) {
        let family = "QQ Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Rackspace Monitoring)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "RackspaceBot".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(PyAMF)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(YaBrowser)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Yandex Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Chrome)\/(\d+)\.(\d+)\.(\d+).* MRCHROME").unwrap().captures(ua) {
        let family = "Mail.ru Chromium Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(AOL) (\d+)\.(\d+); AOLBuild (\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(PodCruncher|Downcast)[ /]?(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r" (BoxNotes)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Whale)\/(\d+)\.(\d+)\.(\d+)\.(\d+) Mobile(?:[ /]|$)").unwrap().captures(ua) {
        let family = "Whale".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Whale)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Whale".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Ghost)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Slack_SSB)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Slack Desktop Client".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(HipChat)\/?(\d+|)").unwrap().captures(ua) {
        let family = "HipChat Desktop Client".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"\b(MobileIron|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Epiphany|Shiira|Sunrise|Spotify|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iris|UP\.Browser|Bunjalloo|Google Earth|Raven for Mac|Openwave|MacOutlook|Electron|OktaMobile)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if Regex::new(r"Microsoft Office Outlook 12\.\d+\.\d+|MSOffice 12").unwrap().is_match(ua) {
        let family = "Outlook".to_owned();
        let major = "2007".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"Microsoft Outlook 14\.\d+\.\d+|MSOffice 14").unwrap().is_match(ua) {
        let family = "Outlook".to_owned();
        let major = "2010".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"Microsoft Outlook 15\.\d+\.\d+").unwrap().is_match(ua) {
        let family = "Outlook".to_owned();
        let major = "2013".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"Microsoft Outlook (?:Mail )?16\.\d+\.\d+|MSOffice 16").unwrap().is_match(ua) {
        let family = "Outlook".to_owned();
        let major = "2016".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"Microsoft Office (Word) 2014").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"Outlook-Express\/7\.0.*").unwrap().is_match(ua) {
        let family = "Windows Live Mail".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Airmail) (\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Thunderbird)\/(\d+)\.(\d+)(?:\.(\d+(?:pre|))|)").unwrap().captures(ua) {
        let family = "Thunderbird".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Postbox)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Postbox".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Barca(?:Pro)?)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Barca".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Lotus-Notes)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Lotus Notes".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Vivaldi)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Edge?)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Edge".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(brave)\/(\d+)\.(\d+)\.(\d+) Chrome").unwrap().captures(ua) {
        let family = "Brave".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Chrome)\/(\d+)\.(\d+)\.(\d+)[\d.]* Iron[^/]").unwrap().captures(ua) {
        let family = "Iron".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"\b(Dolphin)(?: |HDCN\/|\/INT\-)(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(HeadlessChrome)(?:\/(\d+)\.(\d+)\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Evolution)\/(\d+)\.(\d+)\.(\d+\.\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(RCM CardDAV plugin)\/(\d+)\.(\d+)\.(\d+(?:-dev|))").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(bingbot|Bolt|AdobeAIR|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|iTunes|MacAppStore|NetNewsWire|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris|Abrowser|Planetweb|ICE Browser|mDolphin|qutebrowser|Otter|QupZilla|MailBar|kmail2|YahooMobileMail|ExchangeWebServices|ExchangeServicesClient|Dragon|Outlook-iOS-Android)\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Chromium|Chrome)\/(\d+)\.(\d+)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(IEMobile)[ /](\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "IE Mobile".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(BacaBerita App)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(bPod|Pocket Casts|Player FM)$").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(AlexaMediaPlayer|VLC)\/(\d+)\.(\d+)\.([^.\s]+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(AntennaPod|WMPlayer|Zune|Podkicker|Radio|ExoPlayerDemo|Overcast|PocketTunes|NSPlayer|okhttp|DoggCatcher|QuickNews|QuickTime|Peapod|Podcasts|GoldenPod|VLC|Spotify|Miro|MediaGo|Juice|iPodder|gPodder|Banshee)\/(\d+)\.(\d+)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(Peapod|Liferea)\/([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(bPod|Player FM) BMID\/(\S+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(Podcast ?Addict)\/v(\d+) ").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"^(Podcast ?Addict) ").unwrap().is_match(ua) {
        let family = "PodcastAddict".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Replay) AV").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(VOX) Music Player").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(CITA) RSS Aggregator\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Pocket Casts)$").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Player FM)$").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(LG Player|Doppler|FancyMusic|MediaMonkey|Clementine) (\d+)\.(\d+)\.?([^.\s]+|)\.?([^.\s]+|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(philpodder)\/(\d+)\.(\d+)\.?([^.\s]+|)\.?([^.\s]+|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Player FM|Pocket Casts|DoggCatcher|Spotify|MediaMonkey|MediaGo|BashPodder)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(QuickTime)\.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Kinoma)(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Fancy) Cloud Music (\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "FancyMusic".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"EspnDownloadManager").unwrap().is_match(ua) {
        let family = "ESPN".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(ESPN) Radio (\d+)\.(\d+)(?:\.(\d+)|) ?(?:rv:(\d+)|) ").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(podracer|jPodder) v ?(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(ZDM)\/(\d+)\.(\d+)[; ]?").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Zune|BeyondPod) (\d+)(?:\.(\d+)|)[\);]").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(WMPlayer)\/(\d+)\.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"^(Lavf)").unwrap().is_match(ua) {
        let family = "WMPlayer".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(RSSRadio)[ /]?(\d+|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(RSS_Radio) (\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "RSSRadio".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Podkicker) \S+\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Podkicker".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(HTC) Streaming Player \S+ \/ \S+ \/ \S+ \/ (\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(Stitcher)\/iOS").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(Stitcher)\/Android").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(VLC) .*version (\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r" (VLC) for").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(vlc)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "VLC".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(foobar)\S+\/([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(Clementine)\S+ ([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(amarok)\/([^.\s]+)\.([^.\s]+|)\.?([^.\s]+|)").unwrap().captures(ua) {
        let family = "Amarok".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Custom)-Feed Reader").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(iCab|Lunascape|Opera|Android|Jasmine|Polaris|Microsoft SkyDriveSync|The Bat!) (\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Kindle)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Android) Donut").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = "1".to_owned();
        let minor="2".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Android) Eclair").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = "2".to_owned();
        let minor="1".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Android) Froyo").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = "2".to_owned();
        let minor="2".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Android) Gingerbread").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = "2".to_owned();
        let minor="3".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Android) Honeycomb").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = "3".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MSIE) (\d+)\.(\d+).*XBLWP7").unwrap().captures(ua) {
        let family = "IE Large Screen".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Nextcloud)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(mirall)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(ownCloud-android)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Owncloud".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(OC)\/(\d+)\.(\d+)\.(\d+)\.(\d+) \(Skype for Business\)").unwrap().captures(ua) {
        let family = "Skype".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Obigo)InternetBrowser").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Obigo)\-Browser").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Obigo|OBIGO)[^\d]*(\d+)(?:.(\d+)|)").unwrap().captures(ua) {
        let family = "Obigo".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(MAXTHON|Maxthon) (\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Maxthon".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Maxthon|MyIE2|Uzbl|Shiira)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = "0".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(BrowseX) \((\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(NCSA_Mosaic)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "NCSA Mosaic".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(POLARIS)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Polaris".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Embider)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Polaris".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(BonEcho)\/(\d+)\.(\d+)\.?([ab]?\d+|)").unwrap().captures(ua) {
        let family = "Bon Echo".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(iPod|iPhone|iPad).+GSA\/(\d+)\.(\d+)\.(\d+) Mobile").unwrap().captures(ua) {
        let family = "Google".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(iPod|iPhone|iPad).+Version\/(\d+)\.(\d+)(?:\.(\d+)|).*[ +]Safari").unwrap().captures(ua) {
        let family = "Mobile Safari".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+)|).* AppleNews\/\d+\.\d+\.\d+?").unwrap().captures(ua) {
        let family = "Mobile Safari UI/WKWebView".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(iPod|iPhone|iPad).+Version\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = "Mobile Safari UI/WKWebView".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+)|).*Mobile.*[ +]Safari").unwrap().captures(ua) {
        let family = "Mobile Safari".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\d+)_(\d+)(?:_(\d+)|).*Mobile").unwrap().captures(ua) {
        let family = "Mobile Safari UI/WKWebView".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad).* Safari").unwrap().is_match(ua) {
        let family = "Mobile Safari".to_owned();
        return [ family, major, minor, patch ];
    } else if Regex::new(r"(iPod|iPhone|iPad)").unwrap().is_match(ua) {
        let family = "Mobile Safari UI/WKWebView".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Watch)(\d+),(\d+)").unwrap().captures(ua) {
        let family = "Apple $1 App".replace("$1", result.get(1).unwrap().into());
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Outlook-iOS)\/\d+\.\d+\.prod\.iphone \((\d+)\.(\d+)\.(\d+)\)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(AvantGo) (\d+).(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(OneBrowser)\/(\d+).(\d+)").unwrap().captures(ua) {
        let family = "ONE Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Avant)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = "1".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(QtCarBrowser)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = "1".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(iBrowser\/Mini)(\d+).(\d+)").unwrap().captures(ua) {
        let family = "iBrowser Mini".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(iBrowser|iRAPP)\/(\d+).(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"^(Nokia)").unwrap().is_match(ua) {
        let family = "Nokia Services (WAP) Browser".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(NokiaBrowser)\/(\d+)\.(\d+).(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Nokia Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(NokiaBrowser)\/(\d+)\.(\d+).(\d+)").unwrap().captures(ua) {
        let family = "Nokia Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(NokiaBrowser)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Nokia Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(BrowserNG)\/(\d+)\.(\d+).(\d+)").unwrap().captures(ua) {
        let family = "Nokia Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"(Series60)\/5\.0").unwrap().is_match(ua) {
        let family = "Nokia Browser".to_owned();
        let major = "7".to_owned();
        let minor="0".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Series60)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Nokia OSS Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(S40OviBrowser)\/(\d+)\.(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Ovi Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Nokia)[EN]?(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(PlayBook).+RIM Tablet OS (\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "BlackBerry WebKit".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Black[bB]erry|BB10).+Version\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "BlackBerry WebKit".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Black[bB]erry)\s?(\d+)").unwrap().captures(ua) {
        let family = "BlackBerry".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(OmniWeb)\/v(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Blazer)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Palm Blazer".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Pre)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Palm Pre".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(ELinks)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(ELinks) \((\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Links) \((\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(QtWeb) Internet Browser\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(PhantomJS)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(AppleWebKit)\/(\d+)(?:\.(\d+)|)\+ .* Safari").unwrap().captures(ua) {
        let family = "WebKit Nightly".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Version)\/(\d+)\.(\d+)(?:\.(\d+)|).*Safari\/").unwrap().captures(ua) {
        let family = "Safari".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Safari)\/\d+").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(OLPC)\/Update(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(OLPC)\/Update()\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = "0".to_owned();
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(SEMC\-Browser)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if  Regex::new(r"(Teleca)").unwrap().is_match(ua) {
        let family = "Teleca Browser".to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Phantom)\/V(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Phantom Browser".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Trident)\/(7|8)\.(0)").unwrap().captures(ua) {
        let family = "IE".to_owned();
        let major = "11".to_owned();
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Trident)\/(6)\.(0)").unwrap().captures(ua) {
        let family = "IE".to_owned();
        let major = "10".to_owned();
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Trident)\/(5)\.(0)").unwrap().captures(ua) {
        let family = "IE".to_owned();
        let major = "9".to_owned();
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Trident)\/(4)\.(0)").unwrap().captures(ua) {
        let family = "IE".to_owned();
        let major = "8".to_owned();
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Espial)\/(\d+)(?:\.(\d+)|)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(AppleWebKit)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Apple Mail".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Firefox)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Firefox)\/(\d+)\.(\d+)(pre|[ab]\d+[a-z]*|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"([MS]?IE) (\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "IE".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(python-requests)\/(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Python Requests".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"\b(Windows-Update-Agent|Microsoft-CryptoAPI|SophosUpdateManager|SophosAgent|Debian APT-HTTP|Ubuntu APT-HTTP|libcurl-agent|libwww-perl|urlgrabber|curl|PycURL|Wget|aria2|Axel|OpenBSD ftp|lftp|jupdate|insomnia|fetch libfetch|akka-http|got)(?:[ /](\d+)(?:\.(\d+)|)(?:\.(\d+)|)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Python\/3\.\d{1,3} aiohttp)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Python\/3\.\d{1,3} aiohttp)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Java)[/ ]{0,1}\d+\.(\d+)\.(\d+)[_-]*([a-zA-Z0-9]+|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(Cyberduck)\/(\d+)\.(\d+)\.(\d+)(?:\.\d+|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(S3 Browser) (\d+)-(\d+)-(\d+)(?:\s*http:\/\/s3browser\.com|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(S3Gof3r)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"\b(ibm-cos-sdk-(?:core|java|js|python))\/(\d+)\.(\d+)(?:\.(\d+)|)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(rusoto)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(rclone)\/v(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(Roku)\/DVP-(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"(Kurio)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "Kurio App".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(Box(?: Sync)?)\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = Into::<&str>::into(result.get(1).unwrap()).to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    } else if let Some(result) = Regex::new(r"^(ViaFree|Viafree)-(?:tvOS-)?[A-Z]{2}\/(\d+)\.(\d+)\.(\d+)").unwrap().captures(ua) {
        let family = "ViaFree".to_owned();
        let major = match result.get(2) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        let minor = match result.get(3) {
            Some(r) => {
                    Into::<&str>::into(r).to_string()
            },
            None => {
                    "0".to_string()
            }
        };
        return [ family, major, minor, patch ];
    }
    [family, major, minor, patch]
}

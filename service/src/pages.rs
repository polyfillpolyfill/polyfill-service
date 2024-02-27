use indexmap::IndexMap;
use maud::{html, Markup, Render, DOCTYPE};
use serde::Deserialize;
use std::{collections::HashMap, fmt::Write as _};

struct Raw(String);

impl Render for Raw {
    fn render_to(&self, output: &mut String) {
        write!(output, "{}", self.0).unwrap();
    }
}

#[derive(Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
struct PolyfillData {
    polyfills: Vec<String>,
    polyfill_aliases: HashMap<String, Vec<String>>,
    // version: String,
}

fn layout(content: Markup) -> Markup {
    let stylee = Raw(include_str!("style.css").to_string());
    let scriptt = Raw(include_str!("script.js").to_string());
    html! {
        (DOCTYPE)
        html lang="en" {
            head {
                meta charset="UTF-8";
                meta http-equiv="x-ua-compatible" content="ie=edge";
                meta name="description" content="cdnjs.cloudflare.com/polyfill is a service which accepts a request for a set of browser features and returns only the polyfills that are needed by the requesting browser.";
                meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no";
                title {"cdnjs.cloudflare.com/polyfill";}
                link rel="icon" type="image/svg" href="/img/logo.svg";
                style {(stylee);};
            }
            body {
                nav class="container-fluid" {
                    ul {
                        li {
                            a href="/" aria-label="Back home" {

                                svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 -40 326 326" height="56px" {
                                    path fill="#ccc" d="M0 0h72.4v226.8H0zm84.6 0H157v226.8H84.7zm84.6 0h72.5v226.8h-72.5zM254 0h72.3v226.8H254z"{};
                                    path fill="#0A95C7" d="M0 0h72.4v139H0zm84.6 0H157v92.6H84.7zm84.6 0h72.5v46.3h-72.5z"{};
                                }
                            }
                        }
                        li {  "cdnjs.cloudflare.com/polyfill" }
                    }
                    ul {
                        li {
                            a href="https://www.cloudflare.com/website-terms" class="secondary" {
                                "Terms & Conditions"
                            }
                        }
                        li{
                            a href="https://www.cloudflare.com/privacypolicy" class="secondary" {
                                "Privacy Policy"
                            }
                        }
                    }
                }
                (content)
                script defer="" {
                    (scriptt);
                }
            }
        }
    }
}

pub(crate) fn home() -> String {
    let data: PolyfillData =
        serde_json::from_str(include_str!("json/library-3.111.0.json")).unwrap();
    let mut aliases: IndexMap<String, Vec<String>> = data.polyfill_aliases.into_iter().collect();
    aliases.sort_keys();
    layout(html! {
        header {
            div class="container" {
                h1 {"Upgrade the web. Automatically.";}
                p {
                    "Delivers only the polyfills required by the user's web browser."
                }
            }
        }
        main class="container" {
            form {
                label for="bundle" {
                    "Your polyfill bundle";
                    output {
                        pre {
                            code id="polyfill-bundle-url" {
                                "https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js"
                            }
                        }
                    }
                }
                div class="grid" {

                    label for="library-version" {
                        "Polyfill Library Version";
                        select id="library-version" {
                            option value="3.111.0" selected="" {"3.111.0";}
                        }
                    }

                    label for="callback" {
                        "Callback";
                        input type="text" id="callback" name="callback";
                    }

                }

                label for="filter-polyfills" {"Filter Polyfills";}
                input type="text" id="filter-polyfills" name="filter-polyfills";
                small{"Filter the polyfills in the \"Available Polyfills\" list."}

                fieldset {
                    legend {"Available Polyfills";}
					small{"Check the boxes of the polyfills or polyfill-sets you want to have in your bundle.";}

                    div id="features-list" {
                        @for alias in &aliases {
                            div class="feature" {
                                label for=(alias.0) {
                                    input type="checkbox" id=(alias.0) name=(alias.0);
                                    (alias.0);
                                }
                                details class="alias" {
                                    summary{"Included Polyfills";}
                                    ul{
                                        @for polyfill in alias.1 {
                                            li{(polyfill);}
                                        }
                                    }
                                }
                            }
                        }
                        @for polyfill in &data.polyfills {
                            div class="feature" {
                                label for=(polyfill) {
                                    input type="checkbox" id=(polyfill) name=(polyfill);
                                    (polyfill);
                                }
                            }
                        }

                    }
                }
            }
            button class="contrast switcher theme-switcher" aria-label="Turn off dark mode" {
                i{"Turn off dark mode"}
            }
        }
        script {
            (Raw(include_str!("builder.js").to_string()));
        }
    }).into_string()
}

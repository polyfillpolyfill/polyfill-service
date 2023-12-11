use humansize::{format_size, DECIMAL};
use indexmap::IndexMap;
use maud::{html, Markup, Render, DOCTYPE};
use serde::Deserialize;
use std::{collections::HashMap, fmt::Write as _};

use crate::Stats;

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
                meta name="description" content="Polyfill.io is a service which accepts a request for a set of browser features and returns only the polyfills that are needed by the requesting browser.";
                meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no";
                title {"Polyfill.io";}
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
                        li {  "Polyfill.io" }
                    }
                    ul {
                        li {
                            a href="/v3/terms" class="secondary" {
                                "Terms & Conditions"
                            }
                        }
                        li{
                            a href="/v3/privacy-policy" class="secondary" {
                                "Privacy Policy"
                            }
                        }
                        li{
                            a href="https://github.com/JakeChampion/polyfill-service/" class="contrast" aria-label="GitHub repository" {
                                svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" height="16px" {
                                    path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z";
                                }
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

fn humanize(num: u64) -> String {
    let num3 = num.to_string();
    match num3.len() {
        1 | 2 | 3 => num3,
        4 => {
            let x = num3.chars().nth(1).unwrap();
            if x != '0' {
                format!("{}.{} thousand", num3.chars().nth(0).unwrap(), x)
            } else {
                format!("{} thousand", num3.chars().nth(0).unwrap())
            }
        }
        5 => {
            let x = num3.chars().nth(2).unwrap();
            if x != '0' {
                format!("{}.{} thousand", num3.get(0..2).unwrap(), x)
            } else {
                format!("{} thousand", num3.get(0..2).unwrap())
            }
        }
        6 => {
            let x = num3.chars().nth(3).unwrap();
            if x != '0' {
                format!("{}.{} thousand", num3.get(0..3).unwrap(), x)
            } else {
                format!("{} thousand", num3.get(0..3).unwrap())
            }
        }
        7 => {
            let x = num3.chars().nth(1).unwrap();
            if x != '0' {
                format!("{}.{} million", num3.chars().nth(0).unwrap(), x)
            } else {
                format!("{} million", num3.chars().nth(0).unwrap())
            }
        }
        8 => {
            let x = num3.chars().nth(2).unwrap();
            if x != '0' {
                format!("{}.{} million", num3.get(0..2).unwrap(), x)
            } else {
                format!("{} million", num3.get(0..2).unwrap())
            }
        }
        9 => {
            let x = num3.chars().nth(3).unwrap();
            if x != '0' {
                format!("{}.{} million", num3.get(0..3).unwrap(), x)
            } else {
                format!("{} million", num3.get(0..3).unwrap())
            }
        }
        10 => {
            let x = num3.chars().nth(1).unwrap();
            if x != '0' {
                format!("{}.{} billion", num3.chars().nth(0).unwrap(), x)
            } else {
                format!("{} billion", num3.chars().nth(0).unwrap())
            }
        }
        11 => {
            let x = num3.chars().nth(2).unwrap();
            if x != '0' {
                format!("{}.{} billion", num3.get(0..2).unwrap(), x)
            } else {
                format!("{} billion", num3.get(0..2).unwrap())
            }
        }
        12 => {
            let x = num3.chars().nth(3).unwrap();
            if x != '0' {
                format!("{}.{} billion", num3.get(0..3).unwrap(), x)
            } else {
                format!("{} billion", num3.get(0..3).unwrap())
            }
        }
        13 => {
            let x = num3.chars().nth(1).unwrap();
            if x != '0' {
                format!("{}.{} trillion", num3.chars().nth(0).unwrap(), x)
            } else {
                format!("{} trillion", num3.chars().nth(0).unwrap())
            }
        }
        14 => {
            let x = num3.chars().nth(2).unwrap();
            if x != '0' {
                format!("{}.{} trillion", num3.get(0..2).unwrap(), x)
            } else {
                format!("{} trillion", num3.get(0..2).unwrap())
            }
        }
        15 => {
            let x = num3.chars().nth(3).unwrap();
            if x != '0' {
                format!("{}.{} trillion", num3.get(0..3).unwrap(), x)
            } else {
                format!("{} trillion", num3.get(0..3).unwrap())
            }
        }
        16 => {
            let x = num3.chars().nth(1).unwrap();
            if x != '0' {
                format!("{}.{} quadrillion", num3.chars().nth(0).unwrap(), x)
            } else {
                format!("{} quadrillion", num3.chars().nth(0).unwrap())
            }
        }
        17 => {
            let x = num3.chars().nth(2).unwrap();
            if x != '0' {
                format!("{}.{} quadrillion", num3.get(0..2).unwrap(), x)
            } else {
                format!("{} quadrillion", num3.get(0..2).unwrap())
            }
        }
        18 => {
            let x = num3.chars().nth(3).unwrap();
            if x != '0' {
                format!("{}.{} quadrillion", num3.get(0..3).unwrap(), x)
            } else {
                format!("{} quadrillion", num3.get(0..3).unwrap())
            }
        }
        19 => {
            let x = num3.chars().nth(1).unwrap();
            if x != '0' {
                format!("{}.{} quintillion", num3.chars().nth(0).unwrap(), x)
            } else {
                format!("{} quintillion", num3.chars().nth(0).unwrap())
            }
        }
        20 => {
            let x = num3.chars().nth(2).unwrap();
            if x != '0' {
                format!("{}.{} quintillion", num3.get(0..2).unwrap(), x)
            } else {
                format!("{} quintillion", num3.get(0..2).unwrap())
            }
        }
        _ => num3,
    }
}

pub(crate) fn home(stats: Option<Stats>, days: u32) -> String {
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
        @if let Some(stats) = stats {
            article class="container" style="text-align: center;" {
                div class="grid" {
                    section {
                        span style="--font-size: 2rem;--typography-spacing-vertical: 3rem;--font-weight: 700;--color: var(--h1-color);color: var(--color);font-weight: var(--font-weight);font-size: var(--font-size);font-family: var(--font-family);" {
                            // (stats.requests.separate_with_commas())
                            (humanize(stats.requests))
                        }
                        br;
                        span {"requests served over last "(days)" days."}
                    }
                    section {
                        span style="--font-size: 2rem;--typography-spacing-vertical: 3rem;--font-weight: 700;--color: var(--h1-color);color: var(--color);font-weight: var(--font-weight);font-size: var(--font-size);font-family: var(--font-family);" {
                            (maud::display(format_size(stats.bandwidth, DECIMAL)))
                        }
                        br;
                        span {"worth of polyfills served over last "(days)" days."}
                    }
                }
                div {
                    p {
                        "Proudly sponsored by "
                    }
                    a href="https://www.fastly.com/products/edge-compute" {
                        svg height="60" viewBox="0 0 1555 602" width="155" xmlns="http://www.w3.org/2000/svg" {
                            g fill="#ff282d" {
                                path d="M1058.1 61.93v405.5h121.8v-61.96h-40.24V.17h-81.57zM.44 405.47h41.4V209.84H.44v-53.8l41.4-6.81V94.76C41.84 28.8 56.2.16 140.33.16c18.17 0 39.7 2.69 58.56 6.09l-11.17 66.31c-12.77-2.02-19.1-2.38-27.18-2.38-29.64 0-37.13 2.95-37.13 31.91v47.13h61.54v60.62H123.4v195.63h40.97v61.94l-163.94.02v-61.96zm1016.18-19.58c-12.76 2.7-23.92 2.37-32 2.57-33.55.82-30.65-10.2-30.65-41.85V209.84h63.87v-60.61h-63.87V.16h-81.56v363.36c0 71.34 17.6 103.9 94.34 103.9 18.17 0 43.14-4.67 62-8.71zm506.68 19.91a30.8 30.8 0 0 1 31.02 30.77 30.8 30.8 0 0 1-31.02 30.76 30.72 30.72 0 0 1-30.94-30.76 30.73 30.73 0 0 1 30.94-30.77m0 56.7a25.95 25.95 0 0 0 25.83-25.93c0-14.25-11.6-25.58-25.83-25.58a25.59 25.59 0 0 0-25.76 25.58c0 14.23 11.52 25.92 25.76 25.92m5.71-10.8-6.24-9.15h-4.3v9.14h-6.95v-30.24h12.65c7.47 0 12.13 3.78 12.13 10.47 0 4.91-2.46 8.26-6.32 9.4l7.56 10.37H1529zm-10.55-15.22h5.54c3.17 0 5.28-1.22 5.28-4.56 0-3.16-2.11-4.4-5.1-4.4h-5.72v8.96zM770.6 209.72v-10.85c-24.68-4.5-49.19-4.56-62.48-4.56-37.95 0-42.58 20.13-42.58 31.04 0 15.43 5.26 23.78 46.39 32.77 60.1 13.5 120.47 27.57 120.47 102.1 0 70.69-36.38 107.2-112.95 107.2-51.24 0-100.95-11-138.89-20.62v-60.91h61.77l-.04 10.82c26.58 5.13 54.45 4.62 69 4.62 40.49 0 47.04-21.77 47.04-33.34 0-16.06-11.62-23.77-49.57-31.47-71.5-12.22-128.24-36.63-128.24-109.26 0-68.74 45.98-95.71 122.55-95.71 51.87 0 91.32 8.04 129.27 17.67v60.5zm-375.27 53.54-6.2-6.2-31.53 27.46a15 15 0 0 0-5.07-.9c-8.5 0-15.39 7.1-15.39 15.83 0 8.75 6.89 15.83 15.4 15.83 8.5 0 15.4-7.08 15.4-15.83 0-1.66-.25-3.26-.72-4.76z" {};
                                path d="m520.26 385.89-.05-253.81h-81.56v23.8a166.73 166.73 0 0 0-55.46-20.98h.46v-28.16h9.95V86.02h-82.12v20.72h9.95v28.16h.56c-78 14.36-137.12 82.67-137.12 164.83 0 92.6 75.06 167.66 167.65 167.66 31.6 0 61.16-8.75 86.39-23.95l14.7 23.98h86.15V385.9h-19.5zm-162.85-.19v-9.58h-9.77v9.56a86.29 86.29 0 0 1-81.08-81.57h9.72v-9.77h-9.66a86.28 86.28 0 0 1 81.02-80.92v9.61h9.77v-9.64a86.28 86.28 0 0 1 81.26 78.51v2.8h-9.8v9.78h9.8v2.67a86.28 86.28 0 0 1-81.26 78.55zm1028.93-236.48h168.22v60.56h-40.2L1411.17 463.6c-29.57 71.3-78.13 138.4-152.1 138.4-18.18 0-42.4-2.01-59.18-6.04l7.37-74.03c10.78 2.01 24.89 3.34 32.3 3.34 34.3 0 72.98-21.25 85.09-58.26l-104.54-257.23h-40.21v-60.55h168.3v60.55H1308l59.23 145.7 59.22-145.7h-40.12v-60.56z" {};
                            }
                        }
                    }
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
                                "https://polyfill.io/v3/polyfill.min.js"
                            }
                        }
                    }
                }
                div class="grid" {

                    label for="library-version" {
                        "Polyfill Library Version";
                        select id="library-version" {
                            option value="3.111.0" selected="" {"3.111.0";}
                            option value="3.110.1" {"3.110.1";}
                            option value="3.109.0" {"3.109.0";}
                            option value="3.108.0" {"3.108.0";}
                            option value="3.104.0" {"3.104.0";}
                            option value="3.103.0" {"3.103.0";}
                            option value="3.101.0" {"3.101.0";}
                            option value="3.98.0" {"3.98.0";}
                            option value="3.96.0" {"3.96.0";}
                            option value="3.89.4" {"3.89.4";}
                            option value="3.53.1" {"3.53.1";}
                            option value="3.52.3" {"3.52.3";}
                            option value="3.52.2" {"3.52.2";}
                            option value="3.52.1" {"3.52.1";}
                            option value="3.52.0" {"3.52.0";}
                            option value="3.51.0" {"3.51.0";}
                            option value="3.50.2" {"3.50.2";}
                            option value="3.48.0" {"3.48.0";}
                            option value="3.46.0" {"3.46.0";}
                            option value="3.42.0" {"3.42.0";}
                            option value="3.41.0" {"3.41.0";}
                            option value="3.40.0" {"3.40.0";}
                            option value="3.39.0" {"3.39.0";}
                            option value="3.34.0" {"3.34.0";}
                            option value="3.27.4" {"3.27.4";}
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

pub(crate) fn terms() -> String {
    layout(html! {
        header {
            div class="container" {
                h1 {"Terms and Conditions";}
            }
        }
        main class="container" {
            h2 {"Who we are and how to contact us"}
            p {
                a href="https://polyfill.io/" target="_self" rel="nofollow noopener"{"Polyfill.io"}
                " is operated as a community service by the Polyfill.io maintainers (“we”, “us”)."
            }

            h2 {"By using Polyfill.io you agree to our terms"}
            p{"These terms apply to “"em{"Polyfill.io"}"”, which means:"}
            ul {
                li {"the Polyfill.io website (“"em{"Site"}"”); and/or"}
                li {"the public instance of the Polyfill Service made available by us, as described on the Site."}
            }
            p {
                "By using Polyfill.io you confirm that you accept these terms of use and that you agree to comply with them. If you do not agree to these terms, you must not use Polyfill.io."
            }
            p {
                "We recommend that you print or save a copy of these terms for future reference. "
                em {
                    "Please note that these terms contain provisions which limit or exclude our liability to you, in particular as set out in the section headed “Our responsibility for loss or damage suffered by you”."
                }
            }
            h2 {
                "There are other terms that may apply to you"
            }
            p {
                "These terms of use refer to the following additional terms, which also apply to your use of Polyfill.io:"
            }
            ul {
                li {
                    "The "
                    a href="/v3/privacy-policy" {"Polyfill.io privacy policy"}
                    ", which sets out the terms on which we process any personal data we collect from you or as a result of your use of Polyfill.io (including our logging of use of Polyfill.io). If you do not agree to the terms of that privacy policy then you must not use Polyfill.io, and you should consider hosting the "
                    a href="https://github.com/JakeChampion/polyfill-service" target="_self" rel="nofollow noopener" {"Polyfill Service code"}
                    " yourself."
                }
            }
            h2 {
                "Polyfill.io are provided as-is and without any SLA"
            }
            p {"Polyfill.io is made available free of charge."}
            p {"We do not guarantee that Polyfill.io, or any content on them, will always be available or be uninterrupted. We may suspend or withdraw or restrict the availability of all or any part of Polyfill.io for business and operational reasons."}
            p {"We do not provide any service level agreement or any other performance commitments for Polyfill.io. We are not able to participate in any technical due diligence or other procurement process that your organisation may have."}
            p {
                "If you require an SLA or guaranteed levels of resilience for Polyfill.io, then you are free to obtain your own copy of the Polyfill Service code from our "
                a href="https://github.com/JakeChampion/polyfill-service" target="_self" rel="nofollow noopener"{"GitHub repository"}
                ". The Polyfill Service code is licensed under the MIT License. You can then make your own arrangements for hosting."
            }
            h2 {"Do not rely on information on this site"}
            p {"The content on the Site is provided for general information only. It is not intended to amount to advice on which you should rely."}
            p {"Although we make reasonable efforts to update the information on Polyfill.io, we make no representations, warranties or guarantees, whether express or implied, that the content on Polyfill.io is accurate, complete or up to date."}
            h2 {"Our responsibility for loss or damage suffered by you"}
            p {em {"We do not exclude or limit in any way our liability to you where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence or the negligence of our employees, agents or subcontractors and for fraud or fraudulent misrepresentation."}}
            p {em {"We exclude all implied conditions, warranties, representations or other terms that may apply to Polyfill.io or any content on them."}}
            p {em {"We will not be liable to you for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:"}}
            ul {
                li {em {"use of, or inability to use, Polyfill.io; or"}}
                li {em {"use of or reliance on any content displayed on Polyfill.io."}}
            }
            p {em {"In particular, we will not be liable for:"}}
            ul {
                li {em{"loss of profits, sales, business, or revenue;"}}
                li {em{"business interruption;"}}
                li {em{"loss of anticipated savings;"}}
                li {em{"loss of business opportunity, goodwill or reputation; or"}}
                li {em{"any indirect or consequential loss or damage."}}
            }
            p {
                em {
                    "By using Polyfill.io, you agree that the above exclusions of liability are reasonable. You accept that it is always possible for you to host your own copy of the "
                    a href="https://github.com/JakeChampion/polyfill-service" target="_self" rel="nofollow noopener"{"Polyfill Service code"}
                    ", and that your use of Polyfill.io is therefore entirely at your own risk."
                }
            }
            h2 {"We are not responsible for viruses and you must not introduce them"}
            p {"We do not guarantee that Polyfill.io will be secure or free from bugs or viruses."}
            p {"You are responsible for configuring your information technology, computer programs and platform to access Polyfill.io. You should use your own virus protection software."}
            p {"You must not misuse Polyfill.io by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful. You must not attempt to gain unauthorised access to Polyfill.io, the server on which Polyfill.io are stored or any server, computer or database connected to Polyfill.io. You must not attack Polyfill.io via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use Polyfill.io will cease immediately."}
            h2 {"We may make changes to these terms"}
            p {"We amend these terms from time to time. You should check these terms regularly to ensure you understand the terms that apply at that time."}
            h2 {"We may make changes to Polyfill.io"}
            p {"We may update and change Polyfill.io from time to time. We will aim to post details of the most significant changes on the Site."}
            h2 {"Which country’s laws apply to any dispute?"}
            p {"These terms of use, their subject matter and their formation (and any non-contractual disputes or claims) aregoverned by English law. You and we both agree to the exclusive jurisdiction of the courts of England and Wales."}
        }
    }).into_string()
}

pub(crate) fn privacy() -> String {
    layout(html! {
        header {
            div class="container" {
                h1 {"Privacy Policy";}
            }
        }
        main class="container" {
            p {
                "This Privacy Policy applies to the "
                a href="https://polyfill.io/"{"Polyfill.io"}
                " website (“<em>Site</em>”) and the public instance of the Polyfill Service made available by us, as described on the Site (“<em>Service</em>”). This Site and the Service are referred to together as “"
                a href="https://polyfill.io/"{em{"Polyfill.io"}}
                "”."
            }
            p {"We collect and use personal information in different ways for the Site and the Service. This Privacy Policy sets out details of these different ways in which we collect and use information."}
            h2 {
                strong{"The Service:"}
                " What information do we collect from the Service?"
            }
            p {"The Service is a hosted instance of software known as Polyfill Service. Polyfill Service provides snippets of code, called “polyfills”, that allows websites operated by FT and by others to provide a consistent experience across different browsers. When you load a web page which uses Polyfill Service, your browser will download any polyfills required in order to present the web page successfully in your browser."}
            p {"In order to provide the polyfills, the Service receives certain technical information from your browser including:"}
            ul {
                li {"browser details;"}
                li {"connection details, such as your IP address, which can identify your approximate location and/or name of your ISP;"}
                li {"the URL of the web page which has made the request to the Service. "}
            }
            p {"We use the above information to determine which polyfills are required by your browser. We do not retain this information."}
            p {"We may retain the following information:"}
            ul {
                li {"obfuscated IP addresses, this is an IP address with the last 3 digits removed or masked in order to anonymise it;"}
                li {"the domain of the web page which has made the request to the Service;"}
                li {"the user agent string for your browser;"}
                li {"the set of polyfills that were requested by the web page;"}
                li {"the URL and HTTP method used to access the service."}
            }
            p {"The information we retain cannot identify you. We retain it in order to identify which websites are using the Service and whether any websites are abusing the Service."}
            h2 {
                strong{"The Site:"}
                " What information do we collect from the users of this Site?"
            }
            p {"The information we collect about you if you are browsing this Site may include the following details relating to your visit to the Site:"}
            ul {
                li {"browser details;"}
                li {"time and date of access;"}
                li {"usage statistics, for example frequency;"}
                li {"connection details, for example which version of http was used and how long the connection took complete;"}
            }
            p {"The information we retain cannot identify you.  We collect the above information about users of the Site for the following reasons:"}
            ul {
                li{"to help monitor and improve the Site;"}
                li{"to help strategic development;"}
                li{"to monitor compliance with the Polyfill.io Terms and Conditions; and"}
                li{"to audit usage of the Site and demonstrate usage to third parties."}
            }
            h2 {"Lawful basis for processing"}
            p {"We only process personal information where we have a lawful basis for doing so. We rely on legitimate business interests to process data relating to Polyfill.io, for example to monitor compliance with the Polyfill.io Terms and Conditions. We take due care to balance our interests against your right to privacy."}
            h2 {"Who we share your information with"}
            p {"We may share your information with organisations that provide services on our behalf, such as those that host the Site or the Service, solely for the purposes of their providing those services to us."}
            p {
                "We may also disclose your information to comply with applicable laws, court orders or other valid legal processes, and to enforce or apply the "
                a href="/v3/terms"{"Polyfill.io Terms and Conditions"}
                " or any of our other rights."
            }
            h2 {"How long we retain data relating to Polyfill.io"}
            p {"We do not retain personal data relating to the Polyfill.io service. The data that we do retain has been obfuscated or aggregated, for example, IP addresses have the last 3 digits masked once we have determined which polyfills are required by your browser. We retain this non-personal information for 30 days."}
            h2 {"How we keep your information secure"}
            p {"We have appropriate technical and administrative security measures in place to help ensure that individuals’ information is protected against unauthorised or accidental access, use, alteration, or loss."}
            p {"Your personal information may be processed and stored outside the European Economic Area (EEA)."}
            h2 {"Your rights"}
            p {"We do not retain personal data relating to the Polyfill.io service."}
            p {
                "If you have any questions about the personal data processed as a result of your use of this service, please contact "
                a href="mailto:admin@polyfill.io" {"admin@polyfill.io"}
                "."
            }
            p {"You have the right to lodge a complaint with a supervisory authority. In the UK, this is the Information Commissioner’s Office (ICO)."}
            h2 {"Where this Privacy Policy applies"}
            p {"Polyfill.io is not intended for children under 16 years of age. We do not intentionally collect or use any information from children."}
            p {"Polyfill.io contains links to third party websites which are not subject to this privacy policy. Websites which use the polyfills are not subject to this privacy policy. We are not responsible for third party websites’ content, use of personal information, or security practices."}
            p {
                "If you have a query in regards to the processing of your personal information, please contact our Data Protection Officer directly at "
                a href="mailto:admin@polyfill.io" {"admin@polyfill.io"}
                "."
            }

            h2{"Changes to this privacy policy"}
            p {"This policy was reviewed on 26/06/2023 and last updated on 11/12/2023."}

            p {
                "Any changes we may make to this privacy policy will be posted on this page. If changes are significant, we may choose to indicate clearly on the "
                a href="https://polyfill.io" {"Polyfill.io"}
                " home page that the policy has been updated."
            }
        }
    }).into_string()
}

#![warn(
    clippy::all,
    clippy::pedantic,
    clippy::nursery,
    clippy::cargo,
)]
pub mod features_from_query_parameter;
pub mod get_polyfill_string;
pub mod old_ua;
pub mod parse;
pub mod polyfill_parameters;
pub mod toposort;
pub mod ua;
pub mod useragent;

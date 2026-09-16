# Chinese Lunar Clock · 农历时钟

A native, theme-aware Chinese lunar calendar for **Omarchy Quattro (4.x)**. Derived from Omarchy's clock plugin using the official user-plugin clone contract.

## Features

- Gregorian dates with Chinese lunar dates in a stable six-week grid.
- Leap months, heavenly stems / earthly branches and zodiac year.
- Spring Festival, Lantern Festival, Dragon Boat Festival, Qixi, Ghost Festival, Mid-Autumn Festival, Double Ninth, Laba and Lunar New Year's Eve.
- Chinese month and weekday labels, theme-colored festivals and month starts, full-date tooltips.
- Native bar integration, keyboard navigation, system theme, midnight updates and clock settings.
- Offline runtime: no requests, background processes or additional runtime dependencies.

## Install

Requires Omarchy Quattro with the native Quickshell shell and `omarchy plugin` CLI. Tested with 4.0.0.r1966, 4.0.0.r2038 and 4.0.0.r2101. Older Waybar-based releases are unsupported.

```sh
omarchy plugin add https://github.com/hehh2001/omarchy-lunar-clock --enable
```

Enabling replaces the built-in clock through `omarchy.clonedFrom: omarchy.clock`, preserving its bar position and settings. Existing clock IPC shortcuts continue to work. If you already use another personal clock clone, back up its customizations and remove that clone through `omarchy plugin remove <id>` before enabling this one.

The plugin lives under `~/.config/omarchy/plugins/hehh2001.lunar-clock/`. It does not modify packaged system files. Code normally reloads automatically; if a nested calendar component remains cached, run `omarchy restart shell` when your session is unlocked.

## Use

Click the clock to open. Use the wheel or Left/Right to change month, Up/Down to change year, T or Enter to return to today, W to switch week start, and Escape to close. Hover a day for full lunar details. Right-click the clock to cycle time formats; middle-click opens the native timezone picker.

## Update / remove

```sh
omarchy plugin update hehh2001.lunar-clock
omarchy plugin remove hehh2001.lunar-clock
```

Removing the enabled clone restores the original clock. The plugin is a maintained fork: future changes to the upstream clock are not merged automatically.

## Calendar data and limitations

Supported Gregorian dates: **1900-01-01 through 2100-12-31**. Outside that range the lunar label is a dash. A compact month-start table is generated at build time by Node's Intl Chinese calendar (ICU); QML performs a binary lookup at runtime. Civil dates use the system's local year/month/day with UTC day arithmetic to avoid daylight-saving drift.

Future dates reflect the bundled ICU version and are not claimed to match the Hong Kong Observatory for every day throughout the full range. Festival labels are traditional observances, not official holiday / make-up workday schedules. Solar terms are not included.

Development only: Node.js with full ICU to regenerate data and run tests:

```sh
node generate-data.cjs
node test.cjs
omarchy plugin validate .
```

Tests compare all 365 dates in 2026 with the [Hong Kong Observatory CSV](https://data.weather.gov.hk/weatherAPI/hko_data/calendar/nongli_calendar_2026.csv), check leap-month and festival boundaries, and validate every supported date. The CSV is a reference fixture; it is not loaded by the plugin.

## License and credits

MIT; see [LICENSE](LICENSE). The original BarWidget, Panel and calendar model are derived from [Omarchy](https://github.com/omacom/omarchy) by David Heinemeier Hansson. Chinese lunar additions by hehh2001. Month starts were generated with Node.js Intl / ICU. Reference calendar data: Hong Kong Observatory. No third-party scripts are downloaded or executed at runtime.

## 中文

原生农历日历，支持闰月、生肖、干支与传统节日，随 Omarchy 主题变化。点击时钟打开，滚轮切月，T 回到今天。采用官方用户插件机制，安装时替换原生时钟，移除时恢复。支持 1900–2100 年，无联网依赖。2026 年逐日对照香港天文台数据通过。

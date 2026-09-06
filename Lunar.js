.import "LunarData.js" as Data

var monthNames = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"]
var digits = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
var festivals = {"1-1":"春节", "1-15":"元宵", "5-5":"端午", "7-7":"七夕", "7-15":"中元", "8-15":"中秋", "9-9":"重阳", "12-8":"腊八"}
function dayName(day) {
  if (day === 10) return "初十"
  if (day === 20) return "二十"
  if (day === 30) return "三十"
  return (day < 10 ? "初" : day < 20 ? "十" : "廿") + digits[(day - 1) % 10]
}
function date(year, month, day) {
  if (year < 1900 || year > 2100) return null
  var stamp = Date.UTC(year, month, day) / 86400000
  var rows = Data.months, lo = 0, hi = rows.length - 1
  while (lo < hi) {
    var mid = Math.ceil((lo + hi) / 2)
    if (rows[mid][0] <= stamp) lo = mid
    else hi = mid - 1
  }
  var row = rows[lo], next = rows[lo + 1], lunarDay = stamp - row[0] + 1
  var festival = row[3] ? "" : (festivals[row[2] + "-" + lunarDay] || "")
  if (next && next[2] === 1 && !next[3] && stamp === next[0] - 1) festival = "除夕"
  var monthName = (row[3] ? "闰" : "") + monthNames[row[2] - 1]
  var cyc = ((row[1] - 4) % 60 + 60) % 60
  var yearName = "甲乙丙丁戊己庚辛壬癸"[cyc % 10] + "子丑寅卯辰巳午未申酉戌亥"[cyc % 12] + "年 · " + "鼠牛虎兔龙蛇马羊猴鸡狗猪"[cyc % 12] + "年"
  return {year:row[1], month:row[2], leap:!!row[3], day:lunarDay, festival:festival,
    label:festival || (lunarDay === 1 ? monthName : dayName(lunarDay)),
    full:yearName + " · " + monthName + dayName(lunarDay) + (festival ? " · " + festival : "")}
}

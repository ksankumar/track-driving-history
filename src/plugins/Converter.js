/**
 * Converter.js Created by sandy on 3/26/2019
 */
export default {
  getHr2Sec: (start, end) => {
    start = start.split(':')
    end = end.split(':')
    const startDate = new Date(0, 0, 0, start[0], start[1], 0)
    const endDate = new Date(0, 0, 0, end[0], end[1], 0)
    let diff = endDate.getTime() - startDate.getTime()
    let hours = Math.floor(diff / 1000 / 60 / 60)
    diff -= hours * 1000 * 60 * 60
    let minutes = Math.floor(diff / 1000 / 60)
    let seconds = hours * 3600
    seconds = seconds + (minutes * 60)
    return seconds
  },
  secondsToHm: (d) => {
    d = Number(d)
    let h = Math.floor(d / 3600)
    let m = Math.floor(d % 3600 / 60)

    let hrs = h > 0 ? h + (h === 1 ? ' hour: ' : ' hours: ') : ''
    let mns = m > 0 ? m + (m === 1 ? ' minute' : ' minutes') : ''
    return hrs + mns
  },
  getMilesPerHour: (distance, seconds) => {
    if (seconds === 0) return 0
    let distConverted = distance * 1609.344
    let mph = (distConverted / seconds) * 2.2369363
    return Math.round(mph)
  },
  generateId () {
    return Math.round((new Date()).getTime() / 1000)
  },
  tripSummary (trip) {
    let miles = 0
    let seconds = 0
    for (let item of trip) {
      const sec = this.getHr2Sec(item.start, item.end)
      seconds += sec
      miles += parseFloat(item.miles)
    }
    const mph = this.getMilesPerHour(miles, seconds)
    const hrs = this.secondsToHm(seconds)
    const summary = {
      'hours': hrs,
      'miles': miles,
      'speed': mph
    }
    return summary
  }
}

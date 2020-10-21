import { OpeningHoursInAWeek } from '../../../common/models/openingHours'

const getOpeningHoursDurations = (openingHours: OpeningHoursInAWeek): any => {
  // TODO: Fix output types
  // should take in the whole object
  // then output with this format:
  // {
  //    monday: ['10 AM - 10 PM', '11 PM - 2 AM'],
  //    tuesday: 'Close' ...
  // }

  // sort by day in week --> no need

  // return if is closed

  // return array of opening hours durations


  console.log(openingHours)
}

export { getOpeningHoursDurations }

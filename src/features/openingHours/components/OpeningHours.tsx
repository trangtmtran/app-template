import React from 'react'
import { getOpeningHoursInAWeek } from '../../../server/server'
import { getOpeningHoursDurations } from '../utils/getOpeningHoursDuration'

const OpeningHours: React.FC = () => {
  const openingHoursInAWeek = getOpeningHoursInAWeek()
  const openingHoursDurations = getOpeningHoursDurations(openingHoursInAWeek)
  console.log(openingHoursInAWeek, openingHoursDurations)
  return <div></div>
}

export default OpeningHours

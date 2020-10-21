import React from 'react'
import { OpeningHoursInAWeek } from '../../../common/models/openingHours'
import { getOpeningHoursByDays } from '../../../server/server'
import { getOpeningHoursDurations } from '../utils/getOpeningHoursDuration'

const OpeningHours: React.FC = () => {
  const openingHours: OpeningHoursInAWeek = getOpeningHoursByDays()
  const openingHoursDurations = getOpeningHoursDurations(openingHours)
  return <div>

  </div>
}

export default OpeningHours
import React from 'react'
import { OpeningHoursInAWeek } from '../../../common/models/openingHours'
import { getOpeningHoursData } from '../../../server/server'

const OpeningHours: React.FC = () => {
  const openingHours: OpeningHoursInAWeek = getOpeningHoursData()
  console.log(openingHours)
  return <div>

  </div>
}

export default OpeningHours
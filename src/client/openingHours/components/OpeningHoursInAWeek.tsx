import moment from 'moment'
import React from 'react'
import { OpeningHoursStringInASingleDay } from '../../../common/models/openingHours'
import { isToday } from '../utils/helperFunctions'
import OpeningHoursDurations from './OpeningHoursDurations'
import styles from './OpeningHoursInAWeek.module.scss'

type OpeningHoursInAWeekProps = {
  openingHoursDurations: OpeningHoursStringInASingleDay[]
}
const OpeningHoursInAWeek: React.FC<OpeningHoursInAWeekProps> = ({
  openingHoursDurations,
}) => {
  return (
    <React.Fragment>
      {openingHoursDurations.map(({ weekDay, openingHours }, index) => {
        const today = moment().format('dddd').toLowerCase()
        return (
          <div className={styles.root} key={index}>
            <div className={styles.dayOfWeek}>
              <span>{weekDay}</span>
              {isToday(today, weekDay) && (
                <span className={styles.today}>today</span>
              )}
            </div>
            <OpeningHoursDurations openingHours={openingHours} />
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default OpeningHoursInAWeek

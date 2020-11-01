import React from 'react'
import { Clock } from 'react-feather'
import { getOpeningHoursInAWeek } from '../../../server/server'
import { getOpeningHoursDurations } from '../utils/getOpeningHoursDurations'
import styles from './OpeningHours.module.scss'
import { isToday } from '../utils/helperFunctions'
import moment from 'moment'
import { DayOfWeek } from '../../../common/models/openingHours'

const OpeningHours: React.FC = () => {
  const openingHoursInAWeek = getOpeningHoursInAWeek()
  const openingHoursDurations = getOpeningHoursDurations(openingHoursInAWeek)

  if (openingHoursDurations === null) {
    return <div>No data</div>
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Clock className={styles.icon} />
        <div className={styles.title}>Opening hours</div>
      </div>
      <div className={styles.wrapper}>
        {openingHoursDurations.map(({ weekDay, openingHours }, index) => {
          const today = moment().format('dddd').toLowerCase() as DayOfWeek
          return (
            <div className={styles.day} key={index}>
              <div className={styles.dayOfWeek}>
                <span>{weekDay}</span>
                {isToday(today, weekDay) && (
                  <span className={styles.today}>today</span>
                )}
              </div>
              <div className={styles.openingHours}>
                {openingHours.map((openingHour, index) => (
                  <div
                    key={index}
                    className={openingHour === 'CLOSED' ? styles.closedDay : ''}
                  >
                    {openingHour}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OpeningHours

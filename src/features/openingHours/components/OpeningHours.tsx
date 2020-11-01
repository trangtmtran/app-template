import React from 'react'
import { Clock } from 'react-feather'
import { getOpeningHoursInAWeek } from '../../../server/server'
import { getOpeningHoursDurations } from '../utils/getOpeningHoursDurations'
import styles from './OpeningHours.module.scss'
import InvalidDataView from './InvalidDataView'
import OpeningHoursInAWeek from './OpeningHoursInAWeek'

const OpeningHours: React.FC = () => {
  const openingHoursInAWeek = getOpeningHoursInAWeek()
  const openingHoursDurations = getOpeningHoursDurations(openingHoursInAWeek)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Clock className={styles.icon} />
        <div className={styles.title}>Opening hours</div>
      </div>
      <React.Fragment>
        {openingHoursDurations === null ? (
          <InvalidDataView />
        ) : (
          <OpeningHoursInAWeek openingHoursDurations={openingHoursDurations} />
        )}
      </React.Fragment>
    </div>
  )
}

export default OpeningHours

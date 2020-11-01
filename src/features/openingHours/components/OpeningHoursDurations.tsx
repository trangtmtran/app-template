import React from 'react'
import { CLOSED } from '../../../common/constants'
import styles from './OpeningHoursDurations.module.scss'

interface OpeningHoursDurationsProps {
  openingHours: string[]
}
const OpeningHoursDurations: React.FC<OpeningHoursDurationsProps> = ({
  openingHours,
}) => {
  return (
    <div className={styles.openingHours}>
      {openingHours.map((openingHour, index) => (
        <div
          key={index}
          className={openingHour === CLOSED ? styles.closedDay : ''}
        >
          {openingHour}
        </div>
      ))}
    </div>
  )
}

export default OpeningHoursDurations

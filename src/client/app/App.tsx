import React from 'react'
import OpeningHours from '../openingHours/components/OpeningHours'
import styles from './App.module.scss'

const App = () => {
  return (
    <div className={styles.root}>
      <OpeningHours />
    </div>
  )
}

export default App

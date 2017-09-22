import React from 'react'
import styles from './Card.scss'

const Card = ({ children }) => (<section style={styles.card}>
  {children}
</section>)

export default Card
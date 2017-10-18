import React from 'react'
import styles from './Card.scss'

const Card = ({ children, className }) => (<section style={styles.card} className={className}>
  {children}
</section>)

export default Card
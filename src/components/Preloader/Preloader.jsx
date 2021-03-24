import React from 'react'
import s from './Preloader.module.css'
import { Loop } from '@material-ui/icons'

const Preloader = () => {
  return <Loop className={s.preloader} fontSize={'large'} />
}

export default Preloader

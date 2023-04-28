import React from 'react'
import classes from './Header.module.css'
import mealImg from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'
export default function Header(props) {
  return (
    <>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.showCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealImg} alt='hehe'/>
        </div>
    </>
  )
}

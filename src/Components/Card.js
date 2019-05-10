import React from 'react'

export default function Card(props) {

  const { title, description, img, link } = props

  return (
    <a href={link}>
        <img className='card__img' src={img} alt='' />
        <div className='card__title'>{title}</div>
        <div className='card__description'>{description}</div>            
    </a>
  )
}




import React, { Component } from 'react'

export class Card extends Component {
  render() {

    const { title, description, img, link } = this.props

    return (        
        <a href={link}>
            <img className='card__img' src={img} alt='' />
            <div className='card__title'>{title}</div>
            <div className='card__description'>{description}</div>            
        </a>
    )
  }
}

export default Card


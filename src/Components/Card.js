import React, { Component } from 'react'

export class Card extends Component {
  render() {

    const { title, description, img, link } = this.props

    return (        
        <a href={link}>
            <div className='card__title'>{title}</div>
            <div className='card__description'>{description}</div>
            <img src={img}/>
        </a>
    )
  }
}

export default Card


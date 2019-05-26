import React, { Component, Fragment } from 'react'
import { image } from './data/data'
import ReactTooltip from 'react-tooltip'

class Slider extends Component {

  state = {
    currentSlide: 0,
    image: image,
    time: 5000,
  }

  previousSlide = () => {
    const { currentSlide, image } = this.state
    if (currentSlide > 0) {
      this.setState({ currentSlide: currentSlide - 1 })
    } else {
      this.setState({ currentSlide: image.length - 1 })
    }
  }

  nextSlide = () => {
    const { currentSlide, image } = this.state
    if (currentSlide < image.length - 1) {
      this.setState({ currentSlide: currentSlide + 1 })
    } else {
      this.setState({ currentSlide: 0 })
    }
  }

  showSlider = () => {

    const { image, currentSlide } = this.state
    const index = image.findIndex((image) => image.id === currentSlide)
    if (index > -1) {
      return <img
        id={'image-' + image[index].id}
        alt={image[index].title}
        src={image[index].url}
      />
    }
  }

  composeArrow = () => {
    const { image } = this.state

    const items = image.map((item, index) => {
      return (
        <Fragment>
          <li
            key={index}
            data-tip=''
            data-for={item.title}
            title={item.title}
            onClick={() => this.showArrow(item.id)}
          >
            <i className="far fa-circle"/>
          </li>
          <ReactTooltip id={item.title} aria-haspopup='true'>
            <img src={item.url} width={100} alt={'thumbnail-' + item.title}/>
          </ReactTooltip>
        </Fragment>

      )
    })
    return <ul>{items}</ul>
  }

  showArrow = (id) => {
    this.setState({ currentSlide: id })
  }

  timerSlider = () => {
    const { currentSlide, image, time } = this.state
    currentSlide < image.length ?
      setTimeout(() => {
        this.setState({ currentSlide: this.state.currentSlide + 1 })
      }, time) :
      this.setState({ currentSlide: 0 })

  }

  render () {
    this.timerSlider()
    console.log(this.state.currentSlide)
    return (
      <div className='result'>
          <span onClick={this.previousSlide}>
          <i className="fas fa-chevron-circle-left"/>
        </span>
        <span onClick={this.nextSlide}>
          <i className="fas fa-chevron-circle-right"/>
        </span>
        {this.showSlider()}
        {this.composeArrow()}
      </div>
    )
  }

}

export default Slider
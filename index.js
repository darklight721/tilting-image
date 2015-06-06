import React, { Component } from 'react';

const MAX_ROTATE = 5;

export default class TiltImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rotateX: 0,
      rotateY: 0
    };
  }

  render() {
    const { src, width, height, ...attrs } = this.props;

    const containerStyle = {
      width,
      height,
      overflow: 'hidden',
      perspective: '1000px'
    };

    const imageStyle = {
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundImage: `url("${src}")`,
      transition: 'transform 0.1s',
      transform: `scale(1.1) rotateX(${this.state.rotateX}deg) rotateY(${this.state.rotateY}deg)`
    };

    return (
      <div {...attrs} style={containerStyle} onMouseOver={this.tilt.bind(this)}>
        <div style={imageStyle}></div>
      </div>
    );
  }

  tilt(evt) {
    const targetEl = evt.currentTarget;
    const rotateX = map(evt.clientX, 0, targetEl.clientWidth, -MAX_ROTATE, MAX_ROTATE);
    const rotateY = map(evt.clientY, 0, targetEl.clientHeight, -MAX_ROTATE, MAX_ROTATE);

    this.setState({ rotateX, rotateY });
  }
};

TiltImage.propTypes = {
  src: React.PropTypes.string.isRequired,
  width: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired
};

function map(value, sourceMin, sourceMax, destMin, destMax) {
  return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
}

function lerp(norm, min, max) {
  return (max - min) * norm + min;
}

function norm(value, min, max) {
  return (value - min) / (max - min);
}

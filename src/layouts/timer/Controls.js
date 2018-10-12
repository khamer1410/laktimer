import React from 'react';
import styled from 'styled-components';

export default class Controls extends React.Component {
  static defaultProps = {
    onBack: () => { },
    onPlay: () => { },
    onForward: () => { },
  }

  render() {
    return (
      <ControlsWrapper>
        <ControlBtn onClick={this.props.onBack}>&#x2190;</ControlBtn>
        <ControlBtn onClick={this.props.onStart}>&#9658;</ControlBtn>
        <ControlBtn onClick={this.props.onForward}>&#x2192;</ControlBtn>
      </ControlsWrapper>
    )
  }
}

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const ControlBtn = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #001f3f;
  border: none

  color: #7FDBFF;
  font-size: 40px;
`

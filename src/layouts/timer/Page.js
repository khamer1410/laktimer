import React from 'react';
import styled from 'styled-components';

export class TimerPage extends React.Component {
  state = {
    isActive: false,
  }

  static propTypes = {

  }

  static defaultProps = {

  }

  render() {
    return (
      <div>
        <Header />
        <hr />
        <Container>
          <CircleBorder>
            <Timer />
          </CircleBorder>
        </Container>
        <hr />
        <Controls />
      </div>
    )
  }
}



class Header extends React.Component {
  render() {
    return (
      <header>
        <h2>Sesje</h2>
        {/* props liczba i czas sesji */}
      </header>
    )
  }
}

class Timer extends React.Component {
  render() {
    return (
      <div>
        <h2>00:00</h2>
        <p>Time left: 00:00</p>
      </div>
    )
  }
}

class Controls extends React.Component {
  static defaultProps = {
    onBack: () => { },
    onPlay: () => { },
    onForward: () => { },
  }

  render() {
    return (
      <ControlsWrapper>
        <ControlBtn onClick={this.props.onBack}>&#x2190;</ControlBtn>
        <ControlBtn onClick={this.props.onPlay}>&#9658;</ControlBtn>
        <ControlBtn onClick={this.props.onForward}>&#x2192;</ControlBtn>
      </ControlsWrapper>
    )
  }
}

// Styled components
const CircleBorder = styled.div`
  border: solid 1px grey;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 40vh;
  min-height: 40vh;

`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

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
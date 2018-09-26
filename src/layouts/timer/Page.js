import React from 'react';
import styled from 'styled-components';

const defaultSessionTime = [7, 7, 5, 5, 3, 3]

export class TimerPage extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  state = {
    isActive: false,
    secondsLeft: 22,
    endTime: 0,
    currentSessionMinutes: 7,
    currentSessionIndex: 0,
  }

  componentDidMount() {
    this.runCountdown();
  }

  onStart() {
    debugger;
    const { currentSessionIndex } = this.state
    // check if is last
    // start next interval
    // 
    const sessionTime = defaultSessionTime[currentSessionIndex]
    if (!sessionTime) return

    this.setState({ secondsLeft: sessionTime * 60 })

    this.runCountdown()
  }

  runCountdown() {
    clearInterval(countdown)
    const countdown = setInterval(() => {
      if (this.state.secondsLeft <= 0) {
        return this.setState(prevState => ({
          currentSessionIndex: prevState.currentSessionIndex + 1
        }))
      }

      this.setState(prevState => ({
        secondsLeft: prevState.secondsLeft - 1
      }))

    }, 1000)
  }

  displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    this.setState(() => ({
      timeLeft: minutes,
    }))
  }


  render() {
    return (
      <div>
        <Header />
        <hr />
        <Container>
          <CircleBorder>
            <Timer timeLeft={this.state.secondsLeft} />
          </CircleBorder>
        </Container>
        <hr />
        <Controls
          onStart={() => { this.onStart() }}
        />
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
    const { timeLeft } = this.props;
    return (
      <div>
        <h2>{timeLeft}</h2>
        {/* <p>End time: 00:00</p> */}
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
        <ControlBtn onClick={this.props.onStart}>&#9658;</ControlBtn>
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
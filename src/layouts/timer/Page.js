import React from 'react';
import styled from 'styled-components';
import Controls from 'layouts/timer/Controls';

const defaultSessionTime = [7, 7, 5, 5, 3, 3]

export class TimerPage extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  constructor() {
    super();

    this.state = {
      isActive: false,
      secondsLeft: 0,
      endTime: 0,
      currentSessionIndex: 0,
    }

    this.currentInterval = null
    this.onStart = this.onStart.bind(this);
    this.onForward = this.onForward.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  componentDidMount() {
    // this.runCountdown();
  }

  componentWillUnmount() {
    clearInterval(this.currentInterval)
  }

  onStart() {
    const { currentSessionIndex } = this.state
    const sessionTime = defaultSessionTime[currentSessionIndex]
    if (!sessionTime) return this.endSession()
    this.setState({
      secondsLeft: sessionTime * 60,
    })

    this.runCountdown()
  }

  onForward() {
    this.setState(prevState => ({
      currentSessionIndex: prevState.currentSessionIndex + 1
    }),
      this.onStart)
  }

  onBack() {
    this.setState(prevState => ({
      currentSessionIndex: prevState.currentSessionIndex - 1
    }),
      this.onStart)
  }

  runCountdown() {
    clearInterval(this.currentInterval);
    this.setState({
      isActive: true,
    })

    this.currentInterval = setInterval(() => {
      if (this.state.secondsLeft <= 0) {
        this.endSession()
      }

      this.setState(prevState => ({
        secondsLeft: prevState.secondsLeft - 1
      }))

    }, 1000)
  }

  endSession() {
    this.setState({
      isActive: false,
    })
    return clearInterval(this.currentInterval);
  }


  render() {
    return (
      <div>
        <Header sessions={defaultSessionTime} currentSession={this.state.currentSessionIndex} />
        <hr />
        <Container>
          <CircleBorder>
            <Timer timeLeft={this.state.secondsLeft} />
          </CircleBorder>
        </Container>
        <hr />
        <Controls
          onStart={this.onStart}
          onForward={this.onForward}
          onBack={this.onBack}
        />
      </div>
    )
  }
}


class Header extends React.Component {
  render() {
    const { sessions, currentSession } = this.props
    return (
      <header>
        <h2>Sesje</h2>
        <SessionsContainer>
          {sessions.map((session, i) => (
            <SessionNumber key={i} active={currentSession === i}>{session}</SessionNumber>
          ))}
        </SessionsContainer>
        {/* props liczba i czas sesji */}
      </header>
    )
  }
}

class Timer extends React.Component {

  displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    return display;
  }

  render() {
    const { timeLeft } = this.props;

    const displayedTime = this.displayTimeLeft(timeLeft);
    return (
      <div>
        <Clock>{displayedTime}</Clock>
        {/* <p>End time: 00:00</p> */}
      </div>
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
const Clock = styled.h2`
  font-size: 90px;
`
const SessionNumber = styled.span`
  ${props =>
    props.active && `
      font-weight: bold;
      color: tomato;
      transform: scale(2);
    `
  }
`

const SessionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

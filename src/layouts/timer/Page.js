import React from 'react';
import styled from 'styled-components';
import Controls from 'layouts/timer/Controls';
import { vibrate } from 'utils/vibrate';

const availableSessions =
  [
    {
      name: 'short',
      times: [5, 5, 3, 3, 2, 2],
    },
    {
      name: 'long',
      times: [7, 7, 5, 5, 3, 3],
    },
  ]

const sessionEndVibrations = [800, 800, 800, 800, 800, 1000]

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
      currentSessionIndex: 0,
      activeSession: {},
      sessionPicked: false,
    }

    this.currentInterval = null
    this.onStart = this.onStart.bind(this);
    this.onForward = this.onForward.bind(this);
    this.onBack = this.onBack.bind(this);
    this.sessionClickHandler = this.sessionClickHandler.bind(this)
  }

  componentDidMount() {
    // this.onStart()
  }

  componentWillUnmount() {
    clearInterval(this.currentInterval)
  }

  sessionClickHandler(sessionName) {
    const pickedSession = availableSessions.find(session => session.name === sessionName);

    this.setState({
      activeSession: pickedSession,
      sessionPicked: true,
    })
  }

  onStart() {
    const { currentSessionIndex } = this.state
    const sessionTime = this.state.activeSession.times[currentSessionIndex]
    if (!sessionTime) return this.endSession()
    this.setState({
      secondsLeft: sessionTime * 60,
    })

    this.runCountdown()
  }

  onForward() {
    const { currentSessionIndex, activeSession } = this.state;
    if (currentSessionIndex >= activeSession.times.length) return clearInterval(this.currentInterval)

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
        return this.endSession()
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

    clearInterval(this.currentInterval)

    vibrate(sessionEndVibrations)

    // automatically go to the next session
    this.onForward()
  }

  render() {
    const { activeSession, currentSessionIndex, sessionPicked } = this.state;
    return (
      <div>
        <Header
          sessions={activeSession.times}
          currentSession={currentSessionIndex}
          sessionPicked={sessionPicked}
          onSessionClick={this.sessionClickHandler}
        />
        <hr />
        {sessionPicked && (
          <div>
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
      </div>
    )
  }
}


class Header extends React.Component {
  render() {
    const { sessions, currentSession, sessionPicked, onSessionClick } = this.props;

    return (
      <header>
        <h2>Sesje</h2>
        {!sessionPicked && (
          <SessionsContainer>
            <StyledButton onClick={() => onSessionClick('short')}>Short</StyledButton>
            <StyledButton onClick={() => onSessionClick('long')}>Long</StyledButton>
          </SessionsContainer>
        )}
        {sessionPicked && (
          <SessionsContainer>
            {sessions.map((session, i) => (
              <SessionNumber key={i} active={currentSession === i}>{session}</SessionNumber>
            ))}
          </SessionsContainer>
        )}
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
const StyledButton = styled.button`
  padding: 1em;
  flex: 1 1 0;
  margin: 0 15px;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px 0px;
  background-color: rgb(91, 196, 190);
  background-image: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  font-size: 16px;
  font-weight: 400;
  outline: none;
  transition: all 0.3s ease 0s;
  background-repeat: no-repeat;
  border-radius: 6px;
  border-style: none;
`

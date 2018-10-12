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
      currentSessionMinutes: 7,
      currentSessionIndex: 0,
    }

    this.currentInterval = null
    this.onForward.bind(this);
    this.onBack.bind(this);
    this.onStart.bind(this);
  }

  componentDidMount() {
    // this.runCountdown();
  }

  componentWillUnmount() {
    clearInterval(this.currentInterval)
  }

  onStart() {
    const { currentSessionIndex } = this.state
    // check if is last
    // start next interval
    //
    const sessionTime = defaultSessionTime[currentSessionIndex]
    if (!sessionTime) return

    this.setState({ secondsLeft: sessionTime * 60 })

    this.runCountdown()
  }

  onForward() {
    this.setState(prevState => ({
      currentSessionIndex: prevState.currentSessionIndex + 1
    }))
  }

  onBack() {
    this.setState(prevState => ({
      currentSessionIndex: prevState.currentSessionIndex - 1
    }))
  }

  runCountdown() {
    clearInterval(this.currentInterval);

    this.currentInterval = setInterval(() => {
      if (this.state.secondsLeft <= 0) {
        return this.onForward()
      }

      this.setState(prevState => ({
        secondsLeft: prevState.secondsLeft - 1
      }))

    }, 1000)
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
    return (
      <header>
        <h2>Sesje</h2>
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

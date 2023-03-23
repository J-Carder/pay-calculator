import styled, { createGlobalStyle } from 'styled-components'
import {useEffect, useState} from 'preact/hooks'
import { InputSlider } from './components/InputSlider'

const GlobalStyle = createGlobalStyle`

  body {
    box-sizing: border-box;
    /* background-color: ${props => props.value > 40000 ? "#C7E5DF" : props.value > 20000 ? "#FAF0DC" : "#F4BEBE" }; */
    background-color: #C7E5DF;
    margin: 0;
  }
`

const StyledOverlay = styled.div.attrs(props => ({
  style: {
    height: (props.value / 2000 + "%"),
  },
}))`
  width: 100%;
  background-color: #00d32361;
  transition: 0.4s height;
  filter: blur(10px);
  position: fixed;
  bottom: 0;
  z-index: -1;
`

const TimeSection = styled.div`
  border: 5px solid black;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 0 3px black;
  background-color: white;
`

const PaySection = styled.div`
  border: 5px solid black;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 0 3px black;
  background-color: white;
`

const CenteredH2 = styled.h2`
  padding: 0;
  margin: 0;
  margin-left: 10px;
`

const StyledFooter = styled.footer`
  text-align: center;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  font-family: sans-serif;
`

export const App = () => {


  const HOURS_PER_DAY_NAME = "hours per day";
  const DAYS_PER_WEEK = "days per week";

  const HOURLY_NAME = "hourly";
  const DAILY_NAME = "daily";
  const WEEKLY_NAME = "weekly";
  const BIWEEKLY_NAME = "bi-weekly";
  const SEMIMONTHLY_NAME = "semi-monthly";
  const MONTHLY_NAME = "monthly";
  const QUARTERLY_NAME = "quarterly";
  const ANNUALLY_NAME = "annually";

  const WEEKS_IN_YEAR = 52;
  const SEMIMONTHS_IN_YEAR = 24;
  const MONTHS_IN_YEAR = 12;
  const BIWEEKLY_IN_MONTH = 2;
  const QUARTERS_IN_YEAR = 4;

  const HOURS_IN_DAY = 24;
  const DAYS_IN_WEEK = 7;

  const DEFAULT_HOURS_PER_DAY = 8;
  const DEFAULT_DAYS_PER_WEEK = 5;

  const HOURLY_SLIDER_MAX = 100;
  const DAILY_SLIDER_MAX = 1000;
  const WEEKLY_SLIDER_MAX = 5000;
  const BIWEEKLY_SLIDER_MAX = 10000;
  const SEMIMONTHLY_SLIDER_MAX = 10000;
  const MONTHLY_SLIDER_MAX = 20000;
  const QUARTERLY_SLIDER_MAX = 60000;
  const ANNUALLY_SLIDER_MAX = 200000;

  let [hoursPerDay, setHoursPerDay] = useState(DEFAULT_HOURS_PER_DAY);
  let [daysPerWeek, setDaysPerWeek] = useState(DEFAULT_DAYS_PER_WEEK);


  let [hourly, setHourly] = useState(0);
  let [daily, setDaily] = useState(0);
  let [weekly, setWeekly] = useState(0);
  let [biweekly, setBiweekly] = useState(0);
  let [semimonthly, setSemimonthly] = useState(0);
  let [monthly, setMonthly] = useState(0);
  let [quarterly, setQuarterly] = useState(0);
  let [annually, setAnnually] = useState(0);  

  // initially set pay to 30 per hour
  useEffect(() => {
    setPay(30, HOURLY_NAME);
  }, [])


  const roundToTwoDecimals = (num) => {
    return Math.round(num * 100) / 100;
  }

  const updateFields = (hoursPerDay, daysPerWeek, hourlyValue) => {
    setDaily(roundToTwoDecimals(hourlyValue * hoursPerDay));
    setWeekly(roundToTwoDecimals(hourlyValue * hoursPerDay * daysPerWeek));
    setBiweekly(roundToTwoDecimals(hourlyValue * hoursPerDay * daysPerWeek * BIWEEKLY_IN_MONTH));
    setSemimonthly(roundToTwoDecimals(hourlyValue * hoursPerDay * daysPerWeek * (WEEKS_IN_YEAR / SEMIMONTHS_IN_YEAR)));
    setMonthly(roundToTwoDecimals(hourlyValue * hoursPerDay * daysPerWeek * (WEEKS_IN_YEAR / MONTHS_IN_YEAR)));
    setQuarterly(roundToTwoDecimals(hourlyValue * hoursPerDay * daysPerWeek * (WEEKS_IN_YEAR / QUARTERS_IN_YEAR)));
    setAnnually(roundToTwoDecimals(hourlyValue * hoursPerDay * daysPerWeek * WEEKS_IN_YEAR));
  }

  // set all payment fields
  const setPay = (pay, name) => {
    let hourlyValue; 
    switch (name) {
      case HOURLY_NAME:
        hourlyValue = pay;
        break;
      case DAILY_NAME:
        hourlyValue = pay / hoursPerDay;
        break;
      case WEEKLY_NAME:
        hourlyValue = (pay / daysPerWeek) / hoursPerDay;
        break;
      case BIWEEKLY_NAME:
        hourlyValue = ((pay / BIWEEKLY_IN_MONTH) / daysPerWeek) / hoursPerDay;
        break;
      case SEMIMONTHLY_NAME:
        hourlyValue = ((pay / (WEEKS_IN_YEAR / SEMIMONTHS_IN_YEAR)) / daysPerWeek) / hoursPerDay;
        break;
      case MONTHLY_NAME:
        hourlyValue = ((pay / (WEEKS_IN_YEAR / MONTHS_IN_YEAR)) / daysPerWeek) / hoursPerDay;
        break;
      case QUARTERLY_NAME:
        hourlyValue = ((pay / (WEEKS_IN_YEAR / QUARTERS_IN_YEAR)) / daysPerWeek) / hoursPerDay;
        break;
      case ANNUALLY_NAME:
        hourlyValue = ((pay / WEEKS_IN_YEAR) / daysPerWeek) / hoursPerDay;
        break;
    }

    setHourly(roundToTwoDecimals(hourlyValue));
    updateFields(hoursPerDay, daysPerWeek, hourlyValue);
  }

  const setTime = (time, name) => {

    switch (name) {
      case HOURS_PER_DAY_NAME:
        setHoursPerDay(time);
        updateFields(time, daysPerWeek, hourly);
        break;
      case DAYS_PER_WEEK:
        setDaysPerWeek(time);
        updateFields(hoursPerDay, time, hourly)
        break;
    }
  }


  return (
    <>
      <GlobalStyle value={annually} />
      <Wrapper>

        <h1>Pay Calculator</h1>

        <CenteredH2>Time</CenteredH2>
        <TimeSection>
          <InputSlider name={HOURS_PER_DAY_NAME} min={1} max={HOURS_IN_DAY} sliderMin={1} sliderMax={HOURS_IN_DAY} valueChange={setTime} value={hoursPerDay} />
          <InputSlider name={DAYS_PER_WEEK} min={1} max={DAYS_IN_WEEK} sliderMin={1} sliderMax={DAYS_IN_WEEK} valueChange={setTime} value={daysPerWeek}/>
        </TimeSection>

        <CenteredH2>Pay</CenteredH2>
        <PaySection>
          <InputSlider name={HOURLY_NAME} dollar sliderMax={HOURLY_SLIDER_MAX} valueChange={setPay} value={hourly}/>
          <InputSlider name={DAILY_NAME} dollar sliderMax={DAILY_SLIDER_MAX} sliderStep={10} valueChange={setPay} value={daily}/>
          <InputSlider name={WEEKLY_NAME} dollar sliderMax={WEEKLY_SLIDER_MAX} sliderStep={10} valueChange={setPay} value={weekly}/>
          <InputSlider name={BIWEEKLY_NAME} dollar sliderMax={BIWEEKLY_SLIDER_MAX} sliderStep={100} valueChange={setPay} value={biweekly}/>
          <InputSlider name={SEMIMONTHLY_NAME} dollar sliderMax={SEMIMONTHLY_SLIDER_MAX} sliderStep={100} valueChange={setPay} value={semimonthly}/>
          <InputSlider name={MONTHLY_NAME} dollar sliderMax={MONTHLY_SLIDER_MAX} sliderStep={100} valueChange={setPay} value={monthly}/>
          <InputSlider name={QUARTERLY_NAME} dollar sliderMax={QUARTERLY_SLIDER_MAX} sliderStep={100} valueChange={setPay} value={quarterly}/>
          <InputSlider name={ANNUALLY_NAME} dollar sliderMax={ANNUALLY_SLIDER_MAX} sliderStep={1000} valueChange={setPay} value={annually}/>
        </PaySection>

        <StyledFooter>
          <p><small>&copy; Jeremy Carder 2023 &bull; Check out the source on <a href="https://github.com">GitHub</a></small></p>
        </StyledFooter>

      </Wrapper>
      <StyledOverlay value={annually} />
    </>
  )
}

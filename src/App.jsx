import styled, { createGlobalStyle } from 'styled-components';
import {useEffect, useState} from 'preact/hooks';
import { InputSlider } from './components/InputSlider';
import SlideToggle from 'react-slide-toggle';

// styles to be applied globally (ie. body)
const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body {
    /* background-color: ${props => props.value > 40000 ? "#C7E5DF" : props.value > 20000 ? "#FAF0DC" : "#F4BEBE" }; */
    background-color: #C7E5DF;
    margin: 0 10px 0 10px;
  }
`
// greenish overlay that reacts to salary level
// uses attrs method because height gets changed frequently -> less rerendered classes which is expensive
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

const StyledSection = styled.div`
  border: 5px solid black;
  padding: 10px;
  margin: 10px 0 10px 0;
  box-shadow: 0 0 3px black;
  background-color: white;
  border-radius: 5px;

  margin-bottom: ${props => props.space ? "2em" : ""};
`

const StyledH2 = styled.h2`
  padding: 0;
  margin: 0;
`

const StyledFooter = styled.footer`
  text-align: center;
  margin-bottom: 12em;
  margin-top: 3em;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  font-family: sans-serif;
`

const StyledDT = styled.dt`
  font-weight: bold;
  margin: 10px 0 10px 0;
`

const StyledBox = styled.span`
  padding: 3px;
  border: 2px solid black;
  background-color: #d5d5d5;
  border-radius: 5px;
`

const StyledDD = styled.dd`
`

const StyledDL = styled.dl`
`

const StyledDiv = styled.div`
`

const StyledA = styled.a`
  color: black;
  font-weight: bold;
`

const DiscreetA = styled.a`
  color: black;
  text-decoration: none;

  :hover {
    color: black;
  }
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

  // update all pay fields in app
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

    // convert pay to hourly value depending on name
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

    // update hourly value and then all fields
    setHourly(roundToTwoDecimals(hourlyValue));
    updateFields(hoursPerDay, daysPerWeek, hourlyValue);
  }

  // set time fields
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


  const getCopyRightYear = () => {

    // year to start from
    let startYear = 2023;

    let curYear = new Date().getFullYear();
    let yearString = "";

    if (startYear < curYear) {
        yearString = startYear.toString() + "-" + curYear.toString();
    } else {
        yearString = startYear.toString();
    }

    return yearString;

  }


  return (
    <>
      <GlobalStyle value={annually} />
      <Wrapper>

        <h1>Pay Calculator &#128184;</h1>

        <StyledDiv>
          <p>Simply fill out or modify a field and watch all other values reactively change to give you a comprehensive view of your wage/salary.</p>
        </StyledDiv>

        <StyledH2>Time &#128338;</StyledH2>
        <StyledSection>
          <InputSlider name={HOURS_PER_DAY_NAME} min={1} max={HOURS_IN_DAY} sliderMin={1} sliderMax={HOURS_IN_DAY} valueChange={setTime} value={hoursPerDay} />
          <InputSlider name={DAYS_PER_WEEK} min={1} max={DAYS_IN_WEEK} sliderMin={1} sliderMax={DAYS_IN_WEEK} valueChange={setTime} value={daysPerWeek}/>
        </StyledSection>

        <StyledH2>Pay &#128176;</StyledH2>
        <StyledSection space>
          <InputSlider name={HOURLY_NAME} dollar sliderMax={HOURLY_SLIDER_MAX} valueChange={setPay} value={hourly}/>
          <InputSlider name={DAILY_NAME} dollar sliderMax={DAILY_SLIDER_MAX} step={10} valueChange={setPay} value={daily}/>
          <InputSlider name={WEEKLY_NAME} dollar sliderMax={WEEKLY_SLIDER_MAX} step={10} valueChange={setPay} value={weekly}/>
          <InputSlider name={BIWEEKLY_NAME} dollar sliderMax={BIWEEKLY_SLIDER_MAX} step={100} valueChange={setPay} value={biweekly}/>
          <InputSlider name={SEMIMONTHLY_NAME} dollar sliderMax={SEMIMONTHLY_SLIDER_MAX} step={100} valueChange={setPay} value={semimonthly}/>
          <InputSlider name={MONTHLY_NAME} dollar sliderMax={MONTHLY_SLIDER_MAX} step={100} valueChange={setPay} value={monthly}/>
          <InputSlider name={QUARTERLY_NAME} dollar sliderMax={QUARTERLY_SLIDER_MAX} step={100} valueChange={setPay} value={quarterly}/>
          <InputSlider name={ANNUALLY_NAME} dollar sliderMax={ANNUALLY_SLIDER_MAX} step={1000} valueChange={setPay} value={annually}/>
        </StyledSection>

        <SlideToggle> 
          {({toggle, setCollapsibleElement}) => ( 

            <StyledDiv>
              
              <StyledH2 onClick={toggle}>Definitions</StyledH2>

              <StyledDL ref={setCollapsibleElement}>
                <StyledDT><StyledBox>{HOURS_PER_DAY_NAME}</StyledBox></StyledDT>
                <StyledDD>The hours worked per day, this affects everything other than the hourly field</StyledDD>
                <StyledDT><StyledBox>{DAYS_PER_WEEK}</StyledBox></StyledDT>
                <StyledDD>The days worked per week, this affects everything other than the hourly and daily fields</StyledDD>

                <StyledDT><StyledBox>{HOURLY_NAME}</StyledBox></StyledDT>
                <StyledDD>The pay in dollars per hour, what every other pay field is based off</StyledDD>
                <StyledDT><StyledBox>{DAILY_NAME}</StyledBox></StyledDT>
                <StyledDD>The pay in dollars per day, <code>{HOURLY_NAME} &times; {HOURS_PER_DAY_NAME}</code></StyledDD>
                <StyledDT><StyledBox>{WEEKLY_NAME}</StyledBox></StyledDT>
                <StyledDD>The pay in dollars per week, <code>{DAILY_NAME} &times; {DAYS_PER_WEEK}</code></StyledDD>
                <StyledDT><StyledBox>{BIWEEKLY_NAME}</StyledBox></StyledDT>
                <StyledDD>The pay in dollars every two weeks, <code>{BIWEEKLY_IN_MONTH} &times; {WEEKLY_NAME}</code></StyledDD>
                <StyledDT><StyledBox>{SEMIMONTHLY_NAME}</StyledBox></StyledDT>
                <StyledDD>The pay in dollars per semi-month. A semi-month pay period is typically done once half way through the month and again at the end of the month (similar to {BIWEEKLY_NAME}) <code>{ANNUALLY_NAME} / {SEMIMONTHS_IN_YEAR}</code></StyledDD>
                <StyledDT><StyledBox>{MONTHLY_NAME}</StyledBox></StyledDT>
                <StyledDD>The pay in dollars per month, <code>{ANNUALLY_NAME} / {MONTHS_IN_YEAR}</code></StyledDD>
                <StyledDT><StyledBox>{QUARTERLY_NAME}</StyledBox></StyledDT>
                <StyledDD>The pay in dollars per quarter year, <code>{ANNUALLY_NAME} / {QUARTERS_IN_YEAR}</code></StyledDD>
                <StyledDT><StyledBox>{ANNUALLY_NAME}</StyledBox></StyledDT>
                <StyledDD>The pay in dollars per year, <code>{WEEKLY_NAME} &times; {WEEKS_IN_YEAR}</code></StyledDD>
              </StyledDL>
            </StyledDiv>
          )}
        </SlideToggle> 

        <StyledDiv>
          <StyledH2>More</StyledH2>
          <p>See the <StyledA href="https://jeremycarder.ca/projects/pay-calculator/">project post.</StyledA>.</p>
          <p>Licensed under the <StyledA href="https://gitlab.com/jcarder/pay-calculator/-/raw/master/LICENSE">GPLv3</StyledA>.</p> 
        </StyledDiv>

        <StyledFooter>
          <p><small>&copy; Jeremy Carder {getCopyRightYear()} &bull; <StyledA href="https://jeremycarder.ca">jeremycarder.ca</StyledA> &bull; Check out the source on <StyledA href="https://github.com/J-Carder/pay-calculator">GitHub</StyledA> or <StyledA href="https://gitlab.com/jcarder/pay-calculator">GitLab</StyledA></small></p>
        </StyledFooter>

      </Wrapper>
      <StyledOverlay value={annually} />
    </>
  )
}

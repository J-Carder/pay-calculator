import styled from "styled-components";
import dollar from "../assets/dollar.svg";


const StyledSlider = styled.input`
    max-width: 200px;
    position: relative;
    top: 4px;
`

const StyledContainer = styled.div`
    display: flex;
    justify-content: space-between;

    flex-wrap: wrap;
    @media (max-width: 355px) {
        justify-content: end;
    }

    :nth-child(even) {
        background-color: rgb(219, 219, 219);
    }

    :hover {
        background-color: #cbcbcb;
    }

    padding: 2px;
`

const StyledNumberInput = styled.input`
    text-align: right;
    border-radius: 5px;

    ::-webkit-inner-spin-button {
        opacity: 1;
        margin-left: 5px;
    }

    ${props => props.dollar ? ` \
        background-image: url(${dollar}); \
        background-position: left center; \
        background-repeat: no-repeat no-repeat; \
        padding-left: 10px; \
        background-size: 16px; `
        : "" }
`

const StyledP = styled.p`
    padding: 0;
    margin: 0;
    margin-right: 10px;
    margin-top: 13px;
`

const StyledInputContainer = styled.div`
    margin-top: 5px;
    text-align: right;
    display: flex;
    flex-direction: row;

    @media (max-width: 650px) {
        flex-direction: column;
    }
`

export const InputSlider = ({ name, min, max, sliderMin, sliderMax, step, value, valueChange, className, dollar, decimal}) => {

    return (

        <StyledContainer className={className}>
            <StyledP>
                {name}
            </StyledP>
            <StyledInputContainer>
                <StyledNumberInput dollar={dollar} step={step} type="number" min={min} max={max} value={decimal ? (Math.round(value * 100) / 100).toFixed(2) : value} onChange={(e) => {valueChange(e.target.value, name)}}/>
                <StyledSlider type="range" step={step} min={sliderMin} max={sliderMax} value={value} onChange={(e) => {valueChange(e.target.value, name)}} />
            </StyledInputContainer>
        </StyledContainer>
    )
}
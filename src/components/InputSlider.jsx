import styled from "styled-components"
import {useEffect, useState} from 'preact/hooks'

const StyledSlider = styled.input`
    width: 200px;
    position: relative;
    top: 4px;
`

const StyledContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledNumberInput = styled.input`
    text-align: right;

    ::-webkit-inner-spin-button {
        opacity: 1;
        margin-left: 5px;
    }

    ${props => props.dollar ? " \
        background-image: url(\"/dollar.svg\"); \
        background-position: left center; \
        background-repeat: no-repeat no-repeat; \
        padding-left: 10px; \
        background-size: 16px; "
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
`

export const InputSlider = ({ name, min, max, sliderMin, sliderMax, sliderStep, value, valueChange, className, dollar, decimal}) => {

    return (

        <StyledContainer className={className}>
            <StyledP>
                {name}
            </StyledP>
            <StyledInputContainer>
                <StyledNumberInput dollar={dollar} type="number" min={min} max={max} value={decimal ? (Math.round(value * 100) / 100).toFixed(2) : value} onChange={(e) => {valueChange(e.target.value, name)}}/>
                <StyledSlider type="range" step={sliderStep} min={sliderMin} max={sliderMax} value={value} onChange={(e) => {valueChange(e.target.value, name)}} />
            </StyledInputContainer>
        </StyledContainer>
    )
}
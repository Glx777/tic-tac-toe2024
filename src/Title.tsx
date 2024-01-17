import styled from 'styled-components'
import { Turns } from './App'

export interface ITitleProps {
    isWon: boolean
    isDraw: boolean
    turn: Turns
    count: number
}

const StyledTitle = styled.h1`
    color: #FFFAF0;
    font-size: 50px;
    margin-bottom: 30px;
`

const getTitleText = ({ isWon, isDraw, turn, count }: ITitleProps): string => {
	if (isWon) {
		return `The winner is: ${turn} (Next game in ${count})`
	}

	if (isDraw) {
		return `Draw (Next game in ${count})`
	}

	return `Next turn: ${turn}`
}

export const Title = (props: ITitleProps) =>
	<StyledTitle data-testid="title">{getTitleText(props)}</StyledTitle>
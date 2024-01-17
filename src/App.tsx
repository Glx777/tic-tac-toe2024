import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Title } from './Title'
import { GameView } from './GameView'

const StyledApp = styled.div`
	align-items: center;
	background: linear-gradient(90deg, rgba(2,0,36,1) 4%, rgba(90,47,163,1) 52%, rgba(184,89,226,1) 100%);
    display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100vh;
	min-width: 100%;
`

export enum Turns {
    X = 'X',
    O = 'O'
}

const defaultCounterTime = 5

export const App = () => {
	const [turn, setTurn] = useState<Turns>(Turns.X)
	const [moves, setMoves] = useState<string[][]>([['', '', ''], ['', '', ''], ['', '', '']])
	const [isWon, setIsWon] = useState(false)
	const [isDraw, setIsDraw] = useState(false)
	const [count, setCount] = useState(defaultCounterTime)

	const resetGame = () => {
		setMoves([['', '', ''], ['', '', ''], ['', '', '']])
		setTurn(Turns.X)
		setIsDraw(false)
		setIsWon(false)
		setCount(defaultCounterTime)
	}

	const handleClick = (rowNumber: number, cellNumber: number) => {
		if (!moves[rowNumber][cellNumber] && !isWon && !isDraw) {
			const movesCopy = [...moves]

			movesCopy[rowNumber][cellNumber] = turn === Turns.X ? Turns.X : Turns.O
			setMoves(movesCopy)

			calculateWinner()
		}
	}

	useEffect(() => {
		if (isDraw || isWon) {
			const timer = setInterval(() => {
				setCount(count => count - 1)

				if (count === 0) clearInterval(timer)
			}, 1000)

			return () => {
				clearInterval(timer)
			}
		}

	}, [isDraw, isWon, count])

	const calculateWinner = () => {
		const xWin = Turns.X.repeat(3)
		const oWin = Turns.O.repeat(3)

		const isDraw = !moves.flat().includes('') && !isWon

		for (let i = 0; i < 3; i++) {
			if (
				moves[i][0] + moves[i][1] + moves[i][2] === xWin ||
                moves[i][0] + moves[i][1] + moves[i][2] === oWin ||
                moves[0][i] + moves[1][i] + moves[2][i] === xWin ||
                moves[0][i] + moves[1][i] + moves[2][i] === oWin ||
                moves[0][0] + moves[1][1] + moves[2][2] === xWin ||
                moves[0][2] + moves[1][1] + moves[2][0] === xWin ||
                moves[0][0] + moves[1][1] + moves[2][2] === oWin ||
                moves[0][2] + moves[1][1] + moves[2][0] === oWin
			) {
				setIsWon(true)
				setTimeout(() => resetGame(), defaultCounterTime * 1000)
				break
			} else if (isDraw) {
				setIsDraw(true)
				setTimeout(() => resetGame(), defaultCounterTime * 1000)
			} else if (i === 2 && !isDraw && !isWon) {
				setTurn(turn === Turns.X ? Turns.O : Turns.X)
			}
		}
	}

	return (
		<StyledApp data-testid="app">
			<Title isWon={isWon} isDraw={isDraw} count={count} turn={turn} />
			<GameView handleClick={handleClick} moves={moves} />
		</StyledApp>
	)
}
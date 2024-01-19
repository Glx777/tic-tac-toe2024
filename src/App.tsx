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

const winPossibilities: number[][] = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

export const App = () => {
	const [turn, setTurn] = useState(Turns.X)
	const [moves, setMoves] = useState<string[]>(new Array(9).fill(''))
	const [isWon, setIsWon] = useState(false)
	const [isDraw, setIsDraw] = useState(false)
	const [count, setCount] = useState(defaultCounterTime)

	const resetGame = () => {
		setMoves(new Array(9).fill(''))
		setTurn(Turns.X)
		setIsDraw(false)
		setIsWon(false)
		setCount(defaultCounterTime)
	}

	useEffect(() => {
		if (isDraw || isWon) {
			const timer = setInterval(() => setCount(count - 1), 1000)

			return () => clearInterval(timer)
		}

	}, [isDraw, isWon, count])

	const handleClick = (cellNumber: number) => {
		if (!moves[cellNumber] && !isWon && !isDraw) {
			const movesCopy = [...moves]

			movesCopy[cellNumber] = turn === Turns.X ? Turns.X : Turns.O
			setMoves(movesCopy)
			calculateWinner(movesCopy)
		}
	}

	const calculateWinner = (moves: string[]) => {
		const xWin = Turns.X.repeat(3)
		const oWin = Turns.O.repeat(3)
		const isDraw = !moves.flat().includes('') && !isWon

		for (let i = 0; i < winPossibilities.length; i++) {
			let value = ''

			for (let j = 0; j < winPossibilities[i].length; j++) {
				value += moves[winPossibilities[i][j]]
				if (j === 2) {
					if (value === xWin || value === oWin) {
						setIsWon(true)
						setTimeout(() => resetGame(), defaultCounterTime * 1000)
					} else if (isDraw) {
						setIsDraw(true)
						setTimeout(() => resetGame(), defaultCounterTime * 1000)
					}
				}
			}
		}
	}

	useEffect(() => {
		if (!isWon && !isDraw && moves.flat().join('')) {
			setTurn(turn => turn === Turns.X ? Turns.O : Turns.X)
		}
	}, [isWon, isDraw, moves])

	return (
		<StyledApp data-testid="app">
			<Title isWon={isWon} isDraw={isDraw} count={count} turn={turn} />
			<GameView handleClick={handleClick} moves={moves} />
		</StyledApp>
	)
}
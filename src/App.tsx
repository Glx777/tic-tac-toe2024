import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledApp = styled.div`
	align-items: center;
	background: linear-gradient(90deg, rgba(2,0,36,1) 4%, rgba(90,47,163,1) 52%, rgba(184,89,226,1) 100%);
    display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100vh;
	min-width: 100%;
`

const Title = styled.h1`
    color: #FFFAF0;
    font-size: 50px;
    margin-bottom: 30px;
`

const Row = styled.div`
    display: flex;
`

const Cell = styled.div`
    align-items: center;
    border: 2px solid #fff;
	border-radius: 5px;
    color: #FFFAF0;
    display: flex;
    font-size: 250px;
    height: 200px;
    justify-content: center;
	user-select: none;
    width: 200px;
`

enum Turns {
    X = 'X',
    O = 'O'
}

const defaultCounterTime = 5

const getTitle = (isWon: boolean, isDraw: boolean, turn: Turns, count: number): string => {
	if (isWon) {
		return `The winner is: ${turn} (Next game in ${count})`
	}

	if (isDraw) {
		return `Draw (Next game in ${count})`
	}

	return `Next turn: ${turn}`
}

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
		<StyledApp>
			<Title>{getTitle(isWon, isDraw, turn, count)}</Title>
			<Row>
				<Cell onClick={() => handleClick(0, 0)}>{moves[0][0]}</Cell>
				<Cell onClick={() => handleClick(0, 1)}>{moves[0][1]}</Cell>
				<Cell onClick={() => handleClick(0, 2)}>{moves[0][2]}</Cell>
			</Row>
			<Row>
				<Cell onClick={() => handleClick(1, 0)}>{moves[1][0]}</Cell>
				<Cell onClick={() => handleClick(1, 1)}>{moves[1][1]}</Cell>
				<Cell onClick={() => handleClick(1, 2)}>{moves[1][2]}</Cell>
			</Row>
			<Row>
				<Cell onClick={() => handleClick(2, 0)}>{moves[2][0]}</Cell>
				<Cell onClick={() => handleClick(2, 1)}>{moves[2][1]}</Cell>
				<Cell onClick={() => handleClick(2, 2)}>{moves[2][2]}</Cell>
			</Row>
		</StyledApp>
	)
}
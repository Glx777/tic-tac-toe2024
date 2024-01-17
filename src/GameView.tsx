import styled from 'styled-components'

export interface IGameViewProps {
    handleClick: (rowNumber: number, cellNumber: number) => void
    moves: string[][]
}

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

export const GameView = ({ handleClick, moves }: IGameViewProps) => (
	<>
		<Row>
			<Cell data-testid="cell1" onClick={() => handleClick(0, 0)}>{moves[0][0]}</Cell>
			<Cell data-testid="cell2" onClick={() => handleClick(0, 1)}>{moves[0][1]}</Cell>
			<Cell data-testid="cell3" onClick={() => handleClick(0, 2)}>{moves[0][2]}</Cell>
		</Row>
		<Row>
			<Cell data-testid="cell4" onClick={() => handleClick(1, 0)}>{moves[1][0]}</Cell>
			<Cell data-testid="cell5" onClick={() => handleClick(1, 1)}>{moves[1][1]}</Cell>
			<Cell data-testid="cell6" onClick={() => handleClick(1, 2)}>{moves[1][2]}</Cell>
		</Row>
		<Row>
			<Cell data-testid="cell7" onClick={() => handleClick(2, 0)}>{moves[2][0]}</Cell>
			<Cell data-testid="cell8" onClick={() => handleClick(2, 1)}>{moves[2][1]}</Cell>
			<Cell data-testid="cell9" onClick={() => handleClick(2, 2)}>{moves[2][2]}</Cell>
		</Row>
	</>
)
import { ReactWrapper, mount } from 'enzyme'
import { GameView, IGameViewProps } from './GameView'
import { Turns } from './App'

describe('GameView Component', () => {
	let wrapper: ReactWrapper
	let props: IGameViewProps

	beforeEach(() => {
		props = {
			handleClick: jest.fn(),
			moves: [Turns.X, Turns.O, Turns.X, Turns.X, Turns.O, Turns.O, Turns.O, Turns.X, Turns.X]
		}
		wrapper = mount(<GameView {...props} />)
	})

	it('Check that component exists', () => {
		expect(wrapper.exists()).toBeTruthy()
	})

	it('Check that handleClick works on all cells', () => {
		wrapper.find({'data-testid': 'cell1'}).first().simulate('click')
		expect(props.handleClick).toHaveBeenCalled()
		expect(props.handleClick).toHaveBeenCalledWith(0)

		wrapper.find({'data-testid': 'cell2'}).first().simulate('click')
		expect(props.handleClick).toHaveBeenCalled()
		expect(props.handleClick).toHaveBeenCalledWith(1)

		wrapper.find({'data-testid': 'cell3'}).first().simulate('click')
		expect(props.handleClick).toHaveBeenCalled()
		expect(props.handleClick).toHaveBeenCalledWith(2)

		wrapper.find({'data-testid': 'cell4'}).first().simulate('click')
		expect(props.handleClick).toHaveBeenCalled()
		expect(props.handleClick).toHaveBeenCalledWith(3)

		wrapper.find({'data-testid': 'cell5'}).first().simulate('click')
		expect(props.handleClick).toHaveBeenCalled()
		expect(props.handleClick).toHaveBeenCalledWith(4)

		wrapper.find({'data-testid': 'cell6'}).first().simulate('click')
		expect(props.handleClick).toHaveBeenCalled()
		expect(props.handleClick).toHaveBeenCalledWith(5)

		wrapper.find({'data-testid': 'cell7'}).first().simulate('click')
		expect(props.handleClick).toHaveBeenCalled()
		expect(props.handleClick).toHaveBeenCalledWith(6)

		wrapper.find({'data-testid': 'cell8'}).first().simulate('click')
		expect(props.handleClick).toHaveBeenCalled()
		expect(props.handleClick).toHaveBeenCalledWith(7)

		wrapper.find({'data-testid': 'cell9'}).first().simulate('click')
		expect(props.handleClick).toHaveBeenCalled()
		expect(props.handleClick).toHaveBeenCalledWith(8)
	})

	it('Check that cells have correct text', () => {
		expect(wrapper.find({'data-testid': 'cell1'}).first().text()).toEqual(Turns.X)
		expect(wrapper.find({'data-testid': 'cell2'}).first().text()).toEqual(Turns.O)
		expect(wrapper.find({'data-testid': 'cell3'}).first().text()).toEqual(Turns.X)
		expect(wrapper.find({'data-testid': 'cell4'}).first().text()).toEqual(Turns.X)
		expect(wrapper.find({'data-testid': 'cell5'}).first().text()).toEqual(Turns.O)
		expect(wrapper.find({'data-testid': 'cell6'}).first().text()).toEqual(Turns.O)
		expect(wrapper.find({'data-testid': 'cell7'}).first().text()).toEqual(Turns.O)
		expect(wrapper.find({'data-testid': 'cell8'}).first().text()).toEqual(Turns.X)
		expect(wrapper.find({'data-testid': 'cell9'}).first().text()).toEqual(Turns.X)
	})
})
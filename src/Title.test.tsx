import { ReactWrapper, mount } from 'enzyme'
import { Title, ITitleProps } from './Title'
import { Turns } from './App'

describe('Title Component', () => {
	let wrapper: ReactWrapper
	let props: ITitleProps

	beforeEach(() => {
		props = {
			isWon: false,
			isDraw: false,
			count: 5,
			turn: Turns.X
		}
	})

	it('Check that title exists', () => {
		wrapper = mount(<Title {...props} />)
		expect(wrapper.exists()).toBeTruthy()
	})

	it('Check correct text for next turn', () => {
		wrapper = mount(<Title {...{...props, turn: Turns.O}} />)
		expect(wrapper.text()).toEqual('Next turn: O')
	})

	it('Check correct text for win', () => {
		wrapper = mount(<Title {...{...props, isWon: true}} />)
		expect(wrapper.text()).toEqual('The winner is: X (Next game in 5)')
	})

	it('Check correct text for draw', () => {
		wrapper = mount(<Title {...{...props, isDraw: true, count: 3}} />)
		expect(wrapper.text()).toEqual('Draw (Next game in 3)')
	})
})
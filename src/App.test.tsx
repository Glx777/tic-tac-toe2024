import { ReactWrapper, mount } from 'enzyme'
import { App, Turns } from './App'

describe('App Component', () => {
	let wrapper: ReactWrapper

	beforeEach(() => {
		wrapper = mount(<App />)
	})

	it('Check that component exists', () => {
		expect(wrapper.find({'data-testid': 'app'}).exists()).toBeTruthy()
	})

	it('Check that handleClick works', () => {
		const cell1 = wrapper.find({'data-testid': 'cell1'}).first()
		cell1.simulate('click')
		expect(cell1.text()).toEqual(Turns.X)

		const cell2 = wrapper.find({'data-testid': 'cell2'}).first()
		cell2.simulate('click')
		expect(cell2.text()).toEqual(Turns.O)

		cell2.simulate('click')
		expect(cell2.text()).toEqual(Turns.O)
	})

	describe('Check winning scenarios', () => {
		it('Check all top X', () => {
			const cell1 = wrapper.find({'data-testid': 'cell1'}).first()
			const cell2 = wrapper.find({'data-testid': 'cell2'}).first()
			const cell3 = wrapper.find({'data-testid': 'cell3'}).first()
			const cell4 = wrapper.find({'data-testid': 'cell4'}).first()
			const cell5 = wrapper.find({'data-testid': 'cell5'}).first()

			cell1.simulate('click')
			cell4.simulate('click')
			cell2.simulate('click')
			cell5.simulate('click')
			cell3.simulate('click')

			expect(wrapper.find({'data-testid': 'title'}).first().text()).toEqual('The winner is: X (Next game in 5)')
		})

		it('Check all middle X', () => {
			const cell1 = wrapper.find({'data-testid': 'cell1'}).first()
			const cell2 = wrapper.find({'data-testid': 'cell2'}).first()
			const cell4 = wrapper.find({'data-testid': 'cell4'}).first()
			const cell5 = wrapper.find({'data-testid': 'cell5'}).first()
			const cell6 = wrapper.find({'data-testid': 'cell6'}).first()

			cell4.simulate('click')
			cell1.simulate('click')
			cell5.simulate('click')
			cell2.simulate('click')
			cell6.simulate('click')

			expect(wrapper.find({'data-testid': 'title'}).first().text()).toEqual('The winner is: X (Next game in 5)')
		})

		it('Check all bottom X', () => {
			const cell4 = wrapper.find({'data-testid': 'cell4'}).first()
			const cell5 = wrapper.find({'data-testid': 'cell5'}).first()
			const cell7 = wrapper.find({'data-testid': 'cell7'}).first()
			const cell8 = wrapper.find({'data-testid': 'cell8'}).first()
			const cell9 = wrapper.find({'data-testid': 'cell9'}).first()

			cell7.simulate('click')
			cell4.simulate('click')
			cell8.simulate('click')
			cell5.simulate('click')
			cell9.simulate('click')

			expect(wrapper.find({'data-testid': 'title'}).first().text()).toEqual('The winner is: X (Next game in 5)')
		})

		it('Check all left column X', () => {
			const cell1 = wrapper.find({'data-testid': 'cell1'}).first()
			const cell2 = wrapper.find({'data-testid': 'cell2'}).first()
			const cell4 = wrapper.find({'data-testid': 'cell4'}).first()
			const cell5 = wrapper.find({'data-testid': 'cell5'}).first()
			const cell7 = wrapper.find({'data-testid': 'cell7'}).first()

			cell1.simulate('click')
			cell2.simulate('click')
			cell4.simulate('click')
			cell5.simulate('click')
			cell7.simulate('click')

			expect(wrapper.find({'data-testid': 'title'}).first().text()).toEqual('The winner is: X (Next game in 5)')
		})
	})

	it('Check draw', () => {
		const cell1 = wrapper.find({'data-testid': 'cell1'}).first()
		const cell2 = wrapper.find({'data-testid': 'cell2'}).first()
		const cell3 = wrapper.find({'data-testid': 'cell3'}).first()
		const cell4 = wrapper.find({'data-testid': 'cell4'}).first()
		const cell5 = wrapper.find({'data-testid': 'cell5'}).first()
		const cell6 = wrapper.find({'data-testid': 'cell6'}).first()
		const cell7 = wrapper.find({'data-testid': 'cell7'}).first()
		const cell8 = wrapper.find({'data-testid': 'cell8'}).first()
		const cell9 = wrapper.find({'data-testid': 'cell9'}).first()

		cell1.simulate('click')
		cell2.simulate('click')
		cell3.simulate('click')

		cell5.simulate('click')
		cell4.simulate('click')
		cell6.simulate('click')

		cell8.simulate('click')
		cell7.simulate('click')
		cell9.simulate('click')

		expect(wrapper.find({'data-testid': 'title'}).first().text()).toEqual('Draw (Next game in 5)')
	})
})
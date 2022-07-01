import { fireEvent, render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../src/03-examples"
import { useCounter } from "../../src/hooks/useCounter"
import { useFetch } from "../../src/hooks/useFetch"

jest.mock('../../src/hooks/useFetch')
jest.mock('../../src/hooks/useCounter')

describe('MultipleCustomHooks test', () => {

  const increment = jest.fn()

  useCounter.mockReturnValue({
    counter: 1,
    increment
  })

  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar el componente por defecto', () => {

    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null,
    })

    render(<MultipleCustomHooks />)

    expect(screen.getByText('Loading...'))
    expect(screen.getByRole('button', { name: 'Next quote' }).disaabled)
  })


  test('debe de mostrar el quote', () => {

    useFetch.mockReturnValue({
      data: [{ author: 'Ismael', quote: 'Hola mundo!' }],
      isLoading: false,
      hasError: null,
    })

    render(<MultipleCustomHooks />)

    expect(screen.getByText('Ismael')).toBeTruthy()
    expect(screen.getByText('Hola mundo!')).toBeTruthy()

    expect(screen.queryByText('Loading...')).toBeFalsy()
    expect(screen.getByRole('button', { name: 'Next quote' }).disaabled).toBeFalsy()
  })


  test('debe de llamar a la función increment', () => {

    useFetch.mockReturnValue({
      data: [{ author: 'Ismael', quote: 'Hola mundo!' }],
      isLoading: false,
      hasError: null,
    })

    render(<MultipleCustomHooks />)

    const button = screen.getByRole('button', { name: 'Next quote' })

    fireEvent.click(button)

    expect(increment).toHaveBeenCalledTimes(1)

  })
})
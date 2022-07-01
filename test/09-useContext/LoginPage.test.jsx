import { render, screen, fireEvent } from "@testing-library/react"
import { UserContext } from "../../src/09-useContext/context/UserContext"
import { LoginPage } from "../../src/09-useContext/LoginPage"

describe('LoginPage test', () => {

  const user = {
    id: 123,
    name: 'Juan',
    email: 'juan@google.com'
  }

  const setUser = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar el componente correctamente', () => {

    render(
      <UserContext.Provider value={{ user: null }}>
        <LoginPage />
      </UserContext.Provider>
    )

    expect(screen.getByLabelText('pre').innerHTML).toContain('null')

  })

  test('debe de llamar al setUser cuando se hace click en el boton', () => {

    render(
      <UserContext.Provider value={{ user: null, setUser }}>
        <LoginPage />
      </UserContext.Provider>
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(setUser).toHaveBeenCalledTimes(1)
    expect(setUser).toHaveBeenCalledWith(user)

  })


})
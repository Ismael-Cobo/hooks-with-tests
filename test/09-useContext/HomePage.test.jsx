import { render, screen } from "@testing-library/react"
import { UserContext } from "../../src/09-useContext/context/UserContext"
import { HomePage } from "../../src/09-useContext/HomePage"


describe('HomePage test', () => {

  const user = {
    id: 1,
    name: 'Ismael'
  }

  test('debe de mostrarse el componente correctamente si tiene el usuario en null', () => {

    render(
      <UserContext.Provider value={{ user: null }}>
        <HomePage />
      </UserContext.Provider>
    )

    expect(screen.getByLabelText('span').innerHTML).toBe('null')

  })


  test('debe de mostrarse el componente correctamente con el usuario', () => {

    render(
      <UserContext.Provider value={{ user }}>
        <HomePage />
      </UserContext.Provider>
    )

    expect(screen.getByLabelText('span').innerHTML).toContain(user.name)
    expect(screen.getByLabelText('span').innerHTML).toContain(`${user.id}`)

  })
})
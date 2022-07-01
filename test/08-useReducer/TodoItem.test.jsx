import { render, screen, fireEvent } from "@testing-library/react"
import { TodoItem } from "../../src/08-useReducer/TodoItem"

import { todoCompletado, todoPendiente } from "../../fixtures/todo"

describe('TodoItem test', () => {

  const onDeleteTodo = jest.fn()

  const onToggleTodo = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar el todo pendiente', () => {

    render(<TodoItem todo={todoPendiente} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo} />)

    const describeTextClassname = screen.getByText(todoPendiente.description).className

    expect(describeTextClassname).toContain('align-self-center')
    expect(describeTextClassname).not.toContain('text-decoration-line-through')

  })

  test('debe de mostrar el todo completado', () => {

    render(<TodoItem todo={todoCompletado} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo} />)

    const describeTextClassname = screen.getByText(todoCompletado.description).className

    expect(describeTextClassname).toContain('align-self-center')
    expect(describeTextClassname).toContain('text-decoration-line-through')
  })

  // No se hace el test de que al clicar al todo se tache porque eso ya lo probamos en el reducer
  test('debe de llamarse el onToggleTodo al hacer click en el todo', () => {

    render(<TodoItem todo={todoPendiente} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo} />)

    const describeText = screen.getByText(todoPendiente.description)

    fireEvent.click(describeText)

    expect(onToggleTodo).toHaveBeenCalledTimes(1)
    expect(onToggleTodo).toHaveBeenCalledWith(todoPendiente.id)
  })

  test('debe de llamarse el onDeleteTodo al hacer click en el boton de eliminar todo', () => {

    render(<TodoItem todo={todoPendiente} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo} />)

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(onDeleteTodo).toHaveBeenCalledTimes(1)
    expect(onDeleteTodo).toHaveBeenCalledWith(todoPendiente.id)
  })

})
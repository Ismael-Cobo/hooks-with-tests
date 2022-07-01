import { render, screen } from "@testing-library/react"
import { todoCompletado, todoPendiente } from "../../fixtures/todo"
import { TodoApp } from "../../src/08-useReducer/TodoApp"
import { useTodos } from "../../src/hooks/useTodos"
jest.mock("../../src/hooks/useTodos")

describe('TodoApp test', () => {

  const todos = [todoPendiente, todoCompletado]
  const todosCount = todos.length
  const handleNewTodo = jest.fn()
  const handleDeleteTodo = jest.fn()
  const handleToggleTodo = jest.fn()

  test('debe de mostrar el componente correctamente', () => {

    useTodos.mockReturnValue({
      todos,
      todosCount,
      pendingTodosCount: todos.filter(todo => !todo.done).length,
      handleNewTodo,
      handleDeleteTodo,
      handleToggleTodo,
    })

    render(<TodoApp />)



    expect(screen.getByText(todoCompletado.description))
    expect(screen.getByText(todoPendiente.description))
    expect(screen.getByRole('textbox').name).toBe('description')
    expect(screen.getAllByRole('listitem').length).toBe(2)

  })

})
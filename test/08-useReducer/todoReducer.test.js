import { todoReducer } from "../../src/08-useReducer/todoReducer"

describe('todoReducer test', () => { 

  const initialState = [{
    id: 1,
    description: 'Demo todo',
    done: false
  }]

  test('debe de devolver los valores por defecto', () => { 

    const state  = todoReducer( initialState , '' )

    expect(state).toStrictEqual(initialState)

  })

  test('debe de agregar un todo', () => {
    
    const action = { 
      type: '[TODO] Add Todo', 
      payload:  {
        id: 2,
        description: 'Demo todo 2',
        done: false
      }
    }

    const state  = todoReducer( initialState , action )
    
    expect(state).toStrictEqual([
      ...initialState,
      action.payload
    ])
  })


  test('debe de eliminar un todo', () => { 
    const action = { 
      type: '[TODO] Remove Todo', 
      payload: 1
    }

    const state  = todoReducer( initialState , action )
    
    expect(state).toStrictEqual([])
  })

  test('debe de añadir y eliminar un todo', () => { 

    let action = { 
      type: '[TODO] Add Todo', 
      payload:  {
        id: 2,
        description: 'Demo todo 2',
        done: false
      }
    }

    let state  = todoReducer( initialState , action )

    let action2 = { 
      type: '[TODO] Remove Todo', 
      payload: 1
    }

    let state2  = todoReducer( state , action2 )
    
    expect(state2).toStrictEqual([action.payload])
  })
  test('debe de eliminar un todo', () => { 
    const action = { 
      type: '[TODO] Toggle Todo', 
      payload: 1
    }

    const state  = todoReducer( initialState , action )
    expect(state[0].done).toBe(true)
    const state2  = todoReducer( state , action )
    expect(state2[0].done).toBe(false)
  })


 })
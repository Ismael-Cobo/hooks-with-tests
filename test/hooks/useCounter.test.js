import { renderHook, act } from "@testing-library/react"
import { useCounter } from "../../src/hooks/useCounter"

describe('useCounter test', () => { 
  
  test('debe de devolver los valores por defecto', () => { 
    
    const { result } = renderHook(() => useCounter())

    const { counter, decrement, increment, reset} = result.current

    expect( counter ).toBe(10)
    expect( decrement ).toEqual(expect.any(Function))
    expect( increment ).toEqual(expect.any(Function))
    expect( reset ).toEqual(expect.any(Function))
   })

   test('debe de devolver 100 si el valor por defecto es 100', () => { 
    
    const { result } = renderHook(() => useCounter(100))

    expect( result.current.counter ).toBe(100)
   })

   test('debe de hacer el increment correctamente', () => { 
    
    const { result } = renderHook(() => useCounter())

    act(() => result.current.increment() )

    expect( result.current.counter ).toBe(11)
   })

   test('debe de hacer el decrement correctamente', () => { 
    
    const { result } = renderHook(() => useCounter())

    act(() => result.current.decrement() )
    
    expect( result.current.counter ).toBe(9)
   })

   test('debe de hacer el increment y el reset correctamente', () => { 
    
    const { result } = renderHook(() => useCounter())

    act(() => result.current.increment() )
    act(() => result.current.reset() )

    
    expect( result.current.counter ).toBe(10)
   })

   test('debe de hacer el increment, el decrement y el reset correctamente', () => { 
    
    const { result } = renderHook(() => useCounter())

    act(() => result.current.decrement() )
    act(() => result.current.decrement() )

    act(() => result.current.increment() )

    act(() => result.current.reset() )
    
    expect( result.current.counter ).toBe(10)
   })

 })
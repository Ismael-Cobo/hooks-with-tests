import { act, renderHook } from "@testing-library/react"
import { useForm } from "../../src/hooks/useForm"

describe('useForm test', () => { 

  const initialForm = {
    email: 'Ismael@ismael.com',
    name: 'Ismael',
    password: '123456'
  }

  test('debe de devolver los valores por defecto', () => { 
  
    const { result } = renderHook(() => useForm(initialForm))

    const { email, name, password, formState, onInputChange, onResetForm } = result.current

    expect(email).toBe(initialForm.email)
    expect(name).toBe(initialForm.name)
    expect(password).toBe(initialForm.password)

    expect(formState).toStrictEqual (initialForm)
    expect(onInputChange).toStrictEqual(expect.any(Function))
    expect(onResetForm).toStrictEqual(expect.any(Function))
  })

  test('debe de cambiar el nombre del formulario', () => { 

    const { result } = renderHook(() => useForm(initialForm))

    act(() => result.current.onInputChange({target: {name: 'name', value: 'Ismael 2'}})) 

    expect(result.current.name).toBe('Ismael 2')
    expect(result.current.formState.name).toBe('Ismael 2')
  })

  test('debe de cambiar el nombre del formulario y luego hacer el reset', () => { 

    const { result } = renderHook(() => useForm(initialForm))

    act(() => result.current.onInputChange({target: {name: 'name', value: 'Ismael 2'}})) 
    act(() => result.current.onInputChange({target: {name: 'email', value: 'Ismael2@ismael.com'}})) 
    act(() => result.current.onResetForm()) 

    expect(result.current.name).toBe('Ismael')
    expect(result.current.formState.name).toBe('Ismael')
    expect(result.current.email).toBe('Ismael@ismael.com')
    expect(result.current.formState.email).toBe('Ismael@ismael.com')
  })


 })
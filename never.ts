{
  let number = 3
  let unknown: unknown = undefined
  let never: string & number = undefined as never
  let any: any = undefined

  number = unknown
  number = never
  number = any

  unknown = number
  never = number
  any = number

  unknown = never
  never = unknown
  unknown = any
  any = unknown
  never = any
  any = never
}

{
  try {
    // e type is unknown, can be changed from tsconfig to any which disables type checks.
  } catch (e) {
    // Correct way of typechecking.
    if (e instanceof Error) console.log(e.stack)
  }

  try {
    // TypeScript can't really check the type of throws so manual typing is not allwed.
  } catch (e: Error) {
    //
  }
}
{
  // Some api call might return unknown values.
  const apiCall = () => 3 as unknown

  const value = apiCall()
  console.log(value + 10)
  // So the proper way is to check the type before doing anything.
  if (typeof value == "number") console.log(value + 10)
}

{
  // If you have issues with types:
  const foo = (value: string) => console.log(value)
  // 1. Try unknown/never.
  foo(3 as unknown)
  // 2. Try the other one
  foo(3 as never)
  // 3. ??? (actually try to understand the issue)
  foo(String(3))
  // 3. Or just use any and suppress the eslint warning.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  foo(3 as any)
}

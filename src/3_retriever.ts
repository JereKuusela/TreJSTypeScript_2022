type Data = {
  first: string
  last: string
  age: string
}

{
  // Gets hardcoded data from the local storage.
  const getPerson = () => {
    const first = localStorage.getItem("first") ?? ""
    const last = localStorage.getItem("last") ?? ""
    return { first, last }
  }
  const getPersonWithAge = () => {
    const first = localStorage.getItem("first") ?? ""
    const last = localStorage.getItem("last") ?? ""
    const age = localStorage.getItem("age") ?? ""
    return { first, last, age }
  }
  const person = getPerson()
  const personAge = getPersonWithAge()
}
{
  // Much more fancier: Gets any data from the local storage.
  const getData = (...keys: string[]) => {
    const data: Record<string, string> = {}
    for (const key of keys) data[key] = localStorage.getItem(key) ?? ""
    return data
  }
  // But no type safety...
  const person = getData("first", "last") // Just Record<string, string> with no type safety.
  const personAge = getData("first, last", "age") // Invalid key is not detected.
}
{
  // Some type support: Given keys are returned in the Record.
  const getData = <K extends string>(...keys: K[]) => {
    const data = {} as Record<K, string>
    for (const key of keys) data[key] = localStorage.getItem(key) ?? ""
    return data
  }
  const person = getData("first", "last") // Record now has they keys.
  const personAge = getData("first last", "age") // But invalid key is still not detected.
}
{
  // Adds a type to the keys.
  const getData = <K extends keyof Data>(...keys: K[]) => {
    const data = {} as Pick<Data, K>
    for (const key of keys) data[key] = localStorage.getItem(key) ?? ""
    return data
  }
  const person = getData("first", "last")
  const personAge = getData("first", "last", "age") // Now invalid key wouldn't work.
}

type DataWithNumber = {
  first: string
  last: string
  age: number
}

{
  // Other types won't work nicely.
  // Types are not JavaScript and can't be used in the actual code logic.
  const getData = <K extends keyof DataWithNumber>(...keys: K[]) => {
    const data = {} as Pick<DataWithNumber, K>
    for (const key of keys) {
      // Manual checking, very error prone.
      if (key == "age") data[key] = Number(localStorage.getItem(key) ?? 0) as never
      else data[key] = (localStorage.getItem(key) ?? "") as never
    }
    return data
  }
  const person = getData("first", "last")
  const personAge = getData("first", "last", "age")
}

{
  const defaultValue: DataWithNumber = {
    age: 0,
    first: "",
    last: "",
  }
  // But providing default values is a real JavaScript object.
  const getData = <K extends keyof DataWithNumber>(...keys: K[]) => {
    const data = {} as Pick<DataWithNumber, K>
    for (const key of keys) {
      // So we can use its type for typechecking.
      if (typeof defaultValue[key] == "number")
        data[key] = Number(localStorage.getItem(key) ?? defaultValue[key]) as typeof data[typeof key]
      else
        // Good example where you might just skip the type check instead of doing above.
        data[key] = (localStorage.getItem(key) ?? defaultValue[key]) as any
    }
    return data
  }
  const person = getData("first", "last")
  const personAge = getData("first", "last", "age")
}

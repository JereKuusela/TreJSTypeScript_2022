type Data = {
  first: string
  last: string
  age: string
}

{
  // Gets specific data from the local storage.
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
  // Gets any data from the local storage.
  const getData = (...keys: string[]) => {
    const data: Record<string, string> = {}
    for (const key of keys) data[key] = localStorage.getItem(key) ?? ""
    return data
  }
  const person = getData("first", "last")
  const personAge = getData("first, last", "age")
}
{
  // Some type support (the mistake is still not spotted).
  const getData = <K extends string>(...keys: K[]) => {
    const data = {} as Record<K, string>
    for (const key of keys) data[key] = localStorage.getItem(key) ?? ""
    return data
  }
  const person = getData("first", "last")
  const personAge = getData("first last", "age")
}
{
  // Better type support (keys are checked).
  const getData = <K extends keyof Data>(...keys: K[]) => {
    const data = {} as Pick<Data, K>
    for (const key of keys) data[key] = localStorage.getItem(key) ?? ""
    return data
  }
  const person = getData("first", "last")
  const personAge = getData("first", "last", "age")
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
  // But providing default values is a real thing.
  const getData = <K extends keyof DataWithNumber>(...keys: K[]) => {
    const data = {} as Pick<DataWithNumber, K>
    for (const key of keys) {
      if (typeof defaultValue[key] == "number")
        data[key] = Number(localStorage.getItem(key) ?? defaultValue[key]) as never
      else data[key] = (localStorage.getItem(key) ?? defaultValue[key]) as never
    }
    return data
  }
  const person = getData("first", "last")
  const personAge = getData("first", "last", "age")
}

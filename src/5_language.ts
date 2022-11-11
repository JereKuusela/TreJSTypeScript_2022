import * as langFlat from "../languageFlat.json"
import * as langNested from "../languageNested.json"
import * as langDeepNested from "../languageDeepNested.json"

type LanguageKeyFlat = keyof typeof langFlat

// For a flat file, a simple key of works perfectly.
const translateFlat = (key: LanguageKeyFlat) => langFlat[key]

translateFlat("main.title")


type LanguageKeyNested = keyof typeof langNested

// But for nested it only returns the main level keys.
const translateNested = (key: LanguageKeyNested) => langNested[key]

translateNested("main")



type Lang = typeof langNested
type LangDeep = typeof langDeepNested

{
  // Type mapping allows iterating through keys and values.
  type Keys = keyof {[Key in keyof Lang]: string}
}

{
  // Mapping allows changing the key to something else.
  // This detects objects and marks it as TODO.
  type Keys = keyof {[Key in keyof Lang as Lang[Key] extends string ? Key : "TODO"]: string}
}

{
  // Key mapping extracted to a new type. This helps splitting up complicated logic.
  type Mapper<Key, Value> = Value extends string ? Key : "TODO"
  type Keys = keyof {[Key in keyof Lang as Mapper<Key, Lang[Key]>]: string}
}

{
  // Key mapper returs keys of the object.
  // TypeScript automatically merges the collection.
  type Mapper<Key, Value> = Value extends string ? Key : keyof Value
  type Keys = keyof{[Key in keyof Lang as Mapper<Key, Lang[Key]>]: string}
}

{
  // Adds a new type which combines the main level and sub level keys.
  type Prefixer<Prefix, Value> = {[SubKey in keyof Value as `${Prefix & string}.${SubKey & string}`]: string}
  type Mapper<Key, Value> = Value extends string ? Key : keyof Prefixer<Key, Value>
  type Keys = keyof {[Key in keyof Lang as Mapper<Key, Lang[Key]>]: string}

  // This won't work for deeper levels.
  type DeepKeys = keyof {[Key in keyof LangDeep as Mapper<Key, LangDeep[Key]>]: string}
}

{
  // Mapper -> Prefixer -> Mapper -> Prefixer -> ...
  type Prefixer<Prefix, Value> = {[SubKey in keyof Value as Mapper<`${Prefix & string}.${SubKey & string}`, Value[SubKey]>]: string}
  type Mapper<Key, Value> = Value extends string ? Key : keyof Prefixer<Key,Value>
  type Keys = keyof {[K in keyof LangDeep as Mapper<K, LangDeep[K]>]: string}
}



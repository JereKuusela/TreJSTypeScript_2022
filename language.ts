import * as langFlat from "./languageFlat.json"
import * as langNested from "./languageNested.json"

type LanguageKeyFlat = keyof typeof langFlat

const translateFlat = (key: LanguageKeyFlat) => langFlat[key]

translateFlat("main.title")


type LanguageKeyNested = keyof typeof langNested

const translateNested = (key: LanguageKeyNested) => langNested[key]

translateNested("main")



type Lang = typeof langNested

{ // Type mapping.
  type Keys = keyof {[Key in keyof Lang]: string}
}

{ // Key mapping.
  type Keys = keyof {[Key in keyof Lang as Lang[Key] extends string ? Key : "TODO"]: string}
}

{ // Key mapping as an own type.
  type Mapper<Key, Value> = Value extends string ? Key : "TODO"
  type Keys = keyof {[Key in keyof Lang as Mapper<Key, Lang[Key]>]: string}
}

{ // Key mapper returning some value.
  type Mapper<Key, Value> = Value extends string ? Key : keyof Value
  type Keys = keyof{[Key in keyof Lang as Mapper<Key, Lang[Key]>]: string}
}

{ // Some value replaced with a type that adds a prefix.
  type Prefixer<Prefix, Value> = {[SubKey in keyof Value as `${Prefix & string}.${SubKey & string}`]: string}
  type Mapper<Key, Value> = Value extends string ? Key : keyof Prefixer<Key, Value>
  type Keys = keyof {[Key in keyof Lang as Mapper<Key, Lang[Key]>]: string}
}

{ // Recursion.
  type Prefixer<Prefix, Value> = {[SubKey in keyof Value as Mapper<`${Prefix & string}.${SubKey & string}`, Value[SubKey]>]: string}
  type Mapper<Key, Value> = Value extends string ? Key : keyof Prefixer<Key,Value>
  type Keys = keyof {[K in keyof Lang as Mapper<K, Lang[K]>]: string}
}
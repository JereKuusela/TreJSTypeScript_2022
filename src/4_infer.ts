{
  // Converts simple types to arrays.
  type Pack<T> = T extends any[] ? T : T[]
  type T1 = Pack<number[]>
  type T2 = Pack<number>
}

{
  // Tries to convert arrays to simple types.
  // But what to return?
  type Unpack<T> = T extends any[] ? "???" : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  // Looks good but R must be in the declaration.
  type Unpack<T> = T extends R[] ? R : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  type Unpack<T, R> = T extends R[] ? R : T
  // But in the declaration, it must be given here....
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  // Providing default value just results in the default value being used.
  type Unpack<T, R extends any = unknown> = T extends R[] ? R : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  // Infer allows introducing a new type variable.
  type Unpack<T> = T extends (infer R)[] ? R : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  // Another way of doing this.
  type Unpack<T, K extends keyof T = keyof T> = T extends any[] ? T[K] : T
  // But returns also all functions of the array!
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  type Unpack<T, K extends keyof T = keyof T> = T extends any[] ? Exclude<T[K], Function> : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
  // But also returns number from the .length!
  type T3 = Unpack<string[]>
}

{
  type Unpack<T, K extends keyof T = keyof T> = T extends any[] ? (K extends number ? T[K] : never) : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
  // Only returns the actual value.
  type T3 = Unpack<string[]>
}

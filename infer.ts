
{
  type Pack<T> = T extends any[] ? T : T[]
  type T1 = Pack<number[]>
  type T2 = Pack<number>
}

{
  type Unpack<T> = T extends any[] ? "???" : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  type Unpack<T> = T extends R[] ? R : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  type Unpack<T, R> = T extends R[] ? R : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  type Unpack<T, R extends any = unknown> = T extends R[] ? R : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  type Unpack<T> = T extends (infer R)[] ? R : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}



{
  type Unpack<T, K extends keyof T = keyof T> = T extends any[] ? T[K] : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
}

{
  type Unpack<T, K extends keyof T = keyof T> = T extends any[] ? Exclude<T[K], Function> : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
  type T3 = Unpack<string[]>
}

{
  type Unpack<T, K extends keyof T = keyof T> = T extends any[] ? (K extends number ? T[K] : never) : T
  type T1 = Unpack<number[]>
  type T2 = Unpack<number>
  type T3 = Unpack<string[]> 
}
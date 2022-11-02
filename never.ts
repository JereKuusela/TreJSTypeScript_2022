


let number = 3
let unknown: unknown = undefined
let never: never = undefined as never
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
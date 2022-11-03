


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

// If you have issues with types:

// 1. Try never.

// 2. If it doesn't work, try unknown.

// 3. ???

// 4. Or just use any and suppress the eslint warning.


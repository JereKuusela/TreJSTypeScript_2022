{
  type A = { foo: string; bar: string }
  type B = Partial<A>
  type C = Required<B>
  type D = Readonly<C>

  type R = Record<string, A>
  const Record: R = {}
  Record.foo = "bar"
  Record.foo = { bar: "", foo: "" }

  type E = Pick<C, "foo">
  type F = Pick<C, "foo" | "bar">
  type G = Omit<C, "foo">
  type H = Omit<C, "foo" | "bar">
  type I = Exclude<"foo" | "bar", "foo" | "test">
  type J = Extract<"foo" | "bar", "foo" | "test">
  type K = ("foo" | "bar") & ("foo" | "test")
  type L = NonNullable<null | "foo">
  type M = Parameters<(foo: string, bar: number) => void>
  type N = ReturnType<(foo: string, bar: number) => void>
}

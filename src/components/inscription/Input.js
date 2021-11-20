import { forwardRef } from 'react'

const Input = forwardRef(({ onchange, ...props }, ref) => (
  <input ref={ref} onChange={onchange} {...props} />
))

export default Input

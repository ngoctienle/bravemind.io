import { createElement } from 'react'

import twclsx from '@/libs/twclsx'

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Button({ children, className, ...props }: ButtonProps) {
  return createElement('button', { ...props, className: twclsx('flex items-center', className) }, children)
}

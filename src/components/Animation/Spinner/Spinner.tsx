import { ImSpinner2 } from 'react-icons/im'

import twclsx from '@/libs/twclsx'

const spinnerSize = {
  xs: 'w-4 h-4',
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
}

const containerSize = {
  fit: 'w-fit h-fit',
  full: 'w-full h-full'
}

type SpinnerProps = {
  spinnerSize: keyof typeof spinnerSize
  containerSize: keyof typeof containerSize
  containerStyle?: string
}

export default function Spinner(props: SpinnerProps) {
  return (
    <div
      className={twclsx(
        'flex items-center justify-center',
        'bg-theme-50 dark:bg-theme-900',
        containerSize[props.containerSize],
        props.containerStyle
      )}
    >
      <ImSpinner2 className={twclsx('animate-spin dark:text-theme-50', spinnerSize[props.spinnerSize])} />
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

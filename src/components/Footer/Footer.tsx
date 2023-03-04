import { NextFont } from 'next/dist/compiled/@next/font'

import twclsx from '@/libs/twclsx'

interface FooterProps {
  font: NextFont
}

export default function Footer({ font }: FooterProps) {
  return (
    <footer className={twclsx(font.className, 'mt-auto py-4')}>
      <p className='text-base text-center'>Copyright © 2023 BraveMind. All Rights Reserved.</p>
    </footer>
  )
}

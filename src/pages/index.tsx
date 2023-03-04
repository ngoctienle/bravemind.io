import Link from 'next/link'
import { HiArrowNarrowRight, HiOutlineGift } from 'react-icons/hi'

import twclsx from '@/libs/twclsx'

import Button from '@/components/common/Button'

export default function Home() {
  return (
    <>
      <section className='py-10'>
        <div className='container'>
          <div className='mt-10'>
            <h2 className='flex flex-col text-6xl font-extrabold gap-4 text-light-text-1'>
              <span>Navigate The Market</span>
              <span>With Confidence</span>
            </h2>
            <p className='mt-5 text-light-text-2 text-lg'>
              Learn ICT concepts with a community of like-minded individuals.
            </p>
          </div>
          <div className='mt-5'>
            <div className='flex gap-2 items-center'>
              <HiOutlineGift className='w-4 h-4 md:w-5 md:h-5 text-light-blue' />
              <p className='text-sm text-light-text-1'>Start Your Trading Journey</p>
            </div>
            <Link href='/login' className='inline-block mt-5'>
              <Button
                className={twclsx(
                  'h-12 bg-light-blue transition-colors relative justify-start w-[180px] group hover:bg-light-blue-hover px-5 text-light-white rounded-lg'
                )}
              >
                Join Now
                <HiArrowNarrowRight className='w-4 h-4 md:w-5 md:h-5 text-light-white ml-5 transition-all group-hover:right-4 absolute top-1/2 -translate-y-1/2 right-5' />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { TinyWaveFormIcon } from '@/components/TinyWaveFormIcon'

export function AboutSection(props: React.ComponentPropsWithoutRef<'section'>) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-violet-300', 'fill-pink-300']}
          className="h-2.5 w-2.5"
        />
        <span className="ml-2.5">About</span>
      </h2>
      <p
        className="mt-2 text-base leading-7 text-slate-700"
      >
       Our mission is to create a platform for sharing knowledge and experience in the field of Web3,
       where each of us can study, discuss and contribute to the development of these technologies!
      </p>
    </section>
  )
}

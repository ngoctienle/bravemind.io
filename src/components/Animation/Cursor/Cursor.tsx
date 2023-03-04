/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnimatedCursorType, Coords } from 'bravemind.io'
import { useCallback, useEffect, useRef, useState } from 'react'

import useEventListener from '@/hooks/useEventListener'

interface Styles {
  cursor: React.CSSProperties
  cursorInner: React.CSSProperties
  cursorOuter: React.CSSProperties
}

export default function Cursor({
  color = '145, 234, 228',
  outerAlpha = 0.4,
  innerSize = 8,
  outerSize = 16,
  outerScale = 4,
  innerScale = 0.2
}: AnimatedCursorType) {
  const cursorOuterRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isActiveClickable, setIsActiveClickable] = useState<boolean>(false)
  const endX = useRef<number>(0)
  const endY = useRef<number>(0)

  const animateOuterCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 10
        coords.y += (endY.current - coords.y) / 10
        if (cursorOuterRef.current) {
          cursorOuterRef.current.style.top = `${coords.y - 4}px`
          cursorOuterRef.current.style.left = `${coords.x - 4}px`
        }
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animateOuterCursor)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [requestRef]
  )
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor)
    return () => cancelAnimationFrame(requestRef.current!)
  }, [animateOuterCursor])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMouseMove = useCallback(({ clientX, clientY }: any) => {
    setCoords({ x: clientX, y: clientY })
    if (cursorInnerRef.current && cursorOuterRef.current) {
      cursorInnerRef.current.style.top = `${clientY}px`
      cursorInnerRef.current.style.left = `${clientX}px`
      endX.current = clientX
      endY.current = clientY
    }
  }, [])
  const onMouseDown = useCallback(() => setIsActive(true), [])
  const onMouseUp = useCallback(() => setIsActive(false), [])
  const onMouseEnter = useCallback(() => setIsVisible(true), [])
  const onMouseLeave = useCallback(() => setIsVisible(false), [])

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [onMouseMove, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave])
  if (typeof document !== 'undefined') {
    useEventListener('mousedown', onMouseMove, document)
    useEventListener('mousedown', onMouseDown, document)
    useEventListener('mouseup', onMouseUp, document)
    useEventListener('mouseenter', onMouseEnter, document)
    useEventListener('mouseleave', onMouseLeave, document)
  }

  useEffect(() => {
    if (cursorInnerRef.current && cursorOuterRef.current) {
      if (isActive) {
        cursorInnerRef.current.style.transform = `scale(${innerScale})`
        cursorInnerRef.current.style.backgroundColor = `transparent`
        cursorOuterRef.current.style.transform = `scale(${outerScale})`
        cursorOuterRef.current.style.borderColor = `transparent`
        cursorOuterRef.current.style.backgroundColor = `rgba(${color}, ${outerAlpha})`
      } else {
        cursorInnerRef.current.style.transform = 'scale(1)'
        cursorInnerRef.current.style.backgroundColor = `rgba(${color})`
        cursorOuterRef.current.style.transform = 'scale(1)'
        cursorOuterRef.current.style.borderColor = `#91EAE4`
        cursorOuterRef.current.style.backgroundColor = `transparent`
      }
    }
  }, [innerScale, outerScale, isActive, color, outerAlpha])

  useEffect(() => {
    if (cursorInnerRef.current && cursorOuterRef.current) {
      if (isActiveClickable) {
        cursorInnerRef.current.style.transform = `scale(${innerScale})`
        cursorOuterRef.current.style.transform = `scale(${outerScale})`
      }
    }
  }, [innerScale, outerScale, isActiveClickable])

  useEffect(() => {
    if (cursorInnerRef.current && cursorOuterRef.current) {
      if (isVisible) {
        cursorInnerRef.current.style.opacity = '1'
        cursorOuterRef.current.style.opacity = '1'
      } else {
        cursorInnerRef.current.style.opacity = '0'
        cursorOuterRef.current.style.opacity = '0'
      }
    }
  }, [isVisible])

  useEffect(() => {
    const clickables = document.querySelectorAll<HTMLElement>(
      'a, input[type="submit"], input[type="image"], label[for], select, button'
    )
    clickables.forEach((el) => {
      el.style.cursor = 'none'

      el.addEventListener('mouseover', () => {
        setIsActive(true)
      })
      el.addEventListener('click', () => {
        setIsActive(true)
        setIsActiveClickable(false)
      })
      el.addEventListener('mousedown', () => {
        setIsActiveClickable(true)
      })
      el.addEventListener('mouseup', () => {
        setIsActive(true)
      })
      el.addEventListener('mouseout', () => {
        setIsActive(false)
        setIsActiveClickable(false)
      })
    })

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener('mouseover', () => {
          setIsActive(true)
        })
        el.removeEventListener('click', () => {
          setIsActive(true)
          setIsActiveClickable(false)
        })
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable(true)
        })
        el.removeEventListener('mouseup', () => {
          setIsActive(true)
        })
        el.removeEventListener('mouseout', () => {
          setIsActive(false)
          setIsActiveClickable(false)
        })
      })
    }
  }, [isActive])

  const styles: Styles = {
    cursor: {
      zIndex: '999',
      position: 'fixed',
      opacity: '1',
      pointerEvents: 'none',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out'
    },
    cursorInner: {
      position: 'fixed',
      zIndex: '999',
      borderRadius: '50%',
      width: `${innerSize}px`,
      height: `${innerSize}px`,
      pointerEvents: 'none',
      backgroundColor: `rgba(${color}, 1)`,
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out'
    },
    cursorOuter: {
      position: 'fixed',
      borderRadius: '50%',
      zIndex: '999',
      pointerEvents: 'none',
      border: '1px solid #91EAE4',
      width: `${outerSize}px`,
      height: `${outerSize}px`,
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out'
    }
  }

  return (
    <>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </>
  )
}

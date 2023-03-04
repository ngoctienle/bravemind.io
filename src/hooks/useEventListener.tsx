import { RefObject, useEffect, useRef } from 'react'

type EventCallback = (event: Event) => void

export default function useEventListener(
  eventName: string,
  handler: EventCallback,
  element?: HTMLElement | RefObject<HTMLElement> | Document
): void {
  const savedHandler = useRef<EventCallback>()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = (element && 'current' in element ? element.current : element) as HTMLElement
    if (!targetElement) {
      return
    }

    const isSupported = targetElement && targetElement.addEventListener
    if (!isSupported) {
      return
    }

    const eventListener = (event: Event) => savedHandler.current?.(event)

    targetElement.addEventListener(eventName, eventListener)

    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

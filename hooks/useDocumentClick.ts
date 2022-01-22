import React, { MouseEvent, useEffect } from 'react'

export function useOutsideDropdownClicked(
    refs: React.RefObject<HTMLElement>[],
    handler: (e: React.MouseEvent<HTMLDivElement>) => void
) {
    useEffect(() => {
        const documentClickHandler = (event: any): void => {
            const isDropdownClicked = refs.some((r) => {
                return r.current && r.current.contains(event.target)
            })

            if (!isDropdownClicked) {
                handler(event)
            }
        }

        document.addEventListener('mousedown', documentClickHandler)

        return () => {
            document.removeEventListener('mousedown', documentClickHandler)
        }
    }, [refs])
}

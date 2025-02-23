import {cn} from '@udecode/cn'
import React, { useEffect, useState } from 'react'

interface Props {
    style?: React.CSSProperties
    className?: string
}

export default React.memo(CircularLoading)

function CircularLoading(props: Props): React.JSX.Element | null {
    const { style, className } = props
    const [timePassed, setTimePassed] = useState(false)

    useEffect(() => {
        setTimeout(() => setTimePassed(true), 500)
    }, [])

    if (!timePassed) {
        return null
    }

    return (
        <div className={cn('spinner-container ', className)} style={style}>
            <span className="spinner-span-container">
                <svg
                    className={cn('spinner-icon !stroke-blue-500', {})}
                    focusable="false"
                    height={24}
                    width={24}
                    viewBox={'0 0 48 48'}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx={24}
                        cy={24}
                        r={20}
                        strokeWidth={4}
                    />
                </svg>
            </span>
        </div>
    )
}

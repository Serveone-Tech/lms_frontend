import classNames from 'classnames'

interface ProgressBarProps {
    value: number
    showPercentage?: boolean
    size?: 'sm' | 'md' | 'lg'
    color?: 'primary' | 'success' | 'warning' | 'danger'
    className?: string
}

export default function ProgressBar({
    value,
    showPercentage = false,
    size = 'md',
    color = 'primary',
    className,
}: ProgressBarProps) {
    const sizeClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
    }

    const colorClasses = {
        primary: 'bg-primary',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        danger: 'bg-red-500',
    }

    return (
        <div className={classNames('flex items-center gap-2', className)}>
            <div
                className={classNames(
                    'flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
                    sizeClasses[size]
                )}
            >
                <div
                    className={classNames(
                        'h-full rounded-full transition-all duration-300 ease-in-out',
                        colorClasses[color]
                    )}
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                />
            </div>
            {showPercentage && (
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-12 text-right">
                    {Math.round(value)}%
                </span>
            )}
        </div>
    )
}

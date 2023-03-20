import { createUseStyles, useTheme } from 'react-jss'
import { useEffect } from 'react'
import cx from 'classnames'
import { FAILURE, SUCCESS } from '../utilities/constants'
import {
    SuccessIcon,
    CloseIcon,
    FailureIcon,
    AlertIcon,
    InfoIcon,
} from '../theme/icons'

const useStyles = createUseStyles((theme) => ({
    root: {
        pointerEvents: 'auto',
        margin: '0 auto 8px auto',
        zIndex: 1029,
        padding: [16],
        maxWidth: 1156,
        color: ({ variantStyle }) => variantStyle.color,
        backgroundColor: ({ variantStyle }) => variantStyle.backgroundColor,
        borderRadius: 12,
        transition: 'transform 0.2s ease-in-out',
        willChange: 'transform',
        [theme.mediaQueries.mUp]: {
            margin: '0 auto 16px auto',
            right: 'auto',
            left: '50%',
            padding: [16, 32],
            maxWidth: 800,
            minWidth: 600,
        },
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
    },
    content: {
        gridColumnStart: 2,
        display: 'flex',
        flexDirection: 'column',
        marginRight: 16,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 700,
    },
    message: {
        wordBreak: 'break-word',
    },
    action: {},
    icon: {
        display: 'flex',
        marginRight: 16,
    },
    closeIcon: {
        gridColumnStart: 3,
        '& svg': {
            '& path': {
                fill: ({ variantStyle }) => variantStyle.closeIconColor,
            },
        },
    },
    in: {
        transform: `translateY(0)`,
        [theme.sUp]: {
            transform: `translateY(calc(0))`,
        },
    },
    out: {
        transform: 'translateY(-1000%)',
        [theme.sUp]: {
            transform: 'translateY(-1000%)',
        },
    },
}))

const getVariantStyle = (variant, theme) => {
    switch (variant) {
        case SUCCESS:
            return {
                color: theme.palette.success.main,
                backgroundColor: theme.palette.success.background,
                closeIconColor: theme.palette.success.color,
                icon: <SuccessIcon width={22} height={22} />,
            }
        case FAILURE:
            return {
                color: theme.palette.error.main,
                backgroundColor: theme.palette.error.background,
                closeIconColor: theme.palette.error.main,
                icon: <AlertIcon width={22} height={22} />,
            }
        default:
            return {
                color: theme.palette.tertiary.main,
                backgroundColor: theme.palette.tertiary.background,
                closeIconColor: theme.palette.tertiary.color,
                icon: <InfoIcon width={22} height={22} />,
            }
    }
}

const Alert = ({
    visible,
    title,
    message,
    actionCallback,
    dismissTimeout,
    canDismiss = true,
    dismissCallback,
    variant = FAILURE,
    closeIcon = <CloseIcon />,
}) => {
    const theme = useTheme()
    const variantStyle = getVariantStyle(variant, theme)
    const classes = useStyles({ variantStyle })

    useEffect(() => {
        if (dismissTimeout && visible) {
            const timeoutId = setTimeout(() => {
                closeHandler()
            }, +dismissTimeout)
            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [visible])

    const closeHandler = () => {
        dismissCallback && dismissCallback()
    }

    return (
        <div className={cx(classes.root, visible ? classes.in : classes.out)}>
            <div className={classes.container}>
                <span className={classes.icon}>{variantStyle.icon}</span>
                <div className={classes.content}>
                    {title && <span className={classes.title}>{title}</span>}
                    {message && (
                        <span className={classes.message}>{message}</span>
                    )}
                    {actionCallback && <span className={classes.action}></span>}
                </div>
                {canDismiss && (
                    <span className={classes.closeIcon} onClick={closeHandler}>
                        {closeIcon}
                    </span>
                )}
            </div>
        </div>
    )
}

export default Alert

import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '116%',
        right: 0,
        display: 'grid',
        borderRadius: 12,
        minWidth: 140,
        padding: [8, 8],
        backgroundColor: theme.palette.grey[50],
        boxShadow:
            '0px 1px 3px rgba(20, 20, 42, 0.1), 0px 0px 1px rgba(20, 20, 42, 0.05)',
        '& > div > span': {
            fontSize: 14,
            borderRadius: 6,
            padding: 8,
            cursor: 'pointer',
            display: 'grid',
            alignItems: 'center',
            gap: 8,
        },
        zIndex: 1032,
    },
    overlay: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1031,
        cursor: 'default',
    },
}))

const ContextMenu = ({ className, children, onCloseHandler }) => {
    const classes = useStyles()

    return (
        <>
            <div onClick={onCloseHandler} className={classes.overlay} />
            <div className={cx(classes.root, className)}>{children}</div>
        </>
    )
}

export default ContextMenu

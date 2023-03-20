import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'relative',
        margin: [24, 0],
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        height: ({ height }) => height,
        backgroundColor: theme.palette.grey[300],
    },
    text: {
        position: 'absolute',
        padding: [0, 8],
        backgroundColor: theme.palette.common.white,
        color: theme.palette.grey[600],
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
}))

const Divider = ({ text, height = 1, className }) => {
    const classes = useStyles({ height })
    return (
        <div className={cx(classes.root, className)}>
            {text && <div className={classes.text}>{text}</div>}
        </div>
    )
}

export default Divider

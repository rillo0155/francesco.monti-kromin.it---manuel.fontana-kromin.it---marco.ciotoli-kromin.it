import { createUseStyles } from 'react-jss'
import {InfoIcon} from "../theme/icons";

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: 16,
        left: 12,
        display: 'none',
        backgroundColor: theme.palette.tertiary.background,
        padding: [8, 16],
        borderRadius: 4,
        fontSize: 12,
        justifyContent: 'right',
        alignItems: 'center',
        color: theme.palette.tertiary.main,
        '& > div': {
            display: 'grid',
            gridAutoFlow: 'column',
            gridGap: 8,
            alignItems: 'center',
        },
        '& span': {
            fontWeight: 600,
            textTransform: 'uppercase',
        },
        boxShadow: theme.shadows[20],
        [theme.mediaQueries.sUp]: {
            display: 'flex',
        },
    },
}))

const LogBar = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div>
                <InfoIcon width={16} height={16} />
                <div>
                    Currently on: <span>{process.env.NODE_ENV}</span>
                </div>
            </div>
        </div>
    )
}

export default LogBar

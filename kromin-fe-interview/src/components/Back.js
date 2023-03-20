import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import { BackIcon } from '../theme/icons'
import { Link } from 'react-router-dom'

const useStyles = createUseStyles((theme) => ({
    root: {
        ...theme.utils.grid.centered,
        gridTemplateColumns: ({ text }) => (text ? 'auto 1fr' : '1fr'),
        textDecoration: 'none',
        padding: [0, 0, 0, 6],
        cursor: 'pointer',
    },
}))

const Back = ({ callback, to, text, icon = <BackIcon />, className }) => {
    // const navigate = useNavigate();
    // <Back
    //     callback={() => navigate(-1)}
    // />

    const classes = useStyles({ text })
    return callback ? (
        <span className={cx(classes.root, className)}>
            <div onClick={callback}>{icon}</div>
            {text && <span>{text}</span>}
        </span>
    ) : (
        <Link to={to} className={cx(classes.root, className)}>
            {icon}
            {text && <span>{text}</span>}
        </Link>
    )
}

export default Back

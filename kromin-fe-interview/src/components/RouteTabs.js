import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import { NavLink } from 'react-router-dom'

const useStyles = createUseStyles((theme) => ({
    root: {},
    tabLinks: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        ...theme.typography.caseAllCaps,
    },
    tabLink: {
        textAlign: 'center',
        padding: 16,
        fontSize: 14,
        color: theme.palette.grey[600],
        borderBottom: `2px solid ${theme.palette.grey[300]}`,
        cursor: 'pointer',
    },
    tabLinkActive: {
        extend: 'tabLink',
        fontWeight: 700,
        color: theme.palette.secondary.darker,
        borderBottomColor: theme.palette.primary.main,
    },
}))

const RouteTabs = ({
    tabLinksClassName,
    children,
    sections = [],
    parentRoute,
}) => {
    const classes = useStyles()
    return (
        <div className={cx(classes.root, tabLinksClassName)}>
            <div className={classes.tabLinks}>
                {sections.map((section, idx) => {
                    return (
                        <NavLink
                            key={idx}
                            to={`${parentRoute}/${section.route}`}
                            className={({ isActive }) =>
                                isActive
                                    ? classes.tabLinkActive
                                    : classes.tabLink
                            }
                        >
                            {section.title}
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default RouteTabs

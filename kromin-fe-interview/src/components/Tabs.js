import { createUseStyles } from 'react-jss'
import cx from 'classnames'

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

const Tabs = ({
    tabLinksClassName,
    tabLinkClassName,
    tabLinkActiveClassName,
    children,
    activeTab,
    setActiveCallback,
    titles = [],
}) => {
    const classes = useStyles()
    return (
        <>
            <div className={cx(classes.root, tabLinksClassName)}>
                <div className={classes.tabLinks}>
                    {titles.map((title, idx) => {
                        return (
                            <div
                                key={idx}
                                onClick={() => setActiveCallback(idx)}
                                className={
                                    idx === activeTab
                                        ? cx(
                                              classes.tabLinkActive,
                                              tabLinkActiveClassName
                                          )
                                        : cx(classes.tabLink, tabLinkClassName)
                                }
                            >
                                {title}
                            </div>
                        )
                    })}
                </div>
            </div>
            {children.filter((child, idx) => idx === activeTab)}
        </>
    )
}

export default Tabs

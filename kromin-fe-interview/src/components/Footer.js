import {createUseStyles} from "react-jss";

const useStyles = createUseStyles(theme => ({
    footer: {
        gridRowStart: 'footer',
        gridRowEnd: 'footer',
        gridColumnStart: 1,
        gridColumnEnd: 6,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 300px',
        alignItems: 'center',
        padding: [16, 12],
        backgroundColor: 'rgba(48,48,48, 0.3)',
        [theme.mediaQueries.xxlUp]: {
            maxHeight: 60,
            padding: [12, 24],
        }
    },
}))


const Footer = () => {

    const classes = useStyles();

    return <footer
        className={classes.footer}>
        <div>
            This is the footer
        </div>
    </footer>
}

export default Footer;
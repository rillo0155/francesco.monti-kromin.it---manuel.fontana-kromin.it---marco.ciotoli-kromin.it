import { forwardRef } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
    root: {
        display: 'grid',
        gridAutoFlow: ({ labelOn }) => (!labelOn ? 'row' : 'column'),
        gridColumnGap: ({ labelOn }) =>
            !labelOn ? undefined : theme.spacing / 2,
        alignContent: 'center',
        alignItems: 'center',
        position: 'relative',
        gridTemplateColumns: 'max-content',
    },

    label: {
        fontSize: 14,
        marginLeft: 4,
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        gridColumn: ({ labelOn }) =>
            !labelOn ? undefined : labelOn === 'left' ? 1 : 2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },

    input: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0,
        padding: 0,
        '&:checked + $slider': {
            backgroundColor: ({ inputBgColor, disabled }) =>
                disabled
                    ? theme.palette.grey[300]
                    : inputBgColor
                    ? inputBgColor
                    : theme.palette.tertiary.main,
        },
        '&:focus + $slider': {},
        '&:checked + $slider:before': {
            transform: ({ isSmall }) =>
                isSmall ? 'translateX(10px)' : 'translateX(24px)',
        },
        '&:disabled': {
            backgroundColor: theme.palette.grey[300],
        },
    },

    slider: {
        position: 'relative',
        display: 'grid',
        alignItems: 'center',
        width: ({ isSmall }) => (isSmall ? 28 : 56),
        height: ({ isSmall }) => (isSmall ? 16 : 28),
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: ({ disabled }) =>
            disabled ? theme.palette.grey[300] : theme.palette.grey[400],
        transition: '0.5s',
        borderRadius: 40,
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        fontSize: 10,
        color: theme.palette.common.white,
        padding: [0, 6],
        '&:before': {
            position: 'absolute',
            content: '" "',
            height: ({ isSmall }) => (isSmall ? 12 : 24),
            width: ({ isSmall }) => (isSmall ? 12 : 24),
            left: ({ isSmall }) => (isSmall ? 3 : 4),
            bottom: 2,
            backgroundColor: theme.palette.common.white,
            transition: '0.5s',
            borderRadius: '50%',
            backgroundImage: ({ pointerBackground }) =>
                `url("${pointerBackground}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '80%',
            backgroundPosition: 'center',
        },
    },
    errorMessage: {
        color: theme.palette.error.main,
    },
}))

const ToggleSwitch = forwardRef(
    (
        {
            className,
            label,
            labelOn,
            errors,
            disabled,
            isSmall,
            defaultChecked,
            pointerBackground,
            hint,
            inputBgColor,
            ...props
        },
        ref
    ) => {
        const classes = useStyles({
            disabled,
            labelOn,
            isSmall,
            errors: !!errors,
            pointerBackground,
            inputBgColor,
        })

        return (
            <label className={cx(classes.root)}>
                {!!label && (
                    <span className={classes.label} title={label}>
                        {label}
                    </span>
                )}
                <input
                    type={'checkbox'}
                    className={classes.input}
                    ref={ref}
                    disabled={disabled}
                    defaultChecked={defaultChecked}
                    {...props}
                />
                <span className={classes.slider} id={props.name}>
                    {hint}
                </span>
                {errors?.message && (
                    <div>
                        <small className={classes.errorMessage}>
                            {errors.message}
                        </small>
                    </div>
                )}
            </label>
        )
    }
)

export default ToggleSwitch

ToggleSwitch.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    labelOn: PropTypes.oneOf(['right', 'left']),
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    defaultChecked: PropTypes.bool,
    isSmall: PropTypes.bool,
}

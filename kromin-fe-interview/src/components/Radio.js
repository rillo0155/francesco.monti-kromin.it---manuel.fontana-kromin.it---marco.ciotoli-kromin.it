import React, { forwardRef, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
    root: {
        width: 'max-content',
        display: 'grid',
        'grid-auto-flow': ({ labelOn }) => (!labelOn ? 'row' : 'column'),
        'grid-column-gap': ({ labelOn }) =>
            !labelOn ? undefined : theme.spacing / 2,
        'align-content': 'center',
        'align-items': 'center',
        position: 'relative',
        padding: 0,
    },

    label: {
        ...theme.controls.label,
        fontSize: 14,
        marginLeft: 4,
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        'margin-bottom': ({ labelOn }) =>
            labelOn ? 0 : theme.controls.label['margin-bottom'],
        'grid-column': ({ labelOn }) =>
            !labelOn ? undefined : labelOn === 'left' ? 1 : 2,
    },

    input: {
        width: ({ isSmall }) => (isSmall ? 16 : 20),
        height: ({ isSmall }) => (isSmall ? 16 : 20),
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        border: `1px solid ${theme.palette.grey}`,
        borderRadius: 4,
        padding: 8,
        '&[type=radio]:not(:checked)': {
            background: theme.palette.common.white,
            borderRadius: ({ isSmall }) => (isSmall ? 16 : 20),
            border: `1px solid ${theme.palette.common.grey}`,
            boxSizing: 'border-box',
        },

        '&[type=radio]:checked': {
            background: theme.palette.common.white,
            borderRadius: ({ isSmall }) => (isSmall ? 16 : 20),
            border: `2px solid ${theme.palette.tertiary.main}`,
            padding: 2,
            content: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' rx='5' fill='%236426E1'/%3E%3C/svg%3E")`,
        },
        '&[type=radio]:disabled': {
            background: theme.palette.disabled.light,
            border: `none`,
        },
    },
    error: {
        display: 'grid',
        position: 'relative',
        gridRow: '2',
        gridColumnStart: '1',
        gridColumnEnd: '3',
        color: theme.palette.error.main,
    },
}))

const Radio = forwardRef(
    (
        {
            children,
            className,
            inputClassName,
            label,
            labelOn = 'right',
            disabled,
            errors,
            isSmall,
            ...props
        },
        ref
    ) => {
        const classes = useStyles({
            labelOn,
            errors: !!errors,
            disabled,
            isSmall,
        })
        useEffect(() => {
            // unregister on unmount
            return () => {
                if (props.unregister) {
                    props.unregister(props.name)
                }
            }
        }, [])

        return (
            <label id={props.name} className={cx(classes.root, className)}>
                {!!label && <span className={classes.label}>{label}</span>}
                <input
                    type="radio"
                    className={cx(classes.input, inputClassName)}
                    disabled={disabled}
                    ref={ref}
                    {...props}
                />
                {!!errors && !props?.disabled && (
                    <small className={classes.error}>{errors.message}</small>
                )}
                {children}
            </label>
        )
    }
)

export default Radio

Radio.propTypes = {
    children: PropTypes.any,
    label: PropTypes.string,
    labelOn: PropTypes.oneOf(['right', 'left']),
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    isSmall: PropTypes.bool,
}

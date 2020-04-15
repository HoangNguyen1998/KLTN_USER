import React from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";

const Circular = (props) => {
    const {size, className}=props
    return (
        <CircularProgress size={size} className={className} disableShrink />
    )
}

export default Circular

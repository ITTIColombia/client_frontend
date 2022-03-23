import "./Filters.css";
import React, {useEffect, useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";

// 3 parameters should be passed, form state, setForm, options object
function ReusableFilter(props){

    const intl = useIntl();

    console.log("props", props);

    useEffect(()=>{
        console.log(props.state)
    }, [props.state])

    function onChange(e){
        props.setState({...props.state, [e.target.name]:e.target.value})
    }

    return (
        <div className='Filters'>
            <p className="filters-tit text-uppercase">
                <FormattedMessage id="Filters"/>
            </p>
            <div className="filters-content">
                {Object.keys(props.options).map((category, i) => {
                    return (
                    <select key={category + i} id={String(category)} className="form-control" name={category}
                            defaultValue="DEFAULT" onChange={onChange}>
                        <option value="DEFAULT" disabled>
                            {intl.formatMessage({id:category})}
                        </option>
                        {
                            props.options[category].map(option => {
                                return (
                                <option key={option} value={option}>
                                    {intl.formatMessage({id:option})}
                                </option>
                                )
                            })
                        }
                    </select>
                    )})}
            </div>
        </div>
    )
}

export default ReusableFilter;
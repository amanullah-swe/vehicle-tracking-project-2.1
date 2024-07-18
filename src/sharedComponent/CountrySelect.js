import React from 'react'
import ReactFlagsSelect from 'react-flags-select';
import { countriesWithShortCode } from './common';
import { placeholder } from '@babel/types';

const CountrySelect = ({
    countryName,
    state,
    onChangeHandler,
    placeholder
}) => {

    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }
    const selectedCountry = getKeyByValue(countriesWithShortCode, countryName)
    return (
        <div style={{ color: "rgb(143, 67, 0)" }}>
            <ReactFlagsSelect
                selected={selectedCountry}
                onSelect={onChangeHandler}
                placeholder={placeholder}
            />
        </div>
    )
}

export default CountrySelect

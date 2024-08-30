import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { casecade } from '../utils/casecadeDropdownData';
const CasecadingDropDown = ({ casecadeSelectedCountry, casecadeSelectedState, casecadeSelectedCity, country, state, city, editForm }) => {
    let [filterStates, setFilterStates] = useState([]);
    let [filterCities, setFilterCities] = useState([]);
    let [disableSelect, setDisableSelect] = useState({ state: true, city: true })

    const handleChangeCountry = e => selected(e, 'country');
    const handleChangeStates = e => selected(e, 'state');
    const handleChangeCities = e => selected(e, 'city');

    function selected(e, type) {
        if (type === 'country') {
            let selectedCountry = e.target.options[e.target.selectedIndex].text;
            let filteredStates = casecade.states.filter(state => state.countryId === Number(e.target.value));
            Number(e.target.value) === 0 ? setDisableSelect({ ...disableSelect, state: true }) : setDisableSelect({ ...disableSelect, state: false });
            casecadeSelectedCountry(e, { country: selectedCountry });
            setFilterStates(filteredStates);
        } else if (type === 'state') {
            let selectedState = e.target.options[e.target.selectedIndex].text;
            let filteredCities = casecade.cities.filter(city => city.stateId === Number(e.target.value));
            Number(e.target.value) === 0 ? setDisableSelect({ ...disableSelect, city: true }) : setDisableSelect({ ...disableSelect, city: false });
            casecadeSelectedState(e, { state: selectedState });
            setFilterCities(filteredCities);
        } else if (type === 'city') {
            let selectedCity = e.target.options[e.target.selectedIndex].text;
            casecadeSelectedCity(e, { city: selectedCity })
        } else {
            return false;
        }
    }
    let countryFromProp = country;
    let stateFromProp = state;
    let cityFromProp = city;

    let findCountryId = casecade.countries.find(country => country.name === countryFromProp);
    let findStateId = casecade.states.find(state => state.name === stateFromProp);
    let findCityId = casecade.cities.find(city => city.name === cityFromProp);

    useEffect(() => {
        setTimeout(() => {
            if (editForm) {
                let filteredStates = casecade.states.filter(state => state.countryId === findCountryId.id);
                setFilterStates(filteredStates);

                let filteredCities = casecade.cities.filter(city => city.stateId === findStateId.id);
                setFilterCities(filteredCities);
            }
        }, 3000)
    }, []);
    
    return (
        <>
            <Row>
                <Form.Group className="mb-3">
                    <Form.Label className='mandatory'>Country</Form.Label>
                    <Form.Select onChange={handleChangeCountry} name="country" required defaultValue={findCountryId ? findCountryId.id : '0'}>
                        <option value="0">Select Country</option>
                        {
                            casecade.countries.map(country => <option key={country.id} value={country.id} label={country.name}>{country.name}</option>)
                        }
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Please select country</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="mb-3">
                    <Form.Label className='mandatory'>State</Form.Label>
                    {
                        editForm ?
                            <Form.Select onChange={handleChangeStates} name="state" required disabled={findCountryId ? null : disableSelect.state} value={findStateId ? findStateId.id : '0'}>
                                <option value="0">Select State</option>
                                {
                                    filterStates.map(state => <option key={state.id} value={state.id}>{state.name}</option>)
                                }
                            </Form.Select>
                            :
                            <Form.Select onChange={handleChangeStates} name="state" required disabled={disableSelect.state}>
                                <option value="0">Select State</option>
                                {
                                    filterStates.map(state => <option key={state.id} value={state.id}>{state.name}</option>)
                                }
                            </Form.Select>
                    }
                    <Form.Control.Feedback type="invalid">Please select state</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="mb-3">
                    <Form.Label className='mandatory'>City</Form.Label>
                    {
                        editForm ?
                            <Form.Select onChange={handleChangeCities} name="city" required disabled={findCountryId ? null : disableSelect.city} value={findCityId ? findCityId.id : '0'}>
                                <option value="0">Select State</option>
                                {
                                    filterCities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)
                                }
                            </Form.Select>
                            :
                            <Form.Select onChange={handleChangeCities} name="city" required disabled={disableSelect.city}>
                                <option value="0">Select State</option>
                                {
                                    filterCities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)
                                }
                            </Form.Select>
                    }
                    <Form.Control.Feedback type="invalid">Please select city</Form.Control.Feedback>
                </Form.Group>
            </Row>
        </>
    )
}

export default CasecadingDropDown
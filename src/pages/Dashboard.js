import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getStudentsApi } from '../redux/actions';


const DashboardCard = ({ name, style, count, link }) => {

  //let renderCard = 
  return (
    <div className={`dashboard-card ${style}`}>
      <Link to={`/${link}`}>
        <p>{name}</p>
        <h1>{count}</h1>
      </Link>
    </div>
  )
}

const Dashboard = (props) => {
  const dashboardCards = [
    {
      name: 'Students',
      style: 'students',
      count: props.students.studentsList.length,
      link: 'admin/students'
    },
    {
      name: 'Teachers',
      style: 'teachers',
      count: 35,
      link: 'teachers'
    },
    {
      name: 'Upcoming Exams',
      style: 'exams',
      count: 5,
      link: 'exams'
    }
  ]
  let userRole = localStorage.getItem('userRole');

  return (
    <div className='dashboard'>
      <div className='dashboard-cards'>
        {
          dashboardCards.map((card, index) => <DashboardCard key={index} name={card.name} count={card.count} style={card.style} link={card.link} />)
        }

      </div>
      {/* <CaseCadingDropDown /> */}
    </div>
  )
}

const CaseCadingDropDown = () => {
  let countries = [
    { id: 1, value: 'india', name: 'India' },
    { id: 2, value: 'usa', name: 'USA' }
  ]
  let states = [
    { id: 1, countryId: 1, value: 'karnataka', name: 'Karnataka' },
    { id: 2, countryId: 1, value: 'tamilnadu', name: 'Tamilnadu' },
    { id: 3, countryId: 1, value: 'andhra', name: 'Andhra' },
    { id: 4, countryId: 2, value: 'florida', name: 'Florida' },
    { id: 5, countryId: 2, value: 'texas', name: 'Texas' },
    { id: 6, countryId: 2, value: 'california', name: 'Califoria' }
  ]
  let cities = [
    { id: 1, stateId: 1, value: 'bangalore', name: 'Bangalore' },
    { id: 2, stateId: 1, value: 'mysore', name: 'Mysore' },
    { id: 3, stateId: 2, value: 'chennai', name: 'Chennai' },
    { id: 4, stateId: 2, value: 'trichy', name: 'Trichy' },
    { id: 5, stateId: 2, value: 'hosur', name: 'Hosur' },
    { id: 6, stateId: 3, value: 'hyderabad', name: 'Hyderabad' },
    { id: 7, stateId: 3, value: 'visakapattinam', name: 'Visakapattinam' },
    { id: 8, stateId: 4, value: 'tampa', name: 'Tampa' },
    { id: 9, stateId: 4, value: 'maryland', name: 'Maryland' },
    { id: 10, stateId: 5, value: 'irving', name: 'Irving' },
    { id: 11, stateId: 5, value: 'houston', name: 'Houston' },
    { id: 12, stateId: 5, value: 'austin', name: 'Austin' },
    { id: 13, stateId: 6, value: 'newyork', name: 'New York' },
    { id: 14, stateId: 6, value: 'siliconvalley', name: 'Silicon Valley' }
  ]
  let selectStyle = {
    padding: '10px',
    width: '50%'
  }

  let [filterStates, setFilterStates] = useState([]);
  let [filterCities, setFilterCities] = useState([]);
  let [selectedValues, setSelectedValues] = useState({});
  
  let [disableState, setDisableState] = useState(true);
  let [disableCity, setDisableCity] = useState(true);
  const handleChangeCountry = (e) => {
    let selectedCountry = e.target.options[e.target.selectedIndex].text;
    let filteredStates = states.filter(state => state.countryId === Number(e.target.value));
    setFilterStates(filteredStates);
    Number(e.target.value) === 0 ? setDisableState(true) : setDisableState(false);
    setSelectedValues({ ...selectedValues, country: { id: e.target.value, value: selectedCountry.toLowerCase() } });
    localStorage.setItem('country', e.target.value);
  }
  const handleChangeStates = (e) => {
    let selectedState = e.target.options[e.target.selectedIndex].text;
    let filteredCities = cities.filter(city => city.stateId === Number(e.target.value));
    setFilterCities(filteredCities);
    Number(e.target.value) === 0 ? setDisableCity(true) : setDisableCity(false);
    setSelectedValues({...selectedValues, state: selectedState.toLowerCase()});
    localStorage.setItem('state', e.target.value);
  }
  const handleChangeCities = (e) => {
    let selectedCity = e.target.options[e.target.selectedIndex].text;
    setSelectedValues({...selectedValues, city: selectedCity.toLowerCase()});
    localStorage.setItem('city', e.target.value);
  }

  return (
    <div className='container'>
      <select style={selectStyle} onChange={handleChangeCountry}>
        <option value="0">Select Country</option>
        {
          countries.map(country => <option key={country.id} value={country.id} label={country.name}>{country.name}</option>)
        }
      </select>
      <br />
      <select style={selectStyle} onChange={handleChangeStates} disabled={disableState} className='select'>
        <option value="0">Select State</option>
        {
          filterStates.map(state => <option key={state.id} value={state.id}>{state.name}</option>)
        }
      </select>
      <br />
      <select style={selectStyle} onChange={handleChangeCities} disabled={disableCity} className='select'>
        <option value="0">Select City</option>
        {
          filterCities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)
        }
      </select>
      <br />
      <h3>Edit</h3>
      <select style={selectStyle} onChange={handleChangeCountry} value={localStorage.getItem('country')}>
        <option value="0">Select Country</option>
        {
          countries.map(country => <option key={country.id} value={country.id} label={country.name}>{country.name}</option>)
        }
      </select>
      <br/>
      <select style={selectStyle} onChange={handleChangeStates} disabled={disableState} className='select' value={localStorage.getItem('state')}>
        <option value="0">Select State</option>
        {
          filterStates.map(state => <option key={state.id} value={state.id}>{state.name}</option>)
        }
      </select>
      <br />
      <select style={selectStyle} onChange={handleChangeCities} disabled={disableCity} className='select' value={localStorage.getItem('city')}>
        <option value="0">Select City</option>
        {
          filterCities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)
        }
      </select>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: dispatch(getStudentsApi())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
import React, { useContext, useState } from 'react'
import { useTheme } from '../contextapi/ThemeContext';
import BodyHeader from '../components/BodyHeader';

const ThemeSwitcher = ({ toggleTheme }) => {
    const [on, setOn] = useState(false);
    const toggle = () => {
        setOn(o => !o);
        toggleTheme();
    }
    return (
        <div className='theme-switcher-container'>
            <button className={`theme-switcher ${on ? 'on' : 'off'}`} on={on.toString()} onClick={toggle}>
                <span className="pin" />
            </button>
        </div>
    )
}
const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className='container'>
            <div className='content-body'>
                <BodyHeader title="Settings" />
                <div className='content-body-container'>
                    <strong>Change Theme</strong>
                    <ThemeSwitcher toggleTheme={toggleTheme} />
                </div>
            </div>
        </div>
    )
}

export default Settings
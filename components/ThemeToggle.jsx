'use client'
import { useState } from 'react';
import {BsMoonFill, BsSunFill} from 'react-icons/bs'

const themes = {
    cmyk: 'cmyk',
    night: 'night',
}
const ThemeToggle = () => {
    const [theme, setTheme] = useState(themes.night);
    const toggleTheme = () => {
        const newTheme = theme === themes.cmyk ? themes.night : themes.cmyk
        document.documentElement.setAttribute('data-theme', newTheme)
        setTheme(newTheme)
    }
  return <button onClick={toggleTheme} className='btn btn-sm btn-outline ml-4 -mr-6'>
    {theme === 'night' ? <BsSunFill className='h-4 w-4 ' /> : <BsMoonFill className='h-4 w-4' />}
  </button>
};

export default ThemeToggle;

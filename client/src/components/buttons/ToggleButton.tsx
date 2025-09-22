import React from 'react'
import { useTheme } from '../../store/Theme';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

function Button() {

    const { themeMode, lightTheme, darkTheme } = useTheme()

    const onChangeBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
        const darkModeStatus = e.currentTarget.checked;
        if (darkModeStatus) {
            darkTheme()
        } else {
            lightTheme()
        }
    }

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={onChangeBtn}
                checked={themeMode === "dark"}
            />
            <div className='text-2xl font-bold'>{themeMode === "light" ? (<MdDarkMode />) : (<MdOutlineLightMode />)}</div>
        </label>
    );
}

export default Button

import React, { useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PasswordInput = ({ name, label, placeholder, formik, error, type, iconVisible }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleVisibilityToggle = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={`input-box position-relative ${error && formik.touched[name] ? "input-err" : ""}`}>
            <label className="form-labels">{label}</label>
            <input
                type={isVisible ? "text" : type}
                name={name}
                placeholder={placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
            />
            {iconVisible && (
                <button className="pass-visible-btn" type="button" onClick={handleVisibilityToggle}>
                    {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
            )}
            {error && formik.touched[name] && <p className="error-text">{error}</p>}
        </div>
    );
};
export default PasswordInput;
const today = new Date();
const year = today.getFullYear();
let month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
let day = today.getDate().toString().padStart(2, '0');
export const currentDate = `${year}-${month}-${day}`;

export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function formatDateToMMDDYYYY(dateTime) {
    const date = new Date(dateTime);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export const fileType =
    "image/jpeg, image/png, application/pdf";

export function statusValue(options, value) {
    const numericValue = String(value);
    const matchingOption = options.find(option => option.value === numericValue);
    return matchingOption ? matchingOption.label : "";
}

export const fileBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64String = e.target.result;
            resolve(base64String);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
};

//parking status options
export const getParkStatusValue = (num) => {
    switch (num) {
        case 1:
            return "Secure";
        case 2:
            return "Off-Road";
        case 3:
            return "Street";
        case 4:
            return "Other";
        default:
            return;
    }
};

//parking status values
export const parkStatusOptions = (value) => {
    switch (value) {
        case "Secure":
            return "1";
        case "Off-Road":
            return "2";
        case "Street":
            return "3";
        case "Other":
            return "4";
        default:
            break;
    }
}

//tenancy application status
export const getAppStatusValue = (num) => {
    switch (num) {
        case 1:
            return "Pending";
        case 2:
            return "Hold";
        case 3:
            return "Awaiting Review";
        case 4:
            return "Failed Review";
        case 5:
            return "Awaiting TA Signing";
        case 6:
            return "Let";
        case 7:
            return "Rolling";
        case 8:
            return "In progress";
        case 9:
            return "Expired";
        case 10:
            return "Cancelled";
        case 11:
            return "Completed";
        case 12:
            return "Stalled at Pending";
        case 13:
            return "Stalled at Hold";
        case 14:
            return "Stalled at Awaiting Review";
        case 15:
            return "Stalled at Failed Review";
        case 16:
            return "Stalled at Awaiting Signing";
        case 17:
            return "Awaiting TA Sending";
        case 18:
            return "Awaiting TA Review";
        default:
            return;
    }
}

export const selectedArray = (object1, object2) => {
    const selectedServices = [];
    for (const key in object2) {
        if (object1[key] && object1[key] === true) {
            selectedServices.push(object2[key]);
        }
    }
    return selectedServices;
};

export const generateModifiedFields = (index, propInputFields, type) => {
    return propInputFields?.map((field) => {
        return {
            ...field,
            name: `${type}${index + 1}.${field.name}${index + 1}`,
        };
    });
};

// export const setAllFieldsTouched = (values, formik, fieldPrefix = "") => {
//     //function to set fields in form touched for handling ui errors
//     alert("I'm here");
//     Object.keys(values).forEach((fieldName) => {
//         const fullPath = fieldPrefix
//             ? `${fieldPrefix}.${fieldName}`
//             : fieldName;

//         if (
//             typeof values[fieldName] === "object" &&
//             !Array.isArray(values[fieldName])
//         ) {
//             // If the field is an object, recursively set its fields as touched
//             setAllFieldsTouched(values[fieldName], fullPath);
//         } else {
//             // Set the field as touched
//             formik.setFieldTouched(fullPath, true);
//         }
//     });
// };
export const setFieldsTouchedSingleForm = (values, formik, fieldPrefix = "") => {
    // Set all fields in the form as touched
    const touchedFields = {};
    Object.keys(values).forEach((key) => {
        const fieldName = fieldPrefix ? `${fieldPrefix}.${key}` : key;
        touchedFields[fieldName] = true;
    });

    formik.setTouched(touchedFields);
};

//property status
export const getPropStatus = (value) => {
    switch (value) {
        case 1:
            return "Available To Let (Unoccupied)";
        case 2:
            return "Check If Renewing/Section 21";
        case 3:
            return "Available To Let (Occupied)";
        case 4:
            return "Hold (Processing Application)";
        case 5:
            return "Let";
        case 6:
            return "Not Available To Let";
        default:
            return "";
    }
};
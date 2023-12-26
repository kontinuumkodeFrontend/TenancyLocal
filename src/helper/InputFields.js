import { currentDate } from "../services/utils";

//Agency Input fields
export const propInputFields = [
    {
        name: "propRef",
        label: "Property Reference",
        placeholder: "Enter property reference",
        type: "text",
        className: "flex-100",
        required: true,
    },
    {
        name: "street",
        label: "Street",
        placeholder: "Enter street name",
        type: "text",
        className: "flex-100",
        required: true,
    },
    {
        name: "town",
        label: "Town",
        placeholder: "Enter town name",
        type: "text",
        required: true,
    },
    {
        name: "country",
        label: "Country",
        placeholder: "Enter country name",
        type: "text",
        required: true,
    },
    {
        name: "bedRoom",
        placeholder: "Enter no. of bedrooms",
        label: "Number Of Bedrooms",
        type: "number",
        required: true,
    },
    {
        name: "availableFrom",
        label: "Available From",
        placeholder: "Enter date",
        type: "date",
        required: true,
    },
    {
        name: "epcDate",
        label: "EPC Certificate Expiry Date",
        placeholder: "Enter date",
        type: "date",
        className: "flex-100",
    },
    {
        name: "eicrDate",
        label: "EICR Certificate Expiry Date",
        placeholder: "Enter date",
        type: "date",
        className: "flex-100",
    },
    {
        name: "hmoDate",
        label: "HMO Certificate Expiry Date",
        placeholder: "Enter date",
        type: "date",
        className: "flex-100 mb-3",
    },
    {
        name: "fireDate",
        label: "Fire Alarm Certificate Expiry Date",
        placeholder: "Enter date",
        type: "date",
        className: "flex-100 mb-3",
    },
    {
        name: "monthlyRent",
        label: "Monthly Rental Amount",
        placeholder: "Enter rental amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "totalAmount",
        label: "Total Amount",
        placeholder: "Enter total amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "depositAmount",
        label: "Deposit Amount ",
        placeholder: "Enter deposit amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "holdingAmount",
        label: "Holding Amount",
        placeholder: "Enter holding amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "name",
        label: "Landlord",
        placeholder: "Enter landlord name",
        type: "text",
        disabled: true,
    },
    {
        name: "parkingCost",
        label: "Additional Parking Cost",
        placeholder: "Enter parking cost",
        type: "number",
        prepend: true,
        className: "flex-100 mt-3",
    },
    {
        name: "gasDate",
        label: "Gas Certificate Expiry Date",
        placeholder: "Enter date",
        type: "date",
        className: "flex-100 mb-3",
    },
];

export const editPropInputFields = [
    {
        name: "propRef",
        label: "Property Reference",
        placeholder: "Enter property reference",
        type: "text",
        className: "flex-100",
        required: true,
        disabled: true,
    },
    {
        name: "street",
        label: "Street",
        placeholder: "Enter street name",
        type: "text",
        className: "flex-100",
        required: true,
    },
    {
        name: "town",
        label: "Town",
        placeholder: "Enter town name",
        type: "text",
        required: true,
    },
    {
        name: "country",
        label: "Country",
        placeholder: "Enter country name",
        type: "text",
        required: true,
    },
    {
        name: "bedRoom",
        placeholder: "Enter no. of bedrooms",
        label: "Number Of Bedrooms",
        type: "number",
        required: true,
    },
    {
        name: "availableFrom",
        label: "Available From",
        placeholder: "Enter date",
        type: "date",
        required: true,
    },
    {
        name: "epcDate",
        label: "EPC Certificate Expiry Date",
        placeholder: "Enter date",
        type: "date",
        className: "flex-100",
    },
    {
        name: "eicrDate",
        label: "EICR Certificate Expiry Date",
        placeholder: "Enter date",
        type: "date",
        className: "flex-100",
    },
    {
        name: "hmoDate",
        label: "HMO Certificate Expiry Date",
        placeholder: "Enter date",
        type: "date",
        className: "flex-100 mb-3",
    },
    {
        name: "fireDate",
        label: "Fire Alarm Certificate Expiry Date",
        placeholder: "Enter date",
        type: "date",
        className: "flex-100 mb-3",
    },
    {
        name: "monthlyRent",
        label: "Monthly Rental Amount",
        placeholder: "Enter rental amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "totalAmount",
        label: "Total Amount",
        placeholder: "Enter total amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "depositAmount",
        label: "Deposit Amount ",
        placeholder: "Enter deposit amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "holdingAmount",
        label: "Holding Amount",
        placeholder: "Enter holding amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "name",
        label: "Landlord",
        placeholder: "Enter landlord name",
        type: "text",
        disabled: true,
    },
    {
        name: "parkingCost",
        label: "Additional Parking Cost",
        placeholder: "Enter parking cost",
        type: "number",
        prepend: true,
        className: "flex-100 mt-3",
    },
    {
        name: "gasDate",
        label: "Gas Certificate Expiry Date",
        placeholder: "Enter date",
        type: "date",
        className: "flex-100 mb-3",
    },
];

export const TenancyInputField = [
    {
        name: "propAddress",
        label: "Property Address",
        placeholder: "Enter property address",
        type: "text",
        className: "flex-100",
        disabled: true,
    },

    {
        name: "monthlyRent",
        label: "Monthly Rental Amount",
        placeholder: "Enter rental amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "totalAmount",
        label: "Total Amount",
        placeholder: "Enter total amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "depositAmount",
        label: "Deposit Amount ",
        placeholder: "Enter deposit amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "holdingAmount",
        label: "Holding Amount",
        placeholder: "Enter holding amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "tenancyStartDate",
        label: "Tenancy Start Date",
        placeholder: "Enter date",
        type: "date",
        min: currentDate,
        required: true,
    },
    {
        name: "tenancyEndDate",
        label: "Tenancy End Date",
        placeholder: "Enter date",
        type: "date",
        min: currentDate,
        required: true,
    },
    {
        name: "name",
        label: "Landlord",
        placeholder: "Enter landlord name",
        type: "text",
        disabled: true,
    },
    {
        name: "applicant",
        label: "Number of Applicants",
        placeholder: "Enter number",
        type: "number",
        required: true,
    },
    {
        name: "parkingCost",
        label: "Additional Parking Cost",
        placeholder: "Enter parking cost",
        type: "number",
        prepend: true,
        className: "flex-100 mt-3",
    },
];

export const ApplicantInputField = [
    {
        name: "firstName",
        label: "Applicant First Name",
        placeholder: "Enter applicant first name",
        type: "text",
        required: true,
    },
    {
        name: "middleName",
        label: "Applicant Middle Name",
        placeholder: "Enter applicant middle name",
        type: "text",
    },
    {
        name: "lastName",
        label: "Applicant Last Name",
        placeholder: "Enter applicant last name",
        type: "text",
        required: true,
    },
    {
        name: "email",
        label: "Applicant Email",
        placeholder: "Enter applicant email",
        type: "text",
        required: true,
    },
];

export const ReviewTenancyInputField = [
    {
        name: "tenancyRef",
        label: "Tenancy Reference",
        placeholder: "Enter tenancy reference",
        type: "text",
        disabled: true,
    },
    {
        name: "negotiator",
        label: "Tenancy Negotiator",
        placeholder: "Enter tenancy negotiator",
        type: "text",
        disabled: true,
    },
    {
        name: "propAddress",
        label: "Property Address",
        placeholder: "Enter property address",
        type: "text",
        className: "flex-100",
        disabled: true,
    },
    {
        name: "tenancyStartDate",
        label: "Tenancy Start Date",
        placeholder: "Enter date",
        type: "date",
        min: currentDate,
        required: true,
    },
    {
        name: "tenancyEndDate",
        label: "Tenancy End Date",
        placeholder: "Enter date",
        type: "date",
        min: currentDate,
        required: true,
    },
    {
        name: "name",
        label: "Landlord",
        placeholder: "Enter landlord name",
        type: "text",
        disabled: true,
    },
    {
        name: "parkingCost",
        label: "Additional Parking Cost",
        placeholder: "Enter parking cost",
        type: "number",
        prepend: true,
        className: "flex-100 mt-3",
    },
    {
        name: "applicant",
        label: "Number of Applicants",
        placeholder: "Enter number",
        type: "number",
        required: true,
    },
    {
        name: "monthlyRent",
        label: "Monthly Rental Amount",
        placeholder: "Enter rental amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "totalAmount",
        label: "Total Amount",
        placeholder: "Enter total amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "depositAmount",
        label: "Deposit Amount ",
        placeholder: "Enter deposit amount",
        type: "number",
        prepend: true,
        required: true,
    },
    {
        name: "holdingAmount",
        label: "Holding Amount",
        placeholder: "Enter holding amount",
        type: "number",
        prepend: true,
        required: true,
    },
];

//Admin input fields
export const agencyInputFields = [
    {
        name: "companyName",
        type: "text",
        className: "flex-100",
        placeholder: "Enter agency name",
        label: "Agency Name",
        required: true,
    },
    {
        name: "email",
        type: "email",
        className: "flex-100",
        placeholder: "Enter email address",
        label: "Email Address",
        required: true,
    },
    {
        name: "password",
        type: "password",
        className: "flex-100",
        placeholder: "Enter password",
        label: "Password",
        required: true,
    },
    {
        name: "confirmPassword",
        type: "password",
        className: "flex-100",
        placeholder: "Re-enter password",
        label: "Confirm Password",
        required: true,
    },
];

export const agencyEditInputFields = [
    {
        name: "companyName",
        type: "text",
        placeholder: "Enter agency name",
        label: "Agency Name",
    },
    {
        name: "email",
        type: "email",
        placeholder: "Enter email address",
        label: "Email Address",
        disabled: true,
    },
    {
        name: "address",
        type: "text",
        placeholder: "Enter address",
        label: "Address",
    },
    {
        name: "availableCredit",
        type: "number",
        placeholder: "Enter number",
        label: "Current Available Credits",
        disabled: true,
    },
    {
        name: "usedCredit",
        type: "number",
        placeholder: "Enter number",
        label: "Used Credits",
        disabled: true,
    },
];

export const emailServerInputFields = [
    {
        name: "host",
        label: "Server Host",
        placeholder: "Enter server host name",
        type: "text",
        required: true,
    },
    {
        name: "port",
        label: "Port",
        placeholder: "Enter port number",
        type: "number",
        required: true,
    },
    {
        name: "fromName",
        label: "From Name",
        placeholder: "Enter from name",
        type: "text",
        required: true,
    },
    {
        name: "email",
        label: "From Email Address",
        placeholder: "Enter from email address",
        type: "text",
        required: true,
    },
    {
        name: "name",
        label: "Username",
        placeholder: "Enter user name",
        type: "text",
        required: true,
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter password",
        type: "password",
        required: true,
    },
];

export const superAdminInfoFields = [
    {
        name: "name",
        label: "Agency Name",
        placeholder: "Enter agency name",
        type: "text",
        required: true,
    },
    {
        name: "address",
        label: "Address",
        placeholder: "Enter address",
        type: "text",
        required: true,
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter email address",
        type: "text",
        required: true,
    },
    {
        name: "facebook",
        label: "Facebook",
        placeholder: "Facebook link",
        type: "text",
    },
    {
        name: "google",
        label: "Google Plus",
        placeholder: "Google link",
        type: "text",
    },
    {
        name: "twitter",
        label: "Twitter link",
        placeholder: "Enter user name",
        type: "text",
    },
];

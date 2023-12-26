export const tenancyStatusOptions = [
  { label: "Application Status", value: "AS" },
  { label: "Pending ", value: "1" },
  { label: "Hold ", value: "2" },
  { label: "Awaiting Review", value: "3" },
  { label: "Failed Review", value: "4" },
  { label: "Awaiting TA Signing", value: "5" },
  { label: "Let", value: "6" },
  { label: "Rolling", value: "7" },
  { label: "In progress", value: "8" },
  { label: "Expired", value: "9" },
  { label: "Cancelled", value: "10" },
  { label: "Completed", value: "11" },
  { label: "Stalled at Pending", value: "12" },
  { label: "Stalled at Hold", value: "13" },
  { label: "Stalled at Awaiting Review", value: "14" },
  { label: "Stalled at Failed Review", value: "15" },
  { label: "Stalled at Awaiting Signing", value: "16" },
  { label: "Awaiting TA Sending", value: "17" },
  { label: "Awaiting TA Review", value: "18" },
];

export const propertyStatusOptions = [
  { label: "Select property status", value: "SS" },
  { label: "Available To Let (Unoccupied)", value: "1" },
  { label: "Check If Renewing/Section 21", value: "2" },
  { label: "Available To Let (Occupied)", value: "3" },
  { label: "Hold (Processing Application)", value: "4" },
  { label: "Let", value: "5" },
  { label: "Not Available To Let", value: "6" },
];

export const interimOptions = [
  { label: "Select Quantity", value: "SQ" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];

export const rentalArray = {
  electricity: "Electricity",
  gas: "Gas",
  water: "Water",
  internet: "Internet",
  insurance: "Insurance",
};

export const restrictionArray = {
  pets: "No Pets",
  students: "No Students",
  families: "No Families",
  professionals: "No Professionals",
};

export const serverOptions = [
  { label: "Driver type", value: "driver-type" },
  { label: "SMTP", value: "smtp" },
];

export const encryptionOptions = [
  { label: "Encryption type", value: "encryption-type" },
  { label: "TLS", value: "tls" },
  { label: "SSL", value: "ssl" },
];

export let agencyStatusOptions = [
  { label: "Status", value: "status" },
  { label: "Un-Authorized", value: "0" },
  { label: "Authorized", value: "1" },
];

export const defaultEmailOptions = [
  { label: "Select Email", value: "WEX" },
  { label: "Welcome Email", value: "WE" },
  { label: "Registration Email", value: "RE" },
  { label: "Guarantor Reference Email", value: "GRE" },
  { label: "Landlord Reference Email", value: "LRE" },
  { label: "Employment Reference Email", value: "ERE" },
  { label: "Applicant Chasing Email", value: "ACE" },
  { label: "Tenancy Agreement Email", value: "TAE" },
  { label: "Application Finalised Email", value: "AFE" },
  { label: "Guarantor Reference Chasing Email", value: "GRCE" },
  { label: "Landlord Reference Chasing Email", value: "LRCE" },
  { label: "Employment Reference Chasing Email", value: "ERCE" },
  { label: "Renew Tenant Email", value: "RTE" },
  { label: "Staff Welcome Email", value: "SWE" },
  { label: "Need More detail Email", value: "NMDE" },
  { label: "Password Reset Email", value: "PRE" },
  { label: "Credit Request Email", value: "CRE" },
  { label: "Deadline Extend Email", value: "DEE" },
];

export const defaultTextOptions = [
  { label: "Select Template", value: "TX" },
  { label: "Thank You Page", value: "TYP" },
  { label: "Guarantor Form", value: "GRTFSA" },
  { label: "Landlord Form", value: "LRTFSA" },
  { label: "Employment Form", value: "ERTFSA" },
  { label: "Privacy Settings", value: "ADPS" },
  { label: "Privacy Statement", value: "AILPS" },
  { label: "Application Questionnaire", value: "AILAQ" },
  { label: "Application Tenancy Information", value: "ATI" },
  { label: "Guarantor Reference T&C", value: "GRTAC" },
  { label: "Guarantor Reference Thank You Page", value: "GRTYP" },
];

export const customEmailOptions = [
  { label: "Select Email", value: "TX" },
  { label: "Agency Registration Email", value: "SA_ARE" },
  { label: "Agency Credit Email", value: "SA_CRE" },
  { label: "Password Reset Email", value: "SA_PRE" },
];

export const appStatusOption = [
  { label: "Applicantion Status", value: "AS" },
  { label: "Pending", value: "1" },
  { label: "Hold", value: "2" },
  { label: "Awaiting Review", value: "3" },
  { label: "Failed Review", value: "4" },
  { label: "Awaiting TA Signing", value: "5" },
  { label: "Let", value: "6" },
  { label: "Rolling", value: "7" },
  { label: "In progress", value: "8" },
  { label: "Expired", value: "9" },
  { label: "Cancelled", value: "10" },
  { label: "Completed", value: "11" },
  { label: "Stalled at Pending", value: "12" },
  { label: "Stalled at Hold", value: "13" },
  { label: "Stalled at Awaiting Review", value: "14" },
  { label: "Stalled at Failed Review", value: "15" },
  { label: "Stalled at Awaiting Signing", value: "16" },
  { label: "Awaiting TA Sending", value: "17" },
  { label: "Awaiting TA Review", value: "18" },
];

export const agreementTypeOptions = [
  { label: "Select Agreement Type", value: "ST" },
  { label: "Tenancy Agreement", value: "tenancy" },
  { label: "Terminate Tenancy Agreement", value: "terminate" },
  { label: "Extend Tenancy Agreement", value: "extend" },
];
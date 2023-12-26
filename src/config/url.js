// export const BASE_URL = "https://tenancy-backend.tenancyhive.co.uk/"; //client live url
export const BASE_URL = "http://3.6.123.207/";

//Postcode lookup
export const FETCH_POSTCODE = "api/fetch_postcode";
export const IMG_URL = "storage/agency/selfie_pics";
export const MEDIA_LOGO = "storage/agency/media_logo";
export const DOWNLOAD_FILES = "api/agency/get_certificate/document";

//Agency
export const LOGIN = "api/login";
export const AGENCY_REGISTER = "api/register"; //only admin can create agency 
export const AGENCY_FORGOT_PASS = "api/forgot_password";
export const AGECNY_UPDATE_SELFIE = "api/agency/update_selfie";
export const AGECNY_UPDATE_PERSONAL_INFO = "api/agency/update_personal_info";
export const AGENCY_CHANGE_PASSWORD = "api/agency/change_password";
export const AGENCY_GET_LANDLORDS = "api/agency/landlords";
export const AGECNY_INFO = "api/agency/my_info";
export const AGECNY_CREATE_LANDLORD = "api/agency/create_landlord";
export const AGECNY_INITIAL_API = "api/agency/initial_api";
export const AGENCY_VIEW_LANDLORD = "api/agency/view_landlord";
export const AGECNY_EDIT_LANDLORD = "api/agency/edit_landlord";
export const AGECNY_GET_LANDLORD_CSV = "api/agency/landlord/get_data";
export const AGENCY_LANDLORD_CSV = "api/agency/landlord/generate_pdf";
export const AGECNY_ADD_PROPERTY_STEP_FIRST = "api/agency/property_first_step";
export const AGENCY_ADD_PROPERTY = "api/agency/add_property";
export const AGECNY_GET_PROPERTY_CSV = "api/agency/property/get_data";
export const AGENCY_PROPERTY_CSV = "api/agency/property/generate_pdf";
export const AGENCY_GET_PROPERTIES = "api/agency/properties";
export const AGENCY_GET_PROPRTY_INFO = "api/agency/property_edit_info";
export const AGENCY_EDIT_PROPERTY = "api/agency/edit_property";
export const AGENCY_TENANCY_FIRST_STEP = "api/agency/check_first_step";
export const AGENCY_TENANCY_SECOND_STEP = "api/agency/check_second_step";
export const AGENCY_CREATE_TENANCY = "api/agency/add_tenancy";
export const AGENCY_TENANCY_LIST = "api/agency/get_tenancies";
export const AGENCY_TENANCY_CSV = "api/agency/tenancy/generate_pdf";
export const AGENCY_GET_TENANCY_CSV = "api/agency/tenancy/get_data";
export const AGENCY_DELETE_TENANCY = "api/agency/tenancy_delete";
export const AGENCY_REVIEW_TENANCY = "api/agency/review_tenancy";
export const AGENCY_UPDATE_TENANCY_INFO = "api/agency/tenancy_info";
export const AGENCY_STAFF_MEMBERS = "api/agency/agency_members";
export const AGENCY_CHANGE_NEGOTIATOR = "api/agency/change_negotiator";

//ADMIN PANEL
export const ADMIN_GET_AGENCIES = "api/admin/agencies";
export const ADMIN_CREATE_AGENCIES = "api/admin/add_agency";
export const ADMIN_INFO = "api/admin/my_info";
export const ADMIN_AGENCY_MEDIA = "api/admin/update_media_logo";
export const ADMIN_GET_AGENCY_INFO = "api/admin/agency";
export const ADMIN_EIDT_AGENCY = "api/admin/edit_agency";
export const ADMIN_ADD_CREDIT = "api/admin/add_credit";
export const ADMIN_DELETE_AGENCY = "api/admin/delete_agency";
export const ADMIN_GET_AGENCY_CSV = "api/admin/agency/get_data";
export const ADMIN_EMAIL_CSV = "api/admin/generate-pdf";
export const ADMIN_SERVER_SETTINGS = "api/admin/configuration/email_server";
export const ADMIN_AGENCY_INFO = "api/admin/configuration/agency_information";
export const ADMIN_EDIT_AGENCY_INFO = "api/admin/configuration/edit_agency";
export const ADMIN_UPDATE_AGENCY_INFO_LOGO = "api/agency/configuration/media_logo";
export const VERIFY_AGENCY = "api/authorize_agency";
export const ADMIN_DEFAULT_MAIL_TEMPLATE = "api/admin/default_mail_template";
export const ADMIN_DEFAULT_TEXT = "api/admin/default_text_for_specific_area";
export const ADMIN_CUSTOM_EMAIL = "api/admin/customization/mail_template";

//Applicants panel
export const APP_LOGIN = "api/app/login";

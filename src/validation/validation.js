import * as Yup from "yup";

export const multipleEmailValidationRegex =
  /^\s*([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4}\s*(,|$)\s*)*$/;

export const emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// UK government's regular expression pattern for UK postal codes
const postalCodePattern =
  /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/;
const postcodeValidator = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;

const creditValidationSchema = Yup.number()
  .typeError("Must be a valid number")
  .min(0, "Cannot be negative")
  .max(1000, "Cannot exceed the 1000");

export const costValidationSchema = Yup.number()
  .typeError("Must be a valid number")
  .min(0, "Cannot be negative")
  .max(10000000, "Cannot exceed the 10000000");

/* tests to see if string is in correct UK style postcode: AL1 1AB, BM1 5YZ etc. */
export function isValidPostcode(p) {
  var postcodeRegEx = postalCodePattern;
  return postcodeRegEx.test(p);
}

export const emailValidation = Yup.object().shape({
  email: Yup.string()
    .matches(emailPattern, "Invalid email address")
    .required("This field is required"),
});

export const phoneValidation = Yup.object().shape({
  countryCode: Yup.string(),
  phone: Yup.string()
    // .test("phone", "Invalid phone number", function (value) {
    //     const phoneNumber = parsePhoneNumber(value, formik.values.countryCode);
    //     return phoneNumber && phoneNumber.isValid()});
    .required("Phone number is required"),
});

export const passwordValidation = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    // .matches(
    //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^_\-+=])[A-Za-z\d@$!%*?&#^_\-+=]+$/,
    //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: @$!%*?&#^_-+="
    // )
    .required("This field is required"),
});

export const confirmPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});

export const changePasswordValidation = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, "Current Password must be at least 8 characters")
    .required("Current password is required"),
  password: Yup.string()
    .notOneOf(
      [Yup.ref("currentPassword"), null],
      "Passwords must not match old password"
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});

export const nameValidation = Yup.object().shape({
  name: Yup.string().required("This field is required."),
});

export const firstNameValidation = Yup.object().shape({
  firstName: Yup.string().required("This field is required."),
});
export const lastNameValidation = Yup.object().shape({
  lastName: Yup.string().required("This field is required."),
});
export const companyNameValidation = Yup.object().shape({
  companyName: Yup.string().required("This field is required."),
});

export const addressValidation = Yup.object().shape({
  address: Yup.string().required("This field is required."),
});

export const streetValidation = Yup.object().shape({
  street: Yup.string().required("This field is required."),
});

export const townValidation = Yup.object().shape({
  town: Yup.string().required("This field is required."),
});

export const countryValidation = Yup.object().shape({
  country: Yup.string().required("This field is required."),
});

export const checkboxValidation = Yup.object().shape({
  agree: Yup.bool()
    .oneOf([true], "You must agree to continue.")
    .required("You must agree to continue."),
});

export const creditsValidation = Yup.object().shape({
  usedCredit: creditValidationSchema.required("This field is required."),
  availableCredit: creditValidationSchema.required("This field is required."),
});

export const creditValidation = Yup.object().shape({
  credit: creditValidationSchema.required("This field is required."),
});

export const addPropValidation = Yup.object().shape({
  propRef: Yup.string()
    .max(20, "Maximum character limit is 20 characters")
    .required("This field is required."),
  bedRoom: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .max(10, "Cannot exceed the 10")
    .required("This field is required."),
  availableFrom: Yup.date()
    .typeError("Please enter a valid date")
    .required("Date is required"),
  monthlyRent: costValidationSchema.required("This field is required"),
  totalAmount: costValidationSchema.required("This field is required"),
  depositAmount: costValidationSchema.required("This field is required"),
  holdingAmount: costValidationSchema.required("This field is required"),
  parkingCost: costValidationSchema.nullable().optional(),
});

export const tenancyValidationSchema = Yup.object().shape({
  monthlyRent: costValidationSchema.required("This field is required"),
  totalAmount: costValidationSchema.required("This field is required"),
  depositAmount: costValidationSchema.required("This field is required"),
  holdingAmount: costValidationSchema.required("This field is required"),
  parkingCost: costValidationSchema.optional(),
  bedRoom: Yup.number(),
  applicant: Yup.number()
    .required("Applicant is required")
    .test(
      "is-less-than-or-equal",
      "Applicant must be at least one and less than or equal to 2 times bedroom.",
      function (value) {
        const bedRoomValue = this.resolve(Yup.ref("bedRoom"));
        return value >= 1 && value <= bedRoomValue * 2;
      }
    ),
  tenancyStartDate: Yup.date().required("Tenancy start date is required"),
  tenancyEndDate: Yup.date()
    .required("Tenancy end date is required")
    .test({
      name: "minimumDate",
      message: "Tenancy end date must be at least 1 month after the start date",
      test: function (endDate) {
        const startDate = this.resolve(Yup.ref("tenancyStartDate"));
        const minDate = startDate ? new Date(startDate) : null;

        // Check if endDate is at least 1 month after startDate
        return minDate && endDate >= minDate.setMonth(minDate.getMonth() + 1);
      },
    }),
});

export const portValidationSchema = Yup.object().shape({
  port: Yup.number()
    .typeError('Port must be a number')
    .integer('Port must be an integer')
    .min(0, 'Port must be greater than or equal to 0')
    .max(65535, 'Port must be less than or equal to 65535')
    .required('This field is required'),
});

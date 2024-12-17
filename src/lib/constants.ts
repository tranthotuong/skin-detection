// Application titles
export const APP_NAME = "SkinDetection";
export const APP_DESCRIPTION = "Skin detection helps you quickly detect skin issues by capturing photos for instant AI analysis. It’s mobile-friendly, keeps a history of scans, and works offline to support your skin health anytime, anywhere.";

//API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
export const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;
export const SIGNUP_ENDPOINT = `${API_BASE_URL}/auth/signup`;
export const ACCOUNT_UPDATE_ENDPOINT = `${API_BASE_URL}/auth/update`;
/*GET*/
export const GET_SPORTS_ENDPOINT  = `${API_BASE_URL}/sport`;
export const GET_USER_ENDPOINT  = `${API_BASE_URL}/auth/user`;
export const GET_TOP_HISTORY_ENDPOINT  = `${API_BASE_URL}/scan-history/top`;
export const GET_LIST_HISTORY_ENDPOINT  = `${API_BASE_URL}/scan-history/list`;
export const GET_DETAIL_HISTORY_ENDPOINT  = `${API_BASE_URL}/scan-history/`;
/*PUT*/
export const PUT_IMAGE_ENDPOINT  = `${API_BASE_URL}/scan-history/diagnose`;
// export const TOKEN_STORAGE_KEY = "tokenKey";
// export const ACC_USER_KEY = "accUserKey";

//PAGE
export const PROFILE_URL = "/profile";
export const DETECTION_URL = "/detection";
export const SIGN_UP_URL = "/sign-up";
export const SIGN_IN_URL = "/sign-in";
export const HISTORY_URL = "/history";

//Object
export const HEADER_SIGN = {
    title: 'Skin Detection',
    description: 'Expert skin care in the palm of your hand!',
}

export const SIGN_IN = {
    forgot: 'Forgot your password?',
    signIn: 'Sign in',
    register: 'Need an account? Register'
}

export const SIGN_UP = {
    signUp: 'Sign up',
    contextSignIn: 'Already have an account? Sign in'
}

export const MAINPAGE = {
    information: {
        title: 'Input Information',
        label_name: 'Name',
        label_age: 'Day of Birth',
        label_gender: 'Gender',
        gender: {
            male: 'Male',
            female: 'Female',
            other: 'Other'
        }
    },
    action: {
        next: 'Next',
        finish: 'Finish',
        skip: 'Skip this step',
        previous: 'Back to step'
    },
    steps: {
        step_one: {
            title: 'Tell us about yourself',
        },
        step_two: {
            title: 'Your fitness routine',
        },
    }
}
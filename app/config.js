export const BASE_URL = "https://paperpulse-backend.onrender.com";

// export const BASE_URL = "http://localhost:8000";

import TimeAgo from "javascript-time-ago";

import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

export const timeAgo = new TimeAgo("en-US")
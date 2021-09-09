"use strict";
(() => {
var exports = {};
exports.id = 461;
exports.ids = [461];
exports.modules = {

/***/ 534:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "qO": () => (/* binding */ getURLWithQueryParams),
/* harmony export */   "Hk": () => (/* binding */ LINKEDIN_URL)
/* harmony export */ });
/* unused harmony export LINKEDIN_STATE */
// require("dotenv/config");
const LINKEDIN_STATE = process.env.LINKEDIN_STATE;
const LINKEDIN_SCOPE = "r_liteprofile r_emailaddress";
const LINKEDIN_REDIRECT = "http://localhost:3000/api/oauth";
const LINKEDIN_CLIENT_ID = "86y35a2mhew0rj";
const getURLWithQueryParams = (base, params) => {
  const query = Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
  return `${base}?${query}`;
};
const LINKEDIN_URL = getURLWithQueryParams('https://www.linkedin.com/oauth/v2/authorization', {
  response_type: 'code',
  client_id: LINKEDIN_CLIENT_ID,
  redirect_uri: LINKEDIN_REDIRECT,
  state: LINKEDIN_STATE,
  scope: LINKEDIN_SCOPE
});

/***/ }),

/***/ 685:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Oauth": () => (/* binding */ Oauth),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(534);

const Oauth = async (req, res) => {
  // Query to exchange our authorization code for an access token
  const LINKEDIN_URL = (0,_helpers_auth__WEBPACK_IMPORTED_MODULE_0__/* .getURLWithQueryParams */ .qO)('https://www.linkedin.com/oauth/v2/accessToken', {
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: "http://localhost:3000/api/oauth",
    client_id: "86y35a2mhew0rj",
    client_secret: "q12Ex5tRyjx6kfE5"
  });
  let tok;
  let resp = await fetch(LINKEDIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  if (resp.ok) tok = await resp.json();
  let {
    access_token,
    expires_in
  } = tok;
  console.log('Response : ', resp); // Query to exchange our token for user infos

  let auth = 'Bearer ' + access_token;
  let u = {};
  let usr = await fetch('https://api.linkedin.com/v2/me', {
    method: 'GET',
    headers: {
      Connection: 'Keep-Alive',
      Authorization: auth
    }
  });
  if (usr.ok) u = await usr.json();

  if (u.localizedFirstName) {
    console.log(auth);
    res.redirect(`/hello/${u.localizedFirstName}`);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Oauth);

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(685));
module.exports = __webpack_exports__;

})();
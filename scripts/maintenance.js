/* =========================================================
   MEGA MESSY TOURNAMENT
   MAINTENANCE MODE

   Put this as the FIRST script in the <head> of every page
   you want to be able to lock (NOT index.html in the root):

     root pages ........ <script src="scripts/maintenance.js"></script>
     one folder deep ... <script src="../scripts/maintenance.js"></script>
     two folders deep .. <script src="../../scripts/maintenance.js"></script>

   maintenance.html must sit in the same folder as home.html.
========================================================= */

/* ---------------------------------------------------------
   MASTER SWITCH  -  true = maintenance ON, false = site OFF
--------------------------------------------------------- */
const MAINTENANCE_ENABLED = true;


/* ---------------------------------------------------------
   PER-PAGE SWITCHES
   true  = this page is redirected to the maintenance page
   false = this page stays open (the master switch must also
           be true for any redirect to happen)
--------------------------------------------------------- */
const MAINTENANCE_PAGES = {
    "home.html":       true,   // home page
    "all.html":        true,   // all girls
    "profile.html":    true,   // girl profile
    "index.html":      true,   // qualifying/groups list (root index.html is never redirected)
    "group.html":      true,   // single qualifying group
    "qualified.html":  true,   // qualified girls
    "eliminated.html": true,   // eliminated girls
    "wildcard.html":   true   // wildcard girls
};

// Any page that is not listed above
const MAINTENANCE_OTHER_PAGES = true;


/* ---------------------------------------------------------
   ADMIN BYPASS (testing only)
   NOTE: these are visible to anyone who views this file, so
   this is a convenience for testing, not real security.
--------------------------------------------------------- */
const MAINTENANCE_ADMIN_USER = "MEGAMESS2027";
const MAINTENANCE_ADMIN_PASS = "040611";

// Remembers where this script lives (used to find the site root)
const MAINTENANCE_SCRIPT_SRC = document.currentScript ? document.currentScript.src : "";


/* =========================================================
   LOGIC  (nothing below needs editing)
========================================================= */

(function () {

    "use strict";

    var BYPASS_KEY = "mm_maintenance_bypass";
    var MAINTENANCE_FILE = "maintenance.html";
    var HOME_FILE = "home.html";

    /* Work out the site root from this script's own location
       (scripts/maintenance.js -> one level up = site root),
       so it works from any folder depth. */

    var scriptSrc = MAINTENANCE_SCRIPT_SRC;

    if (!scriptSrc) { return; }

    var rootURL = new URL("../", scriptSrc);
    var maintenanceURL = new URL(MAINTENANCE_FILE, rootURL);
    var homeURL = new URL(HOME_FILE, rootURL);


    /* ---------- bypass flag (cleared when the tab closes) ---------- */

    function hasBypass() {
        try { return sessionStorage.getItem(BYPASS_KEY) === "yes"; }
        catch (e) { return false; }
    }

    function setBypass() {
        try { sessionStorage.setItem(BYPASS_KEY, "yes"); }
        catch (e) { /* storage blocked */ }
    }

    function clearBypass() {
        try { sessionStorage.removeItem(BYPASS_KEY); }
        catch (e) { /* storage blocked */ }
    }


    /* ---------- which page is this? ---------- */

    var relativePath = location.pathname.slice(rootURL.pathname.length);

    if (relativePath === "" || relativePath.slice(-1) === "/") {
        relativePath += "index.html";
    }

    var fileName = relativePath.split("/").pop().toLowerCase();

    var isMaintenancePage = (relativePath === MAINTENANCE_FILE);
    var isRootIndex = (relativePath === "index.html");


    /* ---------- should this page be redirected? ---------- */

    function pageIsLocked() {

        if (!MAINTENANCE_ENABLED) { return false; }

        if (Object.prototype.hasOwnProperty.call(MAINTENANCE_PAGES, fileName)) {
            return MAINTENANCE_PAGES[fileName] === true;
        }

        return MAINTENANCE_OTHER_PAGES === true;
    }


    /* ---------- the maintenance page itself ---------- */

    if (isMaintenancePage) {

        // If maintenance is off or the tester is already in, leave this page.
        if (!MAINTENANCE_ENABLED || hasBypass()) {
            location.replace(homeURL.href);
        }

        return;
    }


    /* ---------- every other page ---------- */

    if (isRootIndex || hasBypass() || !pageIsLocked()) { return; }

    // Hide the page so nothing flashes before the redirect.
    document.documentElement.style.display = "none";

    var target = new URL(maintenanceURL.href);
    target.searchParams.set("from", location.href);

    location.replace(target.href);

})();


/* =========================================================
   ADMIN LOGIN  (used by maintenance.html)
   Defined outside the redirect logic so the maintenance
   page can call it.
========================================================= */

window.MegaMaintenance = {};

window.MegaMaintenance.login = function (username, passcode) {

    if (username !== MAINTENANCE_ADMIN_USER || passcode !== MAINTENANCE_ADMIN_PASS) {
        return false;
    }

    try { sessionStorage.setItem("mm_maintenance_bypass", "yes"); }
    catch (e) { return false; }

    // Go back to the page the tester was trying to open, else the home page.

    var home = new URL("../home.html", MAINTENANCE_SCRIPT_SRC || location.href);

    var destination = home.href;

    try {
        var from = new URL(location.href).searchParams.get("from");

        if (from) {
            var fromURL = new URL(from);

            if (fromURL.origin === location.origin &&
                fromURL.pathname.indexOf("maintenance.html") === -1) {
                destination = fromURL.href;
            }
        }
    } catch (e) { /* use home page */ }

    location.href = destination;
    return true;
};

window.MegaMaintenance.logout = function () {
    try { sessionStorage.removeItem("mm_maintenance_bypass"); }
    catch (e) { /* storage blocked */ }
};

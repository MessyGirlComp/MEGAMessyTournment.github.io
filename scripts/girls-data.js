// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   GIRL DATABASE + SHARED HELPERS

   Used by every page. Load it FIRST:

   <script src="(path to)/scripts/girls-data.js"></script>
   <script src="(path to)/scripts/site.js"></script>

   Because this file works out where the site root is from
   its OWN location (root/scripts/girls-data.js), every link
   and image path it builds works from any page.

   Folder layout this expects:

   index.html
   assets/girls/A/001.png   first image
   assets/girls/B/001.png   second image
   assets/girls/C/001.png   third image
   assets/girls/T/001.png   thumbnail (cards on list pages)
   scripts/girls-data.js
   scripts/site.js
   scripts/profile.js
   scripts/group.js
   styles/site.css
   girls/all.html
   girls/profiles/profile.html
   qualifying/groups/group.html
========================================================= */


/* =========================================================
   SITE ROOT
========================================================= */

const GIRLS_DATA_SCRIPT_URL = document.currentScript.src;

/*
    siteURL("girls/all.html") -> full URL of that page,
    no matter which page is calling it.
*/

function siteURL(path) {

    return new URL(
        path,
        new URL("../", GIRLS_DATA_SCRIPT_URL)
    ).href;

}


/* =========================================================
   IMAGE FILE NAMES
   ---------------------------------------------------------
   If your files are named differently (for example
   "001 A.png"), change ONLY this function.
========================================================= */

/*
    Plain relative path, used by profile.html and group.html
    (both are two folders deep: girls/profiles/ and
    qualifying/groups/). all.html has its image paths written
    directly in the HTML instead.

    Images:  assets/girls/A/001.png, B/001.png, C/001.png, T/001.png
*/

const GIRL_ASSET_BASE = "../../assets/girls/";

function girlImageFileName(girlID) {

    return `${girlID}.png`;

}


/* =========================================================
   CATEGORY LISTS
   ---------------------------------------------------------
   The filters on the All Girls page are built from these,
   so a girl's messType / mediaSourceType should be one of
   these values (anything else is filed under "Other").
========================================================= */

const MESS_TYPES = [
    "Gunge",
    "Slime",
    "Water",
    "Food",
    "Mud",
    "Other"
];

/*
    Wording used in headings such as
    "Watch Amy Getting Gunged" / "Reaction to Being Gunged".
    Keep one entry per MESS_TYPES value.
*/

const MESS_VERBS = {
    "gunge": "Gunged",
    "slime": "Slimed",
    "water": "Soaked",
    "food": "Covered in Food",
    "mud": "Muddied",
    "other": "Messed"
};

function getMessVerb(girl) {

    return MESS_VERBS[getMessKey(girl)];

}

const MEDIA_SOURCE_TYPES = [
    "Game Show",
    "Online Trend",
    "YouTube",
    "TV",
    "Other"
];


/* =========================================================
   GROUP VOTE LINKS
========================================================= */

const groupVoteLinks = {
    1: "YOUR_GOOGLE_FORM_GROUP_1",
    7: "YOUR_GOOGLE_FORM_GROUP_7"
};


/* =========================================================
   GIRL DATABASE
   ---------------------------------------------------------
   Fields:

   id               "001"  (3 digits, matches image names)
   name             display name
   age              text
   bio              text
   appearance       text (shown together with bio under "Biography")
   reaction         her reaction / feelings about being gunged,
                    slimed, etc. (label follows messType)
   status           "Currently Competing", "Qualified",
                    "Eliminated" ...
   group            qualifying group number
   from             title of the source (show / video / etc.)
   mediaSourceType  one of MEDIA_SOURCE_TYPES
   messType         one of MESS_TYPES
   youtube          YouTube EMBED link, used directly as the
                    iframe src:
                      https://www.youtube.com/embed/XXXXXXXXXXX
========================================================= */

const girls = {

    "001": {
        id: "001",
        name: "Amy",
        age: "",
        bio: "",
        appearance: "Amy wears a bright pink, short-sleeved shirt with a smocked or gathered neckline and slightly puffed sleeves with gathered hems. She wears a textured maroon or deep red headband with a woven or braided appearance. Her medium-length blonde hair is pulled back from her face and gathered into a low ponytail at the nape of her neck, with a few loose wisps around her temples and ears.",
        reaction: "Gunge was horrible and sticky, with huge lumps in it, especially at the bottom. Despite how sticky it looked, Amy would still love to go in it.",
        status: "Currently Competing",
        group: 4,
        from: "Wait For It",
        mediaSourceType: "Game Show",
        messType: "Gunge",
        youtube: "https://www.youtube.com/embed/JSC4bHpfB0U?si=FDyyKfe3YMcbByve"
    },

    "002": {
        id: "002",
        name: "Rachel",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 1,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "003": {
        id: "003",
        name: "Grainne",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 1,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "004": {
        id: "004",
        name: "Aoife",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 1,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "005": {
        id: "005",
        name: "Hannah",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 3,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "006": {
        id: "006",
        name: "Carolanne",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 3,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "007": {
        id: "007",
        name: "Carrie",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 1,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "008": {
        id: "008",
        name: "Georgie",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 2,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "009": {
        id: "009",
        name: "Louisa",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 4,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "010": {
        id: "010",
        name: "Lisa",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 4,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "011": {
        id: "011",
        name: "Georgia",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 2,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "012": {
        id: "012",
        name: "Ellie",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 1,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "013": {
        id: "013",
        name: "Nina",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 2,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "014": {
        id: "014",
        name: "Katherine",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 1,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "015": {
        id: "015",
        name: "Katie",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 3,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "016": {
        id: "016",
        name: "Joanna",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 3,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "017": {
        id: "017",
        name: "Courtney",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 4,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "018": {
        id: "018",
        name: "Cally",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 2,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "019": {
        id: "019",
        name: "Chelsea",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 3,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "020": {
        id: "020",
        name: "Emily",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 3,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "021": {
        id: "021",
        name: "Iona",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 4,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "022": {
        id: "022",
        name: "Holly",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 2,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "023": {
        id: "023",
        name: "Ellen",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 2,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    },

    "024": {
        id: "024",
        name: "Erin",
        age: "",
        bio: "",
        appearance: "",
        reaction: "",
        status: "",
        group: 4,
        from: "Wait For It",
        mediaSourceType: "",
        messType: "Gunge",
        youtube: ""
    }

};


/* =========================================================
   LOOKUPS
========================================================= */

function getGirl(id) {

    const girlID = String(id).padStart(3, "0");

    return girls[girlID] || null;

}

function getAllGirls() {

    return Object.values(girls).sort(
        (a, b) => a.id.localeCompare(b.id)
    );

}

function getGirlsByGroup(groupNumber) {

    return getAllGirls().filter(
        girl => girl.group === Number(groupNumber)
    );

}

function getGroupVoteLink(groupNumber) {

    return groupVoteLinks[Number(groupNumber)] || "#";

}


/* =========================================================
   FILTER KEYS
   ---------------------------------------------------------
   Turn a girl's data into the short keys the filters use.
========================================================= */

function toKey(value) {

    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}

function getStatusKey(girl) {

    const status = String(girl.status || "").toLowerCase();

    if (status.includes("eliminat")) {
        return "eliminated";
    }

    if (status.includes("qualif")) {
        return "qualified";
    }

    return "remaining";

}

function getMessKey(girl) {

    const key = toKey(girl.messType);

    return MESS_TYPES.some(type => toKey(type) === key)
        ? key
        : "other";

}

function getSourceKey(girl) {

    const key = toKey(girl.mediaSourceType);

    return MEDIA_SOURCE_TYPES.some(type => toKey(type) === key)
        ? key
        : "other";

}


/* =========================================================
   PAGE URLS
========================================================= */

function getAllGirlsURL() {

    return siteURL("girls/all.html");

}

function getGirlProfileURL(id) {

    const girlID = String(id).padStart(3, "0");

    return siteURL(
        `girls/profiles/profile.html?girl=${encodeURIComponent(girlID)}`
    );

}

function getGroupURL(groupNumber) {

    return siteURL(
        `qualifying/groups/group.html?group=${Number(groupNumber)}`
    );

}


/* =========================================================
   IMAGE PATHS
========================================================= */

function getGirlAssetPath(id, type) {

    const girlID = String(id).padStart(3, "0");

    const file = girlImageFileName(girlID);

    switch (String(type).toLowerCase()) {

        case "a":
        case "first":
            return `${GIRL_ASSET_BASE}A/${file}`;

        case "b":
        case "second":
            return `${GIRL_ASSET_BASE}B/${file}`;

        case "c":
        case "third":
            return `${GIRL_ASSET_BASE}C/${file}`;

        case "t":
        case "thumbnail":
        case "thumb":
            return `${GIRL_ASSET_BASE}T/${file}`;

        default:
            console.warn(
                `Unknown asset type "${type}" for Girl ${girlID}`
            );
            return "";
    }

}

function getGirlImageA(id)    { return getGirlAssetPath(id, "a"); }
function getGirlImageB(id)    { return getGirlAssetPath(id, "b"); }
function getGirlImageC(id)    { return getGirlAssetPath(id, "c"); }
function getGirlThumbnail(id) { return getGirlAssetPath(id, "t"); }
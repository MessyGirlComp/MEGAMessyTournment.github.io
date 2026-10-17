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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/fMsRmZAlrY4?si=Vlsohr6t2xM8i3Ch"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/iqQBrCpHbXk?si=inn2LQBtXxMVGqBj"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/sryGsXPb0KE?si=M7Vu8Fe-gthTZ0iW"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/QVfE42FnZWY?si=xSe_Va1rxcZjVwjL"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/nIMDUi-m2K4?si=Nbakm7mHzkJg-gYN"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/kKAIEeMqLrQ?si=ZvGdt6X2ZEyR1RHj"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/isXSRtTXQ3M?si=JEvreLlZIweYioAs"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/OsfYp148xK4?si=MvhwMzFCMzrCepW_"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/ZXGCDefr9qI?si=d1L58IgK4w0BMjF-"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/uCkR3f9hWqI?si=ru0r-bhovqhE87Qj"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/KpcyZCY0l3M?si=je1JmOzIC1TYh6SY"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/VWLBGfyvyFs?si=cx7NuJMByRM67dpw"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/Qplc2ZZPKYY?si=QbUTuFhwVMi7ZHRf"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/eWVyC3JTrfA?si=-8fn-ethp5G17Vmc"
},

"016": {
    id: "016",
    name: "Joanna",
    age: "",
    bio: "",
    appearance: "",
    status: "",
    group: 3,
    from: "Wait For It",
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/c6VBnIUw8I8?si=xryvcvakzKK4uxxw"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/dI0eIJIvfs4?si=Zsd5ntW44O2NvZxt"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/KEh8gkDbioY?si=Loa06JhRzp9udEEI"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/xocCpo2WsgQ?si=rJo7_EYw4cWwpKxY"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/6ZOlgX95olg?si=bILQHkMQu6VC6Crm"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/me2URuHKePk?si=eeIRbIHSN6YYVSfO"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/vNfVRqUUXUw?si=ukrhvKr_BUqDow8A"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/azx9F7hTthw?si=gQQIx1PcSjQqhuxG"
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
    mediaSourceType: "Game Show",
    messType: "Gunge",
    youtube: "https://www.youtube.com/embed/TbDwL7FbCCI?si=XUZcJzV54HPkGWIh"
},
	"025": {
   id: "025",
   name: "Carloline",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 5,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Slime",
   youtube: "https://youtu.be/Zhf_whyeZac"
},

"026": {
   id: "026",
   name: "Daisy",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 5,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Food",
   youtube: "https://youtu.be/AjktkdpamUg"
},

"027": {
   id: "027",
   name: "Chantell",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 6,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Slime",
   youtube: "https://youtu.be/VrwQQ91CI0w"
},

"028": {
   id: "028",
   name: "Rebecca",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 8,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Slime",
   youtube: "https://youtu.be/rKVPR0VJIas"
},

"029": {
   id: "029",
   name: "Jessica",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 5,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Water",
   youtube: "https://youtu.be/ZKfGwuXLkcc"
},

"030": {
   id: "030",
   name: "Tabatha",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 8,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Slime",
   youtube: "https://youtu.be/_E77kfSLzFM"
},

"031": {
   id: "031",
   name: "Daisy",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 7,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Slime",
   youtube: "https://youtu.be/zR530PImvL0"
},

"032": {
   id: "032",
   name: "Emma",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 6,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Food",
   youtube: "https://youtu.be/FGT8jDJinBM"
},

"033": {
   id: "033",
   name: "Jenifer",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 8,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Food",
   youtube: "https://youtu.be/fSw6IF2Vt2U"
},

"034": {
   id: "034",
   name: "Pagie",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 8,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Food",
   youtube: "https://youtu.be/2Tp-UB4fcDM"
},

"035": {
   id: "035",
   name: "Jade",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 6,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Slime",
   youtube: "https://youtu.be/waRWtKV7ags"
},

"036": {
   id: "036",
   name: "Maisie",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 5,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Other",
   youtube: "https://youtu.be/Ck-_bQ50dHA"
},

"037": {
   id: "037",
   name: "Rebbeca",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 8,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Slime",
   youtube: "https://youtu.be/hBnLT8K4wPY"
},

"038": {
   id: "038",
   name: "Faye",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 5,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Slime",
   youtube: "https://youtu.be/C5lLhxhAcwM"
},

"039": {
   id: "039",
   name: "Lauren",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 7,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Food",
   youtube: "https://youtu.be/QNgzB0YbK_A"
},

"040": {
   id: "040",
   name: "Amy",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 7,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Food",
   youtube: "https://youtu.be/GRWjuRieS-M"
},

"041": {
   id: "041",
   name: "Regan",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 6,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Food",
   youtube: "https://youtu.be/oAfbwBEq-EY"
},

"042": {
   id: "042",
   name: "Sammy",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 7,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Slime",
   youtube: "https://youtu.be/2s9CYALX0kU"
},

"043": {
   id: "043",
   name: "Grace C",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 7,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Gunge",
   youtube: "https://youtu.be/VJS_PFKD2Us"
},

"044": {
   id: "044",
   name: "Jess",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 8,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Gunge",
   youtube: "https://youtu.be/g2APyuk9zcw"
},

"045": {
   id: "045",
   name: "Chelesa",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 7,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Slime",
   youtube: "https://youtu.be/kkbbZtphzRA"
},

"046": {
   id: "046",
   name: "Amy",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 6,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Gunge",
   youtube: "https://youtu.be/zcdPdeOGNXo"
},

"047": {
   id: "047",
   name: "Lily",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 6,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Water",
   youtube: "https://youtu.be/mfDCU8j66o4"
},

"048": {
   id: "048",
   name: "Abbie",
   age: "",
   bio: "",
   appearance: "",
   reaction: "",
   status: "",
   group: 5,
   from: "Dick and Dom",
   mediaSourceType: "",
   messType: "Gunge",
   youtube: "https://youtu.be/rsSp2aWyLyo"
},
	
"049": {
    id: "049",
    name: "Ella",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 9,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"050": {
    id: "050",
    name: "Zoe",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 9,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"051": {
    id: "051",
    name: "Emily",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 9,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"052": {
    id: "052",
    name: "Olivia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 9,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"053": {
    id: "053",
    name: "Lucinda",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 9,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"054": {
    id: "054",
    name: "Zoe",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 9,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"055": {
    id: "055",
    name: "Kira",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 10,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"056": {
    id: "056",
    name: "Isabelle",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 10,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"057": {
    id: "057",
    name: "Reha",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 10,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"058": {
    id: "058",
    name: "Eloise",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 10,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"059": {
    id: "059",
    name: "Grace",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 10,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"060": {
    id: "060",
    name: "Avalone",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 10,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"061": {
    id: "061",
    name: "Stephany",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 11,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"062": {
    id: "062",
    name: "Sofia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 11,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"063": {
    id: "063",
    name: "Khadejah",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 11,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"064": {
    id: "064",
    name: "Andriana",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 11,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"065": {
    id: "065",
    name: "Indianna",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 11,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"066": {
    id: "066",
    name: "Kirra",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 11,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"067": {
    id: "067",
    name: "Shayla",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 12,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"068": {
    id: "068",
    name: "Krystal",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 12,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"069": {
    id: "069",
    name: "Maisie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 12,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"070": {
    id: "070",
    name: "Juliet",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 12,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"071": {
    id: "071",
    name: "Breigh-Ellen",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 12,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"072": {
    id: "072",
    name: "Tahlia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 12,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"073": {
    id: "073",
    name: "Eloise",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 13,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"074": {
    id: "074",
    name: "Caprice",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 13,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"075": {
    id: "075",
    name: "Macy",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 13,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"076": {
    id: "076",
    name: "Bailey",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 13,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"077": {
    id: "077",
    name: "Makenzie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 13,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"078": {
    id: "078",
    name: "Tamara",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 13,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"079": {
    id: "079",
    name: "Keira",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 14,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"080": {
    id: "080",
    name: "Jade",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 14,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"081": {
    id: "081",
    name: "Saskia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 14,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"082": {
    id: "082",
    name: "Evie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 14,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"083": {
    id: "083",
    name: "Girisha",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 14,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"084": {
    id: "084",
    name: "Elosie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 14,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"085": {
    id: "085",
    name: "Jonty",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 15,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"086": {
    id: "086",
    name: "Emma",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 15,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"087": {
    id: "087",
    name: "Kyra",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 15,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"088": {
    id: "088",
    name: "Aliyah",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 15,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"089": {
    id: "089",
    name: "Georgia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 15,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"090": {
    id: "090",
    name: "Rachel",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 15,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"091": {
    id: "091",
    name: "Anika",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 16,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"092": {
    id: "092",
    name: "Harriert",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 16,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"093": {
    id: "093",
    name: "Emma",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 16,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"094": {
    id: "094",
    name: "Celeste",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 16,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"095": {
    id: "095",
    name: "Sara",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 16,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"096": {
    id: "096",
    name: "Ayesha",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 16,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"097": {
    id: "097",
    name: "Gracie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 17,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"098": {
    id: "098",
    name: "Talei",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 17,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"099": {
    id: "099",
    name: "Juliea",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 17,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"100": {
    id: "100",
    name: "Ava",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 17,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"101": {
    id: "101",
    name: "Evie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 17,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"102": {
    id: "102",
    name: "Sophie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 17,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"103": {
    id: "103",
    name: "Chole",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 18,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"104": {
    id: "104",
    name: "Hayley",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 18,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"105": {
    id: "105",
    name: "Emma",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 18,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"106": {
    id: "106",
    name: "Mikaela",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 18,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"107": {
    id: "107",
    name: "Uma",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 18,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"108": {
    id: "108",
    name: "Sophie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 18,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"109": {
    id: "109",
    name: "Tyla-Bell",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 19,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"110": {
    id: "110",
    name: "Maria",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 19,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"111": {
    id: "111",
    name: "Scarlett",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 19,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"112": {
    id: "112",
    name: "Jasmine",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 19,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"113": {
    id: "113",
    name: "Tayla",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 19,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"114": {
    id: "114",
    name: "Jess D",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 19,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"115": {
    id: "115",
    name: "Lacey",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 20,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"116": {
    id: "116",
    name: "Stevie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 20,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"117": {
    id: "117",
    name: "Tali S",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 20,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"118": {
    id: "118",
    name: "Georgia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 20,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"119": {
    id: "119",
    name: "Amber",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 20,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"120": {
    id: "120",
    name: "Lily",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 20,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"121": {
    id: "121",
    name: "Sasha",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 21,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"122": {
    id: "122",
    name: "Jayde",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 21,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"123": {
    id: "123",
    name: "Josephine",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 21,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"124": {
    id: "124",
    name: "Lilly",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 21,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"125": {
    id: "125",
    name: "Emma",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 21,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"126": {
    id: "126",
    name: "Mia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 21,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"127": {
    id: "127",
    name: "Erin",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 22,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"128": {
    id: "128",
    name: "Madeline",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 22,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"129": {
    id: "129",
    name: "Ashleigh",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 22,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"130": {
    id: "130",
    name: "Sarah",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 22,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"131": {
    id: "131",
    name: "Sophie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 22,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"132": {
    id: "132",
    name: "Hayley",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 22,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"133": {
    id: "133",
    name: "Raquel",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 23,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"134": {
    id: "134",
    name: "Scarlett",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 23,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"135": {
    id: "135",
    name: "Abbey-Rose",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 23,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"136": {
    id: "136",
    name: "Lillie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 23,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"137": {
    id: "137",
    name: "Tyeisha",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 23,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"138": {
    id: "138",
    name: "Claudia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 23,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"139": {
    id: "139",
    name: "Andie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 24,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"140": {
    id: "140",
    name: "Crystal",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 24,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"141": {
    id: "141",
    name: "Liv",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 24,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"142": {
    id: "142",
    name: "Mia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 24,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"143": {
    id: "143",
    name: "Sara",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 24,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"144": {
    id: "144",
    name: "Sofia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 24,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"145": {
    id: "145",
    name: "Zoe",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 25,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"146": {
    id: "146",
    name: "Scarlett",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 25,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"147": {
    id: "147",
    name: "Ella",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 25,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"148": {
    id: "148",
    name: "Isbella",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 25,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"149": {
    id: "149",
    name: "Grace-Violet",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 25,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"150": {
    id: "150",
    name: "Rheanna",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 25,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"151": {
    id: "151",
    name: "Lola",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 26,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"152": {
    id: "152",
    name: "Tayla",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 26,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"153": {
    id: "153",
    name: "Crystal",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 26,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"154": {
    id: "154",
    name: "Amelia R",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 26,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"155": {
    id: "155",
    name: "Milly",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 26,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"156": {
    id: "156",
    name: "Danielle",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 26,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"157": {
    id: "157",
    name: "Elouise",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 27,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"158": {
    id: "158",
    name: "Katie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 27,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"159": {
    id: "159",
    name: "Amber",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 27,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"160": {
    id: "160",
    name: "Tamara",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 27,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"161": {
    id: "161",
    name: "Charlotte",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 27,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"162": {
    id: "162",
    name: "Chelsea",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 27,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"163": {
    id: "163",
    name: "Millie",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 28,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"164": {
    id: "164",
    name: "Keira",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 28,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"165": {
    id: "165",
    name: "Amelia",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 28,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"166": {
    id: "166",
    name: "Jacquline",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 28,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"167": {
    id: "167",
    name: "Sasha",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 28,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},

"168": {
    id: "168",
    name: "Anais",
    age: "",
    bio: "",
    appearance: "",
    reaction: "",
    status: "",
    group: 28,
    from: "Flushed",
    mediaSourceType: "",
    messType: "Gunge",
    youtube: ""
},
	
"079": {
  id: "079",
  name: "Chole",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"080": {
  id: "080",
  name: "Olivia",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"081": {
  id: "081",
  name: "Ella",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"082": {
  id: "082",
  name: "Heidi",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"083": {
  id: "083",
  name: "Megan",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"084": {
  id: "084",
  name: "Abbie",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"085": {
  id: "085",
  name: "Jodie",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"086": {
  id: "086",
  name: "Phoebe",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"087": {
  id: "087",
  name: "Ayzia",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"088": {
  id: "088",
  name: "Tia",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"089": {
  id: "089",
  name: "Imogen",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"090": {
  id: "090",
  name: "Maisie",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"091": {
  id: "091",
  name: "Myah",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 31,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"092": {
  id: "092",
  name: "Sophie",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 31,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"093": {
  id: "093",
  name: "Flo",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 31,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"094": {
  id: "094",
  name: "Lucy",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 31,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"095": {
  id: "095",
  name: "Martha",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 31,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
  youtube: ""
},

"096": {
  id: "096",
  name: "Nicole",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 31,
  from: "Sam & Mark's Big Friday Wind Up",
  mediaSourceType: "Game Show",
  messType: "Slime",
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
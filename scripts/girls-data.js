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
   VOTING
   Votes are stored in Supabase. See votes.js and
   supabase-config.js (no per-group links needed any more).
========================================================= */


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
   youtube: "https://www.youtube.com/embed/Zhf_whyeZac"
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
   youtube: "https://www.youtube.com/embed/AjktkdpamUg"
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
   youtube: "https://www.youtube.com/embed/VrwQQ91CI0w"
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
   youtube: "https://www.youtube.com/embed/rKVPR0VJIas"
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
   youtube: "https://www.youtube.com/embed/ZKfGwuXLkcc"
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
   youtube: "https://www.youtube.com/embed/_E77kfSLzFM"
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
   youtube: "https://www.youtube.com/embed/zR530PImvL0"
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
   youtube: "https://www.youtube.com/embed/FGT8jDJinBM"
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
   youtube: "https://www.youtube.com/embed/fSw6IF2Vt2U"
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
   youtube: "https://www.youtube.com/embed/2Tp-UB4fcDM"
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
   youtube: "https://www.youtube.com/embed/waRWtKV7ags"
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
   youtube: "https://www.youtube.com/embed/Ck-_bQ50dHA"
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
   youtube: "https://www.youtube.com/embed/hBnLT8K4wPY"
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
   youtube: "https://www.youtube.com/embed/C5lLhxhAcwM"
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
   youtube: "https://www.youtube.com/embed/QNgzB0YbK_A"
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
   youtube: "https://www.youtube.com/embed/GRWjuRieS-M"
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
   youtube: "https://www.youtube.com/embed/oAfbwBEq-EY"
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
   youtube: "https://www.youtube.com/embed/2s9CYALX0kU"
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
   youtube: "https://www.youtube.com/embed/VJS_PFKD2Us"
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
   youtube: "https://www.youtube.com/embed/g2APyuk9zcw"
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
   youtube: "https://www.youtube.com/embed/kkbbZtphzRA"
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
   youtube: "https://www.youtube.com/embed/zcdPdeOGNXo"
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
   youtube: "https://www.youtube.com/embed/mfDCU8j66o4"
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
   youtube: "https://www.youtube.com/embed/rsSp2aWyLyo"
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
    youtube: "https://www.youtube.com/embed/KZpoYGXGE6A?si=igldpW4NeMdahrVH"
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
    youtube: "https://www.youtube.com/embed/tnwP5QcDIuk?si=ia-Y3E4YaZpIClK5"
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
    youtube: "https://www.youtube.com/embed/iUUGzW7Bvvk?si=vtI-uRmwg1bGFRg_"
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
    youtube: "https://www.youtube.com/embed/lmPAPHVloqk?si=1kbTE_E1HQzXHsH5"
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
    youtube: "https://www.youtube.com/embed/XhIfY79eBf4?si=j4r0dmIOkiH3TRbc"
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
    youtube: "https://www.youtube.com/embed/gw6imhQQ4CQ?si=C9VGLtJt-rfBaggu"
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
    youtube: "https://www.youtube.com/embed/6QzZm6f-cy4?si=yCYClLDo4ETNXkKH"
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
    youtube: "https://www.youtube.com/embed/kShi4SmGNig?si=SYqCEMgGSP4vP6xD"
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
    youtube: "https://www.youtube.com/embed/hXOSh2agaMo?si=vdsVvFvxHztkv0RT"
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
    youtube: "https://www.youtube.com/embed/hTHqmOUdIRk?si=Wp-duoSc-WxXPIjc"
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
    youtube: "https://www.youtube.com/embed/YjbtggvebMU?si=wTgQJYiAuPv5Mymy"
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
    youtube: "https://www.youtube.com/embed/T0x3POHCv8k?si=bSEfFjyWTI1WqWO5"
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
    youtube: "https://www.youtube.com/embed/YI5VAS2thps?si=HLOGQip2q4HWPCBq"
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
    youtube: "https://www.youtube.com/embed/iJVPTOZB9b8?si=o8LKf5z5BoR9Gaml"
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
    youtube: "https://www.youtube.com/embed/vAFk-BCe2GY?si=cygcEondmst382I5"
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
    youtube: "https://www.youtube.com/embed/4ZK4JYhWq5Q?si=ZpzopFKx8ApWvjHA"
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
    youtube: "https://www.youtube.com/embed/h4WvDex1j9E?si=XMp7_lKXFcgZjCc8"
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
    youtube: "https://www.youtube.com/embed/k1ZaqQfyeGU?si=-LtFnHgz_9RYXRKr"
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
    youtube: "https://www.youtube.com/embed/ManhYUADgzo?si=0AjaUCMsBi_b-3yZ"
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
    youtube: "https://www.youtube.com/embed/mTPjKjZMkeY?si=2uPH6yDrD7Yqh59s"
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
    youtube: "https://www.youtube.com/embed/QmnJUjKvtSc?si=bX8nY-Vz9EAN0Y6j"
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
    youtube: "https://www.youtube.com/embed/2uGVw1f2qzk?si=DcRuc3FyWdIvgo4T"
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
    youtube: "https://www.youtube.com/embed/-nKbc9o2C6U?si=XlHNJZ2LtrBhaUnE"
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
    youtube: "https://www.youtube.com/embed/CIFX52bAZsI?si=QoibTY0bQT8dxPWV"
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
    youtube: "https://www.youtube.com/embed/qarTHlUji44?si=LnvSd6MrBB75d7mp"
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
    youtube: "https://www.youtube.com/embed/lHPdIt3oyk8?si=1wTvLyc1oLxWP3YF"
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
    youtube: "https://www.youtube.com/embed/UYYLmqByWLg?si=7qNXzK_Gv-p6ZRoP"
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
    youtube: "https://www.youtube.com/embed/orUD7-ds3Dw?si=gvNVd14jm81HVGhX"
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
    youtube: "https://www.youtube.com/embed/_MaL4HHFPnI?si=2QS3vBrdocPbnMYi"
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
    youtube: "https://www.youtube.com/embed/w1FOtLydsmA?si=cKxelljupqDEQCNI"
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
   youtube: "https://www.youtube.com/embed/pl371LXXuOw?si=weT7RJVqjtPHkVwU"
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
   youtube: "https://www.youtube.com/embed/Xqa2Ky4M1rE?si=W17VjYQttineA7tT"
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
   youtube: "https://www.youtube.com/embed/8EUyR-P0PfA?si=izbuVTrKbsyoOKQW"
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
   youtube: "https://www.youtube.com/embed/Qz2UFmEyyyQ?si=wA0EeX_xSPzyfXpb"
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
   youtube: "https://www.youtube.com/embed/1BT0uLjfLKE?si=kHPXFo6rd3fCagSg"
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
   youtube: "https://www.youtube.com/embed/9X1YhY_nHkg?si=2dknihjG5ieVbub2"
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
   youtube: "https://www.youtube.com/embed/ahMUd8EkCxk?si=E8TSXx2lbYpUvi7Q"
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
   youtube: "https://www.youtube.com/embed/7nr97DoNqAM?si=qT6cP9XVEwxwrP5b"
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
   youtube: "https://www.youtube.com/embed/p6Jguejj4cQ?si=b1i-O6kqg13qqMQD"
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
   youtube: "https://www.youtube.com/embed/_bXiZBQn-y8?si=LMfmqbNHw3eQiGpA"
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
   youtube: "https://www.youtube.com/embed/_ULIaLbQLHY?si=9BiDmnPUOpGF8V5W"
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
   youtube: "https://www.youtube.com/embed/5pw5k3DAkPI?si=m90mIihYCRk1WbKi"
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
   youtube: "https://www.youtube.com/embed/d8fJvtMpt7s?si=iNERAMhQIDlJn72Z"
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
   youtube: "https://www.youtube.com/embed/dOMPI-yb9ZY?si=ag5Y4HWAdAifIAg3"
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
   youtube: "https://www.youtube.com/embed/svXjC2qRVr8?si=VLNxxWUQqYpR06PE"
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
   youtube: "https://www.youtube.com/embed/XkHzyS9KwPI?si=sSn1ObVsFLpEj8f_"
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
   youtube: "https://www.youtube.com/embed/QCT4jYLUrxc?si=RIYfTeZIM1LLVnLq"
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
   youtube: "https://www.youtube.com/embed/N0WwTJN_W74?si=kdlodNsFjaqOjr9E"
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
   youtube: "https://www.youtube.com/embed/MOwMFO3DJm4?si=e9e5W7PBIqwGdxKF"
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
   youtube: "https://www.youtube.com/embed/iI0wljMCbNw?si=a6Tf2-PGzaDzHEUT"
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
   youtube: "https://www.youtube.com/embed/dDM92npmT0U?si=Urpylq_q8SoU2eoX"
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
   youtube: "https://www.youtube.com/embed/VOa0ZHetmhE?si=7XjtM7HDcTpkgt-O"
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
   youtube: "https://www.youtube.com/embed/k3aHkzaKw8k?si=jZW_UGA1ouswbRaj"
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
   youtube: "https://www.youtube.com/embed/eeFYnOtWfSQ?si=vg9J1rB6ZrloAZKN"
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
   youtube: "https://www.youtube.com/embed/juStrYPaTqg?si=I3lIs-Wp0V2kYO9U"
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
   youtube: "https://www.youtube.com/embed/BZzrD4BIPRE?si=QZRESVUCHt2pUkIL"
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
   youtube: "https://www.youtube.com/embed/zUjx8Z8H-jI?si=1I42rLl0bUWLwc-d"
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
   youtube: "https://www.youtube.com/embed/POTIYqlqOc0?si=kp5cdN9a32MEVnMp"
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
   youtube: "https://www.youtube.com/embed/9DE14lhqFNs?si=thtIgn2Ow5AVFarF"
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
   youtube: "https://www.youtube.com/embed/I0xUH2SE2eA?si=whhxxVjvtvzUXsgR"
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
   youtube: "https://www.youtube.com/embed/ut23GTH8YdI?si=qjy5DzV3g-njCPp_"
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
   youtube: "https://www.youtube.com/embed/h2qSR5AvOhs?si=aL6-tvI1o9MFfKGC"
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
   youtube: "https://www.youtube.com/embed/LtWlN_SOUVg?si=OGZRPgoRlbpR5qql"
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
   youtube: "https://www.youtube.com/embed/0NU6iU7qoSo?si=zcVYFpLxKG-5233d"
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
   youtube: "https://www.youtube.com/embed/Y9Q-tQ4sKdk?si=bI0z7h8CTdSab2n2"
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
   youtube: "https://www.youtube.com/embed/XKahut5RyZI?si=oB94wUyb6N_2zwQy"
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
   youtube: "https://www.youtube.com/embed/UzK5yQ1V6fw?si=b39NsQewBOjxsYzg"
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
   youtube: "https://www.youtube.com/embed/x8WuyzKJk_w?si=ozcXkRSakYzH5rVi"
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
   youtube: "https://www.youtube.com/embed/zBCcM9TZSTo?si=CtTnuvK84KUz5ksH"
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
   youtube: "https://www.youtube.com/embed/pZtXbUJ9BGQ?si=rC3Iv5WKqUko8mEx"
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
   youtube: "https://www.youtube.com/embed/NvmRRAAaTmY?si=4E2eN3qaZpMzCDlk"
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
   youtube: "https://www.youtube.com/embed/bIbg1kY_ues?si=9g24yaurs7fPAGLy"
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
   youtube: "https://www.youtube.com/embed/rxH6MjFhPe4?si=piTEyGgUhojKEG2E"
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
   youtube: "https://www.youtube.com/embed/GO0twC1KDPs?si=dvgv1fZM5KBov2pE"
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
   youtube: "https://www.youtube.com/embed/UchqHyYqYV0?si=w0voFQE2-CJPr5LL"
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
   youtube: "https://www.youtube.com/embed/b_LXLREkmic?si=qGoP_MH7tAev1HJ1"
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
   youtube: "https://www.youtube.com/embed/2lfrZtVomlM?si=9_CtrO3Ot_BjUFbS"
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
   youtube: "https://www.youtube.com/embed/Q-kot1FmbD0?si=27wMxhAAcuLEgc9F"
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
   youtube: "https://www.youtube.com/embed/aAurFi5DlaA?si=TvSfdeOQX0HvrFs8"
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
   youtube: "https://www.youtube.com/embed/riseRL7USa0?si=DKfIzJR1JxtTEPsT"
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
   youtube: "https://www.youtube.com/embed/CysTJ9Ro2S4?si=rx9lROFHjsgam5VT"
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
   youtube: "https://www.youtube.com/embed/GyWgOcuqr4U?si=kQxnLlmNqrRPBQ5c"
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
   youtube: "https://www.youtube.com/embed/2jZGsp-lSKo?si=ytDwlb84kZKcYUvQ"
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
   youtube: "https://www.youtube.com/embed/nVnY6NCm-6Y?si=NZnS2-ZkZqDwhMVT"
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
   youtube: "https://www.youtube.com/embed/MPciEtPd_Ew?si=eD3wXNoZBSUQ5aUI"
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
   youtube: "https://www.youtube.com/embed/MStUXsZcB9k?si=jdQxQ5JIsdozCjgT"
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
   youtube: "https://www.youtube.com/embed/0zt1OJ5LoA4?si=5wvt2RUPgf5M-bot"
},

"136": {
   id: "136",
   name: "Lillie",
   age: "",
   bio: "",
   appearance: "",
   status: "",
   group: 23,
   from: "Flushed",
   mediaSourceType: "",
   messType: "Gunge",
   youtube: "https://www.youtube.com/embed/ElIRhmW22yA?si=kyZGRknjjAHDLeAS"
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
   youtube: "https://www.youtube.com/embed/Kr6_7s5PwvA?si=Ry_gUMDnQZYNhqO2"
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
   youtube: "https://www.youtube.com/embed/Nq8Kc2vx9r8?si=jlAJyBNR65gG6URZ"
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
   youtube: "https://www.youtube.com/embed/b3WYJ59PXsI?si=BKWoSn_hWgIgldN0"
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
   youtube: "https://www.youtube.com/embed/sCw__LhXuUc?si=NMwthdmSdR8scMBx"
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
   youtube: "https://www.youtube.com/embed/eAmxuWoR2fo?si=wiPswat74PTJf8AN"
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
   youtube: "https://www.youtube.com/embed/WVvYsYsoQtY?si=mIRu6734vfD_Uh3J"
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
   youtube: "https://www.youtube.com/embed/016UkCP3u2Y?si=fd_C-ccrgcgN6DZI"
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
   youtube: "https://www.youtube.com/embed/6TpFIHIJa6k?si=o2HPTti2wKNL2hAD"
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
   youtube: "https://www.youtube.com/embed/SIGC9Am2kMo?si=5bkkFpF-vFwJJH9G"
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
   youtube: "https://www.youtube.com/embed/uxGbZBGrCQQ?si=xDHSfqGzDnXQ3jV6"
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
   youtube: "https://www.youtube.com/embed/hxwIiSqiUEs?si=YMTaLeasOkJmtaTK"
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
   youtube: "https://www.youtube.com/embed/WKxj1KCvRLM?si=bHEaNSmZJV_5_2eE"
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
   youtube: "https://www.youtube.com/embed/m2o7dQly-w4?si=0ngqqXZ-QPVs9MQQ"
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
   youtube: "https://www.youtube.com/embed/O2MjS_GqugY?si=9iqwiaN1DhMQl-U9"
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
   youtube: "https://www.youtube.com/embed/Dt--Neux1F4?si=kA_gOqZrSxrWKT2s"
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
   youtube: "https://www.youtube.com/embed/lxdpQRyFgzw?si=zi7JjbTBfanoD4Sp"
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
   youtube: "https://www.youtube.com/embed/G8swGvYHOLg?si=Ab609zWCwibBJoRi"
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
   youtube: "https://www.youtube.com/embed/mX2bktPC3ss?si=kCMGPfMCp4u2zeU7"
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
   youtube: "https://www.youtube.com/embed/cUL3wjMGsPA?si=NvSQrt2zH4Qd6MuH"
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
   youtube: "https://www.youtube.com/embed/k4Vjqgamth8?si=t2mSuso4W1qZi_xF"
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
   youtube: "https://www.youtube.com/embed/1w3jt6Ujr_w?si=ZLGbR7ZwKrLtTCdz"
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
   youtube: "https://www.youtube.com/embed/KcHTc49XQxQ?si=zc_ffZzwBqm36XO4"
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
   youtube: "https://www.youtube.com/embed/hIdZuEPoCI0?si=d6vewRz5i_mCYHl7"
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
   youtube: "https://www.youtube.com/embed/GdnWypDGox4?si=KiBK3rgzHeVA3yuj"
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
   youtube: "https://www.youtube.com/embed/L3VAWqNrkHc?si=yQ2eSCLiN-njGUMK"
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
   youtube: "https://www.youtube.com/embed/Ky2Hj-To1Pk?si=CyN2x1jIpCXLM_53"
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
   youtube: "https://www.youtube.com/embed/b4LkvQxna1c?si=gTwCH_P_qr257tdW"
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
   youtube: "https://www.youtube.com/embed/VRBGf76iN5I?si=vmtWV-GSfe09gwA_"
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
   youtube: "https://www.youtube.com/embed/yOtlZ0axp04?si=P5PMNGGbWtaxwmbr"
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
   youtube: "https://www.youtube.com/embed/IExP5jE5QiU?si=gGBpq81YCBqOucbq"
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
   youtube: "https://www.youtube.com/embed/iIsKLW7DkWs?si=47Tr8mTRagELoK0W"
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
   youtube: "https://www.youtube.com/embed/B_sGyVZOAm8?si=2G3TPr1E8B2RR5Pm"
},
	
"169": {
  id: "169",
  name: "Daisy",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"170": {
  id: "170",
  name: "Abigale",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"171": {
  id: "171",
  name: "Emma",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"172": {
  id: "172",
  name: "Gemma",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"173": {
  id: "173",
  name: "Katie",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"174": {
  id: "174",
  name: "Chole",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 29,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"175": {
  id: "175",
  name: "Maddie",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"176": {
  id: "176",
  name: "Star",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"177": {
  id: "177",
  name: "Olivia",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"178": {
  id: "178",
  name: "Yasmine",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"179": {
  id: "179",
  name: "Grace",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
  messType: "Gunge",
  youtube: ""
},
"180": {
  id: "180",
  name: "Zoe",
  age: "",
  bio: "",
  appearance: "",
  reaction: "",
  status: "",
  group: 30,
  from: "Den of Doom",
  mediaSourceType: "Game Show",
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
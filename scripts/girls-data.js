// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   GIRL DATABASE
========================================================= */


/* =========================================================
   ASSET LOCATION
   ---------------------------------------------------------
   Change this ONE line if profile.html moves.
   The path is relative to profile.html.

   assets/girls/A/001.png   first image
   assets/girls/B/001.png   second image
   assets/girls/C/001.png   third image
   assets/girls/T/001.png   thumbnail (not used on profile)
========================================================= */

const GIRL_ASSET_BASE = "../../assets/girls/";


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
   appearance       text
   status           e.g. "Currently Competing"
   group            qualifying group number
   from             title of the source (show / video / etc.)
   mediaSourceType  what kind of source it came from,
                    e.g. "TV Show", "YouTube Video", "Movie"
   messType         e.g. "Gunge", "Slime", "Custard Pie"
   youtube          YouTube EMBED link, used directly as the
                    iframe src:
                      https://www.youtube.com/embed/XXXXXXXXXXX
                    (YouTube > Share > Embed > copy the src URL)
========================================================= */

const girls = {


    /* =====================================================
       GROUP 7
    ===================================================== */

    "001": {
        id: "001",
        name: "Amy",
        age: "12",
        bio: "Gunge was horrible and sticky, with huge lumps in it, especially at the bottom. Despite how sticky it looked, Amy would still love to go in it.",
        appearance: "Amy wears a bright pink, short-sleeved shirt with a smocked or gathered neckline and slightly puffed sleeves with gathered hems. She wears a textured maroon or deep red headband with a woven or braided appearance. Her medium-length blonde hair is pulled back from her face and gathered into a low ponytail at the nape of her neck, with a few loose wisps around her temples and ears.",
        status: "Currently Competing",
        group: 7,
        from: "Wait For It",
        mediaSourceType: "TV Show",
        messType: "Gunge",
        youtube: "https://www.youtube.com/embed/JSC4bHpfB0U?si=FDyyKfe3YMcbByve"   // paste the embed link here
    },

};


/* =========================================================
   GET GIRL BY ID
========================================================= */

function getGirl(id) {

    const girlID = String(id).padStart(3, "0");

    return girls[girlID] || null;

}


/* =========================================================
   GET GIRLS BY GROUP
========================================================= */

function getGirlsByGroup(groupNumber) {

    return Object.values(girls).filter(
        girl => girl.group === Number(groupNumber)
    );

}


/* =========================================================
   GET GROUP VOTE LINK
========================================================= */

function getGroupVoteLink(groupNumber) {

    return groupVoteLinks[Number(groupNumber)] || "#";

}


/* =========================================================
   ASSET PATHS
========================================================= */

function getGirlAssetPath(id, type) {

    const girl = getGirl(id);

    if (!girl) {
        return "";
    }

    const girlID = String(id).padStart(3, "0");

    switch (String(type).toLowerCase()) {

        case "a":
        case "first":
            return `${GIRL_ASSET_BASE}A/${girlID}.png`;

        case "b":
        case "second":
            return `${GIRL_ASSET_BASE}B/${girlID}.png`;

        case "c":
        case "third":
            return `${GIRL_ASSET_BASE}C/${girlID}.png`;

        case "t":
        case "thumbnail":
        case "thumb":
            return `${GIRL_ASSET_BASE}T/${girlID}.png`;

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


/* =========================================================
   DATABASE COMPLETE
========================================================= */

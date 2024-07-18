const shortid = require('shortid');
const URL =require('../Models/url');

async function GenerateNewShortURL(req,res){
const body = req.body;
if(!body.url) return res.status(400).json({error:'url required sirrr...'})
   
 const shortID = shortid();

await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    VisitHistory:[{}],
    createdBy: req.user._id
});

return res.render("home", {
    id:shortID
})
}

async function GetAnalytics(req,res){
const shortId = req.params.shortId;
const result= await URL.findOne({shortId});

return res.json({
    totalClicks: result.VisitHistory.length,
    analytics: result.VisitHistory
})
}

async function HandleRedirect(req,res){
    const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate(
    {shortId},
{$push:{
    VisitHistory:{
        timestamp: Date.now(),
    }
}
}, 
{new:true}
);
console.log(entry)
 res.redirect(entry.redirectURL);
}
module.exports = {
    GenerateNewShortURL,
    GetAnalytics,
    HandleRedirect

}
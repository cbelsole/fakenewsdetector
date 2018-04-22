const express = require("express"),
  winston = require("winston"),
  expressWinston = require("express-winston");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ],
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function(req, res) {
      return false;
    }
  })
);

app.get("/api/hello", (req, res) => {
  // res.status(200);
  res.send({ express: "Hello From Express" });
});

app.post("/api/articles", (req, res) => {
  res.send(testRes);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

const testRes = {
  good: [
    "https://www.rollingstone.com/music/features/avicii-talks-quitting-touring-disappointing-madonna-w500622",
    "http://entertainment.time.com/2013/09/13/qa-superstar-dj-avicii-on-wake-me-up-partying-sober-and-why-he-owes-his-name-to-myspace/",
    "http://www.wcvb.com/article/boston-researchers-reverse-aging-in-mice-study-shows/19562478?obOrigUrl=true",
    "http://topixoffbeat.com/slideshow/18479?utm_source=adrizer_out&utm_campaign=73702&utm_term=$publisher_name$&tpx_campaign=18479-73702&obOrigUrl=true",
    "http://www.directexpose.com/back-to-the-future-facts/?utm_source=ouins&utm_campaign=000b9217b503f7d0c091bf567e1b25b59d&utm_term=$publisher_name$_$section_name$_$section_id$&utm_request=$req_id$&utm_content=newnext&utm_medium=A_OS_DE_US_D_BackToTheFutue_v9_2204&obOrigUrl=true",
    "https://www.everlane.com/redirect/outbrain?utm_source=outbrain&utm_medium=article&utm_campaign=day-heel_instyle_retail_copy&utm_content=$section_name$&utm_term=00da1eea66ae6d07ff7fac84de03108509&redirect_to=http://www.instyle.com/fashion/everlane-day-heels-comfortable&obOrigUrl=true",
    "http://teastart.com/tiny-wiener-got-lions-cage-big-cats-reaction-shocking/?utm_campaign=1289_pp-tst-out-d-us-tiny-wiener-got-lions-cage-big_2&utm_source=outbrain&utm_medium=$origsrcid$&utm_content=$section_id$&utm_term=00e4f5e24ee780aef5e0771e116bac2b37&obOrigUrl=true",
    "http://topixoffbeat.com/slideshow/18354?utm_source=adrizer_out&utm_campaign=74653&utm_term=$publisher_name$&tpx_campaign=18354-74653&obOrigUrl=true",
    "http://pjpwpp2b.brain-sharper.com/entertainment/gene-simmons-women-ob?utm_campaign=Gene%20Simmons%20V1%20-%20Desktop%20USA%20OB&utm_source=OutBrain&utm_medium=$origsrcname$&utm_term=%5BGallery%5D+Gene+Simmons+Surprisingly+Opens+Up+On+His+Love+Life&utm_content=0007351794aab082e1b5548ffa0fe4ba5b}&obOrigUrl=true",
    "http://searcheshub.com/?a=shb__00_00&qc=Antivirus&_$publisher_name$_$section_name$_Search&obClickId=$ob_click_id$&obOrigUrl=true",
    "http://www.healthcentral.com/skin-care/cf/slideshows/6-unusual-psoriasis-triggers?ap=825&pb=$section_id$&obOrigUrl=true",
    "http://tempo.topix.net/slideshow/19535/?utm_source=adrizer_out&utm_campaign=78347&utm_term=$publisher_name$&tpx_campaign={TPXCAMPAIGN}&obOrigUrl=true",
    "https://allmychildrendaycare.com/five-u-s-zoos-must-visit/?UA-59816912-1&obOrigUrl=true",
    "https://askthiswhen.com/how-to-find-the-best-home-alarm-systems/?utm_source=outbrain&utm_campaign=us-ob-yg-alarms-w-web2&utm_medium=cpc&utm_adgroup=$section_name$&utm_keyword=$section_id$&imp=46844&obOrigUrl=true",
    "http://insight.adsrvr.org/track/clk?ch=search&adv=ryskqil&dn=outbrain&kw=Mar18_Elysium_Perf_WL_OB_A_Discover-Time_instapage-discovery-time&r=https%3A%2F%2Fdiscover.elysiumhealth.com%2Ftime&obOrigUrl=true",
    "http://allmychildrendaycare.com/zika-virus-news-you-need-to-know/?UA-59816912-1&obOrigUrl=true",
    "https://preferences-mgr.truste.com/?pid=turnermedia01&aid=turnermedia01&type=turner_pop&site=turner.com&action=notice&country=us&locale=en&behavior=implied&from=http://consent.truste.com/"
  ],
  turners: [
    "https://www.cnn.com/privacy",
    "https://www.cnn.com/terms",
    "https://www.cnn.com/",
    "https://www.cnn.com/entertainment",
    "https://www.cnn.com/entertainment/celebrities",
    "https://www.cnn.com/entertainment/movies",
    "https://www.cnn.com/entertainment/tv-shows",
    "https://www.cnn.com/entertainment/culture",
    "http://money.cnn.com/media/",
    "https://www.cnn.com/profiles/faith-karimi",
    "https://www.cnn.com/profiles/faith-karimi",
    "https://www.cnn.com/videos",
    "https://www.cnn.com/2018/04/20/entertainment/avicii-dj-dead/index.html",
    "http://www.cnn.com/2018/04/18/entertainment/jeff-daniels-jim-carrey-conan/?obOrigUrl=true",
    "http://www.cnn.com/2018/04/16/us/thottapilly-family-missing/?obOrigUrl=true",
    "http://www.cnn.com/2018/04/18/opinions/what-happened-on-that-southwest-flight-opinion-abend/?obOrigUrl=true",
    "http://www.cnn.com/2018/04/18/entertainment/emma-stone-jonah-hill-netflix/?obOrigUrl=true",
    "http://www.cnn.com/2018/04/20/opinions/opioid-crisis-has-four-legged-victims-desmond-opinion/?obOrigUrl=true",
    "http://www.cnn.com/2018/04/20/entertainment/prince-paisley-park-photos-released/?obOrigUrl=true",
    "http://www.cnn.com/2018/04/08/us/joe-clyde-daniels-homicide-investigation/?iid=ob_article_footer_expansion&obOrigUrl=true",
    "http://money.cnn.com/2018/04/20/investing/moviepass-helios-matheson-analytics-stock/index.html?iid=ob_article_footer_expansion&obOrigUrl=true",
    "http://www.cnn.com/travel/article/standing-up-airplane-seat/?iid=ob_article_footer_expansion&obOrigUrl=true",
    "http://www.cnn.com/2018/04/18/us/southwest-pilot-landing/?iid=ob_article_footer_expansion&obOrigUrl=true",
    "http://www.cnn.com/travel/article/maldives-underwater-residence/?iid=ob_lockedrail_bottomlarge&obOrigUrl=true",
    "http://www.cnn.com/travel/article/planes-retired-what-happens/?iid=ob_lockedrail_bottommedium&obOrigUrl=true",
    "http://www.cnn.com/2018/04/19/opinions/secret-service-agent-barbara-bush-wackrow/?iid=ob_lockedrail_bottomlist&obOrigUrl=true",
    "http://www.cnn.com/2018/04/20/entertainment/allison-mack-arrested/?iid=ob_lockedrail_bottomlist&obOrigUrl=true",
    "http://www.cnn.com/2018/04/20/entertainment/natalie-portman-genesis-jerusalem/?iid=ob_lockedrail_bottomlist&obOrigUrl=true",
    "http://www.cnn.com/2018/04/19/us/backpackers-kalalau-trail-kauai-flooding-trnd/?iid=ob_lockedrail_topeditorial&obOrigUrl=true",
    "http://money.cnn.com/2018/04/22/news/economy/china-us-trade-beijing/index.html?iid=ob_lockedrail_topeditorial&obOrigUrl=true",
    "http://us.cnn.com/videos/entertainment/2018/04/20/david-copperfield-lawsuit-magic-trick-injury-jimenez-pkg.cnn?iid=ob_lockedrail_longstory_pool&obOrigUrl=true",
    "http://www.cnn.com/2018/04/22/us/california-steakhouse-stabbing/?iid=ob_lockedrail_longstory_pool&obOrigUrl=true",
    "http://www.cnn.com/2018/04/14/us/virgin-islands-terminix-pesticide-indictment/?iid=ob_article_organicsidebar_expansion&obOrigUrl=true",
    "http://www.cnn.com/2018/04/19/asia/melina-roberge-cocaine-smuggling-australia-intl/?iid=ob_article_organicsidebar_expansion&obOrigUrl=true",
    "http://www.cnn.com/2018/04/16/entertainment/khloe-kardashian-true-thompson/?iid=ob_article_organicsidebar_expansion&obOrigUrl=true",
    "http://www.cnn.com/2018/04/21/entertainment/verne-troyer-obit/?iid=ob_article_organicsidebar_expansion&obOrigUrl=true",
    "https://www.cnn.com/",
    "https://www.cnn.com/entertainment",
    "http://www.turner.com/",
    "https://www.cnn.com/terms",
    "https://www.cnn.com/privacy"
  ],
  advertizes: [
    "http://tinytrk.com/index.php?rgid=20292&sub=$section_name$&red=vdo&obOrigUrl=true",
    "https://article.everquote.com/?h1=startup&h2=brilliant_company&auuid=2a92b65c-903e-4581-8e1a-8e34d563b176&tid=925&tid=925&subid=3976&dt=dup&creativeid=00ba0088eb957e024c62dd109f82eb4d3b&utm_medium=$origsrcid$&s1=%24%7Bcity%7D%24%2C+%24%7Bregion%7D%24%3A+The+Unbelievable+Story+Behind+This+Brilliant+Sta&promotedlink=00ba0088eb957e024c62dd109f82eb4d3b&source=$origsrcname$&site=$origpubname$&obOrigUrl=true",
    "http://www.icepop.com/reba-mcentire/?utm_source=ouins&utm_campaign=00e4c2654638492db50e4a638fbb216b57&utm_term=$publisher_name$_$section_name$_$section_id$&utm_request=$req_id$&utm_content=newnext&utm_medium=Le_OS_IP_US_D_RebaMcEntire_v1_0702&obOrigUrl=true",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.outbrain.com/what-is/default/en",
    "http://click.clickntrax.com/9224ea8e-8458-49c1-96d7-820fe3521360?source=5396216&ADID=Place-Here&sectionid=%24section_id%24&sectionname=%24section_name%24&publisherid=%24publisher_id%24&publishername=%24publisher_name%24&adtitle=Top+10+Antivirus+For+Mac+Users.+%231+Is+Free.+%282018%29&obOrigUrl=true",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.myfinance.com/",
    "https://www.myfinance.com/best-savings-accounts-2/?utm_source=CNN&utm_campaign=cnnendofcontent&utm_medium=mfCRU",
    "https://www.myfinance.com/partner-preview/car-insurance-savings/?utm_source=CNN&utm_campaign=cnnendofcontent&utm_medium=mfCRU",
    "https://www.myfinance.com/best-savings-accounts/?utm_source=CNN&utm_campaign=cnnendofcontent&utm_medium=mfCRU",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.energybillcruncher.com/pa/?tg_ref=pwlmt2&camp_id=00e5a9a97a151ba1baa43e3f73fade59ed&keyword=Illinois+Policy+Makes+Going+Solar+Easy+For+Homeowners&sub2=$origpubname$_$origsrcname$&csg_ref=pagen&pag_ref=gen_na&obOrigUrl=true",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.outbrain.com/what-is/default/en",
    "https://www.lendingtree.com/?esourceid=6163146&cchannel=bd&siteid=header-article&csource=cnn",
    "https://ck.lendingtree.com/?a=343&c=1555&p=r&s1=article&ctype=articlert&cmethod=15yrpayoff&ccreative=expertsurge2",
    "https://ck.lendingtree.com/?a=343&c=1555&p=r&s1=article&ctype=articlert&cmethod=15yrpayoff&ccreative=payoffyourhousewiththisinsanetrick",
    "http://ck.lendingtree.com/?a=343&c=1229&p=r&s1=article&ctype=articlert&cmethod=form&ccreative=howmuchcouldyousaverefi",
    "http://ck.lendingtree.com/?a=343&c=1229&p=r&s1=article&ctype=articlert&cmethod=form&ccreative=rates3751636mo",
    "http://ck.lendingtree.com/?a=343&c=1229&p=r&s1=article&ctype=articlert&cmethod=form&ccreative=crshdebtshort",
    "https://www.myfinance.com/cnnrightrail-battleron/",
    "https://www.bankrate.com/landing/cd-rates-e/?prods=15,16,18,19,26,500&pid=cnn_cd_rt_right-rail-2_all",
    "https://www.myfinance.com/cnnrightrail-battle2/",
    "https://www.fool.com/mms/mark/shark-blunder?psource=esaccn7410000075&utm_campaign=ai-sharktankblunder&utm_source=cnn&waid=8976&utm_medium=contentmarketing&paid=8976&wsource=esaccnwdg0000078",
    "https://www.fool.com/mms/mark/medical-breakthrough-advert?psource=erbccn7410000046&utm_campaign=bio-medicalbreakthrough&utm_source=cnn&waid=9129&utm_medium=contentmarketing&paid=9129&wsource=erbccnwdg0000048"
  ],
  ignored: [
    "http://facebook.com/CNNent",
    "http://twitter.com/CNNent",
    "http://instagram.com/cnnentertainment",
    "http://facebook.com/CNNent",
    "http://twitter.com/CNNent",
    "http://instagram.com/cnnentertainment"
  ]
};

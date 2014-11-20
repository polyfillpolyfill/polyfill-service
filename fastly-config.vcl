sub vcl_recv {
#FASTLY recv

	if (req.request != "HEAD" && req.request != "GET" && req.request != "FASTLYPURGE") {
	  return(pass);
	}

	# Redirect legacy service users to legacy service
	set req.http.X-Referer-Host = regsub(req.http.Referer, "^https?\:\/\/([^\/]+)(\/.*)?$", "\1");
	if (req.url == "/normalize.js" ||
		req.url == "/normalize.css" ||
		req.url == "/normalise.js" ||
		req.url == "/normalise.css" ||
		req.http.X-Referer-Host == "www.manrepeller.com" ||
		req.http.X-Referer-Host == "www.mulesoft.com" ||
		req.http.X-Referer-Host == "iluoghidelcuore.it" ||
		req.http.X-Referer-Host == "it.donga.com" ||
		req.http.X-Referer-Host == "www.watchguard.com" ||
		req.http.X-Referer-Host == "www.mulesoft.org" ||
		req.http.X-Referer-Host == "asmwall.com" ||
		req.http.X-Referer-Host == "www.jcsu.edu" ||
		req.http.X-Referer-Host == "adscendmedia.com" ||
		req.http.X-Referer-Host == "game.donga.com" ||
		req.http.X-Referer-Host == "framkino.no" ||
		req.http.X-Referer-Host == "www.accesswireless.com" ||
		req.http.X-Referer-Host == "represent.com" ||
		req.http.X-Referer-Host == "www.designergreek.com" ||
		req.http.X-Referer-Host == "www.plumbingoverstock.com" ||
		req.http.X-Referer-Host == "servicos.searh.rn.gov.br" ||
		req.http.X-Referer-Host == "www.jane-usa.com" ||
		req.http.X-Referer-Host == "www.juntaempresa.com.br" ||
		req.http.X-Referer-Host == "watchguard.com" ||
		req.http.X-Referer-Host == "www.logianalytics.com" ||
		req.http.X-Referer-Host == "www.thebathpoint.com" ||
		req.http.X-Referer-Host == "blogs.mulesoft.org" ||
		req.http.X-Referer-Host == "www.purecanadiangaming.com" ||
		req.http.X-Referer-Host == "play.egzaminatorius.lt" ||
		req.http.X-Referer-Host == "internetacademi.com" ||
		req.http.X-Referer-Host == "www.skyhighnetworks.com" ||
		req.http.X-Referer-Host == "interactive.guim.co.uk" ||
		req.http.X-Referer-Host == "www.soloio.com" ||
		req.http.X-Referer-Host == "desenvolvimentoparaweb.com" ||
		req.http.X-Referer-Host == "daily-fantasy.trunk.development.manhattan.gq1.yahoo.com" ||
		req.http.X-Referer-Host == "blog.damyller.com.br" ||
		req.http.X-Referer-Host == "doggiebag.no" ||
		req.http.X-Referer-Host == "www.beverlydiamonds.com" ||
		req.http.X-Referer-Host == "www.rogerscup.com" ||
		req.http.X-Referer-Host == "blog.hudy.cz" ||
		req.http.X-Referer-Host == "techhamlet.com" ||
		req.http.X-Referer-Host == "www.flirtfachmann.de" ||
		req.http.X-Referer-Host == "alpacacomics.com" ||
		req.http.X-Referer-Host == "areariservata.fondoprevidenzafinanze.it" ||
		req.http.X-Referer-Host == "www.framkino.no" ||
		req.http.X-Referer-Host == "www.nationalsecurities.com" ||
		req.http.X-Referer-Host == "www.tenniscanada.com" ||
		req.http.X-Referer-Host == "libek.org.rs" ||
		req.http.X-Referer-Host == "learn.logianalytics.com" ||
		req.http.X-Referer-Host == "www.impartner.lt" ||
		req.http.X-Referer-Host == "chameleon.biworldwide.com" ||
		req.http.X-Referer-Host == "www.pujckapowebu.cz" ||
		req.http.X-Referer-Host == "www.dlcnetwork.com" ||
		req.http.X-Referer-Host == "www.forbes.com" ||
		req.http.X-Referer-Host == "blog.skyhighnetworks.com" ||
		req.http.X-Referer-Host == "rflx.bjornborg.com" ||
		req.http.X-Referer-Host == "www.coach-outlet-store.com" ||
		req.http.X-Referer-Host == "gist.io" ||
		req.http.X-Referer-Host == "www.suicideispreventable.org" ||
		req.http.X-Referer-Host == "www.rangemastertacticalgear.com" ||
		req.http.X-Referer-Host == "www.hcpozicka.sk" ||
		req.http.X-Referer-Host == "www.airsoftmegastore.com" ||
		req.http.X-Referer-Host == "colortile.github.io" ||
		req.http.X-Referer-Host == "brasstacksmadras.com" ||
		req.http.X-Referer-Host == "hotelcasadomingo.com.mx" ||
		req.http.X-Referer-Host == "www.worcesterpromotions.co.uk" ||
		req.http.X-Referer-Host == "www.asmwall.com" ||
		req.http.X-Referer-Host == "training.mulesoft.com" ||
		req.http.X-Referer-Host == "exhilarateme.com" ||
		req.http.X-Referer-Host == "www.kommentatorskampen.viasatsport.se" ||
		req.http.X-Referer-Host == "www.golfgearselect.com" ||
		req.http.X-Referer-Host == "www.hcpujcka.cz" ||
		req.http.X-Referer-Host == "www.industriallawsociety.org.uk" ||
		req.http.X-Referer-Host == "www.locawebcorp.com.br" ||
		req.http.X-Referer-Host == "giffffr.giphy.com" ||
		req.http.X-Referer-Host == "mccall.co.uk" ||
		req.http.X-Referer-Host == "kommentatorskampen.viasatsport.se" ||
		req.http.X-Referer-Host == "miraclebodyandpaint.com" ||
		req.http.X-Referer-Host == "www.tymprozdravi.cz" ||
		req.http.X-Referer-Host == "delicius.it" ||
		req.http.X-Referer-Host == "www.bluehighwaygames.com" ||
		req.http.X-Referer-Host == "tales-of-pikohan.de" ||
		req.http.X-Referer-Host == "demo.restoreadytest.com" ||
		req.http.X-Referer-Host == "mark.stratmann.me" ||
		req.http.X-Referer-Host == "apixtechnology.com" ||
		req.http.X-Referer-Host == "www.telefonickapozicka.sk" ||
		req.http.X-Referer-Host == "www.telefonnipujcka.cz" ||
		req.http.X-Referer-Host == "www.iteo.no" ||
		req.http.X-Referer-Host == "www.diktate.info" ||
		req.http.X-Referer-Host == "bpharm.192.168.56.102.xip.io" ||
		req.http.X-Referer-Host == "www.artisanprecast.com" ||
		req.http.X-Referer-Host == "tcisolutions.com" ||
		req.http.X-Referer-Host == "icelebrate.icehotel.com" ||
		req.http.X-Referer-Host == "www.thirtysevenwest.com" ||
		req.http.X-Referer-Host == "www.asgllc.com" ||
		req.http.X-Referer-Host == "www.mailinbox.net" ||
		req.http.X-Referer-Host == "rustyfelty.com" ||
		req.http.X-Referer-Host == "pulse.p2c.com" ||
		req.http.X-Referer-Host == "www.framkino.com" ||
		req.http.X-Referer-Host == "armourselfstorage.com" ||
		req.http.X-Referer-Host == "www.dezrezblog.com" ||
		req.http.X-Referer-Host == "goodpeople.com" ||
		req.http.X-Referer-Host == "www.eden-houlgate.com" ||
		req.http.X-Referer-Host == "www.patiovirtual.com.br" ||
		req.http.X-Referer-Host == "stats.egzaminatorius.lt" ||
		req.http.X-Referer-Host == "www.movieville.org" ||
		req.http.X-Referer-Host == "secure.watchguard.com" ||
		req.http.X-Referer-Host == "nationalsecurities.com" ||
		req.http.X-Referer-Host == "www.snaponindustrial.eu" ||
		req.http.X-Referer-Host == "www.fangear.com" ||
		req.http.X-Referer-Host == "www.scribbleshop.com" ||
		req.http.X-Referer-Host == "forums.mulesoft.org" ||
		req.http.X-Referer-Host == "dataentries.in" ||
		req.http.X-Referer-Host == "maki.alconost.com" ||
		req.http.X-Referer-Host == "dixso.github.io" ||
		req.http.X-Referer-Host == "citaprevia.volkswagen.es" ||
		req.http.X-Referer-Host == "movieville.org" ||
		req.http.X-Referer-Host == "www.seoestudios.com" ||
		req.http.X-Referer-Host == "tickets.campo.nu" ||
		req.http.X-Referer-Host == "perriehale.toucan" ||
		req.http.X-Referer-Host == "online.printstation.cz" ||
		req.http.X-Referer-Host == "www.le-bistrot-basque.com" ||
		req.http.X-Referer-Host == "www.thaiartofmassage.com" ||
		req.http.X-Referer-Host == "www.seevolution.com" ||
		req.http.X-Referer-Host == "janeusa.david" ||
		req.http.X-Referer-Host == "www.goodpeople.com" ||
		req.http.X-Referer-Host == "feeds.feedburner.com" ||
		req.http.X-Referer-Host == "www.millwardesque.com" ||
		req.http.X-Referer-Host == "cci.smartucs.a" ||
		req.http.X-Referer-Host == "forum.tales-of-pikohan.de" ||
		req.http.X-Referer-Host == "small.mu" ||
		req.http.X-Referer-Host == "crisp.toucan" ||
		req.http.X-Referer-Host == "dev1776.nationalsecurities.com" ||
		req.http.X-Referer-Host == "byose.net" ||
		req.http.X-Referer-Host == "www.eurodiary.ie" ||
		req.http.X-Referer-Host == "lemouvementassociatif.org" ||
		req.http.X-Referer-Host == "www.ey.com" ||
		req.http.X-Referer-Host == "cuterunslive.com" ||
		req.http.X-Referer-Host == "blog.odynia.org" ||
		req.http.X-Referer-Host == "solarenaymar.com.ar" ||
		req.http.X-Referer-Host == "www.aispaitalia.it" ||
		req.http.X-Referer-Host == "www.startupsaturday.it" ||
		req.http.X-Referer-Host == "support.watchguard.com" ||
		req.http.X-Referer-Host == "dax.absolnet.se" ||
		req.http.X-Referer-Host == "www.creativeinnovation.net.au" ||
		req.http.X-Referer-Host == "dev.raird.no" ||
		req.http.X-Referer-Host == "lesjeteursdencre.fr" ||
		req.http.X-Referer-Host == "itnotes.pl" ||
		req.http.X-Referer-Host == "www.thesocietyinternational.com" ||
		req.http.X-Referer-Host == "terminalfx.com" ||
		req.http.X-Referer-Host == "draft.sx" ||
		req.http.X-Referer-Host == "atelier-florent.fr" ||
		req.http.X-Referer-Host == "www.buona-tavola-ristorante.fr" ||
		req.http.X-Referer-Host == "www.terminalfx.com" ||
		req.http.X-Referer-Host == "www.taxattorney.com" ||
		req.http.X-Referer-Host == "proenter.dev" ||
		req.http.X-Referer-Host == "bodelo-advocaten.be" ||
		req.http.X-Referer-Host == "www.football1asia.com" ||
		req.http.X-Referer-Host == "rets.ly" ||
		req.http.X-Referer-Host == "erriol.com" ||
		req.http.X-Referer-Host == "shssandiego.com" ||
		req.http.X-Referer-Host == "notecrow.appspot.com" ||
		req.http.X-Referer-Host == "framkino.com" ||
		req.http.X-Referer-Host == "sexsite.daan" ||
		req.http.X-Referer-Host == "sro.dk" ||
		req.http.X-Referer-Host == "www.coloft.com" ||
		req.http.X-Referer-Host == "taxiplus.vsystem.hu" ||
		req.http.X-Referer-Host == "stage.mulesoft.com" ||
		req.http.X-Referer-Host == "local.dev.ugameplan.com" ||
		req.http.X-Referer-Host == "posh-nosh.com" ||
		req.http.X-Referer-Host == "phongthuyshop.vn" ||
		req.http.X-Referer-Host == "local.mansionhouse.co.uk" ||
		req.http.X-Referer-Host == "www.compareaccounting.com" ||
		req.http.X-Referer-Host == "news.coinometrics.com" ||
		req.http.X-Referer-Host == "prod-yann.mailinbox.net" ||
		req.http.X-Referer-Host == "rachelree.se" ||
		req.http.X-Referer-Host == "dev1.accesswireless.usdigitalpartners.net" ||
		req.http.X-Referer-Host == "www.ewirisk.com" ||
		req.http.X-Referer-Host == "snapchan.com" ||
		req.http.X-Referer-Host == "www.trikatasieraakademija.lv" ||
		req.http.X-Referer-Host == "www.fosteringadoptionswindon.org.uk" ||
		req.http.X-Referer-Host == "patiovirtual.com.br" ||
		req.http.X-Referer-Host == "www.libmanpro.com" ||
		req.http.X-Referer-Host == "www.diktate.dev" ||
		req.http.X-Referer-Host == "idisco.pianetaitalia.intra" ||
		req.http.X-Referer-Host == "strudelfolhadinho.com.br" ||
		req.http.X-Referer-Host == "www.cunesoft.com" ||
		req.http.X-Referer-Host == "www.shropshirefoundation.org" ||
		req.http.X-Referer-Host == "speakingofbeauty.tv" ||
		req.http.X-Referer-Host == "www.sbs.com.au" ||
		req.http.X-Referer-Host == "bosch.pikmahosting.de" ||
		req.http.X-Referer-Host == "janeusa.lol" ||
		req.http.X-Referer-Host == "eso.toucan" ||
		req.http.X-Referer-Host == "www.lamedicis.com" ||
		req.http.X-Referer-Host == "cereseurope.com" ||
		req.http.X-Referer-Host == "www.pizza-moltobene.fr" ||
		req.http.X-Referer-Host == "www.kaptiva.com.br" ||
		req.http.X-Referer-Host == "flixified.com" ||
		req.http.X-Referer-Host == "www.12roundsboxing.co.uk" ||
		req.http.X-Referer-Host == "www.tensionautomation.com" ||
		req.http.X-Referer-Host == "www.copyprint.nl" ||
		req.http.X-Referer-Host == "unisol" ||
		req.http.X-Referer-Host == "timepad.ews.co.rs" ||
		req.http.X-Referer-Host == "dev.rets.ly" ||
		req.http.X-Referer-Host == "www.vrhabilis.com" ||
		req.http.X-Referer-Host == "trondheggelund.no" ||
		req.http.X-Referer-Host == "www.ferienwohnungen-lebenswert.de" ||
		req.http.X-Referer-Host == "blog.mainline.com" ||
		req.http.X-Referer-Host == "arcstonepartners.com" ||
		req.http.X-Referer-Host == "dev-mj" ||
		req.http.X-Referer-Host == "www.crisp-cpd.com" ||
		req.http.X-Referer-Host == "purecanadiangaming.com" ||
		req.http.X-Referer-Host == "mainline.com" ||
		req.http.X-Referer-Host == "idx.dev.rets.ly" ||
		req.http.X-Referer-Host == "eneco.flicker.visualwind.com" ||
		req.http.X-Referer-Host == "mi.etoilemedia.it" ||
		req.http.X-Referer-Host == "www.atmosphericwatergenerator.net" ||
		req.http.X-Referer-Host == "www.gasnaturalenergyclass.com" ||
		req.http.X-Referer-Host == "salesmarketing.championpetfoods.com" ||
		req.http.X-Referer-Host == "www.watchgaurd.com" ||
		req.http.X-Referer-Host == "vm-sqlext-svil" ||
		req.http.X-Referer-Host == "dev.accesswireless.usdigitalpartners.net" ||
		req.http.X-Referer-Host == "kommentatorskampen.ohmytest.se" ||
		req.http.X-Referer-Host == "m.euvivoesporte.com.br" ||
		req.http.X-Referer-Host == "blog.dasroot.net" ||
		req.http.X-Referer-Host == "bugsdashboard.com" ||
		req.http.X-Referer-Host == "www.eurodiary.co.uk" ||
		req.http.X-Referer-Host == "seecanadabetter-app.appspot.com" ||
		req.http.X-Referer-Host == "www.bobbychanblog.com" ||
		req.http.X-Referer-Host == "www.mybenefitsatwork.co.uk" ||
		req.http.X-Referer-Host == "www.fotolotos.lt" ||
		req.http.X-Referer-Host == "robferguson.org" ||
		req.http.X-Referer-Host == "staging.motherapp.com" ||
		req.http.X-Referer-Host == "www.undergroundminingequipmentcompaniescalgaryquotes.com" ||
		req.http.X-Referer-Host == "idisco.pianetaitalia.com" ||
		req.http.X-Referer-Host == "cliocalman.com" ||
		req.http.X-Referer-Host == "sexymirror-app.com" ||
		req.http.X-Referer-Host == "taxes-in-serbia.192.168.56.102.xip.io" ||
		req.http.X-Referer-Host == "wunderbiz.com" ||
		req.http.X-Referer-Host == "thebathpoint.webdemo.es" ||
		req.http.X-Referer-Host == "www.restaurant-lemenhir.com" ||
		req.http.X-Referer-Host == "www.valdeure.fr" ||
		req.http.X-Referer-Host == "bpharm.ews.co.rs" ||
		req.http.X-Referer-Host == "teachersdunet.com" ||
		req.http.X-Referer-Host == "livesmartswmo.com" ||
		req.http.X-Referer-Host == "javiblog.com" ||
		req.http.X-Referer-Host == "mi.etoilemedia.com" ||
		req.http.X-Referer-Host == "www.lens.org" ||
		req.http.X-Referer-Host == "blacknet.co.uk" ||
		req.http.X-Referer-Host == "my-faith-be-like.ghost.io" ||
		req.http.X-Referer-Host == "laravel.dev" ||
		req.http.X-Referer-Host == "fi-hpotts.2014-mansionhouse" ||
		req.http.X-Referer-Host == "mi.mailinbox.net" ||
		req.http.X-Referer-Host == "www.schulkeplusrewards.co.uk" ||
		req.http.X-Referer-Host == "sasha-project.s3.amazonaws.com" ||
		req.http.X-Referer-Host == "www.solarenaymar.com.ar" ||
		req.http.X-Referer-Host == "generate.visualwind.com" ||
		req.http.X-Referer-Host == "drupaltest.wgti.net" ||
		req.http.X-Referer-Host == "minasdev.org" ||
		req.http.X-Referer-Host == "ims-logistic.dev" ||
		req.http.X-Referer-Host == "viaresto.com" ||
		req.http.X-Referer-Host == "learn.logixml.com" ||
		req.http.X-Referer-Host == "ox.espadrill-admin" ||
		req.http.X-Referer-Host == "smallmu-sandbox.s3-ap-southeast-1.amazonaws.com" ||
		req.http.X-Referer-Host == "www.firstinternet.co.uk" ||
		req.http.X-Referer-Host == "m.facebook.com" ||
		req.http.X-Referer-Host == "www.ace.media" ||
		req.http.X-Referer-Host == "www.ewiretx.com" ||
		req.http.X-Referer-Host == "crisp.test.tdev.co.uk" ||
		req.http.X-Referer-Host == "www.mifabricavisual.com" ||
		req.http.X-Referer-Host == "www.targetintervention.no" ||
		req.http.X-Referer-Host == "www.couperogers.com" ||
		req.http.X-Referer-Host == "skyhighstaging.local.com" ||
		req.http.X-Referer-Host == "altorendimientoacademico.queretaro.itesm.mx" ||
		req.http.X-Referer-Host == "www.gall-holl.com" ||
		req.http.X-Referer-Host == "sbs-moad.s3-ap-southeast-2.amazonaws.com" ||
		req.http.X-Referer-Host == "firstint.recruitment-lite" ||
		req.http.X-Referer-Host == "www.sro.dk" ||
		req.http.X-Referer-Host == "www.menbur.com" ||
		req.http.X-Referer-Host == "libmanpro.com" ||
		req.http.X-Referer-Host == "blurayaustralia.com" ||
		req.http.X-Referer-Host == "www.adscendmedia.com" ||
		req.http.X-Referer-Host == "blog.vincentbrouillet.com" ||
		req.http.X-Referer-Host == "www.investiumonline.nl" ||
		req.http.X-Referer-Host == "burakkp.com" ||
		req.http.X-Referer-Host == "audreysystem.seeties.me" ||
		req.http.X-Referer-Host == "everestsalesconsultants.co.uk" ||
		req.http.X-Referer-Host == "accesswireless.usdphosting.com" ||
		req.http.X-Referer-Host == "frota.searh.rn.gov.br" ||
		req.http.X-Referer-Host == "qa.ugameplan.com" ||
		req.http.X-Referer-Host == "secure.yec.co" ||
		req.http.X-Referer-Host == "connect.eu.mulesoft.com" ||
		req.http.X-Referer-Host == "www.lastlongerreview.com" ||
		req.http.X-Referer-Host == "kommentatorskampen.lo" ||
		req.http.X-Referer-Host == "kido.bigroominternet.co.uk" ||
		req.http.X-Referer-Host == "ohmydev.se" ||
		req.http.X-Referer-Host == "www.bentogarcia.es" ||
		req.http.X-Referer-Host == "rearview.herokai.com" ||
		req.http.X-Referer-Host == "lecafelatin.resto-ready.com" ||
		req.http.X-Referer-Host == "html24-dev.dk" ||
		req.http.X-Referer-Host == "seecanadabetter.ddev" ||
		req.http.X-Referer-Host == "portal.ad1.wrvc.co.uk" ||
		req.http.X-Referer-Host == "garthwunsch.com" ||
		req.http.X-Referer-Host == "www.elitecustomsigns.com" ||
		req.http.X-Referer-Host == "kaptiva.com.br" ||
		req.http.X-Referer-Host == "nordicinox.com" ||
		req.http.X-Referer-Host == "www.nataktivisterna.lo" ||
		req.http.X-Referer-Host == "www.fidalgobaycoffee.com" ||
		req.http.X-Referer-Host == "mailinbox.net" ||
		req.http.X-Referer-Host == "www.tension.com" ||
		req.http.X-Referer-Host == "www.mccall.co.uk" ||
		req.http.X-Referer-Host == "petbucks.org" ||
		req.http.X-Referer-Host == "mulesoftcompdev.prod.acquia-sites.com" ||
		req.http.X-Referer-Host == "logidev.devcloud.acquia-sites.com" ||
		req.http.X-Referer-Host == "www.cuterunslive.com" ||
		req.http.X-Referer-Host == "ec2-54-86-27-137.compute-1.amazonaws.com" ||
		req.http.X-Referer-Host == "coloft.com" ||
		req.http.X-Referer-Host == "dev-yann.mailinbox.net" ||
		req.http.X-Referer-Host == "titistore.es" ||
		req.http.X-Referer-Host == "biztro.pl" ||
		req.http.X-Referer-Host == "zd.ews.co.rs" ||
		req.http.X-Referer-Host == "www.cafelatincaen.com" ||
		req.http.X-Referer-Host == "togume.com" ||
		req.http.X-Referer-Host == "connect.mulesoft.com" ||
		req.http.X-Referer-Host == "nataktivisterna.lo" ||
		req.http.X-Referer-Host == "livelean.co.uk" ||
		req.http.X-Referer-Host == "copyprint.nl" ||
		req.http.X-Referer-Host == "jayhathaway.com" ||
		req.http.X-Referer-Host == "rugsejis.epratybos.lt" ||
		req.http.X-Referer-Host == "media-env.elasticbeanstalk.com" ||
		req.http.X-Referer-Host == "id.snowfire.io" ||
		req.http.X-Referer-Host == "employme.at" ||
		req.http.X-Referer-Host == "booleanbrothers.com" ||
		req.http.X-Referer-Host == "www.fusiongroup.ie" ||
		req.http.X-Referer-Host == "skyhighnetworks.gravitatestaging.com" ||
		req.http.X-Referer-Host == "www.teachers.youtalkonline.com" ||
		req.http.X-Referer-Host == "sunshineandfrank.com" ||
		req.http.X-Referer-Host == "proof.acemedia.bigroominternet.co.uk" ||
		req.http.X-Referer-Host == "personaltrainersinlosangeles.com" ||
		req.http.X-Referer-Host == "www.shawn.co" ||
		req.http.X-Referer-Host == "solidproperty.com.my" ||
		req.http.X-Referer-Host == "www.nordicinox.com" ||
		req.http.X-Referer-Host == "tension.com" ||
		req.http.X-Referer-Host == "especiaiss3.gshow.globo.com" ||
		req.http.X-Referer-Host == "seebstore.com" ||
		req.http.X-Referer-Host == "packerz.uk" ||
		req.http.X-Referer-Host == "happyliving.jp" ||
		req.http.X-Referer-Host == "www.vacacionesdebuenrollito.com" ||
		req.http.X-Referer-Host == "plastpack.ind.br" ||
		req.http.X-Referer-Host == "finance.trunk.development.manhattan.gq1.yahoo.com" ||
		req.http.X-Referer-Host == "elearningpprd.biworldwide.com" ||
		req.http.X-Referer-Host == "millwardesque.com" ||
		req.http.X-Referer-Host == "icehotel.lo" ||
		req.http.X-Referer-Host == "ongair.im" ||
		req.http.X-Referer-Host == "mule01a.managed.contegix.com" ||
		req.http.X-Referer-Host == "ipated.org" ||
		req.http.X-Referer-Host == "cientifica-research.com" ||
		req.http.X-Referer-Host == "andreypopp.github.io" ||
		req.http.X-Referer-Host == "schools.medsense.in" ||
		req.http.X-Referer-Host == "d-ycl.cigna.com" ||
		req.http.X-Referer-Host == "romankorver.com" ||
		req.http.X-Referer-Host == "ihaveanidea.me" ||
		req.http.X-Referer-Host == "evoyan.org" ||
		req.http.X-Referer-Host == "cectserver.dyndns.org" ||
		req.http.X-Referer-Host == "test.idx.dev.rets.ly" ||
		req.http.X-Referer-Host == "vastgoedpro.dataquote.nl" ||
		req.http.X-Referer-Host == "sifopweb" ||
		req.http.X-Referer-Host == "instituteofselfmastery.com.au" ||
		req.http.X-Referer-Host == "www.automobrella.com" ||
		req.http.X-Referer-Host == "panel.mibubu.com" ||
		req.http.X-Referer-Host == "whsb.herokuapp.com" ||
		req.http.X-Referer-Host == "heastea.com" ||
		req.http.X-Referer-Host == "meishinkan.pl" ||
		req.http.X-Referer-Host == "manrepeller.staging.wpengine.com" ||
		req.http.X-Referer-Host == "derprecated.com" ||
		req.http.X-Referer-Host == "fobesfamily.com" ||
		req.http.X-Referer-Host == "tensionautomation.com" ||
		req.http.X-Referer-Host == "www.jesuisoriginale.com" ||
		req.http.X-Referer-Host == "www.domgonsa.com.ar" ||
		req.http.X-Referer-Host == "www.digitalpark.co.uk" ||
		req.http.X-Referer-Host == "debray.jerome.free.fr" ||
		req.http.X-Referer-Host == "rainmakerthinking.training" ||
		req.http.X-Referer-Host == "thespineauthority.com.au" ||
		req.http.X-Referer-Host == "pseudocubic.com" ||
		req.http.X-Referer-Host == "mi.sky8.it" ||
		req.http.X-Referer-Host == "iteo.staging.wpengine.com" ||
		req.http.X-Referer-Host == "adscend-q.dev" ||
		req.http.X-Referer-Host == "taxes-in-serbia.ews.co.rs" ||
		req.http.X-Referer-Host == "s.codepen.io" ||
		req.http.X-Referer-Host == "seecanadabetter.ca" ||
		req.http.X-Referer-Host == "www.werkbund.com.br" ||
		req.http.X-Referer-Host == "www.art365.co.za" ||
		req.http.X-Referer-Host == "tensionpackaging.com" ||
		req.http.X-Referer-Host == "ec2-54-164-179-111.compute-1.amazonaws.com" ||
		req.http.X-Referer-Host == "sms.loc" ||
		req.http.X-Referer-Host == "timeclock.neonandmore.com" ||
		req.http.X-Referer-Host == "silverblingblack.com" ||
		req.http.X-Referer-Host == "www.modulolanguage.com" ||
		req.http.X-Referer-Host == "visualise.today" ||
		req.http.X-Referer-Host == "pickinglist.constance.com.br" ||
		req.http.X-Referer-Host == "mobileshoppingapps.net" ||
		req.http.X-Referer-Host == "ashleyandbarry.com" ||
		req.http.X-Referer-Host == "www.planetgreen.cl" ||
		req.http.X-Referer-Host == "portal-intranet.ti.sabesp.com.br" ||
		req.http.X-Referer-Host == "gordonrecords.net" ||
		req.http.X-Referer-Host == "cce.pathlore.net" ||
		req.http.X-Referer-Host == "www.myclaimvalue.com" ||
		req.http.X-Referer-Host == "stage.mulesoft.org" ||
		req.http.X-Referer-Host == "javiblog.javigs.es"
	) {
		set req.http.X-Redir-URL = "https://legacy.polyfill.io" req.url;
		error 900 req.http.X-Redir-URL;
	}

	if (req.url ~ "^/v1/polyfill\." && req.url !~ "[\?\&]ua=") {
		set req.http.X-Orig-URL = req.url;
		set req.url = "/v1/normalizeUa?ua=" regsuball(regsuball(regsuball(req.http.User-Agent, {"%"}, {"%25"}), {" "}, {"%20"}), {"&"}, {"%26"});
	}

	return(lookup);
}

sub vcl_deliver {
#FASTLY deliver
	if (req.url ~ "^/v1/normalizeUa" && resp.status == 200) {
		set req.http.Fastly-force-Shield = "1";
		if (req.http.X-Orig-URL ~ "\?") {
			set req.url = req.http.X-Orig-URL "&ua=" resp.http.Normalized-User-Agent;
		} else {
			set req.url = req.http.X-Orig-URL "?ua=" resp.http.Normalized-User-Agent;
		}
		restart;
	} else if (req.url ~ "^/v1/polyfill\..*[\?\&]ua=" && req.http.X-Orig-URL && req.http.X-Orig-URL !~ "[\?\&]ua=") {
		set resp.http.Vary = "Accept-Encoding, User-Agent";
	}
	return(deliver);
}

sub vcl_error {
	if (obj.status == 900) {
		set obj.http.Location = obj.response;
		set obj.status = 301;
		set obj.response = "Moved Permanently";
		synthetic {"The referer header or request URI supplied in your request is known to be an attempt to use the previous version of polyfill.io, so for backwards compatibility we're redirecting you to legacy.polyfill.io which will handle your request using the old version of the service.  The legacy version will be discontinued in the future, so please update to the new version, and then let us know by raising an issue in our repo at https://github.com/financial-times/polyfill-service."};
		return (deliver);
	}
}

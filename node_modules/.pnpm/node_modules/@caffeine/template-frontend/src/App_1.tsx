import {
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Network,
  Phone,
  Radio,
  Shield,
  Signal,
  Sparkles,
  Star,
  TrendingUp,
  Tv,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";


// ── Multilingual Support: English / Tamil / Malayalam ───────────────────────
type Language = "en" | "ta" | "ml";

const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  ta: "தமிழ்",
  ml: "മലയാളം",
};

const PAGE_TRANSLATIONS: Record<string, Partial<Record<Language, string>>> = {
  "Trusted Networks:": { ta: "நம்பகமான நெட்வொர்க்குகள்:", ml: "വിശ്വസനീയ നെറ്റ്‌വർക്കുകൾ:" },
  "Trusted by 6000+ Internet & 1500+ Cable Customers across Tamil Nadu & Kerala": { ta: "தமிழ்நாடு & கேரளாவில் 5000+ வாடிக்கையாளர்களின் நம்பிக்கை", ml: "തമിഴ്നാടും കേരളവും ഉൾപ്പെടെ 5000+ ഉപഭോക്താക്കളുടെ വിശ്വാസം" },
  "High-Speed Internet &": { ta: "அதிவேக இணையம் &", ml: "ഹൈ-സ്പീഡ് ഇന്റർനെറ്റ് &" },
  "Reliable Cable": { ta: "நம்பகமான கேபிள்", ml: "വിശ്വസനീയ കേബിൾ" },
  " Services": { ta: " சேவைகள்", ml: " സേവനങ്ങൾ" },
  "Connecting Tamil Nadu & Kerala with Fast, Affordable & Unlimited Plans": { ta: "தமிழ்நாடு & கேரளாவை வேகமான, மலிவான மற்றும் வரம்பற்ற திட்டங்களுடன் இணைக்கிறோம்", ml: "തമിഴ്നാടിനെയും കേരളത്തെയും വേഗതയേറിയ, താങ്ങാനാവുന്ന, അൺലിമിറ്റഡ് പ്ലാനുകളിലൂടെ ബന്ധിപ്പിക്കുന്നു" },
  "நம்பகமான இணைப்பு, சிறந்த சேவை": { ml: "വിശ്വസനീയ കണക്ഷൻ, മികച്ച സേവനം" },
  "Founded by": { ta: "நிறுவியவர்", ml: "സ്ഥാപകൻ" },
  "Founder & CEO, Shree Cable Vision": { ta: "நிறுவனர் & CEO, Shree Cable Vision", ml: "സ്ഥാപകൻ & CEO, Shree Cable Vision" },
  "Get Connection Now": { ta: "இணைப்பைப் பெறுங்கள்", ml: "കണക്ഷൻ നേടൂ" },
  "View Plans": { ta: "திட்டங்களைப் பார்க்க", ml: "പ്ലാനുകൾ കാണുക" },
  "Internet Customers": { ta: "இணைய வாடிக்கையாளர்கள்", ml: "ഇന്റർനെറ്റ് ഉപഭോക്താക്കൾ" },
  "Cable TV Customers": { ta: "கேபிள் TV வாடிக்கையாளர்கள்", ml: "കേബിൾ TV ഉപഭോക്താക്കൾ" },
  "Skilled Staff": { ta: "திறமையான பணியாளர்கள்", ml: "പരിശീലനം നേടിയ ജീവനക്കാർ" },
  "LCOs": { ta: "LCOக்கள்", ml: "LCOകൾ" },
  "Our Partners": { ta: "எங்கள் கூட்டாளர்கள்", ml: "ഞങ്ങളുടെ പങ്കാളികൾ" },
  "Partners": { ta: "கூட்டாளர்கள்", ml: "പങ്കാളികൾ" },
  "Plans": { ta: "திட்டங்கள்", ml: "പ്ലാനുകൾ" },
  "Achievements": { ta: "சாதனைகள்", ml: "നേട്ടങ്ങൾ" },
  "Services": { ta: "சேவைகள்", ml: "സേവനങ്ങൾ" },
  "Contact": { ta: "தொடர்பு", ml: "ബന്ധപ്പെടുക" },
  "Get Connected": { ta: "இணையுங்கள்", ml: "കണക്റ്റ് ചെയ്യുക" },
  "Quick Links": { ta: "விரைவு இணைப்புகள்", ml: "ദ്രുത ലിങ്കുകൾ" },
  "Our": { ta: "எங்கள்", ml: "ഞങ്ങളുടെ" },
  "Our Services": { ta: "எங்கள் சேவைகள்", ml: "ഞങ്ങളുടെ സേവനങ്ങൾ" },
  "Trusted Network Partners": { ta: "நம்பகமான நெட்வொர்க் கூட்டாளர்கள்", ml: "വിശ്വസനീയ നെറ്റ്‌വർക്ക് പങ്കാളികൾ" },
  "Broadband & Network Partners": { ta: "பிராட்பேண்ட் & நெட்வொர்க் கூட்டாளர்கள்", ml: "ബ്രോഡ്ബാൻഡ് & നെറ്റ്‌വർക്ക് പങ്കാളികൾ" },
  "Cable TV Partners": { ta: "கேபிள் TV கூட்டாளர்கள்", ml: "കേബിൾ TV പങ്കാളികൾ" },
  "Cable TV Partner – Tamil Nadu": { ta: "கேபிள் TV கூட்டாளர் – தமிழ்நாடு", ml: "കേബിൾ TV പങ്കാളി – തമിഴ്നാട്" },
  "Cable TV Partner – Kerala": { ta: "கேபிள் TV கூட்டாளர் – கேரளா", ml: "കേബിൾ TV പങ്കാളി – കേരളം" },
  "Cable Tamil Nadu Contact:": { ta: "கேபிள் தமிழ்நாடு தொடர்பு:", ml: "കേബിൾ തമിഴ്നാട് ബന്ധപ്പെടുക:" },
  "Cable Kerala Contact:": { ta: "கேபிள் கேரளா தொடர்பு:", ml: "കേബിൾ കേരള ബന്ധപ്പെടുക:" },
  "Free Network Switch": { ta: "இலவச நெட்வொர்க் மாற்றம்", ml: "സൗജന്യ നെറ്റ്‌വർക്ക് മാറ്റം" },
  "🌐 Serving Rural & Remote Areas": { ta: "🌐 கிராமப்புற & தொலைதூர பகுதிகளுக்கு சேவை", ml: "🌐 ഗ്രാമീണ & ദൂരപ്രദേശങ്ങളിൽ സേവനം" },
  "No Switching Cost": { ta: "மாற்றுக் கட்டணம் இல்லை", ml: "മാറ്റത്തിനുള്ള ചെലവില്ല" },
  "Switch Now —": { ta: "இப்போதே மாற்றுங்கள் —", ml: "ഇപ്പോൾ മാറ്റൂ —" },
  "It&apos;s Free": { ta: "இலவசம்", ml: "സൗജന്യം" },
  "It’s Free": { ta: "இலவசம்", ml: "സൗജന്യം" },
  "Switch Now — It&apos;s Free": { ta: "இப்போதே மாற்றுங்கள் — இலவசம்", ml: "ഇപ്പോൾ മാറ്റൂ — സൗജന്യം" },
  "Zero Hidden Charges": { ta: "மறைமுக கட்டணங்கள் இல்லை", ml: "മറഞ്ഞിരിക്കുന്ന നിരക്കുകളില്ല" },
  "Fiber to Rural Areas": { ta: "கிராமப்புறங்களுக்கு ஃபைபர்", ml: "ഗ്രാമപ്രദേശങ്ങളിലേക്ക് ഫൈബർ" },
  "No setup fees, no installation cost, no surprise bills. What you see is what you pay.": { ta: "அமைப்பு கட்டணம் இல்லை, நிறுவல் கட்டணம் இல்லை, எதிர்பாராத பில்கள் இல்லை. நீங்கள் பார்ப்பதே நீங்கள் செலுத்துவது.", ml: "സെറ്റപ്പ് ഫീസ് ഇല്ല, ഇൻസ്റ്റലേഷൻ ചെലവ് ഇല്ല, അപ്രതീക്ഷിത ബില്ലുകളില്ല. കാണുന്നതാണ് നിങ്ങൾ അടയ്ക്കുന്നത്." },
  "Flexible Plans": { ta: "நெகிழ்வான திட்டங்கள்", ml: "ഫ്ലെക്സിബിൾ പ്ലാനുകൾ" },
  "Flexible Plans for": { ta: "ஒவ்வொரு தேவைக்கும்", ml: "ഓരോ ആവശ്യത്തിനും" },
  "Every Need": { ta: "சரியான திட்டம்", ml: "ശരിയായ പ്ലാൻ" },
  "Speed": { ta: "வேகம்", ml: "വേഗത" },
  "/month": { ta: "/மாதம்", ml: "/മാസം" },
  "Unlimited Data": { ta: "வரம்பற்ற டேட்டா", ml: "അൺലിമിറ്റഡ് ഡാറ്റ" },
  "Voice Calls": { ta: "குரல் அழைப்புகள்", ml: "വോയ്സ് കോളുകൾ" },
  "HD Streaming": { ta: "HD ஸ்ட்ரீமிங்", ml: "HD സ്ട്രീമിംഗ്" },
  "Basic Support": { ta: "அடிப்படை ஆதரவு", ml: "അടിസ്ഥാന പിന്തുണ" },
  "OTT Access": { ta: "OTT அணுகல்", ml: "OTT ആക്‌സസ്" },
  "Standard Support": { ta: "சாதாரண ஆதரவு", ml: "സ്റ്റാൻഡേർഡ് പിന്തുണ" },
  "IPTV": { ta: "IPTV", ml: "IPTV" },
  "Priority Support": { ta: "முன்னுரிமை ஆதரவு", ml: "മുൻഗണനാ പിന്തുണ" },
  "Dedicated Line": { ta: "தனிப்பட்ட லைன்", ml: "ഡെഡിക്കേറ്റഡ് ലൈൻ" },
  "Get This Plan": { ta: "இந்த திட்டத்தைப் பெறுங்கள்", ml: "ഈ പ്ലാൻ നേടൂ" },
  "⭐ Most Popular": { ta: "⭐ மிகவும் பிரபலமானது", ml: "⭐ ഏറ്റവും ജനപ്രിയം" },
  "Detailed Pricing Chart": { ta: "விரிவான விலைப்பட்டியல்", ml: "വിശദമായ വിലപ്പട്ടിക" },
  "* Pricing may vary based on provider and location. 18% GST applicable on all plans.": { ta: "* வழங்குநர் மற்றும் இருப்பிடத்தைப் பொறுத்து விலை மாறலாம். அனைத்து திட்டங்களுக்கும் 18% GST பொருந்தும்.", ml: "* സേവനദാതാവിനും സ്ഥലത്തിനും അനുസരിച്ച് നിരക്ക് മാറാം. എല്ലാ പ്ലാനുകൾക്കും 18% GST ബാധകം." },
  "Award-Winning Service": { ta: "விருது பெற்ற சேவை", ml: "അവാർഡ് നേടിയ സേവനം" },
  "Our Achievements": { ta: "எங்கள் சாதனைகள்", ml: "ഞങ്ങളുടെ നേട്ടങ്ങൾ" },
  "Achievements": { ta: "சாதனைகள்", ml: "നേട്ടങ്ങൾ" },
  "BSNL Award": { ta: "BSNL விருது", ml: "BSNL അവാർഡ്" },
  "BSNL Certified & Award-Winning LCO — Shree Cable Vision": { ta: "BSNL சான்றளிக்கப்பட்ட & விருது பெற்ற LCO — Shree Cable Vision", ml: "BSNL സർട്ടിഫൈഡ് & അവാർഡ് നേടിയ LCO — Shree Cable Vision" },
  "What We Offer": { ta: "நாங்கள் வழங்குவது", ml: "ഞങ്ങൾ നൽകുന്നത്" },
  "Comprehensive digital connectivity solutions for homes and businesses across Tamil Nadu and Kerala.": { ta: "தமிழ்நாடு மற்றும் கேரளா முழுவதும் வீடுகள் மற்றும் வணிகங்களுக்கு முழுமையான டிஜிட்டல் இணைப்பு தீர்வுகள்.", ml: "തമിഴ്നാടിലും കേരളത്തിലും വീടുകൾക്കും ബിസിനസുകൾക്കും സമഗ്രമായ ഡിജിറ്റൽ കണക്റ്റിവിറ്റി പരിഹാരങ്ങൾ." },
  "High-Speed Broadband Internet": { ta: "அதிவேக பிராட்பேண்ட் இணையம்", ml: "ഹൈ-സ്പീഡ് ബ്രോഡ്ബാൻഡ് ഇന്റർനെറ്റ്" },
  "Cable TV Services": { ta: "கேபிள் TV சேவைகள்", ml: "കേബിൾ TV സേവനങ്ങൾ" },
  "IPTV Services": { ta: "IPTV சேவைகள்", ml: "IPTV സേവനങ്ങൾ" },
  "OTT Services": { ta: "OTT சேவைகள்", ml: "OTT സേവനങ്ങൾ" },
  "Popular Channels:": { ta: "பிரபலமான சேனல்கள்:", ml: "ജനപ്രിയ ചാനലുകൾ:" },
  "More Platforms": { ta: "மேலும் தளங்கள்", ml: "കൂടുതൽ പ്ലാറ്റ്ഫോമുകൾ" },
  "Cable TV Service Areas": { ta: "கேபிள் TV சேவை பகுதிகள்", ml: "കേബിൾ TV സേവന മേഖലകൾ" },
  "Cable TV plans start from just ₹250/month": { ta: "கேபிள் TV திட்டங்கள் ₹250/மாதம் முதல்", ml: "കേബിൾ TV പ്ലാനുകൾ ₹250/മാസം മുതൽ" },
  "Reach Us": { ta: "எங்களைத் தொடர்புகொள்ளுங்கள்", ml: "ഞങ്ങളെ ബന്ധപ്പെടുക" },
  "Get in": { ta: "தொடர்பு", ml: "ബന്ധപ്പെടുക" },
  "Touch": { ta: "கொள்ளுங்கள்", ml: "" },
  "We're here to help. Reach out for new connections, plan upgrades, or any support queries.": { ta: "நாங்கள் உதவ தயாராக இருக்கிறோம். புதிய இணைப்பு, திட்ட மேம்பாடு அல்லது ஆதரவுக்காக எங்களைத் தொடர்புகொள்ளுங்கள்.", ml: "ഞങ്ങൾ സഹായിക്കാൻ തയ്യാറാണ്. പുതിയ കണക്ഷൻ, പ്ലാൻ അപ്ഗ്രേഡ് അല്ലെങ്കിൽ പിന്തുണയ്ക്കായി ഞങ്ങളെ ബന്ധപ്പെടുക." },
  "Our Office": { ta: "எங்கள் அலுவலகம்", ml: "ഞങ്ങളുടെ ഓഫീസ്" },
  "Email": { ta: "மின்னஞ்சல்", ml: "ഇമെയിൽ" },
  "Phone 1": { ta: "தொலைபேசி 1", ml: "ഫോൺ 1" },
  "Phone 2": { ta: "தொலைபேசி 2", ml: "ഫോൺ 2" },
  "Phone 3": { ta: "தொலைபேசி 3", ml: "ഫോൺ 3" },
  "Important": { ta: "முக்கியம்", ml: "പ്രധാനപ്പെട്ടത്" },
  "Founder & CEO": { ta: "நிறுவனர் & CEO", ml: "സ്ഥാപകൻ & CEO" },
  "Office Hours": { ta: "அலுவலக நேரம்", ml: "ഓഫീസ് സമയം" },
  "Mon – Sat": { ta: "திங்கள் – சனி", ml: "തിങ്കൾ – ശനി" },
  "Sunday": { ta: "ஞாயிறு", ml: "ഞായർ" },
  "Holiday": { ta: "விடுமுறை", ml: "അവധി" },
  "Emergency support available if needed": { ta: "தேவைப்பட்டால் அவசர ஆதரவு கிடைக்கும்", ml: "ആവശ്യമെങ്കിൽ അടിയന്തര പിന്തുണ ലഭ്യമാണ്" },
  "Service Areas": { ta: "சேவை பகுதிகள்", ml: "സേവന മേഖലകൾ" },
  "Cable Available In": { ta: "கேபிள் கிடைக்கும் இடங்கள்", ml: "കേബിൾ ലഭ്യമായ പ്രദേശങ്ങൾ" },
  "Plans from ₹250/month": { ta: "திட்டங்கள் ₹250/மாதம் முதல்", ml: "പ്ലാനുകൾ ₹250/മാസം മുതൽ" },
  "Shree Cable Vision – Connecting Tamil Nadu & Kerala with fast, affordable, and unlimited internet and cable services. Founded by Shanmugharaj N.": { ta: "Shree Cable Vision – தமிழ்நாடு மற்றும் கேரளாவை வேகமான, மலிவான, வரம்பற்ற இணையம் மற்றும் கேபிள் சேவைகளால் இணைக்கிறது. நிறுவனர் Shanmugharaj N.", ml: "Shree Cable Vision – തമിഴ്നാടിനെയും കേരളത്തെയും വേഗതയേറിയ, താങ്ങാനാവുന്ന, അൺലിമിറ്റഡ് ഇന്റർനെറ്റ്, കേബിൾ സേവനങ്ങളിലൂടെ ബന്ധിപ്പിക്കുന്നു. സ്ഥാപകൻ Shanmugharaj N." },
  "Pollachi Town": { ta: "பொள்ளாச்சி நகரம்", ml: "പൊള്ളാച്ചി ടൗൺ" },
  "Kinathukadavu Town": { ta: "கிணத்துக்கடவு நகரம்", ml: "കിണത്തുകടവ് ടൗൺ" },
  "Parakkal (Nallepilly), Kerala": { ta: "பரக்கல் (நல்லேப்பிள்ளி), கேரளா", ml: "പരക്കൽ (നല്ലേപ്പിള്ളി), കേരളം" },
  "Top Slip Hill Area": { ta: "டாப் ஸ்லிப் மலைப்பகுதி", ml: "ടോപ് സ്ലിപ്പ് മലപ്രദേശം" },
  "Home": { ta: "முகப்பு", ml: "ഹോം" },
  "Basic": { ta: "அடிப்படை", ml: "അടിസ്ഥാന" },
  "Family": { ta: "குடும்பம்", ml: "കുടുംബം" },
  "Most Popular": { ta: "மிகவும் பிரபலமானது", ml: "ഏറ്റവും ജനപ്രിയം" },
  "Streaming": { ta: "ஸ்ட்ரீமிங்", ml: "സ്ട്രീമിംഗ്" },
  "Power User": { ta: "அதிக பயன்பாடு", ml: "പവർ യൂസർ" },
  "Heavy Usage": { ta: "அதிக பயன்பாடு", ml: "ഹെവി യൂസേജ്" },
  "Recognized as the Best Local Cable Operator during BSNL's prestigious 25th Silver Jubilee celebration.": { ta: "BSNL-ன் 25வது வெள்ளி விழாவில் சிறந்த உள்ளூர் கேபிள் ஆபரேட்டராக அங்கீகரிக்கப்பட்டது.", ml: "BSNL-ന്റെ 25-ാം സിൽവർ ജൂബിലി ആഘോഷത്തിൽ മികച്ച ലോക്കൽ കേബിൾ ഓപ്പറേറ്ററായി അംഗീകരിക്കപ്പെട്ടു." },
  "Top performer in the Fiber-to-the-Home segment, Pollachi SDCA, awarded by BSNL.": { ta: "Pollachi SDCA பகுதியில் Fiber-to-the-Home பிரிவில் சிறந்த செயல்திறனுக்காக BSNL விருது.", ml: "Pollachi SDCAയിലെ Fiber-to-the-Home വിഭാഗത്തിലെ മികച്ച പ്രകടനത്തിന് BSNL പുരസ്കാരം." },
  "BSNL award for outstanding cluster mission mode provisioning at Pollachi SDCA.": { ta: "Pollachi SDCA-வில் சிறப்பான cluster mission mode provisioning-க்கான BSNL விருது.", ml: "Pollachi SDCAയിലെ മികച്ച cluster mission mode provisioning-നുള്ള BSNL പുരസ്കാരം." },
  "Recognized as the leading connectivity provider in the Coimbatore Optical Distribution zone.": { ta: "Coimbatore Optical Distribution மண்டலத்தில் முன்னணி இணைப்பு வழங்குநராக அங்கீகரிக்கப்பட்டது.", ml: "Coimbatore Optical Distribution മേഖലയിൽ മുൻനിര കണക്റ്റിവിറ്റി സേവനദാതാവായി അംഗീകരിക്കപ്പെട്ടു." },
  "Broadband Internet": { ta: "பிராட்பேண்ட் இணையம்", ml: "ബ്രോഡ്ബാൻഡ് ഇന്റർനെറ്റ്" },
  "Stable, fast, and reliable internet for homes and businesses. Enjoy uninterrupted connectivity with the best in-class fiber technology.": { ta: "வீடுகள் மற்றும் வணிகங்களுக்கு நிலையான, வேகமான, நம்பகமான இணையம். சிறந்த ஃபைபர் தொழில்நுட்பத்துடன் தடையற்ற இணைப்பை அனுபவிக்கவும்.", ml: "വീടുകൾക്കും ബിസിനസുകൾക്കും സ്ഥിരതയുള്ള, വേഗതയേറിയ, വിശ്വസനീയമായ ഇന്റർനെറ്റ്. മികച്ച ഫൈബർ സാങ്കേതികവിദ്യയിലൂടെ തടസ്സമില്ലാത്ത കണക്റ്റിവിറ്റി ആസ്വദിക്കൂ." },
  "Quality channels with crystal-clear picture and affordable cable connection. Available in Kinathukadavu, Pollachi, and Parakkal (Nallepilly, Kerala). Plans from ₹250.": { ta: "தெளிவான படத் தரத்துடன் தரமான சேனல்கள் மற்றும் மலிவான கேபிள் இணைப்பு. கிணத்துக்கடவு, பொள்ளாச்சி மற்றும் பரக்கல் (நல்லேப்பிள்ளி, கேரளா) பகுதிகளில் கிடைக்கிறது. திட்டங்கள் ₹250 முதல்.", ml: "ക്രിസ്റ്റൽ ക്ലിയർ ചിത്ര ഗുണമേന്മയുള്ള ചാനലുകളും താങ്ങാനാവുന്ന കേബിൾ കണക്ഷനും. കിണത്തുകടവ്, പൊള്ളാച്ചി, പരക്കൽ (നല്ലേപ്പിള്ളി, കേരളം) എന്നിവിടങ്ങളിൽ ലഭ്യമാണ്. പ്ലാനുകൾ ₹250 മുതൽ." },
  "Advanced digital entertainment and live streaming. Watch your favourite channels in Full HD on any device, anytime, anywhere.": { ta: "மேம்பட்ட டிஜிட்டல் பொழுதுபோக்கு மற்றும் நேரடி ஸ்ட்ரீமிங். உங்களுக்கு பிடித்த சேனல்களை எந்த சாதனத்திலும் எப்போது வேண்டுமானாலும் Full HD-யில் பாருங்கள்.", ml: "വിപുലമായ ഡിജിറ്റൽ വിനോദവും ലൈവ് സ്ട്രീമിംഗും. ഇഷ്ടപ്പെട്ട ചാനലുകൾ ഏത് ഉപകരണത്തിലും എപ്പോൾ വേണമെങ്കിലും Full HDയിൽ കാണാം." },
  "Modern entertainment access to 25+ popular OTT platforms. Enjoy the best movies, series, and live content on demand.": { ta: "25+ பிரபலமான OTT தளங்களுக்கான நவீன பொழுதுபோக்கு அணுகல். சிறந்த திரைப்படங்கள், தொடர்கள் மற்றும் நேரடி உள்ளடக்கங்களை தேவைக்கேற்ப அனுபவிக்கவும்.", ml: "25+ ജനപ്രിയ OTT പ്ലാറ്റ്ഫോമുകളിലേക്കുള്ള ആധുനിക വിനോദ ആക്സസ്. മികച്ച സിനിമകൾ, സീരീസുകൾ, ലൈവ് ഉള്ളടക്കങ്ങൾ ആവശ്യാനുസരണം ആസ്വദിക്കൂ." },
  "Call Now": { ta: "இப்போதே அழைக்கவும்", ml: "ഇപ്പോൾ വിളിക്കുക" },
  "WhatsApp": { ta: "WhatsApp", ml: "WhatsApp" },
  "Request New Connection": { ta: "புதிய இணைப்பைக் கோருங்கள்", ml: "പുതിയ കണക്ഷൻ അഭ്യർത്ഥിക്കുക" },
  "Tamil Nadu": { ta: "தமிழ்நாடு", ml: "തമിഴ്നാട്" },
  "Kerala": { ta: "கேரளா", ml: "കേരളം" },
  "25+ OTTs": { ta: "25+ OTT", ml: "25+ OTT" },
  "& 500+ more channels included": { ta: "& மேலும் 500+ சேனல்கள் சேர்க்கப்பட்டுள்ளன", ml: "& 500+ കൂടുതൽ ചാനലുകൾ ഉൾപ്പെടുന്നു" },
  "25+ OTT சேவைகள் உங்கள் வீட்டிற்கு": { ta: "25+ OTT சேவைகள் உங்கள் வீட்டிற்கு", ml: "25+ OTT സേവനങ്ങൾ നിങ്ങളുടെ വീട്ടിലേക്ക്" },
  "High-Speed Internet & Reliable Cable Services": { ta: "அதிவேக இணையம் & நம்பகமான கேபிள் சேவைகள்", ml: "ഹൈ-സ്പീഡ് ഇന്റർനെറ്റ് & വിശ്വസനീയ കേബിൾ സേവനങ്ങൾ" },
  "All rights reserved.": { ta: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.", ml: "എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു." },  "TN Cable": { ta: "தமிழ்நாடு கேபிள்", ml: "തമിഴ്നാട് കേബിൾ" },
  "Services Staff": { ta: "சேவை பணியாளர்கள்", ml: "സേവന സ്റ്റാഫ്" },
  "KL Cable + Net": { ta: "கேரளா கேபிள் + நெட்", ml: "കേരള കേബിൾ + നെറ്റ്" },
  "KL Support": { ta: "கேரளா ஆதரவு", ml: "കേരള പിന്തുണ" },
  "Plan Details": { ta: "திட்ட விவரங்கள்", ml: "പ്ലാൻ വിശദാംശങ്ങൾ" },
  "Popular Channels": { ta: "பிரபல சேனல்கள்", ml: "ജനപ്രിയ ചാനലുകൾ" },
  "TN IPTV & OTT": { ta: "தமிழ்நாடு IPTV & OTT", ml: "തമിഴ്നാട് IPTV & OTT" },
  "KL OTT": { ta: "கேரளா OTT", ml: "കേരള OTT" },
};

const ORIGINAL_TEXT = new WeakMap<Text, string>();

function applyLanguage(language: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = language === "ta" ? "ta" : language === "ml" ? "ml" : "en";
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const textNode = node as Text;
    if (!ORIGINAL_TEXT.has(textNode)) ORIGINAL_TEXT.set(textNode, textNode.textContent ?? "");
    const original = ORIGINAL_TEXT.get(textNode) ?? "";
    const trimmedOriginal = original.trim();
    if (!trimmedOriginal || trimmedOriginal.length > 220) continue;
    const translation = PAGE_TRANSLATIONS[trimmedOriginal]?.[language];
    if (language === "en") {
      textNode.textContent = original;
    } else if (translation !== undefined) {
      const leading = original.match(/^\s*/)?.[0] ?? "";
      const trailing = original.match(/\s*$/)?.[0] ?? "";
      textNode.textContent = `${leading}${translation}${trailing}`;
    }
  }

  const elements = document.querySelectorAll<HTMLElement>("[data-scv-i18n]");
  for (const el of elements) {
    const key = el.getAttribute("data-scv-i18n");
    if (!key) continue;
    const translated = PAGE_TRANSLATIONS[key]?.[language];
    if (translated !== undefined) el.textContent = translated;
    else if (language === "en") el.textContent = key;
  }
}

function usePageLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("scv-language") as Language) || "en";
  });

  useEffect(() => {
    applyLanguage(language);
    const handleChange = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if (next === "en" || next === "ta" || next === "ml") setLanguage(next);
    };
    window.addEventListener("scv-language-change", handleChange);

    const observer = new MutationObserver(() => {
      observer.disconnect();
      applyLanguage(language);
      observer.observe(document.body, { childList: true, subtree: true });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scv-language-change", handleChange);
      observer.disconnect();
    };
  }, [language]);

  return language;
}

function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("scv-language") as Language) || "en";
  });

  useEffect(() => {
    applyLanguage(language);
  }, [language]);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    localStorage.setItem("scv-language", next);
    window.dispatchEvent(new CustomEvent("scv-language-change", { detail: next }));
    applyLanguage(next);
  };

  return (
    <div className="flex items-center gap-1.5 ml-2" aria-label="Language selector">
      {(["en", "ta", "ml"] as Language[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => changeLanguage(lang)}
          className={`px-2.5 py-1.5 rounded-full text-xs font-bold border transition-all ${language === lang ? "bg-blue-600 text-white border-blue-400" : "text-blue-200 border-blue-400/30 hover:bg-blue-500/20"}`}
          aria-label={`Switch language to ${LANGUAGE_LABELS[lang]}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ── Scroll Reveal Hook ──────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale",
    );

    // Never hide page content while the observer is initializing.
    elements.forEach((element) => element.classList.add("visible"));

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

// ── Active Section Hook ─────────────────────────────────────────────────────
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.35 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// ── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "+",
}: { target: number; suffix?: string; duration?: number }) {
  return (
    <span className="counter-pop" aria-label={`${target}${suffix}`}>
      {target}
      {suffix}
    </span>
  );
}

// ── Section Title with Gradient Underline ───────────────────────────────────
function SectionTitle({
  badge,
  badgeIcon: BadgeIcon,
  title,
  highlight,
  subtitle,
  dark = true,
}: {
  badge: string;
  badgeIcon: React.ElementType;
  title: string;
  highlight: string;
  subtitle: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center mb-14 reveal">
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 border ${
          dark
            ? "bg-blue-600/20 border-blue-500/30 text-blue-300"
            : "bg-blue-600/15 border-blue-500/25 text-blue-700"
        }`}
      >
        <BadgeIcon size={14} /> {badge}
      </div>
      <div className="pb-6">
        <h2
          className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-2 section-title-accent ${
            dark ? "text-white" : "text-navy-900"
          }`}
        >
          {title} <span className="gradient-text">{highlight}</span>
        </h2>
      </div>
      <p
        className={`text-lg max-w-2xl mx-auto ${
          dark ? "text-blue-200" : "text-blue-800"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
const NAV_SECTION_IDS = [
  "home",
  "partners",
  "offers",
  "plans",
  "achievements",
  "services",
  "contact",
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(NAV_SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // 6 links — Offers removed from nav
  const links = [
    { label: "Home", id: "home" },
    { label: "Partners", id: "partners" },
    { label: "Plans", id: "plans" },
    { label: "Achievements", id: "achievements" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 animate-nav transition-all duration-300 ${
        scrolled ? "navbar-scrolled" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo + Name */}
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0 text-left"
            onClick={() => scrollTo("home")}
            data-ocid="nav.link"
          >
            <div
              className="flex-shrink-0 w-11 h-11 rounded-full overflow-hidden bg-white flex items-center justify-center"
              style={{
                boxShadow:
                  "0 0 0 2px rgba(29,106,255,0.5), 0 0 12px rgba(29,106,255,0.3)",
              }}
            >
              <img
                src="/assets/uploads/image-019d23cd-7729-7348-b7cf-ae0212b58bf5-1.png"
                alt="Shree Cable Vision Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-display font-bold text-base leading-tight">
                Shree Cable Vision
              </div>
              <div className="text-blue-400 text-xs">
                High-Speed Internet & Cable
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                data-ocid="nav.link"
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === link.id
                    ? "nav-link-active text-blue-400"
                    : "text-blue-200 hover:text-white hover:bg-white/8"
                }`}
              >
                {link.label}
              </button>
            ))}
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              data-ocid="nav.primary_button"
              className="ml-3 px-5 py-2 btn-gradient text-white text-sm font-semibold rounded-full"
            >
              Get Connected
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-white hover:text-blue-300 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="lg:hidden mobile-menu-enter pb-4 border-t border-blue-500/20 mt-1"
            style={{ background: "rgba(5, 13, 46, 0.97)" }}
          >
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left px-6 py-3 text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="px-6 pt-2 flex justify-center">
              <LanguageSwitcher />
            </div>
            <div className="px-6 pt-2">
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="w-full py-2.5 btn-gradient text-white text-sm font-semibold rounded-full"
              >
                Get Connection Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const trustedNetworks = [
    "BSNL",
    "TIC",
    "Railwire",
    "Megnet",
    "KFON",
    "Skyplay",
  ];
  const allMarqueeItems = [
    ...trustedNetworks.map((n) => `${n}-a`),
    ...trustedNetworks.map((n) => `${n}-b`),
    ...trustedNetworks.map((n) => `${n}-c`),
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -20%, #1a3a8a 0%, #0a1640 40%, #050d2e 70%)",
      }}
    >
      {/* Trusted Networks Marquee Strip — at the very top */}
      <div
        className="relative z-20 w-full pt-16"
        style={{
          background: "rgba(29,106,255,0.13)",
          borderBottom: "1px solid rgba(29,106,255,0.25)",
        }}
      >
        <div className="flex items-center gap-4 py-2.5 overflow-hidden">
          <span
            className="flex-shrink-0 pl-6 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#60a5fa" }}
          >
            Trusted Networks:
          </span>
          <div className="flex-1 overflow-hidden trusted-marquee-container">
            <div className="trusted-marquee-track animate-trusted-marquee flex gap-8">
              {allMarqueeItems.map((key) => (
                <span
                  key={key}
                  className="flex-shrink-0 flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "#e0eaff" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#1d6aff" }}
                  />
                  {key.replace(/-[abc]$/, "")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(29,106,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 20% 80%, rgba(14,165,233,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Animated Blobs */}
      <div
        className="blob animate-blob"
        style={{
          width: 600,
          height: 600,
          background: "#1e40af",
          top: "5%",
          left: "-15%",
        }}
      />
      <div
        className="blob animate-blob2"
        style={{
          width: 450,
          height: 450,
          background: "#1d6aff",
          bottom: "5%",
          right: "-8%",
          animationDelay: "2s",
        }}
      />
      <div
        className="blob animate-blob3"
        style={{
          width: 350,
          height: 350,
          background: "#0284c7",
          top: "40%",
          left: "55%",
          animationDelay: "4s",
        }}
      />

      {/* Glowing orb behind headline */}
      <div
        className="hero-glow-orb"
        style={{
          width: 700,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(29,106,255,0.22) 0%, transparent 70%)",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.8,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 w-full">
        <div className="text-center max-w-5xl mx-auto w-full">
          {/* Badge */}
          <div className="animate-fade-in-up hero-1 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-8">
            <Sparkles size={14} className="text-blue-400" />
            Trusted by 6000+ Internet & 1500+ Cable Customers across Tamil Nadu & Kerala
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-in-up hero-2 font-display font-bold leading-[1.05] mb-6 tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
          >
            <span className="text-white">High-Speed Internet &</span>
            <br />
            <span className="gradient-text">Reliable Cable</span>
            <span className="text-white"> Services</span>
          </h1>

          {/* Subheading */}
          <p className="animate-fade-in-up hero-3 text-blue-200 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-3 leading-relaxed">
            Connecting Tamil Nadu & Kerala with Fast, Affordable & Unlimited
            Plans
          </p>

          {/* Tamil tagline */}
          <p
            className="animate-fade-in-up hero-3 text-base sm:text-lg mb-4 font-medium"
            style={{ color: "#93c5fd", fontStyle: "italic" }}
          >
            நம்பகமான இணைப்பு, சிறந்த சேவை
          </p>

          {/* Founder */}
          <p className="animate-fade-in-up hero-3 text-blue-300/80 text-sm sm:text-base mb-10">
            Founded by{" "}
            <span className="text-blue-200 font-semibold border-b border-blue-400/50">
              Shanmugharaj N
            </span>{" "}
            | Founder & CEO, Shree Cable Vision
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up hero-4 flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              data-ocid="hero.primary_button"
              className="btn-gradient px-10 py-4 text-white font-bold text-lg rounded-full flex items-center justify-center gap-2"
            >
              Get Connection Now <ChevronRight size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("plans")}
              data-ocid="hero.secondary_button"
              className="btn-outline-glow px-10 py-4 border-2 border-blue-500/70 text-white font-bold text-lg rounded-full flex items-center justify-center gap-2 bg-transparent"
            >
              View Plans <Zap size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up hero-5 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Wifi, value: 6000, label: "Internet Customers" },
              { icon: Tv, value: 1500, label: "Cable TV Customers" },
              { icon: Network, value: 70, label: "LCOs" },
              { icon: Users, value: 10, label: "Skilled Staff" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4 hover:bg-blue-600/15 hover:border-blue-500/40 transition-colors"
              >
                <Icon size={24} className="text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-bold font-display text-white">
                  <AnimatedCounter target={value} />
                </div>
                <div className="text-blue-300 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ── Partners ─────────────────────────────────────────────────────────────────
function Partners() {
  // Broadband and network partners
  const broadband = [
    {
      name: "BSNL",
      logo: "/assets/image-019d7830-1e5b-743b-8450-6968900f63a1.png",
      tag: "",
    },
    {
      name: "Kovai Fiber",
      logo: "/assets/image-019d7830-1d52-7393-84b3-828669eda3a4.png",
      tag: "",
    },
    {
      name: "Megnet",
      logo: "/assets/image-019d7830-1d25-7039-a3ad-8e933d19326f.png",
      tag: "",
    },
    {
      name: "TIC Fiber",
      logo: "/assets/image-019d7830-1d32-7422-bde7-6be3e9238c7b.png",
      tag: "",
    },
    {
      name: "KFON",
      logo: "/assets/image-019d7830-2072-73fa-b692-c608f0c0779a.png",
      tag: "Kerala Partner",
    },
    {
      name: "Railwire",
      logo: "/assets/image-019d7830-2069-7219-8111-c6d0c0a5dfea.png",
      tag: "",
    },
    {
      name: "Skyplay",
      logo: "/assets/image-019d7830-2226-72fa-a6ca-d26792f71aa0.png",
      tag: "",
    },
    {
      name: "FiberFlow",
      logo: "/assets/image-019d7830-21a0-77d9-97b4-e6200da419c7.png",
      tag: "",
    },
  ];

  const cableTV = [
    {
      name: "TCCL",
      logo: "/assets/image-019d7830-1d1e-75d7-a9cb-085637987e4a.png",
      region: "Tamil Nadu",
      contact: "9443406721",
    },
    {
      name: "KCCL",
      logo: "/assets/image-019d7830-2095-776e-9aaf-bd06af4b54ae.png",
      region: "Kerala",
      contact: "9745005285",
    },
  ];

  // Duplicate for seamless marquee
  const marqueeItems = [...broadband, ...broadband];

  return (
    <section id="partners" className="py-20 section-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Trusted Network Partners"
          badgeIcon={Shield}
          title="Our"
          highlight="Partners"
          subtitle="We work with India's most reliable network providers to deliver flexible, high-quality connectivity to every home."
          dark={false}
        />

        {/* Broadband Partners — Marquee */}
        <div className="mb-12">
          <h3
            className="font-semibold text-lg mb-6 flex items-center gap-2 reveal"
            style={{ color: "#1e4fc2" }}
          >
            <Wifi size={20} style={{ color: "#1d6aff" }} /> Broadband & Network
            Partners
          </h3>
          <div className="marquee-container">
            <div className="marquee-track animate-marquee">
              {marqueeItems.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="partner-card flex-shrink-0 w-40 bg-white border border-blue-200 rounded-2xl p-4 text-center cursor-default shadow-sm"
                >
                  <div className="w-full h-14 rounded-xl mx-auto mb-2 flex items-center justify-center bg-white border border-blue-100 overflow-hidden px-2">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                  <div
                    className="font-bold text-sm truncate"
                    style={{ color: "#0a1628" }}
                  >
                    {p.name}
                  </div>
                  {p.tag && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 border border-blue-300 text-blue-700 text-xs rounded-full">
                      {p.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cable TV Partners */}
        <div>
          <h3
            className="font-semibold text-lg mb-6 flex items-center gap-2 reveal"
            style={{ color: "#1e4fc2" }}
          >
            <Tv size={20} style={{ color: "#1d6aff" }} /> Cable TV Partners
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {cableTV.map((p, i) => (
              <div
                key={p.name}
                className={`partner-card reveal stagger-${i + 1} bg-white border border-blue-200 rounded-2xl p-6 shadow-sm`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-20 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border border-blue-100 overflow-hidden px-2">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <div
                      className="font-bold text-lg"
                      style={{ color: "#0a1628" }}
                    >
                      {p.name}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "#1e4fc2" }}
                    >
                      Cable TV Partner – {p.region}
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#1e4fc2" }}
                >
                  <Phone size={14} style={{ color: "#1d6aff" }} />
                  <span>
                    Cable {p.region} Contact:{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "#0a1628" }}
                    >
                      {p.contact}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Free Network Switch ───────────────────────────────────────────────────────
function FreeNetworkSwitch() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="offers"
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050d2e 0%, #0a1a4a 50%, #050d2e 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700 rounded-full opacity-10 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-full px-4 py-2 mb-4">
            <span className="text-blue-300 text-sm font-medium">
              🌐 Serving Rural &amp; Remote Areas
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Free Network Switch
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Switch to Shree Cable Vision with zero switching cost and enjoy
            reliable fiber connectivity, transparent pricing, and local support.
          </p>
        </div>

        {/* Main Card */}
        <div className="reveal max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/80 to-slate-900/90 border border-blue-500/30 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent rounded-2xl pointer-events-none" />

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              {/* Left Column */}
              <div>
                <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 rounded-full px-4 py-2 mb-6">
                  <span className="text-green-400 font-bold text-sm">
                    ✓ No Switching Cost
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                  Switch Now —<br />
                  <span className="text-blue-400">It&apos;s Free</span>
                </h3>
                <p className="text-blue-100 text-base leading-relaxed mb-6">
                  Switch from any network (like BSNL, Kovaifiber, etc.) to Shree
                  Cable Vision completely{" "}
                  <strong className="text-white">FREE</strong>. No hidden
                  charges, no setup fees, no hassle.
                </p>
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  data-ocid="offers.primary_button"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                >
                  Switch Now — It&apos;s Free <ChevronRight size={18} />
                </button>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-400/40 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">
                        Zero Hidden Charges
                      </h4>
                      <p className="text-blue-200 text-sm">
                        No setup fees, no installation cost, no surprise bills.
                        What you see is what you pay.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-400/40 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Globe size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">
                        Fiber to Rural Areas
                      </h4>
                      <p className="text-blue-200 text-sm">
                        High-speed fiber connectivity for rural &amp; remote areas,
                        backed by local service and support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Plans ─────────────────────────────────────────────────────────────────────
const plans = [
  { speed: "20 Mbps", label: "Basic", price: 299, popular: false },
  { speed: "50 Mbps", label: "Family", price: 425, popular: false },
  { speed: "100 Mbps", label: "Most Popular", price: 599, popular: true },
  { speed: "150 Mbps", label: "Streaming", price: 666, popular: false },
  { speed: "200 Mbps", label: "Power User", price: 999, popular: false },
  { speed: "300 Mbps", label: "Heavy Usage", price: 1299, popular: false },
];

const TN_TARIFF_IMAGES = [
  "/assets/uploads/image-019d2593-7c9b-76b6-9a4b-d9c8a62422e5-1.png",
  "/assets/uploads/image-019d788a-3df2-749d-8d34-b841e3d0989c.png",
];

const KL_TARIFF_IMAGE =
  "/assets/screenshot_2026-03-25_112105-019d23b6-9a31-77d2-8fbe-ed2b89030b06.png";

// ── Plans ─────────────────────────────────────────────────────────────────────
function Plans() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="plans" className="py-20 section-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Flexible Plans"
          badgeIcon={Zap}
          title="Flexible Plans for"
          highlight="Every Need"
          subtitle="Unlimited data. Simple pricing. Choose the speed that fits you."
          dark={false}
        />

        {/* Broadband tariff cards/images */}
        <div className="mb-10 reveal">
          <div className="text-center mb-5">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold">
              Tamil Nadu Tariff
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {TN_TARIFF_IMAGES.map((src, index) => (
              <div
                key={src}
                className="bg-white rounded-2xl border border-blue-200 shadow-md p-3 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Tamil Nadu tariff ${index + 1}`}
                  className="w-full h-auto max-h-[620px] object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10 mb-5">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold">
              Kerala Tariff
            </span>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-2xl bg-white rounded-2xl border border-blue-200 shadow-md p-3 flex items-center justify-center overflow-hidden">
              <img
                src={KL_TARIFF_IMAGE}
                alt="Kerala tariff"
                className="w-full h-auto max-h-[680px] object-contain rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {plans.map((plan, i) => (
            <div
              key={plan.speed}
              data-ocid={`plans.item.${i + 1}`}
              className={`plan-card reveal stagger-${(i % 3) + 1} relative rounded-2xl p-4 border text-center ${
                plan.popular
                  ? "plan-card-popular border-blue-500 bg-blue-600/20"
                  : "border-blue-200 bg-white shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 popular-badge text-white text-[10px] font-bold rounded-full whitespace-nowrap">
                  ⭐ Popular
                </div>
              )}

              <Wifi size={20} className="text-blue-400 mx-auto mb-2" />

              <div
                className={`text-xl font-display font-bold ${
                  plan.popular ? "text-white" : "text-[#0a1628]"
                }`}
              >
                {plan.speed}
              </div>

              <span
                className={`inline-block mt-1 mb-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  plan.popular
                    ? "bg-blue-500/20 text-blue-200 border border-blue-400/30"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                {plan.label}
              </span>

              <div className="mb-3">
                <span
                  className={`text-2xl font-display font-bold ${
                    plan.popular ? "text-white" : "text-[#0a1628]"
                  }`}
                >
                  ₹{plan.price}
                </span>
                <span
                  className={`text-xs ml-1 ${
                    plan.popular ? "text-blue-300" : "text-[#1e4fc2]"
                  }`}
                >
                  /month
                </span>
              </div>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                data-ocid="plans.primary_button"
                className={`w-full py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
                  plan.popular
                    ? "btn-gradient text-white"
                    : "border border-blue-500 text-blue-700 hover:bg-blue-600 hover:text-white"
                }`}
              >
                Get Plan
              </button>
            </div>
          ))}
        </div>

        <div className="reveal text-center">
          <p className="text-sm font-medium text-[#1e3a5f]">
            Unlimited data • No FUP limits • 18% GST applicable
          </p>
          <p className="text-xs text-[#4b6485] mt-2">
            * Pricing may vary by provider and location. 18% GST applicable on all plans.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Achievements ─────────────────────────────────────────────────────────────
function Achievements() {
  const awards = [
    {
      icon: Award,
      title: "BSNL 25th Year Silver Jubilee Best LCO Award",
      year: "2025",
      desc: "Recognized as the Best Local Cable Operator during BSNL's prestigious 25th Silver Jubilee celebration.",
    },
    {
      icon: TrendingUp,
      title: "Best Performer in FTTH Segment",
      year: "2023–2024",
      desc: "Top performer in the Fiber-to-the-Home segment, Pollachi SDCA, awarded by BSNL.",
    },
    {
      icon: Star,
      title: "Best Performance in Cluster Mission Mode Provisioning",
      year: "2023–24",
      desc: "BSNL award for outstanding cluster mission mode provisioning at Pollachi SDCA.",
    },
    {
      icon: Globe,
      title: "Top Connect Provider in Coimbatore OD",
      year: "2023–24",
      desc: "Recognized as the leading connectivity provider in the Coimbatore Optical Distribution zone.",
    },
  ];

  return (
    <section
      id="achievements"
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050d2e 0%, #0f1a0a 50%, #050d2e 100%)",
      }}
    >
      <div
        className="blob"
        style={{
          width: 450,
          height: 450,
          background: "#f59e0b",
          top: "15%",
          right: "-8%",
          opacity: 0.07,
        }}
      />
      <div
        className="blob"
        style={{
          width: 350,
          height: 350,
          background: "#fcd34d",
          bottom: "5%",
          left: "-5%",
          opacity: 0.05,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/15 border border-yellow-400/40 text-yellow-300 text-sm font-semibold mb-4">
            <Award size={14} className="text-yellow-400" /> Award-Winning
            Service
          </div>
          <div className="pb-6">
            <h2
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-2 section-title-accent"
              style={
                {
                  "--tw-section-accent-color": "#f59e0b",
                } as React.CSSProperties
              }
            >
              Our <span className="gold-text">Achievements</span>
            </h2>
          </div>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Recognized by India's top telecom authorities for excellence,
            performance, and service quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {awards.map((award, i) => (
            <div
              key={award.title}
              data-ocid={`achievements.item.${i + 1}`}
              className={`achievement-card reveal stagger-${i + 1} rounded-2xl p-6 border border-yellow-400/15 bg-yellow-400/5`}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-yellow-400/15 border-2 border-yellow-400/40">
                  <award.icon size={28} className="text-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-yellow-400 font-bold text-lg leading-tight">
                      {award.year}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-300 text-xs border border-yellow-400/30">
                      BSNL Award
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 leading-snug">
                    {award.title}
                  </h3>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    {award.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center reveal">
          <div className="inline-flex items-center gap-3 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl px-8 py-4">
            <Award size={24} className="text-yellow-400" />
            <span className="text-yellow-300 font-semibold">
              BSNL Certified & Award-Winning LCO — Shree Cable Vision
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
type OttPlatform = {
  name: string;
  shortName?: string;
  logoUrl?: string;
  fallbackColor: string;
  fallbackText: string;
  fallbackTextColor?: string;
};

const ottPlatforms: OttPlatform[] = [
  {
    name: "Amazon Prime",
    shortName: "Prime",
    logoUrl:
      "https://images.moneycontrol.com/static-mcnews/2024/07/20240725074952_WhatsApp-Image-2024-07-25-at-12.17.26.jpeg",
    fallbackColor: "#00A8E0",
    fallbackText: "Prime",
  },
  {
    name: "Jio Hotstar",
    shortName: "Hotstar",
    logoUrl:
      "https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/afaqs/media/media_files/2025/02/14/kmxPq8nbe8BX9LrHMdc3.png",
    fallbackColor: "#1B3D6F",
    fallbackText: "Hotstar",
  },
  {
    name: "SonyLIV",
    shortName: "SonyLIV",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/SonyLIV_2020.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    fallbackColor: "#003087",
    fallbackText: "SonyLIV",
  },
  {
    name: "ZEE5",
    shortName: "ZEE5",
    logoUrl:
      "https://images.hindustantimes.com/tech/img/2020/06/18/960x540/Untitled_design_(91)_1592490698203_1592490708715.png",
    fallbackColor: "#5F2B8A",
    fallbackText: "ZEE5",
  },
  {
    name: "Jio Cinema",
    shortName: "JioCinema",
    logoUrl:
      "https://www.exchange4media.com/news-photo/133451-jiomm.jpg",
    fallbackColor: "#003087",
    fallbackText: "JioCinema",
  },
  {
    name: "Voot",
    shortName: "Voot",
    logoUrl:
      "https://play-lh.googleusercontent.com/InSOp5thAKQxms_ZZfRVjefSQFX2_WDTR1B03C3zcmxftJUkOWC2c__ciwfFLwxT2G6aRQmjfMV28-tnV6dE0w",
    fallbackColor: "#FF6B00",
    fallbackText: "Voot",
  },
  {
    name: "Sun NXT",
    shortName: "SunNXT",
    logoUrl:
      "https://assets.dealmela.com/stores/sunnxt.webp",
    fallbackColor: "#E8850A",
    fallbackText: "SunNXT",
  },
  {
    name: "Aha",
    shortName: "Aha",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/d/da/Aha_%28streaming_service.svg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    fallbackColor: "#FF0000",
    fallbackText: "Aha",
  },
];

type IptvChannel = {
  name: string;
  logoUrl?: string;
  fallbackColor: string;
  fallbackText: string;
};

const iptvChannelsList: IptvChannel[] = [
  {
    name: "Sun TV",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0ri6SojvqQKmeJOB4f4WF8uUL6TsVWW2YgpgLZzZjYO-XO1mEDts2v_-&s=10",
    fallbackColor: "#f7941d",
    fallbackText: "SUN TV",
  },
  {
    name: "Vijay TV",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Uj4m04p8NR_cpqkuZFS7A0O80n2fSTTNLUTSllzS0RNqPfM2ti0SQ6_&s=10",
    fallbackColor: "#003087",
    fallbackText: "VIJAY TV",
  },
  {
    name: "Zee Tamil",
    logoUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Zee_Tamil_logo_2025.jpg/500px-Zee_Tamil_logo_2025.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
    fallbackColor: "#1a47b8",
    fallbackText: "ZEE Tamil",
  },
  {
    name: "Colors Tamil",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/68/Colors_Tamil.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    fallbackColor: "#E8003D",
    fallbackText: "Colors",
  },
  {
    name: "Pogo",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGz22YSphnVrqPc3r7suaHwOVA1H4YJa3K-iyvZio7zg&s=10",
    fallbackColor: "#C41E3A",
    fallbackText: "POGO",
  },
  {
    name: "Polimer TV",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-FntdE177_tsdeR-L1Jb8XoCYpw3AwHZvjcX65H45R8-euNhjM32Mq5k&s=10",
    fallbackColor: "#1A56A0",
    fallbackText: "Polimer",
  },
  {
    name: "Jaya TV",
    logoUrl:
      "https://e7.pngegg.com/pngimages/630/474/png-clipart-jaya-tv-television-channel-television-show-star-vijay-tv-news-television-logo-thumbnail.png",
    fallbackColor: "#0066CC",
    fallbackText: "",
  },
  {
    name: "K Tv",
    logoUrl:
      "https://i.pinimg.com/564x/43/6d/a0/436da09ceff8951de764afe229f6e318.jpg",
    fallbackColor: "",
    fallbackText: "",
  },
  {
    name: "News18 Tamil Nadu",
    logoUrl:
      "https://www.medianews4u.com/wp-content/uploads/2020/07/News18-Tamil-Nadu-wins-interim-injunction-from-Madras-High-Court.jpg",
    fallbackColor: "#E8003D",
    fallbackText: "News18",
  },
  {
    name: "Sun Music",
    logoUrl:
    "https://yt3.googleusercontent.com/jVwT_VTxAmCRLuBFqLnyyqZfYcqSdtv_90LEPViMhBsWXmWFKZijo1UtTEwcyQbQyAoDsokoSRc=s900-c-k-c0x00ffffff-no-rj",
    fallbackColor: "#1A56A0",
    fallbackText: "SUN MUSIC",
  },
];

function Services() {
  const basicServices = [
    {
      icon: Wifi,
      title: "High-Speed Broadband Internet",
      desc: "Stable, fast, and reliable internet for homes and businesses. Enjoy uninterrupted connectivity with the best in-class fiber technology.",
      badge: null as string | null,
    },
    {
      icon: Tv,
      title: "Cable TV Services",
      desc: "Quality channels with crystal-clear picture and affordable cable connection. Available in Kinathukadavu, Pollachi, and Parakkal (Nallepilly, Kerala). Plans from ₹250.",
      badge: "From ₹250" as string | null,
    },
  ];

  return (
    <section id="services" className="py-20 section-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="What We Offer"
          badgeIcon={Globe}
          title="Our"
          highlight="Services"
          subtitle="Comprehensive digital connectivity solutions for homes and businesses across Tamil Nadu and Kerala."
          dark={false}
        />

        {/* Basic service cards — Broadband + Cable TV */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {basicServices.map((s, i) => (
            <div
              key={s.title}
              data-ocid={`services.item.${i + 1}`}
              className={`service-card reveal stagger-${(i % 3) + 1} relative rounded-2xl p-6 bg-white border border-blue-100 cursor-default shadow-sm`}
            >
              {s.badge && (
                <span
                  className="absolute top-4 right-4 px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 border border-blue-300"
                  style={{ color: "#1e4fc2" }}
                >
                  {s.badge}
                </span>
              )}
              <div className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-blue-50 border border-blue-200">
                <s.icon size={28} style={{ color: "#1d6aff" }} />
              </div>
              <h3
                className="font-bold text-lg mb-3"
                style={{ color: "#0a1628" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#1e3a5f" }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* IPTV Services Card */}
        <div
          data-ocid="services.item.3"
          className="service-card reveal relative rounded-2xl p-6 bg-white border border-blue-100 cursor-default shadow-sm mb-6"
        >
          <div className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-blue-50 border border-blue-200">
            <Monitor size={28} style={{ color: "#1d6aff" }} />
          </div>
          <h3 className="font-bold text-lg mb-3" style={{ color: "#0a1628" }}>
            IPTV Services
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#1e3a5f" }}>
            Advanced digital entertainment and live streaming. Watch your
            favourite channels in Full HD on any device, anytime, anywhere.
          </p>
          <div className="mt-4">
            <p
              className="text-xs font-semibold mb-3"
              style={{ color: "#1e4fc2" }}
            >
              Popular Channels:
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {iptvChannelsList.map((ch) => (
                <div key={ch.name} className="flex flex-col items-center gap-2">
                  <div className="w-20 h-12 flex items-center justify-center rounded-lg overflow-hidden bg-white shadow-md border border-blue-100 relative hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    {ch.logoUrl ? (
                      <img
                        src={ch.logoUrl}
                        alt={ch.name}
                        className="max-w-full max-h-full object-contain p-1"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.style.backgroundColor = ch.fallbackColor;
                            const span = document.createElement("span");
                            span.textContent = ch.fallbackText;
                            span.style.cssText =
                              "color:white;font-size:9px;font-weight:bold;text-align:center;padding:2px;";
                            parent.appendChild(span);
                          }
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-white text-xs font-bold text-center px-1"
                        style={{ backgroundColor: ch.fallbackColor }}
                      >
                        {ch.fallbackText}
                      </div>
                    )}
                  </div>
                  <span
                    className="text-xs text-center font-medium leading-tight"
                    style={{ color: "#1e3a5f" }}
                  >
                    {ch.name}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="text-xs font-semibold mt-3"
              style={{ color: "#1e4fc2" }}
            >
              &amp; 500+ more channels included
            </p>
          </div>
        </div>

        {/* OTT Services Card */}
        <div
          data-ocid="services.item.4"
          className="service-card reveal relative rounded-2xl p-6 bg-white border border-blue-100 cursor-default shadow-sm mb-6"
        >
          <span
            className="absolute top-4 right-4 px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 border border-blue-300"
            style={{ color: "#1e4fc2" }}
          >
            25+ OTTs
          </span>
          <div className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-blue-50 border border-blue-200">
            <Globe size={28} style={{ color: "#1d6aff" }} />
          </div>
          <h3 className="font-bold text-lg mb-3" style={{ color: "#0a1628" }}>
            OTT Services
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "#1e3a5f" }}
          >
            Modern entertainment access to 25+ popular OTT platforms. Enjoy the
            best movies, series, and live content on demand.
          </p>
          {/* OTT Platform Logos Grid */}
          <div className="reveal">
            <div className="rounded-xl p-5 border border-blue-100 bg-blue-50/50">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {ottPlatforms.map((ott) => (
                  <div
                    key={ott.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-20 h-12 flex items-center justify-center rounded-lg overflow-hidden bg-white shadow-md border border-blue-100 relative hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                      <img
                        src={ott.logoUrl}
                        alt={ott.name}
                        className="max-w-full max-h-full object-contain p-1"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.style.backgroundColor = ott.fallbackColor;
                            const span = document.createElement("span");
                            span.textContent = ott.shortName ?? ott.name;
                            span.style.cssText =
                              "color:white;font-size:9px;font-weight:bold;text-align:center;padding:2px;";
                            parent.appendChild(span);
                          }
                        }}
                      />
                    </div>
                    <span
                      className="text-xs text-center font-medium"
                      style={{ color: "#1e3a5f" }}
                    >
                      {ott.name}
                    </span>
                  </div>
                ))}
                {/* 25+ more badge */}
                <div
                  className="flex flex-col items-center justify-center rounded-xl p-3 border-2 border-blue-400 shadow-lg min-h-[80px]"
                  style={{
                    background: "linear-gradient(135deg, #1e40af, #0f172a)",
                  }}
                >
                  <span className="text-3xl font-black text-white leading-none">
                    25+
                  </span>
                  <span className="text-xs text-blue-200 mt-1 text-center">
                    More Platforms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Regional IPTV / OTT Partners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
            <div className="text-xs font-bold text-blue-700 mb-2">TN IPTV </div>
            <div className="h-24 rounded-xl bg-white border border-blue-100 flex items-center justify-center overflow-hidden p-2">
              <img
                src="https://play-lh.googleusercontent.com/5SVO8iyqh3DCaTjIUTR4lmSTLsPmC2hSsyNfrYPRL-LADqZnDigW43CUBVgj3e1HsfqFmSs1ym7TK4CLW3Qw3A=w480-h960-rw"
                alt="TCCL IPTV"
                className="max-h-20 max-w-[88%] object-contain"
              />
            </div>
            <p className="text-xs text-blue-900 font-semibold mt-2">
              TCCL IPTV • 500+ TV Channels
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
            <div className="text-xs font-bold text-blue-700 mb-2">TN OTT</div>
            <div className="h-24 rounded-xl bg-white border border-blue-100 flex items-center justify-center overflow-hidden p-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8vIZ0sRjdG0DD0XjLyg3aAGJQdK_EC3VoSklZcW9yYwrwp77BLSxVaIN6&s=10"
                alt="TIC Fiber OTT"
                className="max-h-20 max-w-[88%] object-contain"
              />
            </div>
            <p className="text-xs text-blue-900 font-semibold mt-2">
              TIC Fiber OTT
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
            <div className="text-xs font-bold text-blue-700 mb-2">KL OTT</div>
            <div className="h-24 rounded-xl bg-white border border-blue-100 flex items-center justify-center overflow-hidden p-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEIZj-k05O3sJ2Y2pM5u9IXInh5BbvRZ9C8uT100GQwCJIhECx1RpXM5J1&s=10"
                alt="KEE OTT"
                className="max-h-20 max-w-[88%] object-contain"
              />
            </div>
            <p className="text-xs text-blue-900 font-semibold mt-2">
              KEE OTT
            </p>
          </div>
        </div>

        {/* Cable TV service area */}
        <div className="reveal bg-white border border-blue-200 rounded-2xl p-6 text-center shadow-sm">
          <div
            className="flex items-center justify-center gap-2 mb-2"
            style={{ color: "#1e4fc2" }}
          >
            <MapPin size={16} style={{ color: "#1d6aff" }} />
            <span className="font-semibold">Cable TV Service Areas</span>
          </div>
          <p className="font-bold text-lg" style={{ color: "#0a1628" }}>
            Kinathukadavu · Pollachi (TN) & Parakkal (Nallepilly, Kerala)
          </p>
          <p className="text-sm mt-1" style={{ color: "#1e4fc2" }}>
            Cable TV plans start from just ₹250/month
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-20 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-4">
            <Phone size={14} /> Reach Us
          </div>
          <div className="pb-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-2 section-title-accent">
              Get in <span className="gradient-text">Touch</span>
            </h2>
          </div>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            We're here to help. Reach out for new connections, plan upgrades, or
            any support queries.
          </p>
        </div>

        {/* Two-column layout: Map left, Info right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Map — Left */}
          <div className="reveal reveal-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-blue-400" />
              </div>
              <div>
                <div className="text-white font-bold text-base">Our Office</div>
                <div className="text-blue-300 text-xs">
                  35/11, Udumalai Road, Pollachi, Tamil Nadu 642001
                </div>
              </div>
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "0 4px 24px rgba(29,106,255,0.18), 0 0 0 1px rgba(29,106,255,0.25)",
              }}
            >
              <iframe
                title="Shree Cable Vision Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2!2d77.0065!3d10.6617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85d3f7af4d12b%3A0x2b5af0a5f01f8cf3!2sPollachi%2C%20Tamil%20Nadu%20642001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Info — Right */}
          <div className="space-y-4">
            {/* Email */}
            <div className="reveal reveal-right bg-blue-950/40 border border-blue-700/40 rounded-2xl p-5 flex items-start gap-4 hover:border-blue-500/60 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="text-blue-300 text-xs font-medium mb-1">
                  Email
                </div>
                <a
                  href="mailto:shreecablevision96@gmail.com"
                  className="text-white font-semibold text-sm hover:text-blue-300 transition-colors break-all"
                  data-ocid="contact.link"
                >
                  shreecablevision96@gmail.com
                </a>
              </div>
            </div>

            {/* Important / General / Service / Kerala Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Important",
                  number: "9095748780",
                  href: "tel:+919095748780",
                  note: "Main Contact",
                },
                {
                  label: "General",
                  number: "9597726668",
                  href: "tel:+919597726668",
                  note: "General Support",
                },
                {
                  label: "TN Cable",
                  number: "9443406721",
                  href: "tel:+919443406721",
                  note: "Tamil Nadu Cable",
                },
                {
                  label: "Services Staff",
                  number: "9566386668",
                  href: "tel:+919566386668",
                  note: "Service Support",
                },
                {
                  label: "Services Staff",
                  number: "956690668",
                  href: "tel:+91956690668",
                  note: "Service Support",
                },
                {
                  label: "KL Cable + Net",
                  number: "9745005285",
                  href: "tel:+919745005285",
                  note: "Kerala Cable & Internet",
                },
                {
                  label: "KL Support",
                  number: "9446262388",
                  href: "tel:+919446262388",
                  note: "Kerala Support",
                },
              ].map((phone, i) => (
                <div
                  key={`${phone.number}-${i}`}
                  className={`reveal reveal-right stagger-${(i % 3) + 1} bg-blue-950/40 border ${
                    phone.label === "Important"
                      ? "border-blue-500/50"
                      : "border-blue-700/40"
                  } rounded-2xl p-4 flex items-center gap-3 hover:border-blue-500/60 transition-colors`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-blue-300 text-xs font-medium mb-0.5">
                      {phone.label}
                      {phone.label === "Important" && (
                        <span className="ml-1 text-[10px] font-bold bg-blue-600/30 px-1.5 py-0.5 rounded">
                          IMP
                        </span>
                      )}
                    </div>
                    <a
                      href={phone.href}
                      className="text-white font-semibold text-sm hover:text-blue-300 transition-colors"
                    >
                      +91 {phone.number}
                    </a>
                    <div className="text-blue-400/80 text-[11px]">
                      {phone.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 reveal">
          <a href="tel:+919095748780" className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all">
            <Phone size={18} /> Call Now
          </a>
          <a href="https://wa.me/919095748780?text=Hello%20Shree%20Cable%20Vision%2C%20I%20need%20a%20new%20connection." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition-all">
            <Phone size={18} /> WhatsApp
          </a>
          <button type="button" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-blue-400 text-blue-100 hover:bg-blue-500/15 font-bold transition-all">
            <Signal size={18} /> Request New Connection
          </button>
        </div>

        {/* Bottom row: Founder + Hours + Service Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Founder */}
          <div className="reveal bg-blue-950/40 border border-blue-700/40 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                <Users size={20} className="text-blue-400" />
              </div>
              <div className="text-white font-bold">Founder & CEO</div>
            </div>
            <p className="text-blue-200 text-sm font-semibold">
              Shanmugharaj N
            </p>
            <p className="text-blue-300 text-xs mt-1">Shree Cable Vision</p>
          </div>

          {/* Hours */}
          <div className="reveal stagger-1 bg-blue-950/40 border border-blue-700/40 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                <Clock size={20} className="text-blue-400" />
              </div>
              <div className="text-white font-bold">Office Hours</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-blue-200">
                <span>Mon – Sat</span>
                <span className="text-white font-semibold">
                  9:00 AM – 6:00 PM
                </span>
              </div>
              <div className="flex justify-between text-blue-200">
                <span>Sunday</span>
                <span className="text-blue-300 font-semibold">Holiday</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-blue-300 text-xs">
                <CheckCircle size={13} /> Emergency support available if needed
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="reveal stagger-2 bg-blue-950/40 border border-blue-700/40 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                <MapPin size={20} className="text-blue-400" />
              </div>
              <div className="text-white font-bold">Service Areas</div>
            </div>
            <ul className="space-y-2">
              {[
                "Pollachi Town & Surroundings",
                "Kinathukadavu Town & Surroundings",
                "Parakkal (Nallepilly, Kerala)",
                "Top Slip Hill Area",
              ].map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 text-blue-200 text-sm"
                >
                  <CheckCircle
                    size={13}
                    className="text-blue-400 flex-shrink-0"
                  />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="footer-gradient-top" style={{ background: "#030b1e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full overflow-hidden bg-white flex-shrink-0"
                style={{
                  boxShadow:
                    "0 0 0 2px rgba(29,106,255,0.5), 0 0 12px rgba(29,106,255,0.3)",
                }}
              >
                <img
                  src="/assets/uploads/image-019d23cd-7729-7348-b7cf-ae0212b58bf5-1.png"
                  alt="Shree Cable Vision"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <div className="text-white font-display font-bold text-xl">
                  Shree Cable Vision
                </div>
                <div className="text-blue-400 text-xs">
                  High-Speed Internet & Reliable Cable Services
                </div>
              </div>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed mb-4 max-w-md">
              Shree Cable Vision – Connecting Tamil Nadu & Kerala with fast,
              affordable, and unlimited internet and cable services. Founded by
              Shanmugharaj N.
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href="mailto:shreecablevision96@gmail.com"
                className="text-blue-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail size={14} /> shreecablevision96@gmail.com
              </a>
              <a
                href="tel:+919597726668"
                className="text-blue-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Phone size={14} /> +91 95977 26668
              </a>
              <a
                href="tel:+919095748780"
                className="text-blue-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Phone size={14} /> +91 90957 48780
              </a>
              <a
                href="tel:+919446262388"
                className="text-blue-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Phone size={14} /> +91 94462 62388
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", id: "home" },
                { label: "Our Partners", id: "partners" },
                { label: "Plans", id: "plans" },
                { label: "Achievements", id: "achievements" },
                { label: "Services", id: "services" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="text-blue-300 hover:text-white transition-colors text-sm flex items-center gap-1"
                  >
                    <ChevronRight size={12} /> {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {[
                "Pollachi Town",
                "Kinathukadavu Town",
                "Parakkal (Nallepilly), Kerala",
                "Top Slip Hill Area",
              ].map((a) => (
                <li
                  key={a}
                  className="text-blue-300 text-sm flex items-start gap-1"
                >
                  <MapPin
                    size={13}
                    className="text-blue-400 flex-shrink-0 mt-0.5"
                  />{" "}
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-semibold text-sm mb-2">
                Cable Available In
              </h4>
              <p className="text-blue-300 text-xs">
                Kinathukadavu · Pollachi · Parakkal (Nallepilly)
              </p>
              <p className="text-blue-300 text-xs mt-1">
                Plans from ₹250/month
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-400 text-sm text-center sm:text-left">
            © {year} Shree Cable Vision. Founded by{" "}
            <span className="text-white">Shanmugharaj N</span>. All rights
            reserved.
          </p>
          <p className="text-blue-400 text-xs text-center">
            © {year}. Built with{" "}
            <Heart size={12} className="inline text-blue-400" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}


// ── Shree Cable Vision Intro Splash ─────────────────────────────────────────
function IntroSplash({ onComplete }: { onComplete: () => void }) {
  // Startup sequence: Logo → Company Name → Loading → completely removed → website.
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 4800);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  const logoSrc = "/assets/uploads/image-019d23cd-7729-7348-b7cf-ae0212b58bf5-1.png";

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden"
      aria-label="Shree Cable Vision intro"
      style={{
        background:
          "radial-gradient(circle at center, #101827 0%, #070b12 45%, #020305 100%)",
      }}
    >
      {/* Completely dark, opaque intro background */}
      <div className="absolute inset-0 bg-[#020305]" />

      {/* Very subtle center glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(59,130,246,0.045) 30%, transparent 70%)",
          filter: "blur(30px)",
          animation: "scvDarkGlow 3s ease-in-out infinite",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 text-center">
        {/* 1. LOGO */}
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-full bg-white"
          style={{
            width: "clamp(105px, 17vw, 160px)",
            height: "clamp(105px, 17vw, 160px)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,.18), 0 0 35px rgba(255,255,255,.12), 0 0 90px rgba(59,130,246,.10)",
            animation:
              "scvLogoAppear 1.1s cubic-bezier(.16,1,.3,1) both",
          }}
        >
          <img
            src={logoSrc}
            alt="Shree Cable Vision Logo"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* 2. COMPANY NAME */}
        <div
          className="mt-8"
          style={{
            animation:
              "scvCompanyAppear 0.9s cubic-bezier(.16,1,.3,1) 0.65s both",
          }}
        >
          <h1
            className="font-display font-extrabold text-white"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              letterSpacing: "0.08em",
              textShadow: "0 0 25px rgba(255,255,255,.08)",
            }}
          >
            Shree Cable Vision
          </h1>

          <p
            className="mt-3 font-medium uppercase"
            style={{
              color: "rgba(255,255,255,.62)",
              fontSize: "clamp(.55rem, .9vw, .72rem)",
              letterSpacing: "0.32em",
            }}
          >
            High-Speed Internet &amp; Cable
          </p>
        </div>

        {/* 3. LOADING ANIMATION */}
        <div
          className="mt-14 w-full max-w-[320px]"
          style={{
            animation: "scvLoadingAppear .8s ease 1.15s both",
          }}
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span
              className="font-medium uppercase"
              style={{
                color: "rgba(255,255,255,.82)",
                fontSize: "10px",
                letterSpacing: "0.35em",
              }}
            >
              Loading
            </span>

            <span className="flex gap-1" aria-hidden="true">
              <span
                className="h-1.5 w-1.5 rounded-full bg-white"
                style={{ animation: "scvLoadingDot 1.2s infinite 0s" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-white"
                style={{ animation: "scvLoadingDot 1.2s infinite .2s" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-white"
                style={{ animation: "scvLoadingDot 1.2s infinite .4s" }}
              />
            </span>
          </div>

          <div
            className="h-[3px] w-full overflow-hidden rounded-full"
            style={{
              background: "rgba(255,255,255,.10)",
              boxShadow: "0 0 0 1px rgba(255,255,255,.04)",
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: "100%",
                transformOrigin: "left",
                background:
                  "linear-gradient(90deg, #ffffff 0%, #dbeafe 45%, #60a5fa 100%)",
                boxShadow: "0 0 14px rgba(147,197,253,.55)",
                animation:
                  "scvLoadingProgress 3.1s cubic-bezier(.65,0,.35,1) 1.45s both",
              }}
            />
          </div>

          <div
            className="mt-3"
            style={{
              color: "rgba(255,255,255,.38)",
              fontSize: "9px",
              letterSpacing: "0.18em",
            }}
          >
            CONNECTING YOU TO A BETTER DIGITAL WORLD
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scvLogoAppear {
          0% { opacity: 0; transform: scale(.45); filter: blur(14px); }
          60% { opacity: 1; transform: scale(1.06); filter: blur(0); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        @keyframes scvCompanyAppear {
          0% { opacity: 0; transform: translateY(22px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes scvLoadingAppear {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes scvLoadingProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        @keyframes scvLoadingDot {
          0%, 100% { opacity: .25; transform: translateY(0) scale(.75); }
          50% { opacity: 1; transform: translateY(-2px) scale(1.2); }
        }

        @keyframes scvDarkGlow {
          0%, 100% { opacity: .45; transform: translate(-50%, -50%) scale(.92); }
          50% { opacity: .8; transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();
  usePageLanguage();
  const [showIntro, setShowIntro] = useState(true);
  const completeIntro = useCallback(() => setShowIntro(false), []);

  return (
    <>
      <style>{`
        :root {
          --scv-blue: #1d6aff;
          --scv-cyan: #22d3ee;
          --scv-navy: #050d2e;
          --scv-ink: #07142f;
          --scv-glow: rgba(29,106,255,.32);
        }
        html { scroll-behavior: smooth; }
        body {
          overflow-x: hidden;
          background: #f6f9ff;
          color: var(--scv-ink);
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        ::selection { background: rgba(29,106,255,.28); color: #04112e; }
        ::-webkit-scrollbar { width: 9px; }
        ::-webkit-scrollbar-track { background: #07142f; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,#1d6aff,#22d3ee);
          border-radius: 999px;
          border: 2px solid #07142f;
        }
        .navbar-scrolled {
          background: rgba(3,10,31,.82) !important;
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          box-shadow: 0 10px 40px rgba(0,0,0,.20), inset 0 -1px rgba(96,165,250,.16);
        }
        .nav-link-active::after {
          content: "";
          position: absolute; left: 50%; bottom: 2px; width: 22px; height: 2px;
          transform: translateX(-50%); border-radius: 999px;
          background: linear-gradient(90deg,#1d6aff,#22d3ee);
          box-shadow: 0 0 12px rgba(34,211,238,.7);
          animation: navPulse 1.8s ease-in-out infinite;
        }
        .btn-gradient {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg,#1261ff 0%,#1d6aff 45%,#06b6d4 100%);
          box-shadow: 0 12px 30px rgba(29,106,255,.28), inset 0 1px rgba(255,255,255,.3);
          transition: transform .28s ease, box-shadow .28s ease, filter .28s ease;
        }
        .btn-gradient::before {
          content: ""; position: absolute; inset: -80% -20%;
          background: linear-gradient(100deg,transparent 35%,rgba(255,255,255,.34) 50%,transparent 65%);
          transform: translateX(-70%) rotate(8deg); animation: buttonShine 4.5s ease-in-out infinite;
        }
        .btn-gradient:hover { transform: translateY(-3px) scale(1.015); filter: brightness(1.08); box-shadow: 0 18px 42px rgba(29,106,255,.38), 0 0 28px rgba(34,211,238,.12); }
        .btn-outline-glow { transition: transform .28s ease, background .28s ease, box-shadow .28s ease, border-color .28s ease; }
        .btn-outline-glow:hover { transform: translateY(-3px); background: rgba(29,106,255,.13); border-color: #22d3ee !important; box-shadow: 0 0 28px rgba(29,106,255,.22); }
        .partner-card, .plan-card, .service-card, .achievement-card {
          transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease, border-color .35s ease;
          will-change: transform;
        }
        .partner-card:hover, .plan-card:hover, .service-card:hover, .achievement-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(29,106,255,.14), 0 0 0 1px rgba(29,106,255,.10);
        }
        .plan-card { position: relative; overflow: hidden; }
        .plan-card::after {
          content: ""; position: absolute; width: 180px; height: 180px; right: -90px; top: -90px;
          border-radius: 50%; background: radial-gradient(circle,rgba(34,211,238,.18),transparent 68%);
          pointer-events: none; transition: transform .45s ease;
        }
        .plan-card:hover::after { transform: scale(1.35); }
        .section-title-accent { position: relative; display: inline-block; }
        .section-title-accent::after {
          content: ""; position: absolute; left: 50%; bottom: -13px; width: 78px; height: 3px;
          transform: translateX(-50%); border-radius: 99px;
          background: linear-gradient(90deg,#1d6aff,#22d3ee,#1d6aff);
          background-size: 200% 100%; animation: gradientFlow 3s linear infinite;
          box-shadow: 0 0 18px rgba(34,211,238,.35);
        }
        .gradient-text {
          background: linear-gradient(90deg,#60a5fa,#22d3ee,#818cf8,#60a5fa);
          background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: gradientFlow 6s linear infinite;
        }
        .trusted-marquee-container, .marquee-container { mask-image: linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent); }
        .trusted-marquee-track, .marquee-track { width: max-content; will-change: transform; }
        .animate-trusted-marquee { animation: trustedMarquee 24s linear infinite; }
        .animate-marquee { animation: partnerMarquee 30s linear infinite; }
        .trusted-marquee-container:hover .animate-trusted-marquee, .marquee-container:hover .animate-marquee { animation-play-state: paused; }
        .blob { filter: blur(90px); opacity: .20; border-radius: 50%; position: absolute; pointer-events: none; mix-blend-mode: screen; }
        .hero-glow-orb { position: absolute; pointer-events: none; filter: blur(10px); }
        .animate-blob { animation: blobFloat 12s ease-in-out infinite; }
        .animate-blob2 { animation: blobFloat2 14s ease-in-out infinite; }
        .animate-blob3 { animation: blobFloat3 10s ease-in-out infinite; }
        .animate-fade-in-up { opacity: 1; animation: fadeUp .8s cubic-bezier(.2,.8,.2,1) both; }
        .hero-1 { animation-delay: .15s; } .hero-2 { animation-delay: .28s; } .hero-3 { animation-delay: .42s; } .hero-4 { animation-delay: .58s; } .hero-5 { animation-delay: .76s; }
        .animate-float { animation: gentleFloat 2.8s ease-in-out infinite; }
        .reveal, .reveal-left, .reveal-right, .reveal-scale {
          opacity: 1;
          transform: none;
          transition: opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1);
        }
        .reveal.visible, .reveal-left.visible, .reveal-right.visible, .reveal-scale.visible {
          opacity: 1;
          transform: none;
        }
        .stagger-1 { transition-delay: .08s; } .stagger-2 { transition-delay: .16s; } .stagger-3 { transition-delay: .24s; } .stagger-4 { transition-delay: .32s; }
        .counter-pop { display: inline-block; animation: counterPop .8s cubic-bezier(.2,.9,.25,1.15) both; text-shadow: 0 0 20px rgba(96,165,250,.2); }
        .mobile-menu-enter { animation: mobileDrop .3s cubic-bezier(.2,.8,.2,1) both; }
        section { scroll-margin-top: 72px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); filter:blur(4px); } to { opacity:1; transform:none; filter:blur(0); } }
        @keyframes counterPop { from { opacity:0; transform:translateY(12px) scale(.75); } 60% { opacity:1; transform:translateY(-2px) scale(1.08); } to { transform:none; } }
        @keyframes gentleFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-9px); } }
        @keyframes blobFloat { 0%,100% { transform:translate3d(0,0,0) scale(1); } 50% { transform:translate3d(70px,30px,0) scale(1.12); } }
        @keyframes blobFloat2 { 0%,100% { transform:translate3d(0,0,0) scale(1); } 50% { transform:translate3d(-55px,-35px,0) scale(1.1); } }
        @keyframes blobFloat3 { 0%,100% { transform:translate3d(0,0,0) scale(1); } 50% { transform:translate3d(-35px,50px,0) scale(1.18); } }
        @keyframes gradientFlow { to { background-position: 300% center; } }
        @keyframes buttonShine { 0%,55% { transform:translateX(-75%) rotate(8deg); } 80%,100% { transform:translateX(75%) rotate(8deg); } }
        @keyframes trustedMarquee { from { transform:translateX(0); } to { transform:translateX(-33.333%); } }
        @keyframes partnerMarquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes navPulse { 0%,100% { opacity:.7; transform:translateX(-50%) scaleX(1); } 50% { opacity:1; transform:translateX(-50%) scaleX(1.25); } }
        @keyframes mobileDrop { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:none; } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; transition-duration:.01ms !important; }
        }
      `}</style>
      {showIntro ? (
        <IntroSplash onComplete={completeIntro} />
      ) : (
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Hero />
            <Partners />
            <FreeNetworkSwitch />
            <Plans />
            <Achievements />
            <Services />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

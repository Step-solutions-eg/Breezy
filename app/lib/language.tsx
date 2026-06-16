"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "ar";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const textNodeOriginals = new WeakMap<Text, string>();

const translations: Record<string, string> = {
  "Home": "الرئيسية",
  "Our Story": "قصتنا",
  "Rooms": "الغرف",
  "Adventure Club": "نادي المغامرات",
  "Contact Us": "اتصل بنا",
  "Book Your Stay": "احجز إقامتك",
  "A hidden sanctuary in the heart of Siwa Oasis, where desert silence meets unparalleled luxury and timeless Egyptian hospitality.": "ملاذ خفي في قلب واحة سيوة، حيث يلتقي صمت الصحراء بالفخامة الهادئة وكرم الضيافة المصرية الأصيل.",
  "A hidden sanctuary in the heart of Siwa Oasis,": "ملاذ خفي في قلب واحة سيوة،",
  "where desert silence meets unparalleled luxury": "حيث يلتقي صمت الصحراء بفخامة لا تضاهى",
  "and timeless Egyptian hospitality.": "وضيافة مصرية خالدة.",
  "A Hidden Sanctuary in the Heart": "ملاذ خفي في قلب",
  "A Hidden Sanctuary": "ملاذ خفي",
  "in the Heart": "في قلب",
  "of Siwa": "سيوة",
  "Years of Siwan hospitality rooted in tradition and authentic desert warmth.": "سنوات من الضيافة السيوية المتجذرة في التقاليد ودفء الصحراء الأصيل.",
  "Acres of pristine oasis sanctuary surrounded by endless palm groves.": "أفدنة من ملاذ الواحة النقي تحيط بها بساتين النخيل الممتدة.",
  "Luxury rooms and private villas crafted for peace and total relaxation.": "غرف فاخرة وفيلات خاصة صممت للسكينة والاسترخاء الكامل.",
  "Tranquility guaranteed. Every guest leaves with a renewed sense of self.": "الهدوء مضمون. يغادر كل ضيف بإحساس متجدد بذاته.",
  "Nestled among ancient palm groves and golden dunes, Breezy Island offers a rare escape where timeless Egyptian hospitality meets understated luxury. Every detail is designed to help you disconnect, unwind, and rediscover the rhythm of a slower life.": "بين بساتين النخيل القديمة والكثبان الذهبية، يقدم Breezy Island هروباً نادراً حيث تلتقي الضيافة المصرية الخالدة بالفخامة الهادئة. صمم كل تفصيل ليساعدك على الانفصال والاسترخاء واكتشاف إيقاع حياة أبطأ.",
  "Our Retreats": "ملاذاتنا",
  "Palm Courtyard Suite": "جناح فناء النخيل",
  "Private Garden Suite": "جناح حديقة خاص",
  "Desert Vista Villa": "فيلا إطلالة الصحراء",
  "Panoramic Villa with Pool": "فيلا بانورامية مع مسبح",
  "Oasis Hideaway Room": "غرفة مخبأ الواحة",
  "Garden View Retreat": "ملاذ بإطلالة الحديقة",
  "Guests": "الضيوف",
  "Bathrooms": "الحمامات",
  "Sq Ft": "قدم مربع",
  "View Room": "عرض الغرفة",
  "Amenities & Experiences": "المرافق والتجارب",
  "Designed for Your": "مصمم من أجل",
  "Ultimate Comfort": "راحتك الكاملة",
  "Explore All Amenities": "استكشف كل المرافق",
  "Spa & Wellness": "السبا والعافية",
  "Traditional Siwan treatments, natural salt scrubs, and guided meditation beneath the desert sky.": "علاجات سيوية تقليدية، وتقشير بالملح الطبيعي، وتأمل موجه تحت سماء الصحراء.",
  "Desert Adventures": "مغامرات الصحراء",
  "Guided safaris across golden dunes, sunset camel treks, and stargazing in the Great Sand Sea.": "رحلات سفاري بين الكثبان الذهبية، وجولات جمال عند الغروب، وتأمل النجوم في بحر الرمال العظيم.",
  "Farm to Table Dining": "طعام من المزرعة إلى المائدة",
  "Fresh local ingredients, traditional Siwan recipes, and candlelit dinners under the palms.": "مكونات محلية طازجة، وصفات سيوية تقليدية، وعشاء على ضوء الشموع تحت النخيل.",
  "Cultural Immersion": "انغماس ثقافي",
  "Visit ancient temples, meet local artisans, and experience the rich heritage of Siwa.": "زر المعابد القديمة، وتعرف على الحرفيين المحليين، وعش تراث سيوة الغني.",
  "Our Rooms": "غرفنا",
  "Discover the": "اكتشف",
  "Perfect Room": "الغرفة المثالية",
  "Curated spaces designed for rest and wonder": "مساحات مختارة بعناية للراحة والدهشة",
  "each room tells its own story of comfort and style.": "كل غرفة تروي قصتها الخاصة من الراحة والأناقة.",
  "Honeymoon Room": "غرفة شهر العسل",
  "Premium Suite": "جناح فاخر",
  "The largest room in the hotel, designed for romance and relaxation.": "أكبر غرفة في الفندق، مصممة للرومانسية والاسترخاء.",
  "Balcony overlooking the lake": "شرفة تطل على البحيرة",
  "Bathroom with a jacuzzi": "حمام مع جاكوزي",
  "Traditional Arabic-style seating area": "جلسة عربية تقليدية",
  "Sedra Room": "غرفة سدرة",
  "Lake View": "إطلالة البحيرة",
  "A serene retreat with stunning views of the lake and landscaped gardens.": "ملاذ هادئ بإطلالات خلابة على البحيرة والحدائق.",
  "Views of landscaped gardens": "إطلالات على الحدائق المنسقة",
  "Salty Room": "الغرفة المالحة",
  "Unique Experience": "تجربة فريدة",
  "A one-of-a-kind room with walls made of salt for a truly unique stay.": "غرفة فريدة بجدران من الملح لإقامة مختلفة حقاً.",
  "Walls made of salt": "جدران مصنوعة من الملح",
  "Room Highlights": "مميزات الغرفة",
  "Amenities": "المرافق",
  "Hotel Features": "مميزات الفندق",
  "Mini bar": "ميني بار",
  "Air conditioning": "تكييف",
  "Iron": "مكواة",
  "Heater": "مدفأة",
  "Hair dryer": "مجفف شعر",
  "Free Wi-Fi": "واي فاي مجاني",
  "Room service": "خدمة الغرف",
  "Complimentary water, tea, and Nescafé": "مياه وشاي ونسكافيه مجاناً",
  "Bird garden": "حديقة الطيور",
  "Horse riding / horses available": "ركوب الخيل / خيول متاحة",
  "Boats, pedal boats, and kayaks": "قوارب وبدالات وكاياك",
  "Natural water swimming pool": "مسبح مياه طبيعية",
  "Parking area": "منطقة انتظار",
  "24-hour restaurant": "مطعم 24 ساعة",
  "Bazaar / gift shop": "بازار / متجر هدايا",
  "Poolside café (Pool Coffee)": "مقهى بجانب المسبح",
  "FAQ'S": "الأسئلة الشائعة",
  "Your Questions,": "أسئلتك،",
  "Answered": "مجاب عنها",
  "Everything you need to know about planning your perfect stay at Breezy Island.": "كل ما تحتاج معرفته لتخطيط إقامتك المثالية في Breezy Island.",
  "Contact Our Concierge": "تواصل مع الكونسيرج",
  "How do I get to Breezy Island?": "كيف أصل إلى Breezy Island؟",
  "Siwa Oasis is approximately a 7-hour drive from Cairo or a 4-hour drive from Marsa Matrouh. We can arrange private transfers or help coordinate your journey from either city.": "تقع واحة سيوة على بعد نحو 7 ساعات بالسيارة من القاهرة أو 4 ساعات من مرسى مطروح. يمكننا ترتيب انتقالات خاصة أو مساعدتك في تنسيق رحلتك من أي مدينة.",
  "What is the best time to visit Siwa?": "ما أفضل وقت لزيارة سيوة؟",
  "The ideal time is between October and April when temperatures are mild and pleasant. Winter months offer cool desert nights perfect for campfires and stargazing.": "أفضل وقت بين أكتوبر وأبريل عندما تكون الحرارة معتدلة ولطيفة. تمنحك أشهر الشتاء ليالي صحراوية باردة مثالية للنار وتأمل النجوم.",
  "Do you offer airport transfers?": "هل توفرون انتقالات من المطار؟",
  "Yes. We provide private airport transfers from Marsa Matrouh International Airport and can arrange pickup from Cairo or Alexandria upon request.": "نعم. نوفر انتقالات خاصة من مطار مرسى مطروح الدولي، ويمكن ترتيب الاستقبال من القاهرة أو الإسكندرية عند الطلب.",
  "What amenities are included in my stay?": "ما المرافق المشمولة في إقامتي؟",
  "Every stay includes daily breakfast, complimentary Wi-Fi, access to our spa facilities, guided property tours, and 24-hour concierge service.": "تشمل كل إقامة الإفطار اليومي، وواي فاي مجاني، واستخدام مرافق السبا، وجولات تعريفية، وخدمة كونسيرج على مدار الساعة.",
  "Is the hotel suitable for families?": "هل الفندق مناسب للعائلات؟",
  "Absolutely. We offer family-friendly suites, children's activities, and can arrange private excursions suitable for all ages.": "بالتأكيد. نوفر أجنحة مناسبة للعائلات، وأنشطة للأطفال، ويمكن ترتيب رحلات خاصة لكل الأعمار.",
  "What dining options are available?": "ما خيارات الطعام المتاحة؟",
  "Our restaurant serves authentic Siwan cuisine made from locally sourced ingredients. We also offer private dining experiences, cooking classes, and sunset dinners in the dunes.": "يقدم مطعمنا المطبخ السيوي الأصيل بمكونات محلية. كما نوفر تجارب طعام خاصة، ودروس طبخ، وعشاء عند الغروب بين الكثبان.",
  "Escape to Siwa. Book Your Stay Today.": "اهرب إلى سيوة. احجز إقامتك اليوم.",
  "Begin Your": "ابدأ",
  "Siwa Escape": "هروبك إلى سيوة",
  "Trade the noise for silence. Trade the city for the oasis. Your room under the stars, your days filled with discovery, your evenings wrapped in the warmth of Siwan hospitality.": "استبدل الضجيج بالصمت، والمدينة بالواحة. غرفتك تحت النجوم، وأيامك مليئة بالاكتشاف، وأمسياتك محاطة بدفء الضيافة السيوية.",
  "Join travelers who found peace in the heart of Siwa": "انضم إلى المسافرين الذين وجدوا السلام في قلب سيوة",
  "Begin Your Journey to Siwa": "ابدأ رحلتك إلى سيوة",
  "Journey": "رحلتك",
  "to Siwa": "إلى سيوة",
  "Ready to escape? Reach out and let us help you plan your perfect stay at Breezy Island.": "هل أنت مستعد للهروب؟ تواصل معنا ودعنا نساعدك في تخطيط إقامتك المثالية في Breezy Island.",
  "Email address": "البريد الإلكتروني",
  "Submit": "إرسال",
  "Navigate": "التنقل",
  "Retreats": "الملاذات",
  "Experiences": "التجارب",
  "Legals": "القانونيات",
  "Terms And Conditions": "الشروط والأحكام",
  "Privacy Policy": "سياسة الخصوصية",
  "Social": "التواصل",
  "Instagram": "إنستغرام",
  "Facebook": "فيسبوك",
  "Born from the": "وُلد من",
  "Born from the Silence": "وُلد من صمت",
  "Silence of": "صمت",
  "Siwa": "سيوة",
  "A journey that began with a single footprint in the sand and became a sanctuary for souls seeking stillness.": "رحلة بدأت بأثر قدم واحد في الرمال وتحولت إلى ملاذ للأرواح الباحثة عن السكون.",
  "A Vision Born": "رؤية وُلدت",
  "from the Desert": "من الصحراء",
  "The Beginning": "البداية",
  "A Vision": "رؤية",
  "Desert": "الصحراء",
  "Breezy Island was never meant to be a hotel. It began as a feeling — a quiet certainty that somewhere in the vast, ancient silence of Siwa, there was a place where the world could slow down.": "لم يكن Breezy Island مجرد فندق. بدأ كإحساس؛ يقين هادئ بأن في صمت سيوة الواسع والقديم مكاناً يستطيع العالم أن يبطئ فيه.",
  "Our founder first set foot in Siwa Oasis in 2018, drawn by stories of salt lakes older than the pyramids and a community that had lived in harmony with the desert for centuries. What they found was not just an oasis — it was a different dimension of time itself. Days moved slower. The air tasted cleaner. The stars felt closer.": "وصل مؤسسنا إلى واحة سيوة لأول مرة عام 2018، مدفوعاً بحكايات عن بحيرات ملح أقدم من الأهرامات ومجتمع عاش بتناغم مع الصحراء لقرون. ما وجده لم يكن مجرد واحة، بل بُعداً آخر للزمن نفسه. الأيام أبطأ، والهواء أنقى، والنجوم أقرب.",
  "The vision was simple: create a retreat that did not impose itself on the landscape but emerged from it. A place where luxury meant waking up to nothing but the sound of palm leaves, where every meal was a celebration of Siwan tradition, and where guests could rediscover the art of doing nothing at all.": "كانت الرؤية بسيطة: إنشاء ملاذ لا يفرض نفسه على المكان بل يخرج منه. مكان تعني فيه الفخامة أن تستيقظ على صوت سعف النخيل فقط، وتصبح كل وجبة احتفاءً بالتقاليد السيوية، ويعيد فيه الضيوف اكتشاف فن الهدوء.",
  "Our Philosophy": "فلسفتنا",
  "Four Pillars That": "أربعة أعمدة",
  "Define Everything": "تحدد كل شيء",
  "Four Pillars That Define": "أربعة أعمدة تحدد",
  "Everything We Do": "كل ما نقوم به",
  "We Do": "نقوم به",
  "Rooted in Place": "متجذر في المكان",
  "Every stone, every palm frond, every grain of sand belongs to Siwa. We build with the oasis, not on it — letting the landscape lead.": "كل حجر، وكل سعفة نخيل، وكل حبة رمل تنتمي إلى سيوة. نحن نبني مع الواحة لا فوقها، تاركين للمشهد أن يقودنا.",
  "Silence as Luxury": "الصمت كفخامة",
  "True luxury isn’t more — it’s less. Less noise, less rush, less distraction. We protect the quiet so you can hear yourself again.": "الفخامة الحقيقية ليست المزيد، بل القليل. ضجيج أقل، عجلة أقل، تشتت أقل. نحمي الهدوء كي تسمع نفسك من جديد.",
  "Handcrafted Hospitality": "ضيافة مصنوعة بعناية",
  "No formulas. No chains. Every experience is woven by local hands, guided by Siwan traditions passed down through generations.": "لا قوالب ولا سلاسل. كل تجربة تنسجها أيادٍ محلية وتوجهها تقاليد سيوية تناقلتها الأجيال.",
  "Timeless Over Trendy": "الخالد قبل الرائج",
  "We don’t chase seasons. Breezy Island is built for the long now — where quality outlives fashion and memory outlasts novelty.": "لا نطارد المواسم. بُني Breezy Island للمدى الطويل، حيث تعيش الجودة أطول من الموضة وتبقى الذكرى أكثر من الجدة.",
  "Our Journey": "رحلتنا",
  "From Dream": "من الحلم",
  "to Destination": "إلى الوجهة",
  "The Discovery": "الاكتشاف",
  "A chance journey into the heart of Siwa revealed an untouched paradise hidden among ancient palm groves.": "كشفت رحلة عابرة إلى قلب سيوة عن جنة لم تمس، مخبأة بين بساتين نخيل قديمة.",
  "The Vision": "الرؤية",
  "The dream took shape — a retreat that honored Siwa’s heritage while offering the world a new standard of desert luxury.": "بدأ الحلم يتشكل: ملاذ يكرم تراث سيوة ويقدم للعالم معياراً جديداً لفخامة الصحراء.",
  "Ground Broken": "بداية البناء",
  "Construction began with a promise: every material sourced locally, every design decision made with the oasis in mind.": "بدأ البناء بوعد: كل مادة من مصادر محلية، وكل قرار تصميمي يضع الواحة في القلب.",
  "First Guests": "أول الضيوف",
  "Breezy Island opened its doors. The first travelers arrived seeking escape — they found transformation.": "فتح Breezy Island أبوابه. وصل أول المسافرين بحثاً عن الهروب، فوجدوا تحولاً.",
  "A New Chapter": "فصل جديد",
  "Expanded villas, deeper partnerships with Siwan artisans, and a growing family of returning guests who call this place home.": "فيلات أوسع، وشراكات أعمق مع حرفيي سيوة، وعائلة متنامية من الضيوف العائدين الذين يعتبرون المكان بيتاً.",
  "Design Ethos": "روح التصميم",
  "Built with": "بُني",
  "Intention,": "بنية،",
  "Built with Intention,": "بُني بنية،",
  "Designed for Stillness": "مصمم للسكون",
  "Designed for": "وصمم من أجل",
  "Stillness": "السكون",
  "Every corner of Breezy Island is the result of deliberate choice. We worked with Siwan artisans, local builders, and master craftspeople who have been shaping this landscape for generations.": "كل زاوية في Breezy Island نتيجة اختيار مقصود. عملنا مع حرفيين وبنائين محليين وأصحاب مهارة يشكلون هذا المشهد منذ أجيال.",
  "The result is a place that feels less like a resort and more like a return — to what matters, to what lasts, to the quiet rhythm of life that the desert has always known.": "النتيجة مكان لا يشبه المنتجع بقدر ما يشبه العودة؛ إلى ما يهم، وما يدوم، وإلى إيقاع الحياة الهادئ الذي عرفته الصحراء دائماً.",
  "Experience Breezy Island": "اختبر Breezy Island",
  "Your Story Awaits": "قصتك تنتظرك",
  "Every Great Story": "كل قصة عظيمة",
  "Every Great Story Begins": "كل قصة عظيمة تبدأ",
  "with a Single Step": "بخطوة واحدة",
  "Begins with a": "تبدأ",
  "with a": "ب",
  "Single Step": "خطوة واحدة",
  "Come write your chapter in the heart of Siwa. The desert is waiting, and the stars are already aligned.": "تعال واكتب فصلك في قلب سيوة. الصحراء تنتظر، والنجوم مصطفة بالفعل.",
  "Where You": "حيث",
  "Stay": "تقيم",
  "Four distinct sanctuaries, each crafted to frame the silence and beauty of Siwa in its own way.": "أربعة ملاذات مميزة، صمم كل منها ليؤطر صمت سيوة وجمالها بطريقته الخاصة.",
  "Suites": "الأجنحة",
  "Villas": "الفيلات",
  "Garden-Level Sanctuary": "ملاذ على مستوى الحديقة",
  "Wake to the rustle of palm fronds and the soft glow of Siwan light filtering through private courtyard doors. This ground-floor suite opens onto a walled garden with its own plunge pool and hand-laid mosaic terrace.": "استيقظ على حفيف النخيل وضوء سيوة الناعم المتسلل من أبواب الفناء الخاص. يفتح هذا الجناح الأرضي على حديقة محاطة بسور مع مسبح غطس خاص وتراس فسيفساء.",
  "1,200 sq ft": "١٢٠٠ قدم مربع",
  "Private Plunge Pool": "مسبح غطس خاص",
  "Mosaic Terrace": "تراس فسيفساء",
  "Outdoor Shower": "دش خارجي",
  "Handwoven Siwan Textiles": "منسوجات سيوية يدوية",
  "Courtyard Garden": "حديقة فناء",
  "Panoramic Dune Views": "إطلالات بانورامية على الكثبان",
  "Perched at the edge of the oasis, this sprawling villa commands an uninterrupted view of the Great Sand Sea. Floor-to-ceiling glass blurs the line between indoors and the golden horizon beyond.": "على حافة الواحة، تطل هذه الفيلا الواسعة على بحر الرمال العظيم بلا انقطاع. زجاج ممتد من الأرض إلى السقف يمحو الحد بين الداخل والأفق الذهبي.",
  "2,400 sq ft": "٢٤٠٠ قدم مربع",
  "Private Infinity Pool": "مسبح لا نهائي خاص",
  "Rooftop Terrace": "تراس علوي",
  "Outdoor Lounge": "جلسة خارجية",
  "Butler Service": "خدمة بتلر",
  "Sunset Viewing Deck": "منصة مشاهدة الغروب",
  "Intimate Garden Retreat": "ملاذ حديقة حميم",
  "A cocoon of calm tucked among ancient olive trees. Minimalist design meets Siwan craftsmanship — raw linen, plaster walls, and a private corner of the garden where only the birds interrupt your stillness.": "شرنقة من الهدوء بين أشجار زيتون قديمة. تصميم بسيط يلتقي بحرفية سيوية؛ كتان طبيعي، جدران جصية، وركن خاص في الحديقة لا يقطع سكونه إلا الطيور.",
  "550 sq ft": "٥٥٠ قدم مربع",
  "Garden Access": "وصول إلى الحديقة",
  "Rainfall Shower": "دش مطري",
  "Handmade Bath Products": "منتجات استحمام يدوية",
  "Private Seating Nook": "ركن جلوس خاص",
  "Olive Grove Views": "إطلالات على بستان الزيتون",
  "Salt Lake Penthouse": "بنتهاوس بحيرة الملح",
  "Rooftop Panorama Suite": "جناح بانورامي علوي",
  "The crown of Breezy Island. This top-floor sanctuary surveys the entire oasis — from the salt lakes to the dunes to the distant temple of Amun. A private rooftop pool and pergola-shaded lounge make it the ultimate escape.": "تاج Breezy Island. يطل هذا الملاذ العلوي على الواحة كلها؛ من بحيرات الملح إلى الكثبان ومعبد آمون البعيد. مسبح علوي خاص وجلسة مظللة تجعله الهروب الأجمل.",
  "1,800 sq ft": "١٨٠٠ قدم مربع",
  "Rooftop Infinity Pool": "مسبح علوي لا نهائي",
  "Pergola Lounge": "جلسة برغولا",
  "Panoramic Views": "إطلالات بانورامية",
  "Wine Cellar": "قبو مشروبات",
  "Private Chef Option": "خيار طاهٍ خاص",
  "Size": "المساحة",
  "Up to": "حتى",
  "Your Escape": "هروبك",
  "Find Your": "اعثر على",
  "Sanctuary": "ملاذك",
  "Each room tells a different story of Siwa. The question is not which is best — it is which one calls to you.": "كل غرفة تروي قصة مختلفة عن سيوة. السؤال ليس أيها الأفضل، بل أيها يناديك.",
  "Book Your Room": "احجز غرفتك",
  "The Siwa Travel Club": "نادي سفر سيوة",
  "Adventure": "المغامرة",
  "Club": "النادي",
  "More than a travel experience — a gateway into the raw beauty, culture, and spirit of Siwa Oasis.": "أكثر من تجربة سفر؛ بوابة إلى جمال واحة سيوة الخام وثقافتها وروحها.",
  "The Experience": "التجربة",
  "Gateway to": "بوابة إلى",
  "Gateway to the": "بوابة إلى",
  "Raw Spirit of Siwa": "روح سيوة الخام",
  "the Raw Spirit": "الروح الخام",
  "The Siwa Travel Club creates curated travel experiences inside Siwa Oasis through organized programs, adventure activities, and boutique hospitality partnerships. Simple, modern, and community-driven — making travelers feel part of an exclusive adventure club rather than traditional tourism.": "ينشئ نادي سفر سيوة تجارب مختارة داخل الواحة عبر برامج منظمة وأنشطة مغامرة وشراكات ضيافة بوتيكية. بسيط وحديث ومبني على المجتمع، ليشعر المسافرون أنهم جزء من نادي مغامرات خاص لا من سياحة تقليدية.",
  "Discover": "اكتشف",
  "Upcoming Trips": "رحلات قادمة",
  "Curated journeys to Siwa each season": "رحلات مختارة إلى سيوة في كل موسم",
  "Adventure Programs": "برامج مغامرة",
  "Dune bashing, trekking, sandboarding": "تطعيس، ومشي جبلي، وتزلج على الرمال",
  "Accommodations": "الإقامات",
  "Boutique stays beneath the desert stars": "إقامات بوتيكية تحت نجوم الصحراء",
  "Activities": "الأنشطة",
  "Salt lakes, ancient temples, desert sports": "بحيرات ملح ومعابد قديمة ورياضات صحراوية",
  "Seasonal Experiences": "تجارب موسمية",
  "Harvest festivals, spring blossom trails": "مهرجانات حصاد ومسارات زهور الربيع",
  "Wellness Retreats": "ملاذات العافية",
  "Yoga, meditation, traditional Siwan treatments": "يوغا وتأمل وعلاجات سيوية تقليدية",
  "Desert Events": "فعاليات الصحراء",
  "Stargazing dinners under the Great Sand Sea": "عشاء تأمل النجوم تحت بحر الرمال العظيم",
  "Travelers can explore a wide range of curated offerings — from upcoming group trips and private adventures to wellness retreats and exclusive desert events beneath the Siwan sky.": "يمكن للمسافرين استكشاف باقة واسعة من التجارب المختارة؛ من رحلات جماعية ومغامرات خاصة إلى ملاذات العافية وفعاليات صحراوية حصرية تحت سماء سيوة.",
  "Choose": "اختر",
  "A Program": "برنامجاً",
  "Guests can select from journeys that match their rhythm. Each program includes duration, activities, accommodation, transportation, pricing, trip mood, and difficulty level.": "يمكن للضيوف اختيار رحلات تناسب إيقاعهم. يشمل كل برنامج المدة والأنشطة والإقامة والانتقالات والتسعير ومزاج الرحلة ومستوى الصعوبة.",
  "Weekend Escapes": "هروب نهاية الأسبوع",
  "2-3 Days": "٢-٣ أيام",
  "Easy": "سهل",
  "Relaxed": "هادئ",
  "Quick yet immersive getaways into Siwa's palm-fringed tranquility. Perfect for a fast reset.": "هروب سريع وغامر إلى هدوء سيوة المحاط بالنخيل. مثالي لإعادة ضبط سريعة.",
  "Oasis Walks": "مشي في الواحة",
  "Salt Lake Swim": "سباحة في بحيرة الملح",
  "Sunset Meditation": "تأمل الغروب",
  "Local Cuisine": "مطبخ محلي",
  "Group Expeditions": "رحلات جماعية",
  "5-7 Days": "٥-٧ أيام",
  "Moderate": "متوسط",
  "Travel with a community of like-minded explorers uncovering Siwa's hidden corners together.": "سافر مع مجتمع من المستكشفين المتشابهين لاكتشاف زوايا سيوة الخفية معاً.",
  "Desert Safaris": "سفاري الصحراء",
  "Temple Tours": "جولات المعابد",
  "Campfire Stories": "حكايات حول النار",
  "Group Dining": "طعام جماعي",
  "Private Experiences": "تجارب خاصة",
  "Custom": "مخصص",
  "Any": "أي مستوى",
  "Intimate": "حميم",
  "Fully tailored journeys designed around your rhythm, interests, and dreams of the oasis.": "رحلات مصممة بالكامل حول إيقاعك واهتماماتك وأحلامك عن الواحة.",
  "Private Guide": "مرشد خاص",
  "Bespoke Dining": "طعام حسب الطلب",
  "Sunset Camel Ride": "ركوب جمال عند الغروب",
  "Photography Tour": "جولة تصوير",
  "Luxury Retreats": "ملاذات فاخرة",
  "7-10 Days": "٧-١٠ أيام",
  "Indulgent": "مترف",
  "Uncompromising luxury set against the raw, haunting beauty of the Great Sand Sea.": "فخامة بلا تنازل أمام جمال بحر الرمال العظيم الخام والآسر.",
  "Spa Treatments": "علاجات السبا",
  "Private Pool": "مسبح خاص",
  "Gourmet Dining": "طعام فاخر",
  "Stargazing": "تأمل النجوم",
  "Adventure Packages": "باقات المغامرة",
  "4-6 Days": "٤-٦ أيام",
  "Challenging": "مليء بالتحدي",
  "Thrilling": "مثير",
  "Push your limits across dunes, mountains, and ancient salt lakes carved by time.": "اختبر حدودك بين الكثبان والجبال وبحيرات الملح القديمة التي نحتها الزمن.",
  "Dune Bashing": "تطعيس",
  "Mountain Trek": "مشي جبلي",
  "Sandboarding": "تزلج على الرمال",
  "Survival Skills": "مهارات البقاء",
  "Custom Itineraries": "برامج مخصصة",
  "Flexible": "مرن",
  "Personalized": "شخصي",
  "Dream it, and we will build it. Every detail crafted around your vision of Siwa.": "احلم بها وسنبنيها. كل تفصيل يصاغ حول رؤيتك لسيوة.",
  "Full Customization": "تخصيص كامل",
  "Expert Planning": "تخطيط خبير",
  "Personal Concierge": "كونسيرج شخصي",
  "24/7 Support": "دعم ٢٤/٧",
  "Ready to": "هل أنت مستعد",
  "Join the Club?": "للانضمام إلى النادي؟",
  "Whether you seek solitude, adventure, or connection — there is a journey waiting for you in Siwa.": "سواء كنت تبحث عن العزلة أو المغامرة أو التواصل، هناك رحلة تنتظرك في سيوة.",
  "Explore Programs": "استكشف البرامج",
  "Let us plan": "دعنا نخطط",
  "your escape.": "لهروبك.",
  "Tell us when you want to arrive, who is coming, and what kind of stay you imagine. We will reply with the next simple step.": "أخبرنا متى تريد الوصول، ومن سيرافقك، ونوع الإقامة التي تتخيلها. سنرد عليك بالخطوة التالية ببساطة.",
  "Direct Lines": "طرق التواصل",
  "Quiet details, answered clearly.": "تفاصيل هادئة، وإجابات واضحة.",
  "Reservations": "الحجوزات",
  "WhatsApp": "واتساب",
  "Location": "الموقع",
  "Siwa Oasis, Matrouh, Egypt": "واحة سيوة، مطروح، مصر",
  "Name": "الاسم",
  "Email": "البريد الإلكتروني",
  "Arrival": "الوصول",
  "Message": "الرسالة",
  "Your name": "اسمك",
  "Preferred dates": "التواريخ المفضلة",
  "2 guests": "ضيفان",
  "Tell us what you want your stay to feel like.": "أخبرنا كيف تريد أن تشعر إقامتك.",
  "Send Request": "إرسال الطلب",
  "Close": "إغلاق",
  "Open menu": "فتح القائمة",
  "Close menu": "إغلاق القائمة",
  "Previous project": "العنصر السابق",
  "Next project": "العنصر التالي",
  "Breezy Island": "Breezy Island",
  "Breezy": "Breezy",
  "Island": "Island",
  "your@email.com": "you@email.com",
};

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function translateText(value: string, language: Language) {
  if (language === "en") return value;
  return translations[normalizeText(value)] ?? value;
}

function translateTree(root: ParentNode, language: Language) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (!normalizeText(node.nodeValue ?? "")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  textNodes.forEach((node) => {
    const original = textNodeOriginals.get(node) ?? node.nodeValue ?? "";
    if (!textNodeOriginals.has(node)) textNodeOriginals.set(node, original);
    const nextValue = language === "en" ? original : translateText(original, language);
    if (node.nodeValue !== nextValue) {
      node.nodeValue = nextValue;
    }
  });

  const attributeNames = ["placeholder", "aria-label", "title"];
  attributeNames.forEach((attributeName) => {
    root.querySelectorAll?.(`[${attributeName}]`).forEach((element) => {
      const key = `i18nOriginal${attributeName.replace(/(^|-)([a-z])/g, (_, __, char) => char.toUpperCase())}`;
      const htmlElement = element as HTMLElement;
      const original =
        htmlElement.dataset[key] ?? element.getAttribute(attributeName) ?? "";
      htmlElement.dataset[key] = original;
      const nextValue = language === "en" ? original : translateText(original, language);
      if (element.getAttribute(attributeName) !== nextValue) {
        element.setAttribute(attributeName, nextValue);
      }
    });
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("breezy-language");
    if (stored === "ar" || stored === "en") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("breezy-language", nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "ar" : "en");
  }, [language, setLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    translateTree(document.body, language);

    const observer = new MutationObserver(() => {
      translateTree(document.body, language);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title"],
    });

    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

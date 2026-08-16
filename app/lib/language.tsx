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
const textNodeWritten = new WeakMap<Text, string>();
const attributeOriginals = new WeakMap<Element, Record<string, string>>();
const attributeWritten = new WeakMap<Element, Record<string, string>>();

const translations: Record<string, string> = {
  "Home": "الرئيسية",
  "Our Story": "قصتنا",
  "Rooms": "الغرف",
  "Adventure Club": "نادي المغامرات",
  "Contact Us": "اتصل بنا",
  "Book Your Stay": "احجز إقامتك",
  "A hidden sanctuary in the heart of Siwa Oasis, where desert silence meets unparalleled luxury and timeless Egyptian hospitality.": "ملاذ خفي في قلب واحة سيوة، حيث يلتقي صمت الصحراء بالفخامة الهادئة وكرم الضيافة المصرية الأصيل.",
  "The tranquility and magic of nature": "الهدوء وسحر الطبيعة",
  "in Siwa Oasis.": "بواحة سيوه.",
  "An island surrounded by water, where warm sunsets meet the stillness of nature, you’ll find a place designed to give you the comfort you’ve been looking for.": "جزيرة تحيط بها المياه، بين دفء الغروب وسكون الطبيعة، تجد مساحة صُممت لتمنحك الراحة التي تبحث عنها.",
  "Luxurious rooms, peaceful surroundings, and a stay that feels like home… not a hotel.": "غرف فاخرة، أجواء هادئة، وإقامة تشعرك بأنك في منزلك… لا في فندق.",
  "Leave the world behind and let Breezy Island give you time for yourself.": "اترك العالم خلفك، ودَع جزيرة بريزي تمنحك وقتًا لنفسك.",
  "A Hidden Sanctuary in the Heart": "ملاذ خفي في قلب",
  "of Siwa": "سيوة",
  "Siwa in its spirit…": "سيوة بروحها…",
  "and Breezy in its details": "وبريزي بتفاصيلها",
  "In the heart of Siwa’s western lake, where the waters stretch calmly between golden sand dunes, a different story begins.": "في قلب بحيرة سيوة الغربية، حيث تمتد المياه بهدوء بين كثبان الرمال الذهبية، تبدأ حكاية مختلفة.",
  "As the sun sets, the sky’s colors reflect on the lake’s waters, and as the moon rises from behind the dunes, the island becomes an unforgettable scene.": "مع غروب الشمس، تنعكس ألوان السماء على مياه البحيرة، ومع شروق القمر من خلف الكثبان، تصبح الجزيرة مشهدًا لا يُنسى.",
  "And in this enchanting place, we discovered": "وفي هذا المكان الساحر، اكتشفنا",
  "; a space that blends the stillness of nature with the spirit of Siwa, where time passes slowly, and every moment becomes a story.": "؛ مساحة تجمع بين سكون الطبيعة وروح سيوة، حيث يمر الوقت ببطء، وتصبح لكل لحظة حكاية.",
  "Here, you don’t come to simply step away from the world… you come to discover a beauty you didn’t know you were looking for.": "هنا، لا تأتي لتبتعد عن العالم فحسب… بل تأتي لتكتشف جمالًا لم تكن تعرف أنك تبحث عنه.",
  "years of hospitality": "سنوات من الضيافة",
  "m²": "م²",
  "rooms": "غرفة",
  "Guests": "الضيوف",
  "Bathrooms": "الحمامات",
  "View Rooms": "عرض الغرف",
  "Amenities & Experiences": "المرافق والتجارب",
  "Designed for Your": "مصمم من أجل",
  "Ultimate Comfort": "راحتك الكاملة",
  "Swimming Pool": "مسبح مياه طبيعية",
  "Restaurant 24/7": "مطعم 24 ساعة",
  "Café": "كافيه",
  "Bar": "بار",
  "Breakfast": "إفطار",
  "Beach Volleyball": "كرة طائرة شاطئية",
  "Room Service": "خدمة الغرف",
  "Wi-Fi": "واي فاي",
  "Parking": "موقف سيارات",
  "Reception": "استقبال",
  "Garden — Swings, Bird Garden, Photo Spot & Flower Garden": "حديقة — مراجيح وحديقة طيور ولوكيشن تصوير وحديقة أزهار",
  "Swimming Lake": "بحيرة السباحة",
  "Laundry": "غسيل ملابس",
  "Water Sports — Kayak, Pedal Boats, Boat Trips & Car Lake": "رياضات مائية — كاياك وبدالات ورحلات قوارب وبحيرة سيارات",
  "Beach Buggy": "عربيات شاطئ",
  "Camels & Horses": "جمال وخيول",
  "Airport Transportation": "انتقالات المطار",
  "Ask Reception": "اسأل الاستقبال",
  "Restaurant & Transportation": "المطعم والمواصلات",
  "Crafted in Olive Wood,": "مصنوع من خشب الزيتون،",
  "Bound for Anywhere.": "وإلى أي مكان.",
  "Restaurant": "المطعم",
  "Transportation": "المواصلات",
  "Indoor": "داخلي",
  "Outdoor": "خارجي",
  "Set + Open": "منيو ثابت + مفتوح",
  "Lunch by Order": "الغداء بالطلب",
  "Dinner by Order": "العشاء بالطلب",
  "Crafted from olive wood": "مصنوع من خشب الزيتون",
  "To the City": "إلى المدينة",
  "From the Airport": "من المطار",
  "To Any Place": "إلى أي مكان آخر",
  "Resort Policies": "سياسات المنتجع",
  "Check-in": "تسجيل الوصول",
  "Check-out": "تسجيل المغادرة",
  "11 AM — late checkout available": "11 صباحًا — تأجيل المغادرة متاح",
  "Children": "الأطفال",
  "6–10 free, max 1 · 11+ counted as adult": "6–10 مجانًا، حد أقصى 1 · 11 فأكثر يُحسب كبالغ",
  "Pets": "الحيوانات الأليفة",
  "Not allowed": "غير مسموح بها",
  "Our Rooms": "غرفنا",
  "Discover the": "اكتشف",
  "Perfect Room": "الغرفة المثالية",
  "Curated spaces designed for rest and wonder": "مساحات مختارة بعناية للراحة والدهشة",
  "each room tells its own story of comfort and style.": "كل غرفة تروي قصتها الخاصة من الراحة والأناقة.",
  "Standard Room": "الغرفة القياسية",
  "Classic": "كلاسيكية",
  "A calm, essential retreat — a king bed (160cm) or twin beds (120cm), and 32 square meters of simple, quiet comfort.": "ملاذ هادئ وأساسي — سرير كينج (160 سم) أو سرير توأم (120 سم)، و32 مترًا مربعًا من الراحة البسيطة والهادئة.",
  "King bed 160cm or twin bed 120cm": "سرير كينج 160 سم أو سرير توأم 120 سم",
  "Room space 8×4 = 32 m²": "مساحة الغرفة 8×4 = 32 م²",
  "A one-of-a-kind stay inside walls of natural salt, with a hammock on the balcony, wool curtains, and a view over the pool.": "إقامة فريدة داخل جدران من الملح الطبيعي، مع أرجوحة في الشرفة وستائر صوف وإطلالة على المسبح.",
  "Salt walls": "حيطان ملح",
  "Hammock on the balcony": "أرجوحة في الشرفة",
  "Wool curtains": "ستائر صوف",
  "Pool view": "إطلالة على المسبح",
  "Cedra & Honeymoon Rooms": "غرف سدرة وشهر العسل",
  "In the Heart of the Lake": "في قلب البحيرة",
  "Built at the heart of the lake, with a jacuzzi facing the water, a two-meter bed, a hammock on the balcony, an Arabic seating corner, and evenings made for two — forty square meters of pure stillness.": "مبنية في قلب البحيرة، مع جاكوزي يطل على الماء، وسرير بطول مترين، وأرجوحة في الشرفة، وركن جلسة عربية، وأمسيات مصممة لشخصين — أربعون مترًا مربعًا من السكون الخالص.",
  "In the heart of the lake": "في قلب البحيرة",
  "Jacuzzi overlooking the view": "جاكوزي على الفيو",
  "Two-meter bed": "سرير 2 متر",
  "Room space 8×5 = 40 m²": "مساحة الغرفة 8×5 = 40 م²",
  "Arabic seating area": "جلسة عربية",
  "Lake View": "إطلالة البحيرة",
  "Balcony": "شرفة",
  "Salty Room": "الغرفة المالحة",
  "Unique Experience": "تجربة فريدة",
  "32 m²": "32 م²",
  "40 m²": "40 م²",
  "Room Highlights": "مميزات الغرفة",
  "Amenities": "المرافق",
  "Hotel Features": "مميزات الفندق",
  "Lake view": "إطلالة البحيرة",
  "With balcony": "مع شرفة",
  "Air conditioning": "تكييف",
  "Heating": "تدفئة",
  "Free Wi-Fi": "واي فاي مجاني",
  "TV": "تلفاز",
  "Fire alarm": "إنذار حريق",
  "Mini bar": "ميني بار",
  "Hair dryer": "مجفف شعر",
  "Towels": "مناشف",
  "Kettle": "غلاية",
  "Fan": "مروحة",
  "Air freshener": "معطر جو",
  "Iron": "مكواة",
  "Mosquito device": "جهاز ناموس",
  "Wardrobe": "دولاب",
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
  "From a Dream": "من حلمٍ",
  "to an Extraordinary Destination": "إلى وجهةٍ استثنائية",
  "The Beginning": "البداية",
  "The story began with a dream — to create in Siwa a different hospitality experience, one that respects the spirit of the place, preserves its authenticity, and gives the guest a new meaning of luxury hospitality.": "بدأت الحكاية بحلم… أن نصنع في سيوة تجربة فندقية مختلفة، تحترم روح المكان وتحافظ على أصالته، وتمنح الضيف معنى جديداً للضيافة الفاخرة.",
  "And from Siwa’s enchanting nature, its ancient heritage, and the calm of its lake, this dream began to turn into reality.": "ومن بين طبيعة سيوة الساحرة، وتراثها العريق، وهدوء بحيرتها، بدأ هذا الحلم يتحول إلى واقع.",
  "We did not want to build just another hotel — we wanted to create a destination with personality and soul; a place that combines quiet luxury, the beauty of nature, and the warmth of Siwan hospitality.": "لم نرد أن نبني فندقاً آخر، بل أن نصنع وجهة لها شخصية وروح؛ مكاناً يجمع بين الفخامة الهادئة، وجمال الطبيعة، ودفء الضيافة السيوية.",
  "And so": "وهكذا",
  "was born… an extraordinary destination in the heart of Siwa, designed to give you an experience like no other.": "وُلدت… وجهة استثنائية في قلب سيوة، صُممت لتمنحك تجربة لا تشبه غيرها.",
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
  "A passing journey to the heart of Siwa revealed an untouched paradise, hidden between the lake and the sand dunes.": "كشفت رحلة عابرة إلى قلب سيوة عن جنة لم تمس، مخبأة بين البحيرة وكثبان الرمال.",
  "The Vision": "الرؤية",
  "The dream began to take shape: rewriting the map of Siwa’s hospitality.": "بدأ الحلم يتشكل: بتغيير خارطة طريق سيوة في الضيافة.",
  "The Struggle": "بداية البناء",
  "Construction began with a promise: every material eco-friendly and natural, and every design decision puts the oasis at the heart.": "بدأ البناء بوعد: كل مادة من خامات بنائية بيئية، وكل قرار تصميمي يضع الواحة في القلب.",
  "Breezy Is Born": "فصل جديد",
  "More rooms, finer hotel hospitality, distinctive views, and more services.": "غرف أكثر، وضيافة فندقية أفخم، وإطلالات مميزة، وخدمات أكثر.",
  "The Transformation": "التحول",
  "The oasis began to transform into a place of quiet luxury — walls of kershef, doors of olive wood, every detail shaped by Siwan hands.": "بدأت الواحة تتحول إلى مكانٍ من الفخامة الهادئة؛ جدران من الكرشيف، وأبواب من خشب الزيتون، وكل تفصيلة تشكلها أيادٍ سيوية.",
  "The Dream": "الرؤية",
  "The vision is simple: for Siwa to become, in the eyes of the world… God’s paradise on earth.": "الرؤية بسيطة: أن تصبح سيوة في أعين العالم… جنة الله على الأرض.",
  "Founder Story": "قصة المؤسس",
  "to Reality": "إلى الواقع",
  "Mustafa Youssef Shali": "مصطفى يوسف شالي",
  "Discovered the place in 2019": "اكتشف المكان في 2019",
  "Egyptian Amazigh businessman": "رجل أعمال مصري أمازيغي",
  "In 2019,": "في عام 2019،",
  "discovered this place, and from the very first moment he felt he belonged to it. Before the meeting of the lake, the mountains, the sand, and the sunset, a dream was born: to turn this extraordinary place into a hospitality experience that carries the spirit of Siwa and offers luxury hospitality to a different standard.": "اكتشف هذا المكان، ومن اللحظة الأولى شعر أنه ينتمي إليه. أمام اجتماع البحيرة والجبال والرمال والغروب، وُلد حلم تحويل هذا المكان الاستثنائي إلى تجربة فندقية تحمل روح سيوة وتقدم ضيافة فاخرة بمعايير مختلفة.",
  "The goal was for the guest to live": "كان الهدف أن يعيش الضيف",
  "the calm of Siwa, its culture, and its nature": "هدوء سيوة، ثقافتها، وطبيعتها",
  ", through a luxury that respects the identity of the place — using natural Siwan materials such as kershef, olive wood, and salt, alongside Siwan embroidery and cuisine.": "، من خلال فخامة تحترم هوية المكان؛ باستخدام خامات سيوية طبيعية مثل الكرشيف وخشب الزيتون والملح، إلى جانب التطريز والمطبخ السيوي.",
  "The road was not easy. Many saw the idea as impossible, but faith in the dream turned the impossible into reality.": "لم يكن الطريق سهلاً. كثيرون رأوا الفكرة مستحيلة، لكن الإيمان بالحلم حوّل المستحيل إلى واقع.",
  "In 2026,": "في عام 2026،",
  "was born; an island that gathers the beauty of the lake, the magic of the sunset, the mountains, and the dunes — the beginning of a bigger dream: building a hospitality brand that carries the spirit of Siwa to the world.": "وُلدت؛ جزيرة تجمع جمال البحيرة وسحر الغروب والجبال والكثبان، لتكون بداية حلم أكبر: بناء علامة فندقية تحمل روح سيوة إلى العالم.",
  "And the vision is simple: for Siwa to become, in the eyes of the world… God’s paradise on earth.": "والرؤية بسيطة: أن تصبح سيوة في أعين العالم… جنة الله على الأرض.",
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
  "Phone": "الهاتف",
  "WhatsApp": "واتساب",
  "Chat on WhatsApp": "تواصل عبر واتساب",
  "Find Us": "موقعنا",
  "Open in Google Maps": "افتح في خرائط جوجل",
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
  "Previous image": "الصورة السابقة",
  "Next image": "الصورة التالية",
  "Breezy Island": "جزيرة بريزي",
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
    const current = node.nodeValue ?? "";
    if (textNodeWritten.get(node) !== current) {
      textNodeOriginals.set(node, current);
    }
    const original = textNodeOriginals.get(node) ?? current;
    const nextValue = language === "en" ? original : translateText(original, language);
    if (node.nodeValue !== nextValue) {
      node.nodeValue = nextValue;
      textNodeWritten.set(node, nextValue);
    }
  });

  const attributeNames = ["placeholder", "aria-label", "title"];
  attributeNames.forEach((attributeName) => {
    root.querySelectorAll?.(`[${attributeName}]`).forEach((element) => {
      const current = element.getAttribute(attributeName) ?? "";
      const written = attributeWritten.get(element)?.[attributeName];
      let originals = attributeOriginals.get(element);
      if (!originals) {
        originals = {};
        attributeOriginals.set(element, originals);
      }
      if (written !== current) {
        originals[attributeName] = current;
      }
      const original = originals[attributeName] ?? current;
      const nextValue = language === "en" ? original : translateText(original, language);
      if (current !== nextValue) {
        element.setAttribute(attributeName, nextValue);
        attributeWritten.set(element, {
          ...(attributeWritten.get(element) ?? {}),
          [attributeName]: nextValue,
        });
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

export const PROMPT_TEMPLATE = `You are an expert AI exam & question paper extractor.
Examine the attached question paper image carefully and extract all multiple choice questions (MCQs) into the EXACT JSON structure below.

CRITICAL INSTRUCTIONS FOR QUESTION SOURCE EXTRACTION:
1. Carefully scan the image for any page headers, footers, exam titles, page numbers, subject tags, question numbers (e.g. "Q215", "Page 42", "SSC JE 2021", "RRB Exam 2022", "Chapter 5 - Logic Gates").
2. For EVERY question, populate the "source" field with a clear source reference string (e.g., "Question Paper Page 1, Q215", "Chapter 4 - Logic Gates", "SSC JE Exam 2021"). If no specific page header is visible, construct the source tag using the Question Number from the image (e.g., "Page Reference Q215").

Return ONLY a valid JSON object without any markdown formatting wrappers (no \`\`\`json).

JSON Schema:
{
  "title": "Extracted Test Paper Title",
  "questions": [
    {
      "id": 1,
      "question": "Question text in original language (Hindi/English)",
      "options": [
        "Option A text",
        "Option B text",
        "Option C text",
        "Option D text"
      ],
      "correctAnswer": 0, // 0 for Option A, 1 for Option B, 2 for Option C, 3 for Option D
      "explanation": "Detailed step-by-step reasoning for the correct answer.",
      "source": "Mandatory source reference extracted from image (e.g. Page 1, Q215 or Chapter 4)"
    }
  ]
}`;

export const DEMO_TEST_DATA = {
  title: "बुलियन बीजगणित व लॉजिक गेट्स (Boolean Algebra & Logic Gates)",
  questions: [
    {
      id: 215,
      question: "निम्न में से NAND गेट का चयन कीजिए। (Select the NAND Gate)",
      options: [
        "AND गेट के आउटपुट पर बबल (NOT gate)",
        "OR गेट के इनपुट पर बबल",
        "NOR गेट के आउटपुट पर बबल",
        "केवल सामान्य AND गेट"
      ],
      correctAnswer: 0,
      explanation: "NAND गेट एक AND गेट और NOT गेट का संयोजन होता है। इसके प्रतीक चिन्ह में AND गेट के आउटपुट सिरे पर एक छोटा सा गोला (Bubble) लगा होता है।",
      source: "Question Paper Page 1, Q215 (Logic Gates)",
      diagramSvg: `<svg width="180" height="70" viewBox="0 0 180 70" class="mx-auto"><path d="M 30 15 L 60 15 Q 90 15 90 35 Q 90 55 60 55 L 30 55 Z" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="95" cy="35" r="5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="10" y1="25" x2="30" y2="25" stroke="currentColor" stroke-width="2"/><line x1="10" y1="45" x2="30" y2="45" stroke="currentColor" stroke-width="2"/><line x1="100" y1="35" x2="130" y2="35" stroke="currentColor" stroke-width="2"/><text x="45" y="40" fill="currentColor" font-size="12" font-weight="bold">NAND</text></svg>`
    },
    {
      id: 216,
      question: "बुलियन बीजगणित के अनुसार, A + Ā = ?",
      options: ["0", "A", "Ā", "1"],
      correctAnswer: 3,
      explanation: "पूरक नियम (Complement Law) के अनुसार, किसी भी इनपुट और उसके पूरक (Inverse) का OR योग हमेशा 1 होता है (0 + 1 = 1 तथा 1 + 0 = 1). अतः A + Ā = 1.",
      source: "Question Paper Page 1, Q216 (Boolean Rules)"
    },
    {
      id: 217,
      question: "NOR गेट का गणितीय व्यंजक (Mathematical form) रूप है-",
      options: ["Ā + B̄", "Ā . B̄", "A + B", "Ā . B̄ (अथवा A+B पर बार)"],
      correctAnswer: 0,
      explanation: "NOR गेट का आउटपुट Y = Inverse of (A + B) अर्थात (A + B)̄ होता है। डी-मॉर्गन नियम के अनुसार (A + B)̄ = Ā . B̄.",
      source: "Question Paper Page 1, Q217"
    },
    {
      id: 218,
      question: "फुल एडर के निर्माण में निम्न में से कौन-सी लॉजिक गेट ICs प्रयुक्त होती हैं?",
      options: ["AND", "XOR", "OR", "ये सभी (All of these)"],
      correctAnswer: 3,
      explanation: "Full Adder परिपथ दो Half Adders तथा एक OR gate मिलाकर बनता है, जिसमें XOR gates (Sum बिट के लिए), AND gates (Carry बिट के लिए) तथा OR gate प्रयुक्त होते हैं।",
      source: "Question Paper Page 1, Q218"
    },
    {
      id: 219,
      question: "मौलिक फ्लिप-फ्लॉप परिपथ में निम्न में से कौन-से लॉजिक गेट्स होते हैं?",
      options: ["दो NAND गेट्स", "दो OR गेट्स", "दो AND गेट्स", "दो XOR गेट्स"],
      correctAnswer: 0,
      explanation: "मूल SR फ्लिप-फ्लॉप में cross-coupled प्रकार से जुड़े हुए दो NAND गेट्स अथवा दो NOR गेट्स का प्रयोग किया जाता है।",
      source: "Question Paper Page 1, Q219"
    },
    {
      id: 220,
      question: "चित्र में दर्शित समांतर स्विच युक्त वैद्युतिक परिपथ किस लॉजिक गेट के प्रचालन को निरूपित करता है?",
      options: ["AND Gate", "NAND Gate", "NOR Gate", "OR Gate"],
      correctAnswer: 3,
      explanation: "जब दो स्विच (A और B) किसी बल्ब के साथ समांतर (Parallel) क्रम में जुड़े होते हैं, तो दोनों में से किसी भी एक स्विच को बंद (ON=1) करने पर बल्ब जल जाता है। यह OR गेट व्यवहार को दर्शाता है।",
      source: "Question Paper Page 1, Q220 (Circuit Diagram)",
      diagramSvg: `<svg width="200" height="90" viewBox="0 0 200 90" class="mx-auto"><rect x="20" y="20" width="160" height="50" fill="none" stroke="currentColor" stroke-width="2" rx="4"/><line x1="60" y1="20" x2="60" y2="40" stroke="currentColor" stroke-width="2"/><line x1="60" y1="40" x2="90" y2="30" stroke="currentColor" stroke-width="2"/><circle cx="140" cy="45" r="10" fill="#f59e0b" stroke="currentColor" stroke-width="1.5"/><text x="85" y="20" fill="currentColor" font-size="11">Switch A/B (Parallel)</text><text x="135" y="75" fill="currentColor" font-size="10">Lamp (Output Y)</text></svg>`
    },
    {
      id: 221,
      question: "दो इनपुट NAND गेट में इनपुट 0-1 और 1-0 देने पर आउटपुट क्या होगा?",
      options: ["0-0", "1-0", "0-1", "1-1"],
      correctAnswer: 3,
      explanation: "NAND गेट का आउटपुट Y = Inverse of (A . B) होता है। (0 . 1)̄ = 0̄ = 1 तथा (1 . 0)̄ = 0̄ = 1. अतः दोनों स्थितियों में आउटपुट 1 और 1 (1-1) प्राप्त होगा।",
      source: "Question Paper Page 1, Q221"
    },
    {
      id: 222,
      question: "Ex-OR गेट के इनपुट में A = 0 व B = 0 आरोपित करने पर आउटपुट क्या होगा?",
      options: ["0", "1", "2", "उपरोक्त में से कोई नहीं"],
      correctAnswer: 0,
      explanation: "Ex-OR (XOR) गेट का आउटपुट Y = A ⊕ B होता है। जब दोनों इनपुट समान होते हैं (0,0 या 1,1), तो XOR का आउटपुट हमेशा 0 रहता है।",
      source: "Question Paper Page 1, Q222"
    },
    {
      id: 223,
      question: "एक AND गेट के इनपुट में A, B, C, D चार इनपुट लाइनें हैं। वह कौन-सा इनपुट संयोजन है जो 1 (HIGH) आउटपुट देता है?",
      options: ["0000", "1000", "1111", "0001"],
      correctAnswer: 2,
      explanation: "AND गेट का नियम है कि आउटपुट 1 केवल और केवल तभी मिलेगा जब उसके सभी इनपुट लाइनें 1 (HIGH) हों। अतः A=1, B=1, C=1, D=1 (1111) पर आउटपुट 1 मिलेगा।",
      source: "Question Paper Page 1, Q223"
    },
    {
      id: 224,
      question: "OR गेट को बनाने के लिए कितने NAND गेट्स की आवश्यकता होती है?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "NAND एक यूनिवर्सल गेट है। OR गेट की रचना करने के लिए कुल 3 NAND गेट्स की आवश्यकता होती है (दो इनवर्टर रूप में + एक मुख्य NAND).",
      source: "Question Paper Page 1, Q224"
    },
    {
      id: 225,
      question: "बुलियन व्यंजक Y = (A + B)̄ किसके लिए निरूपित होता है?",
      options: ["AND गेट", "NAND गेट", "NOR गेट", "OR गेट"],
      correctAnswer: 2,
      explanation: "OR गेट के आउटपुट को जब NOT गेट से इनवर्ट किया जाता है, तो Y = (A + B)̄ प्राप्त होता है, जो कि NOR गेट का व्यंजक है।",
      source: "Question Paper Page 1, Q225"
    },
    {
      id: 226,
      question: "अभिव्यक्ति (AB + BC + CD) का पूरक (Complement) क्या है?",
      options: [
        "A'CD + B'C' + B'D",
        "A'C' + BC + AB'D'",
        "AC + BC + ABD",
        "(A'+B')(B'+C')(C'+D')"
      ],
      correctAnswer: 3,
      explanation: "डी-मॉर्गन नियम के अनुसार (X + Y + Z)̄ = X̄ . Ȳ . Z̄. अतः (AB + BC + CD)̄ = (AB)̄ . (BC)̄ . (CD)̄ = (A'+B')(B'+C')(C'+D').",
      source: "Question Paper Page 1, Q226"
    },
    {
      id: 227,
      question: "निम्न अभिव्यक्ति XY(XYZ + XYZ + XYZ) को सरलीकृत (Simplify) किये जाने पर क्या प्राप्त होगा?",
      options: ["0", "1", "-1", "xyz"],
      correctAnswer: 3,
      explanation: "बुलियन नियम X + X + X = X से (XYZ + XYZ + XYZ) = XYZ. तत्पश्चात XY . (XYZ) = XYZ.",
      source: "Question Paper Page 1, Q227"
    },
    {
      id: 228,
      question: "'NOT' लॉजिक गेट बाइनरी इनपुट को किसमें परिवर्तित कर देता है?",
      options: ["शून्य में", "दशमलव संख्या में", "उसके पूरक (Complement) में", "उपरोक्त में से कोई नहीं"],
      correctAnswer: 2,
      explanation: "NOT गेट को इनवर्टर भी कहा जाता है। यह 0 को 1 में तथा 1 को 0 में बदलता है, अर्थात इनपुट को उसके पूरक (Complement) में परिवर्तित करता है।",
      source: "Question Paper Page 1, Q228"
    },
    {
      id: 229,
      question: "(A + B)̄ किसके तुल्य होता है?",
      options: ["Ā . B̄", "Ā + B̄", "Ā", "उपरोक्त सभी"],
      correctAnswer: 0,
      explanation: "De Morgan's First Theorem के अनुसार: (A + B)̄ = Ā . B̄.",
      source: "Question Paper Page 1, Q229"
    },
    {
      id: 230,
      question: "वह कौन-सा लॉजिक गेट है, जिसमें इनपुट टर्मिनल पर कोई इनपुट न दिया जाए (0,0), तो आउटपुट 0 रहता है?",
      options: ["NOT गेट", "NAND गेट", "NOR गेट", "OR गेट"],
      correctAnswer: 3,
      explanation: "OR गेट में 0 + 0 = 0 रहता है, जबकि NOR तथा NAND गेट में (0,0) इनपुट पर आउटपुट 1 मिलता है।",
      source: "Question Paper Page 1, Q230"
    },
    {
      id: 231,
      question: "Ā + A तुल्य होता है-",
      options: ["1", "Ā", "0", "उपरोक्त सभी"],
      correctAnswer: 0,
      explanation: "Complementary Law: किसी भी वेरिएबल और उसके NOT का योग हमेशा 1 होता है (0 + 1 = 1).",
      source: "Question Paper Page 1, Q231"
    },
    {
      id: 232,
      question: "1 + A तुल्य होता है-",
      options: ["1", "A", "0", "Ā"],
      correctAnswer: 0,
      explanation: "Dominance Law (प्रभुत्व नियम): 1 के साथ किसी भी बुलियन चर का OR योग सदैव 1 होता है (1 + A = 1).",
      source: "Question Paper Page 1, Q232"
    },
    {
      id: 233,
      question: "लॉजिक एक्सप्रेशन मिनिमाइजेशन (Minimization) की लोकप्रिय विधि कौन-सी है?",
      options: ["कारनॉफ मैप (K-Map)", "बुलियन मैप", "(a) व (b) दोनों", "उपरोक्त में से कोई नहीं"],
      correctAnswer: 0,
      explanation: "Karnaugh Map (K-Map) बुलियन व्यंजकों के सरलीकरण की मानक और सबसे व्यापक विधि है।",
      source: "Question Paper Page 1, Q233"
    },
    {
      id: 234,
      question: "हाफ एडर (Half Adder) में इनपुट A = 1 तथा B = 1 होने पर (Sum, Carry) आउटपुट क्या होगा?",
      options: ["Sum=0, Carry=1", "Sum=1, Carry=0", "Sum=1, Carry=1", "Sum=0, Carry=0"],
      correctAnswer: 0,
      explanation: "हाफ एडर में binary addition 1 + 1 = 10 होता है, जहाँ Sum = 0 (XOR) और Carry = 1 (AND) होता है।",
      source: "Question Paper Page 1, Q234"
    },
    {
      id: 235,
      question: "NAND गेट की ट्रूथ टेबल में निम्नलिखित में से कौन-सा युगल (Input combination) 0 आउटपुट देता है?",
      options: ["00", "01", "10", "11"],
      correctAnswer: 3,
      explanation: "NAND गेट में 0 आउटपुट केवल तभी मिलता है जब दोनों इनपुट HIGH (1,1) हों, क्योंकि (1 . 1)̄ = 0.",
      source: "Question Paper Page 1, Q235"
    }
  ]
};

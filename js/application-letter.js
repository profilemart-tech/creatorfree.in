/**
 * Formal Application Letter Generator Engine - creatorsfree.in
 * Updates: Added "Custom Blank Letter" preset for writing any custom application from scratch.
 */

document.addEventListener('DOMContentLoaded', () => {
  // State Data Model
  const state = {
    lang: 'en', // 'en' or 'hi'
    category: 'bank_passbook',
    
    // Applicant Details
    applicantName: 'Rahul Sharma',
    applicantPhone: '+91 XXXXXXXXXX',
    applicantEmail: 'xxxx@xxx.com',
    applicantAddress: 'House No. 123, Sector 15, New Delhi',
    date: new Date().toISOString().split('T')[0],
    
    // Recipient Details
    recipientTitle: 'The Branch Manager',
    recipientOrg: 'State Bank of India',
    recipientAddress: 'Connaught Place Branch, New Delhi',
    
    // Key Details
    accNo: '12345678901',
    rollNo: '2024-CS-045',
    itemName: 'Samsung Galaxy Smartphone (IMEI: 865432098765432)',
    customSubject: '',
    customBody: ''
  };

  // PRE-BUILT TEMPLATE DICTIONARY
  const PRESETS = {
    // 0. CUSTOM BLANK LETTER
    custom_blank: {
      en: {
        recTitle: 'The Concerned Authority / Officer In-Charge',
        recOrg: 'Department / Organization Name',
        recAddress: 'Office Address / City',
        subject: 'Subject: Type Your Application Subject Here',
        body: 'Write the main body text of your application letter here. You can explain your issue or request in detail.',
        closing: 'Thanking You,',
        salutation: 'Respected Sir / Madam,'
      },
      hi: {
        recTitle: 'सेवा में,\nश्रीमान अधिकारी महोदय',
        recOrg: 'विभाग / संस्था का नाम',
        recAddress: 'कार्यालय पता / शहर',
        subject: 'विषय: अपना आवेदन विषय यहाँ लिखें',
        body: 'अपने आवेदन पत्र का मुख्य विवरण यहाँ लिखें। आप अपनी समस्या या अनुरोध का विस्तार से वर्णन कर सकते हैं।',
        closing: 'सधन्यवाद,',
        salutation: 'आदरणीय महोदय,'
      }
    },

    // 1. BANK: LOST PASSBOOK
    bank_passbook: {
      en: {
        recTitle: 'The Branch Manager',
        recOrg: 'State Bank of India',
        recAddress: 'Main Branch, City',
        subject: 'Application for Issuance of New / Duplicate Bank Passbook',
        body: `I am an account holder in your esteemed bank holding Savings Account Number {accNo}. I regret to inform you that I have lost my original bank passbook recently.

Despite thorough search, I have been unable to trace it. Therefore, I kindly request you to issue a new/duplicate passbook for my account so that I can keep track of my transactions.

I have attached a copy of my Identity Proof (Aadhaar / PAN Card) for your verification. I am ready to pay any necessary charges for the issuance of the new passbook.`,
        closing: 'Thanking You,',
        salutation: 'Respected Sir / Madam,'
      },
      hi: {
        recTitle: 'सेवा में,\nश्रीमान शाखा प्रबंधक',
        recOrg: 'भारतीय स्टेट बैंक',
        recAddress: 'मुख्य शाखा, शहर',
        subject: 'विषय: नया / डुप्लिकेट बैंक पासबुक जारी करने हेतु आवेदन पत्र',
        body: `सविनय निवेदन यह है कि मैं आपकी बैंक शाखा का खाताधारक हूँ तथा मेरा बचत खाता संख्या {accNo} है। मैं आपको सूचित करना चाहता हूँ कि मेरी मूल पासबुक कहीं गुम हो गई है।

काफी खोजबीन के बाद भी मुझे पासबुक नहीं मिल पाई है। अतः आपसे विनम्र अनुरोध है कि मेरे खाते के लिए नई/डुप्लिकेट पासबुक जारी करने की कृपा करें ताकि मैं अपने लेन-देन का विवरण देख सकूँ।

मैंने सत्यापन हेतु अपने पहचान पत्र (आधार कार्ड / पैन कार्ड) की छायाप्रति संलग्न कर दी है।`,
        closing: 'सधन्यवाद,',
        salutation: 'आदरणीय महोदय,'
      }
    },

    // 2. BANK: NEW ATM CARD
    bank_atm: {
      en: {
        recTitle: 'The Branch Manager',
        recOrg: 'Punjab National Bank',
        recAddress: 'Main Branch, City',
        subject: 'Application for Issuance of New Debit / ATM Card',
        body: `I am maintaining a Savings Bank Account with your branch under Account Number {accNo}. My previous Debit/ATM Card has expired / was lost recently.

Since I frequently require ATM cash withdrawals and online card transactions, I request you to issue a new Debit / ATM Card linked to my account at the earliest.

Please send the new card to my registered mailing address. All required documents for verification are attached herewith.`,
        closing: 'Thanking You,',
        salutation: 'Respected Sir / Madam,'
      },
      hi: {
        recTitle: 'सेवा में,\nश्रीमान शाखा प्रबंधक',
        recOrg: 'पंजाब नेशनल बैंक',
        recAddress: 'मुख्य शाखा, शहर',
        subject: 'विषय: नया एटीएम / डेबिट कार्ड जारी करने हेतु आवेदन पत्र',
        body: `सविनय निवेदन यह है कि मेरा आपकी बैंक शाखा में बचत खाता है, जिसका खाता संख्या {accNo} है। मेरा पुराना एटीएम कार्ड एक्सपायर / गुम हो गया है।

मुझे लेन-देन और एटीएम निकासी के लिए नए कार्ड की आवश्यकता है। अतः आपसे निवेदन है कि मेरे उक्त खाते पर नया डेबिट/एटीएम कार्ड जारी करने की कृपा करें।

कृपया नया कार्ड मेरे पंजीकृत पते पर भेजने का कष्ट करें। आवश्यक दस्तावेज संलग्न हैं।`,
        closing: 'सधन्यवाद,',
        salutation: 'आदरणीय महोदय,'
      }
    },

    // 3. BANK: CHANGE MOBILE NUMBER
    bank_mobile: {
      en: {
        recTitle: 'The Branch Manager',
        recOrg: 'HDFC Bank',
        recAddress: 'City Branch',
        subject: 'Application to Update / Change Registered Mobile Number in Bank Account',
        body: `I hold a Bank Account with your branch bearing Account Number {accNo}. I would like to request an update to my registered mobile number in your bank records.

My previous registered mobile number is no longer active. Kindly update my new mobile number {applicantPhone} in my account so that I can receive SMS transaction alerts and OTPs.

Self-attested identity proof (Aadhaar Card) is attached for your verification.`,
        closing: 'Thanking You,',
        salutation: 'Respected Sir / Madam,'
      },
      hi: {
        recTitle: 'सेवा में,\nश्रीमान शाखा प्रबंधक',
        recOrg: 'एचडीएफसी बैंक',
        recAddress: 'शाखा, शहर',
        subject: 'विषय: बैंक खाते में नया मोबाइल नंबर दर्ज करवाने हेतु आवेदन पत्र',
        body: `सविनय निवेदन है कि मैं आपकी बैंक का खाताधारक हूँ और मेरा खाता संख्या {accNo} है। मैं अपने खाते में पंजीकृत मोबाइल नंबर को बदलना चाहता हूँ।

मेरा पुराना मोबाइल नंबर बंद हो चुका है। कृपया मेरे खाते में नया मोबाइल नंबर {applicantPhone} दर्ज करने की कृपा करें ताकि मुझे बैंक अलर्ट प्राप्त हो सकें।

सत्यापन हेतु आधार कार्ड की प्रति संलग्न है।`,
        closing: 'सधन्यवाद,',
        salutation: 'आदरणीय महोदय,'
      }
    },

    // 4. SCHOOL: SICK LEAVE
    school_leave: {
      en: {
        recTitle: 'The Principal',
        recOrg: 'Delhi Public School',
        recAddress: 'New Delhi',
        subject: 'Application for Leave Due to Illness / Fever',
        body: `I am writing to inform you that I am suffering from severe fever and doctor has advised me rest for 3 days.

Therefore, I am unable to attend school/college classes from {date} onwards. Kindly grant me leave for 3 days.

I assure you that I will cover all missed study topics and assignments promptly upon my return. Medical certificate is attached.`,
        closing: 'Yours Obediently,',
        salutation: 'Respected Principal Sir / Madam,'
      },
      hi: {
        recTitle: 'सेवा में,\nश्रीमान प्रधानाचार्य महोदय',
        recOrg: 'शासकीय उच्चतर माध्यमिक विद्यालय',
        recAddress: 'शहर',
        subject: 'विषय: बीमारी के कारण अवकाश हेतु आवेदन पत्र',
        body: `सविनय निवेदन यह है कि मुझे कल रात से तेज बुखार आ गया है। चिकित्सक ने मुझे ३ दिनों तक विश्राम करने की सलाह दी है।

इस कारण मैं विद्यालय में उपस्थित होने में असमर्थ हूँ। अतः आपसे नम्र निवेदन है कि मुझे दिनांक {date} से ३ दिनों का अवकाश प्रदान करने की कृपा करें।

इसके लिए मैं सदैव आपका आभारी रहूँगा। डॉक्टर का पर्चा संलग्न है।`,
        closing: 'आपका आज्ञाकारी छात्र,',
        salutation: 'आदरणीय प्रधानाचार्य जी,'
      }
    },

    // 5. SCHOOL: TRANSFER CERTIFICATE (TC)
    school_tc: {
      en: {
        recTitle: 'The Principal',
        recOrg: 'Kendriya Vidyalaya',
        recAddress: 'City Branch',
        subject: 'Application for Issuance of School Transfer Certificate (TC)',
        body: `I was a student of Class/Course (Roll No: {rollNo}) in your institution during the current academic session. 

Due to my father's job transfer / family relocation to another city, I need to take admission in a new school/college there.

Therefore, I request you to kindly issue my School Transfer Certificate (TC) and Character Certificate at the earliest. All school dues have been cleared.`,
        closing: 'Yours Sincerely,',
        salutation: 'Respected Sir / Madam,'
      },
      hi: {
        recTitle: 'सेवा में,\nश्रीमान प्रधानाचार्य महोदय',
        recOrg: 'केंद्रीय विद्यालय',
        recAddress: 'शहर',
        subject: 'विषय: स्थानांतरण प्रमाण पत्र (TC) जारी करने हेतु आवेदन पत्र',
        body: `सविनय निवेदन है कि मैंने आपकी संस्था से अनुक्रमांक {rollNo} के तहत अध्ययन पूर्ण कर लिया है। 

मेरे पिताजी का स्थानांतरण अन्य शहर में हो जाने के कारण अब मुझे आगे की पढ़ाई हेतु नए विद्यालय में प्रवेश लेना है।

अतः आपसे प्रार्थना है कि मुझे मेरा स्थानांतरण प्रमाण पत्र (TC) एवं चरित्र प्रमाण पत्र जारी करने की कृपा करें। मैंने विद्यालय के सभी बकाए चुकता कर दिए हैं।`,
        closing: 'आपका आज्ञाकारी छात्र,',
        salutation: 'आदरणीय महोदय,'
      }
    },

    // 6. POLICE: LOST MOBILE / SIM
    police_lost: {
      en: {
        recTitle: 'The Station House Officer (S.H.O.)',
        recOrg: 'Police Station Sector-18',
        recAddress: 'City Police Zone',
        subject: 'Application Regarding Lost Mobile Phone / Important Documents',
        body: `I am writing to report the loss of my personal item: {itemName}. The item was lost/stolen on {date} around the local market area.

Despite searching thoroughly, I could not trace it. I request you to kindly lodge a formal lost report (NCR) for the same so that I can apply for a duplicate SIM card / documents and prevent any potential misuse.

Device IMEI / Details: {itemName}. My contact number is {applicantPhone}.`,
        closing: 'Yours Faithfully,',
        salutation: 'Respected Inspector Sahib,'
      },
      hi: {
        recTitle: 'सेवा में,\nश्रीमान थाना प्रभारी महोदय',
        recOrg: 'थाना कोतवाली',
        recAddress: 'शहर',
        subject: 'विषय: मोबाइल फोन / दस्तावेज गुम होने की सूचना हेतु आवेदन पत्र',
        body: `सविनय निवेदन है कि मेरा {itemName} दिनांक {date} को बाजार के पास कहीं गिरकर गुम हो गया है।

काफी तलाश करने के बाद भी वह नहीं मिल सका। भविष्य में इसका कोई दुरुपयोग न हो तथा मुझे नया सिम कार्ड जारी कराने हेतु इस घटना की सूचना (NCR) दर्ज करने की कृपा करें।

गुम वस्तु विवरण: {itemName}। मेरा संपर्क नंबर {applicantPhone} है।`,
        closing: 'भवदीय,',
        salutation: 'आदरणीय थाना प्रभारी जी,'
      }
    },

    // 7. ELECTRICITY BOARD: METER CHANGE
    electricity_meter: {
      en: {
        recTitle: 'The Executive Engineer / SDO',
        recOrg: 'State Electricity Distribution Board',
        recAddress: 'Sub-Division Office',
        subject: 'Application for Replacement of Faulty Electricity Meter',
        body: `I am a consumer of electricity under Account/Consumer No: {accNo} at address {applicantAddress}.

I wish to inform you that the electricity meter installed at my residence has stopped functioning / is displaying fast reading errors for the past few days.

Kindly inspect the meter and replace it with a new digital meter as soon as possible so that accurate billing can be recorded.`,
        closing: 'Thanking You,',
        salutation: 'Respected Sir,'
      },
      hi: {
        recTitle: 'सेवा में,\nश्रीमान सहायक अभियंता (SDO)',
        recOrg: 'राज्य विद्युत वितरण निगम',
        recAddress: 'उप-विभाग कार्यालय',
        subject: 'विषय: खराब बिजली मीटर बदलने हेतु आवेदन पत्र',
        body: `सविनय निवेदन है कि मैं उपभोक्ता संख्या {accNo} का बिजली उपभोक्ता हूँ। मेरा निवास स्थान {applicantAddress} है।

मेरे परिसर में लगा बिजली का मीटर पिछले कुछ दिनों से खराब हो गया है और सही रीडिंग नहीं दर्शा रहा है।

अतः आपसे प्रार्थना है कि इस मीटर की जाँच करवाकर नया मीटर लगवाने की कृपा करें ताकि सही बिजली बिल आ सके।`,
        closing: 'सधन्यवाद,',
        salutation: 'आदरणीय महोदय,'
      }
    }
  };

  // DOM Handles
  const langEn = document.getElementById('langEn');
  const langHi = document.getElementById('langHi');
  const presetBtns = document.querySelectorAll('.preset-btn');
  
  const appName = document.getElementById('appName');
  const appPhone = document.getElementById('appPhone');
  const appEmail = document.getElementById('appEmail');
  const appAddress = document.getElementById('appAddress');
  const appDate = document.getElementById('appDate');
  
  const recTitle = document.getElementById('recTitle');
  const recOrg = document.getElementById('recOrg');
  const recAddress = document.getElementById('recAddress');
  
  const keyAccNo = document.getElementById('keyAccNo');
  const keyRollNo = document.getElementById('keyRollNo');
  const keyItemName = document.getElementById('keyItemName');
  
  const customSubject = document.getElementById('customSubject');
  const customBody = document.getElementById('customBody');
  
  const btnDownloadPdfDirect = document.getElementById('btnDownloadPdfDirect');
  const btnDownloadDoc = document.getElementById('btnDownloadDoc');
  const btnCopyText = document.getElementById('btnCopyText');
  const btnPrintPdf = document.getElementById('btnPrintPdf');
  const previewDiv = document.getElementById('letterPreview');

  init();

  function init() {
    setupLanguageToggle();
    setupPresetButtons();
    setupEventListeners();
    loadPresetData(state.category);
    renderLetterPreview();
  }

  function setupLanguageToggle() {
    if (langEn && langHi) {
      langEn.addEventListener('click', () => {
        langEn.classList.add('active');
        langHi.classList.remove('active');
        state.lang = 'en';
        loadPresetData(state.category);
        renderLetterPreview();
      });

      langHi.addEventListener('click', () => {
        langHi.classList.add('active');
        langEn.classList.remove('active');
        state.lang = 'hi';
        loadPresetData(state.category);
        renderLetterPreview();
      });
    }
  }

  function setupPresetButtons() {
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.category = btn.dataset.preset;
        loadPresetData(state.category);
        renderLetterPreview();
      });
    });
  }

  function loadPresetData(catKey) {
    const p = PRESETS[catKey] ? PRESETS[catKey][state.lang] : PRESETS.custom_blank[state.lang];
    if (!p) return;

    state.recipientTitle = p.recTitle;
    state.recipientOrg = p.recOrg;
    state.recipientAddress = p.recAddress;
    state.customSubject = p.subject;
    
    let body = p.body
      .replace(/{accNo}/g, state.accNo)
      .replace(/{rollNo}/g, state.rollNo)
      .replace(/{itemName}/g, state.itemName)
      .replace(/{date}/g, state.date)
      .replace(/{applicantPhone}/g, state.applicantPhone)
      .replace(/{applicantAddress}/g, state.applicantAddress);
      
    state.customBody = body;

    if (recTitle) recTitle.value = state.recipientTitle;
    if (recOrg) recOrg.value = state.recipientOrg;
    if (recAddress) recAddress.value = state.recipientAddress;
    if (customSubject) customSubject.value = state.customSubject;
    if (customBody) customBody.value = state.customBody;
  }

  function setupEventListeners() {
    const bind = (el, key) => {
      if (el) {
        el.addEventListener('input', e => {
          state[key] = e.target.value;
          renderLetterPreview();
        });
      }
    };

    bind(appName, 'applicantName');
    bind(appPhone, 'applicantPhone');
    bind(appEmail, 'applicantEmail');
    bind(appAddress, 'applicantAddress');
    bind(appDate, 'date');
    bind(recTitle, 'recipientTitle');
    bind(recOrg, 'recipientOrg');
    bind(recAddress, 'recipientAddress');
    bind(keyAccNo, 'accNo');
    bind(keyRollNo, 'rollNo');
    bind(keyItemName, 'itemName');
    bind(customSubject, 'customSubject');
    bind(customBody, 'customBody');

    if (btnDownloadPdfDirect) btnDownloadPdfDirect.addEventListener('click', downloadPdfDirect);
    if (btnDownloadDoc) btnDownloadDoc.addEventListener('click', downloadWordDoc);
    if (btnCopyText) btnCopyText.addEventListener('click', copyTextToClipboard);
    if (btnPrintPdf) btnPrintPdf.addEventListener('click', () => window.print());
  }

  function downloadPdfDirect() {
    if (typeof html2pdf !== 'undefined') {
      const element = document.getElementById('letterPreview');
      const filename = `${(state.applicantName || 'Application').replace(/\s+/g, '_')}_Letter.pdf`;
      const opt = {
        margin:       10,
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    } else {
      window.print();
    }
  }

  function downloadWordDoc() {
    const content = previewDiv.innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
      "xmlns:w='urn:schemas-microsoft-com:office:word' "+
      "xmlns='http://www.w3.org/TR/REC-html40'>"+
      "<head><meta charset='utf-8'><title>Application Letter</title><style>"+
      "body { font-family: Georgia, Times New Roman, serif; font-size: 11pt; line-height: 1.6; color: #1e293b; }"+
      ".letter-subject { font-weight: bold; text-decoration: underline; margin: 15px 0; }"+
      "</style></head><body>";
    const footer = "</body></html>";
    const html = header + content + footer;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(state.applicantName || 'Application').replace(/\s+/g, '_')}_Letter.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function copyTextToClipboard() {
    const text = previewDiv.innerText;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert('📋 Application Letter copied to clipboard! You can paste it anywhere.');
      });
    } else {
      alert('Application letter text:\n\n' + text);
    }
  }

  function renderLetterPreview() {
    if (!previewDiv) return;

    const preset = PRESETS[state.category] ? PRESETS[state.category][state.lang] : PRESETS.custom_blank[state.lang];
    const salutation = preset ? preset.salutation : (state.lang === 'hi' ? 'आदरणीय महोदय,' : 'Respected Sir / Madam,');
    const closing = preset ? preset.closing : (state.lang === 'hi' ? 'सधन्यवाद,' : 'Thanking You,');

    const formattedBody = (state.customBody || '')
      .split('\n\n')
      .map(p => `<p>${escapeHtml(p.trim())}</p>`)
      .join('');

    previewDiv.innerHTML = `
      <div class="letter-date-line">
        Date: ${escapeHtml(state.date || '')}
      </div>

      <div class="letter-to-block">
        ${escapeHtml(state.recipientTitle || 'To')}<br>
        ${escapeHtml(state.recipientOrg || '')}<br>
        ${escapeHtml(state.recipientAddress || '')}
      </div>

      <div class="letter-subject">
        ${escapeHtml(state.customSubject || 'Subject: Application')}
      </div>

      <div class="letter-salutation">
        ${escapeHtml(salutation)}
      </div>

      <div class="letter-body">
        ${formattedBody}
      </div>

      <div class="letter-closing">
        ${escapeHtml(closing)}
      </div>

      <div class="letter-signature-block">
        <strong>${escapeHtml(state.applicantName || 'Applicant Name')}</strong><br>
        ${state.applicantAddress ? `<span>${escapeHtml(state.applicantAddress)}</span><br>` : ''}
        ${state.applicantPhone ? `<span>Mob: ${escapeHtml(state.applicantPhone)}</span><br>` : ''}
        ${state.applicantEmail ? `<span>Email: ${escapeHtml(state.applicantEmail)}</span><br>` : ''}
        <div class="letter-signature-line"></div>
        <span style="font-size:8.5pt; color:#64748b;">(Applicant Signature)</span>
      </div>
    `;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
});

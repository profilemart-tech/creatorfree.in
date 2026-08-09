/**
 * Indian Resume & CV Builder Engine - creatorsfree.in
 * Updates: Direct PDF download (html2pdf), direct Word download (.doc), Web Share API + Clipboard Copy link fallback (no print popup on share!).
 */

document.addEventListener('DOMContentLoaded', () => {
  // State Data Model
  const state = {
    themeColor: '#1e3a8a',
    themeLightColor: '#e0e7ff',
    template: 'standard',
    
    // Personal Info
    name: 'Rahul Sharma',
    phone: '+91 XXXXXXXXXX',
    email: 'xxxx@xxx.com',
    address: 'New Delhi, India',
    linkedin: 'linkedin.com/in/rahulsharma',
    photoUrl: '',
    
    // Career Objective / Summary
    objective: 'Seeking a challenging position in a professional organization where I can apply my skills, academic knowledge, and enthusiasm to contribute to company success while advancing my career.',
    
    // Education Table Array
    education: [
      { degree: 'B.Tech in Computer Science', institute: 'Delhi Technological University', year: '2020 - 2024', score: '8.5 CGPA' },
      { degree: 'Senior Secondary (12th CBSE)', institute: 'DPS R.K. Puram, New Delhi', year: '2020', score: '92.4%' },
      { degree: 'Secondary (10th CBSE)', institute: 'DPS R.K. Puram, New Delhi', year: '2018', score: '94.0%' }
    ],
    
    // Experience Array
    experience: [
      { title: 'Software Engineering Intern', company: 'Tech Solutions India, Noida', duration: 'Jun 2023 - Dec 2023', details: 'Assisted in building responsive web applications using HTML, CSS, JavaScript.\nOptimized database queries and collaborated with cross-functional teams.' }
    ],
    
    // Projects Array
    projects: [
      { title: 'E-Commerce Web Portal', duration: '3 Months', details: 'Developed a full-stack shopping portal with user authentication, product search, and payment gateway.' }
    ],
    
    // Skills & Languages
    skills: 'JavaScript, HTML5, CSS3, Python, MySQL, Git, Problem Solving, Teamwork',
    languages: 'English, Hindi',
    certifications: 'Google Web Development Certificate, HackerRank Python Gold Badge',
    
    // Indian Declaration
    declaration: 'I hereby declare that all the information provided above is true and correct to the best of my knowledge and belief.',
    declDate: new Date().toISOString().split('T')[0],
    declPlace: 'New Delhi'
  };

  // DOM Handles
  const nameInput = document.getElementById('nameInput');
  const phoneInput = document.getElementById('phoneInput');
  const emailInput = document.getElementById('emailInput');
  const addressInput = document.getElementById('addressInput');
  const linkedinInput = document.getElementById('linkedinInput');
  const photoFileInput = document.getElementById('photoFileInput');
  const objectiveInput = document.getElementById('objectiveInput');
  
  const skillsInput = document.getElementById('skillsInput');
  const languagesInput = document.getElementById('languagesInput');
  const certsInput = document.getElementById('certsInput');
  
  const declTextInput = document.getElementById('declTextInput');
  const declDateInput = document.getElementById('declDateInput');
  const declPlaceInput = document.getElementById('declPlaceInput');
  
  const eduContainer = document.getElementById('eduContainer');
  const expContainer = document.getElementById('expContainer');
  const projContainer = document.getElementById('projContainer');
  
  const btnAddEdu = document.getElementById('btnAddEdu');
  const btnAddExp = document.getElementById('btnAddExp');
  const btnAddProj = document.getElementById('btnAddProj');
  
  const btnLoadSample = document.getElementById('btnLoadSample');
  const btnDownloadPdfDirect = document.getElementById('btnDownloadPdfDirect');
  const btnPrintPdf = document.getElementById('btnPrintPdf');
  const btnDownloadDoc = document.getElementById('btnDownloadDoc');
  const btnShareResume = document.getElementById('btnShareResume');
  const previewDiv = document.getElementById('resumePreview');

  // PRE-WRITTEN SAMPLE OBJECTIVES
  const SAMPLE_OBJECTIVES = {
    fresher: 'Enthusiastic and detail-oriented fresher seeking an entry-level opportunity to utilize my academic training, technical skills, and dedication to contribute effectively to organization goals.',
    it: 'Results-driven software developer with strong skills in web technologies, problem solving, and software development lifecycle. Eager to contribute to innovative projects in a dynamic team.',
    sales: 'Goal-oriented sales professional with excellent communication and client relationship skills. Looking to drive revenue growth and customer satisfaction in a competitive market.',
    teacher: 'Passionate educator committed to creating an engaging learning environment, nurturing student potential, and implementing modern teaching methodologies.',
    admin: 'Organized administrative officer with expertise in documentation, office management, and team coordination. Seeking an administrative role to streamline office operations.'
  };

  // INITIALIZE
  init();

  function init() {
    setupColorSwatches();
    setupTemplateSelector();
    setupEventListeners();
    setupSampleChips();
    populateFormFromState();
    renderResumePreview();
  }

  function populateFormFromState() {
    if (nameInput) nameInput.value = state.name;
    if (phoneInput) phoneInput.value = state.phone;
    if (emailInput) emailInput.value = state.email;
    if (addressInput) addressInput.value = state.address;
    if (linkedinInput) linkedinInput.value = state.linkedin;
    if (objectiveInput) objectiveInput.value = state.objective;
    if (skillsInput) skillsInput.value = state.skills;
    if (languagesInput) languagesInput.value = state.languages;
    if (certsInput) certsInput.value = state.certifications;
    if (declTextInput) declTextInput.value = state.declaration;
    if (declDateInput) declDateInput.value = state.declDate;
    if (declPlaceInput) declPlaceInput.value = state.declPlace;

    renderDynamicEduRows();
    renderDynamicExpRows();
    renderDynamicProjRows();
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    document.querySelectorAll('.link-view-preview').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const previewPanel = document.querySelector('.preview-panel');
        const formPanel = document.querySelector('.form-panel');
        if (window.innerWidth <= 1024 && previewPanel && formPanel) {
          formPanel.style.display = 'none';
          previewPanel.style.display = 'block';
        }
        renderResumePreview();
        const previewTarget = document.querySelector('.preview-panel');
        if (previewTarget) previewTarget.scrollIntoView({ behavior: 'smooth' });
      });
    });

    document.querySelectorAll('.link-back-edit').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const previewPanel = document.querySelector('.preview-panel');
        const formPanel = document.querySelector('.form-panel');
        if (window.innerWidth <= 1024 && previewPanel && formPanel) {
          formPanel.style.display = 'block';
          previewPanel.style.display = 'none';
        }
        const formTarget = document.querySelector('.form-panel');
        if (formTarget) formTarget.scrollIntoView({ behavior: 'smooth' });
      });
    });

    const bindInput = (el, key) => {
      if (el) el.addEventListener('input', e => { state[key] = e.target.value; renderResumePreview(); });
    };

    bindInput(nameInput, 'name');
    bindInput(phoneInput, 'phone');
    bindInput(emailInput, 'email');
    bindInput(addressInput, 'address');
    bindInput(linkedinInput, 'linkedin');
    bindInput(objectiveInput, 'objective');
    bindInput(skillsInput, 'skills');
    bindInput(languagesInput, 'languages');
    bindInput(certsInput, 'certifications');
    bindInput(declTextInput, 'declaration');
    bindInput(declDateInput, 'declDate');
    bindInput(declPlaceInput, 'declPlace');

    if (photoFileInput) {
      photoFileInput.addEventListener('change', e => {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = ev => {
            state.photoUrl = ev.target.result;
            renderResumePreview();
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }

    if (btnAddEdu) btnAddEdu.addEventListener('click', () => { state.education.push({ degree: '', institute: '', year: '', score: '' }); renderDynamicEduRows(); renderResumePreview(); });
    if (btnAddExp) btnAddExp.addEventListener('click', () => { state.experience.push({ title: '', company: '', duration: '', details: '' }); renderDynamicExpRows(); renderResumePreview(); });
    if (btnAddProj) btnAddProj.addEventListener('click', () => { state.projects.push({ title: '', duration: '', details: '' }); renderDynamicProjRows(); renderResumePreview(); });

    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', () => {
        state.name = 'Rahul Sharma';
        state.phone = '+91 XXXXXXXXXX';
        state.email = 'xxxx@xxx.com';
        state.address = 'New Delhi, India';
        state.linkedin = 'linkedin.com/in/rahulsharma';
        state.objective = 'Seeking a challenging position in a professional organization where I can apply my skills, academic knowledge, and enthusiasm to contribute to company success while advancing my career.';
        state.skills = 'JavaScript, HTML5, CSS3, Python, MySQL, Git, Problem Solving, Teamwork';
        state.languages = 'English, Hindi';
        state.certifications = 'Google Web Development Certificate, HackerRank Python Gold Badge';
        state.declaration = 'I hereby declare that all the information provided above is true and correct to the best of my knowledge and belief.';
        state.declDate = new Date().toISOString().split('T')[0];
        state.declPlace = 'New Delhi';
        
        state.education = [
          { degree: 'B.Tech in Computer Science', institute: 'Delhi Technological University', year: '2020 - 2024', score: '8.5 CGPA' },
          { degree: 'Senior Secondary (12th CBSE)', institute: 'DPS R.K. Puram, New Delhi', year: '2020', score: '92.4%' },
          { degree: 'Secondary (10th CBSE)', institute: 'DPS R.K. Puram, New Delhi', year: '2018', score: '94.0%' }
        ];

        state.experience = [
          { title: 'Software Engineering Intern', company: 'Tech Solutions India, Noida', duration: 'Jun 2023 - Dec 2023', details: 'Assisted in building responsive web applications using HTML, CSS, JavaScript.\nOptimized database queries and collaborated with cross-functional teams.' }
        ];

        state.projects = [
          { title: 'E-Commerce Web Portal', duration: '3 Months', details: 'Developed a full-stack shopping portal with user authentication, product search, and payment gateway.' }
        ];

        populateFormFromState();
        renderResumePreview();
      });
    }

    if (btnDownloadPdfDirect) btnDownloadPdfDirect.addEventListener('click', downloadPdfDirect);
    if (btnPrintPdf) btnPrintPdf.addEventListener('click', () => window.print());
    if (btnDownloadDoc) btnDownloadDoc.addEventListener('click', downloadWordDoc);
    if (btnShareResume) btnShareResume.addEventListener('click', shareResume);
  }

  // DIRECT PDF DOWNLOAD USING HTML2PDF / WINDOW PRINT
  function downloadPdfDirect() {
    if (typeof html2pdf !== 'undefined') {
      const element = document.getElementById('resumePreview');
      const filename = `${(state.name || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
      const opt = {
        margin:       0,
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    } else {
      window.print();
    }
  }

  // DOWNLOAD AS WORD (.DOC) HELPER
  function downloadWordDoc() {
    const content = previewDiv.innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
      "xmlns:w='urn:schemas-microsoft-com:office:word' "+
      "xmlns='http://www.w3.org/TR/REC-html40'>"+
      "<head><meta charset='utf-8'><title>Resume</title><style>"+
      "body { font-family: Arial, sans-serif; font-size: 10pt; line-height: 1.4; color: #1e293b; }"+
      "table { width: 100%; border-collapse: collapse; margin-top: 10px; }"+
      "th, td { border: 1px solid #cbd5e1; padding: 6px; text-align: left; }"+
      "th { background-color: #e0e7ff; color: #1e3a8a; }"+
      ".cv-name { font-size: 18pt; font-weight: bold; color: #1e3a8a; }"+
      ".cv-section-title { font-size: 11pt; font-weight: bold; color: #1e3a8a; border-bottom: 1px solid #cbd5e1; margin-top: 15px; }"+
      "</style></head><body>";
    const footer = "</body></html>";
    const html = header + content + footer;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(state.name || 'Resume').replace(/\s+/g, '_')}_Resume.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // SHARE RESUME (WITH CLIPBOARD COPY FALLBACK FOR DESKTOP - NO PRINT POPUP!)
  async function shareResume() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${state.name}'s Resume`,
          text: `Check out ${state.name}'s professional resume built with Creators Free.`,
          url: window.location.href
        });
      } catch (err) {
        copyShareLink();
      }
    } else {
      copyShareLink();
    }
  }

  function copyShareLink() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('🔗 Resume Builder link copied to clipboard! Share it with anyone.');
      }).catch(() => {
        alert(`Share link: ${window.location.href}`);
      });
    } else {
      alert(`Share link: ${window.location.href}`);
    }
  }

  // THEME COLOR SWATCHES
  function setupColorSwatches() {
    document.querySelectorAll('.theme-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        state.themeColor = swatch.dataset.color;
        state.themeLightColor = swatch.dataset.light;
        document.documentElement.style.setProperty('--resume-accent', state.themeColor);
        document.documentElement.style.setProperty('--resume-accent-light', state.themeLightColor);
        renderResumePreview();
      });
    });
  }

  // TEMPLATE SELECTOR
  function setupTemplateSelector() {
    document.querySelectorAll('.template-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.template-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        state.template = item.dataset.template;
        renderResumePreview();
      });
    });
  }

  // SAMPLE OBJECTIVE CHIPS
  function setupSampleChips() {
    document.querySelectorAll('.sample-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const type = chip.dataset.type;
        if (SAMPLE_OBJECTIVES[type]) {
          state.objective = SAMPLE_OBJECTIVES[type];
          if (objectiveInput) objectiveInput.value = state.objective;
          renderResumePreview();
        }
      });
    });
  }

  // DYNAMIC EDUCATION ROWS
  function renderDynamicEduRows() {
    if (!eduContainer) return;
    eduContainer.innerHTML = '';

    state.education.forEach((edu, idx) => {
      const div = document.createElement('div');
      div.className = 'dynamic-item';
      div.innerHTML = `
        <button type="button" class="btn-remove" data-idx="${idx}">Remove</button>
        <div class="field-row" style="margin-bottom:8px;">
          <div><label>Degree / Course</label><input type="text" value="${edu.degree}" class="edu-degree" data-idx="${idx}" placeholder="e.g. B.Tech / 12th / MBA"></div>
          <div><label>School / University</label><input type="text" value="${edu.institute}" class="edu-inst" data-idx="${idx}" placeholder="e.g. DTU / CBSE Board"></div>
        </div>
        <div class="field-row">
          <div><label>Passing Year</label><input type="text" value="${edu.year}" class="edu-year" data-idx="${idx}" placeholder="e.g. 2024"></div>
          <div><label>Percentage / CGPA</label><input type="text" value="${edu.score}" class="edu-score" data-idx="${idx}" placeholder="e.g. 85% / 8.5 CGPA"></div>
        </div>
      `;
      eduContainer.appendChild(div);
    });

    eduContainer.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = parseInt(e.target.dataset.idx);
        state.education.splice(idx, 1);
        renderDynamicEduRows();
        renderResumePreview();
      });
    });

    const bindEduField = (cls, prop) => {
      eduContainer.querySelectorAll(cls).forEach(inp => {
        inp.addEventListener('input', e => {
          const idx = parseInt(e.target.dataset.idx);
          state.education[idx][prop] = e.target.value;
          renderResumePreview();
        });
      });
    };

    bindEduField('.edu-degree', 'degree');
    bindEduField('.edu-inst', 'institute');
    bindEduField('.edu-year', 'year');
    bindEduField('.edu-score', 'score');
  }

  // DYNAMIC EXPERIENCE ROWS
  function renderDynamicExpRows() {
    if (!expContainer) return;
    expContainer.innerHTML = '';

    state.experience.forEach((exp, idx) => {
      const div = document.createElement('div');
      div.className = 'dynamic-item';
      div.innerHTML = `
        <button type="button" class="btn-remove" data-idx="${idx}">Remove</button>
        <div class="field-row" style="margin-bottom:8px;">
          <div><label>Job Title / Designation</label><input type="text" value="${exp.title}" class="exp-title" data-idx="${idx}" placeholder="e.g. Sales Manager / Software Intern"></div>
          <div><label>Company / Firm Name</label><input type="text" value="${exp.company}" class="exp-comp" data-idx="${idx}" placeholder="e.g. TCS / HDFC Bank"></div>
        </div>
        <div style="margin-bottom:8px;"><label>Duration (From - To)</label><input type="text" value="${exp.duration}" class="exp-dur" data-idx="${idx}" placeholder="e.g. Jan 2022 - Present"></div>
        <div><label>Key Responsibilities & Achievements</label><textarea class="exp-det" data-idx="${idx}" placeholder="Key roles & responsibilities...">${exp.details}</textarea></div>
      `;
      expContainer.appendChild(div);
    });

    expContainer.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = parseInt(e.target.dataset.idx);
        state.experience.splice(idx, 1);
        renderDynamicExpRows();
        renderResumePreview();
      });
    });

    const bindExpField = (cls, prop) => {
      expContainer.querySelectorAll(cls).forEach(inp => {
        inp.addEventListener('input', e => {
          const idx = parseInt(e.target.dataset.idx);
          state.experience[idx][prop] = e.target.value;
          renderResumePreview();
        });
      });
    };

    bindExpField('.exp-title', 'title');
    bindExpField('.exp-comp', 'company');
    bindExpField('.exp-dur', 'duration');
    bindExpField('.exp-det', 'details');
  }

  // DYNAMIC PROJECT ROWS
  function renderDynamicProjRows() {
    if (!projContainer) return;
    projContainer.innerHTML = '';

    state.projects.forEach((proj, idx) => {
      const div = document.createElement('div');
      div.className = 'dynamic-item';
      div.innerHTML = `
        <button type="button" class="btn-remove" data-idx="${idx}">Remove</button>
        <div class="field-row" style="margin-bottom:8px;">
          <div><label>Project Title</label><input type="text" value="${proj.title}" class="proj-title" data-idx="${idx}" placeholder="e.g. E-Commerce Website"></div>
          <div><label>Duration / Role</label><input type="text" value="${proj.duration}" class="proj-dur" data-idx="${idx}" placeholder="e.g. 2 Months"></div>
        </div>
        <div><label>Project Description</label><textarea class="proj-det" data-idx="${idx}" placeholder="Description & Technologies used...">${proj.details}</textarea></div>
      `;
      projContainer.appendChild(div);
    });

    projContainer.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = parseInt(e.target.dataset.idx);
        state.projects.splice(idx, 1);
        renderDynamicProjRows();
        renderResumePreview();
      });
    });

    const bindProjField = (cls, prop) => {
      projContainer.querySelectorAll(cls).forEach(inp => {
        inp.addEventListener('input', e => {
          const idx = parseInt(e.target.dataset.idx);
          state.projects[idx][prop] = e.target.value;
          renderResumePreview();
        });
      });
    };

    bindProjField('.proj-title', 'title');
    bindProjField('.proj-dur', 'duration');
    bindProjField('.proj-det', 'details');
  }

  // --- RENDER LIVE RESUME PREVIEW ---
  function renderResumePreview() {
    if (!previewDiv) return;

    const validEdu = state.education.filter(e => 
      (e.degree && e.degree.trim()) || 
      (e.institute && e.institute.trim()) || 
      (e.year && e.year.trim()) || 
      (e.score && e.score.trim())
    );

    const validExp = state.experience.filter(e => 
      (e.title && e.title.trim()) || 
      (e.company && e.company.trim()) || 
      (e.duration && e.duration.trim()) || 
      (e.details && e.details.trim())
    );

    const validProj = state.projects.filter(p => 
      (p.title && p.title.trim()) || 
      (p.duration && p.duration.trim()) || 
      (p.details && p.details.trim())
    );

    let eduSectionHtml = validEdu.length ? `
      <div class="cv-section">
        <div class="cv-section-title">Educational Qualifications</div>
        <table class="cv-table">
          <thead>
            <tr>
              <th>Degree / Course</th>
              <th>Institute / Board</th>
              <th>Year</th>
              <th>Score / %</th>
            </tr>
          </thead>
          <tbody>
            ${validEdu.map(e => `
              <tr>
                <td><strong>${escapeHtml(e.degree.trim())}</strong></td>
                <td>${escapeHtml(e.institute.trim())}</td>
                <td>${escapeHtml(e.year.trim())}</td>
                <td><strong>${escapeHtml(e.score.trim())}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : '';

    let expSectionHtml = validExp.length ? `
      <div class="cv-section">
        <div class="cv-section-title">Work Experience</div>
        ${validExp.map(e => `
          <div class="cv-item">
            <div class="cv-item-header">
              <span>${escapeHtml(e.title.trim())}</span>
              <span>${escapeHtml(e.duration.trim())}</span>
            </div>
            ${e.company.trim() ? `<div class="cv-item-sub">${escapeHtml(e.company.trim())}</div>` : ''}
            ${e.details.trim() ? `
              <ul class="cv-bullet-list">
                ${e.details.split('\n').filter(d => d.trim()).map(d => `<li>${escapeHtml(d.trim())}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
    ` : '';

    let projSectionHtml = validProj.length ? `
      <div class="cv-section">
        <div class="cv-section-title">Projects</div>
        ${validProj.map(p => `
          <div class="cv-item">
            <div class="cv-item-header">
              <span>${escapeHtml(p.title.trim())}</span>
              <span>${escapeHtml(p.duration.trim())}</span>
            </div>
            ${p.details.trim() ? `<div style="font-size:8.8pt; color:#334155; margin-top:2px;">${escapeHtml(p.details.trim())}</div>` : ''}
          </div>
        `).join('')}
      </div>
    ` : '';

    const skillsList = (state.skills || '').split(',').filter(s => s.trim());
    let skillsHtml = skillsList.length ? `
      <div class="cv-section">
        <div class="cv-section-title">Skills & Competencies</div>
        <div class="cv-skills">
          ${skillsList.map(s => `<span class="cv-skill-badge">${escapeHtml(s.trim())}</span>`).join('')}
        </div>
      </div>
    ` : '';

    const hasPhone = state.phone && state.phone.trim();
    const hasEmail = state.email && state.email.trim();
    const hasAddress = state.address && state.address.trim();
    const hasLinkedin = state.linkedin && state.linkedin.trim();
    const hasContact = hasPhone || hasEmail || hasAddress || hasLinkedin;

    let photoHtml = state.photoUrl ? `<img src="${state.photoUrl}" class="cv-photo" alt="Profile Photo">` : '';
    const hasName = state.name && state.name.trim();

    previewDiv.innerHTML = `
      ${(hasName || hasContact || photoHtml) ? `
        <div class="cv-header">
          <div>
            ${hasName ? `<h1 class="cv-name">${escapeHtml(state.name.trim())}</h1>` : ''}
            ${hasContact ? `
              <div class="cv-contact">
                ${hasPhone ? `<span>📱 ${escapeHtml(state.phone.trim())}</span>` : ''}
                ${hasEmail ? `<span>✉️ ${escapeHtml(state.email.trim())}</span>` : ''}
                ${hasAddress ? `<span>📍 ${escapeHtml(state.address.trim())}</span>` : ''}
                ${hasLinkedin ? `<span>🔗 ${escapeHtml(state.linkedin.trim())}</span>` : ''}
              </div>
            ` : ''}
          </div>
          ${photoHtml}
        </div>
      ` : ''}

      ${(state.objective && state.objective.trim()) ? `
        <div class="cv-section">
          <div class="cv-section-title">Career Objective</div>
          <p style="margin:0; font-size:9pt; color:#334155; line-height:1.5;">${escapeHtml(state.objective.trim())}</p>
        </div>
      ` : ''}

      ${eduSectionHtml}
      ${expSectionHtml}
      ${projSectionHtml}
      ${skillsHtml}

      ${(state.certifications && state.certifications.trim()) ? `
        <div class="cv-section">
          <div class="cv-section-title">Certifications & Achievements</div>
          <p style="margin:0; font-size:9pt; color:#334155;">${escapeHtml(state.certifications.trim())}</p>
        </div>
      ` : ''}

      ${(state.languages && state.languages.trim()) ? `
        <div class="cv-section">
          <div class="cv-section-title">Languages Known</div>
          <p style="margin:0; font-size:9pt; color:#334155;">${escapeHtml(state.languages.trim())}</p>
        </div>
      ` : ''}

      ${(state.declaration && state.declaration.trim()) ? `
        <div class="cv-declaration">
          <div style="font-weight:700; text-transform:uppercase; margin-bottom:4px; color:var(--resume-accent); font-size:8.5pt;">Declaration</div>
          <p style="margin:0; font-size:8pt; line-height:1.4;">${escapeHtml(state.declaration.trim())}</p>
          <div class="cv-declaration-footer">
            <div>
              ${(state.declDate && state.declDate.trim()) ? `Date: ${escapeHtml(state.declDate.trim())}<br>` : ''}
              ${(state.declPlace && state.declPlace.trim()) ? `Place: ${escapeHtml(state.declPlace.trim())}` : ''}
            </div>
            <div style="text-align:right;">
              (${escapeHtml((state.name && state.name.trim()) || 'Signature')})<br>
              <span style="font-size:7.5pt; color:#64748b;">Applicant Signature</span>
            </div>
          </div>
        </div>
      ` : ''}
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

  // Floating 1-Touch Instant Modal Event Handlers
  const btnFloatingPreview = document.getElementById('btnFloatingPreview');
  const quickPreviewModal = document.getElementById('quickPreviewModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const modalPreviewBody = document.getElementById('modalPreviewBody');
  const modalBtnPdf = document.getElementById('modalBtnPdf');
  const modalBtnDoc = document.getElementById('modalBtnDoc');

  if (btnFloatingPreview && quickPreviewModal) {
    btnFloatingPreview.addEventListener('click', () => {
      renderResumePreview();
      const resumeEl = document.getElementById('resumePreview');
      if (resumeEl && modalPreviewBody) {
        const clone = resumeEl.cloneNode(true);
        clone.style.transform = 'scale(0.85)';
        clone.style.transformOrigin = 'top center';
        modalPreviewBody.innerHTML = '';
        modalPreviewBody.appendChild(clone);
      }
      quickPreviewModal.style.display = 'flex';
    });
  }

  if (btnCloseModal && quickPreviewModal) {
    btnCloseModal.addEventListener('click', () => {
      quickPreviewModal.style.display = 'none';
    });
    quickPreviewModal.addEventListener('click', (e) => {
      if (e.target === quickPreviewModal) quickPreviewModal.style.display = 'none';
    });
  }

  if (modalBtnPdf) {
    modalBtnPdf.addEventListener('click', () => {
      const btnPdf = document.getElementById('btnDownloadPdf');
      if (btnPdf) btnPdf.click();
    });
  }

  if (modalBtnDoc) {
    modalBtnDoc.addEventListener('click', () => {
      const btnDoc = document.getElementById('btnDownloadDoc');
      if (btnDoc) btnDoc.click();
    });
  }
});

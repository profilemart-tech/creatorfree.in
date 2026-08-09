document.addEventListener("DOMContentLoaded", function () {
    const resumeForm = document.getElementById("resume-form");
    const resumeTypeSelect = document.getElementById("resume-type");
    const resumeFormSection = document.getElementById("resume-form-section");
    const resumeFormTitle = document.getElementById("resume-form-title");
    const resumePreview = document.getElementById("resume-preview");
    const resumeActions = document.getElementById("resume-actions");
    const shareButtons = document.getElementById("share-buttons");
    const downloadDocBtn = document.getElementById("download-doc-btn");
    const downloadPdfBtn = document.getElementById("download-pdf-btn");
    const shareResumeBtn = document.getElementById("share-resume-btn");
    const shareLinkedIn = document.getElementById("share-linkedin");
    const shareTwitter = document.getElementById("share-twitter");
    const shareEmail = document.getElementById("share-email");
    const photoInput = document.getElementById("photo");
    const typeButtons = document.querySelectorAll(".option-btn");
    const formData = {
        resumeType: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        education: "",
        experience: "",
        skills: "",
        languages: "",
        profile: "",
        coverLetter: "",
        photoDataUrl: ""
    };

    function escapeHtml(value) {
        if (!value) return "";
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function collectFormData() {
        formData.name = document.getElementById("name").value.trim();
        formData.email = document.getElementById("email").value.trim();
        formData.phone = document.getElementById("phone").value.trim();
        formData.address = document.getElementById("address").value.trim();
        formData.resumeType = resumeTypeSelect ? resumeTypeSelect.value : formData.resumeType;
        formData.education = document.getElementById("education").value.trim();
        formData.experience = document.getElementById("experience").value.trim();
        formData.skills = document.getElementById("skills").value.trim();
        formData.languages = document.getElementById("languages").value.trim();
        formData.profile = document.getElementById("profile").value.trim();
        formData.coverLetter = document.getElementById("cover-letter-text").value.trim();
    }

    function handlePhotoChange(event) {
        const file = event.target.files[0];
        if (!file) {
            formData.photoDataUrl = "";
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            formData.photoDataUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function selectResumeType(type) {
        if (!resumeFormSection || !resumeTypeSelect) return;
        resumeFormSection.style.display = "block";
        resumeFormTitle.textContent = `${type} Form`;
        resumeTypeSelect.value = type;
        formData.resumeType = type;
        resumePreview.style.display = "none";
        if (resumeActions) resumeActions.style.display = "none";
        if (shareButtons) shareButtons.style.display = "none";
    }

    function validateFormData() {
        const errors = [];
        if (!formData.resumeType) errors.push("Please select a resume type.");
        if (!formData.name) errors.push("Name is required.");
        if (!formData.email) errors.push("Email is required.");
        if (!formData.phone) errors.push("Phone number is required.");
        if (!formData.experience) errors.push("Experience details are required.");
        if (!formData.education) errors.push("Education details are required.");
        if (!formData.skills) errors.push("Skills are required.");

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false;
        }

        renderPreview();
        showActions();
        alert("Resume data collected successfully! Scroll down to view the preview.");
        return true;
    }

    function updateLivePreview() {
        collectFormData();
        renderPreview();
        showActions();
    }

    function renderPreview() {
        if (!resumePreview) return;
        const name = escapeHtml(formData.name);
        const email = escapeHtml(formData.email);
        const phone = escapeHtml(formData.phone);
        const education = escapeHtml(formData.education).replace(/\n/g, "<br>");
        const experience = escapeHtml(formData.experience).replace(/\n/g, "<br>");
        const skills = escapeHtml(formData.skills).replace(/\n/g, "<br>");
        const languages = escapeHtml(formData.languages).replace(/\n/g, "<br>");
        const profile = escapeHtml(formData.profile).replace(/\n/g, "<br>");
        const coverLetter = escapeHtml(formData.coverLetter).replace(/\n/g, "<br>");

        const address = escapeHtml(formData.address).replace(/\n/g, "<br>");
        const photo = formData.photoDataUrl;
        const profileHeadline = escapeHtml(formData.profile.split("\n")[0] || "Professional profile");

        if (formData.resumeType === "Europass Resume") {
            resumePreview.innerHTML = `
                <div class="europass-preview">
                    <div class="europass-sidebar">
                        <div class="europass-sidebar-header">
                            <div class="europass-photo">
                                ${photo ? `<img src="${photo}" alt="Profile Photo">` : `<span>No photo selected</span>`}
                            </div>
                            <div class="sidebar-name">
                                <h2>${name}</h2>
                                <p>${profileHeadline || "Professional profile"}</p>
                            </div>
                        </div>
                        <div class="sidebar-section">
                            <h3>Personal information</h3>
                            <ul class="europass-contact-list">
                                <li><strong>Name</strong><br>${name}</li>
                                <li><strong>Address</strong><br>${address || "City, State, Country"}</li>
                                <li><strong>Email</strong><br>${email}</li>
                                <li><strong>Phone</strong><br>${phone}</li>
                            </ul>
                        </div>
                        <div class="sidebar-section">
                            <h3>Languages</h3>
                            <p>${languages || "English"}</p>
                        </div>
                        <div class="sidebar-section">
                            <h3>Skills</h3>
                            <p>${skills}</p>
                        </div>
                    </div>
                    <div class="europass-main">
                        <div class="section-row">
                            <h3>Professional Summary</h3>
                            <p>${profile || "Experienced professional with skills in digital content creation and resume design."}</p>
                        </div>
                        <div class="section-row">
                            <h3>Work Experience</h3>
                            <p>${experience}</p>
                        </div>
                        <div class="section-row">
                            <h3>Education</h3>
                            <p>${education}</p>
                        </div>
                        ${coverLetter ? `<div class="section-row"><h3>Cover Letter</h3><p>${coverLetter}</p></div>` : ""}
                    </div>
                </div>
            `;
        } else if (formData.resumeType === "Cover Letter") {
            resumePreview.innerHTML = `
                <div class="coverletter-preview">
                    <h2>Cover Letter</h2>
                    <p><strong>${name}</strong></p>
                    <p>${coverLetter || "Write a short message to highlight your strengths and motivation."}</p>
                    <hr>
                    <p><strong>Contact</strong></p>
                    <p>${email} • ${phone}</p>
                </div>
            `;
        } else {
            resumePreview.innerHTML = `
                <div class="standard-preview">
                    <h2>${name}</h2>
                    <p>${email} • ${phone}</p>
                    <div class="section-row">
                        <h3>Education</h3>
                        <p>${education}</p>
                    </div>
                    <div class="section-row">
                        <h3>Experience</h3>
                        <p>${experience}</p>
                    </div>
                    <div class="section-row">
                        <h3>Skills</h3>
                        <p>${skills}</p>
                    </div>
                    ${coverLetter ? `<div class="section-row"><h3>Cover Letter</h3><p>${coverLetter}</p></div>` : ""}
                </div>
            `;
        }

        resumePreview.style.display = "block";
    }

    function showActions() {
        if (resumeActions) {
            resumeActions.style.display = "flex";
        }
        if (shareButtons) {
            shareButtons.style.display = "none";
        }
    }

    function createDocumentContent() {
        const name = escapeHtml(formData.name);
        const email = escapeHtml(formData.email);
        const phone = escapeHtml(formData.phone);
        const address = escapeHtml(formData.address).replace(/\n/g, "<br>");
        const education = escapeHtml(formData.education).replace(/\n/g, "<br>");
        const experience = escapeHtml(formData.experience).replace(/\n/g, "<br>");
        const skills = escapeHtml(formData.skills).replace(/\n/g, "<br>");
        const languages = escapeHtml(formData.languages).replace(/\n/g, "<br>");
        const profile = escapeHtml(formData.profile).replace(/\n/g, "<br>");
        const coverLetter = escapeHtml(formData.coverLetter).replace(/\n/g, "<br>");
        const photo = formData.photoDataUrl;

        return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
            body{font-family:Arial,sans-serif;color:#111;margin:0;padding:0;}
            .header{background:#014f86;color:#fff;padding:20px;}
            .content{padding:20px;}
            .section{margin-bottom:18px;}
            .section h3{margin:0 0 8px;color:#014f86;}
            .content p{margin:0 0 12px;}
            .photo{max-width:160px;border-radius:14px;overflow:hidden;margin-bottom:16px;}
            .photo img{width:100%;height:auto;display:block;}
        </style></head><body>
            <div class="header"><h1>${formData.resumeType}</h1></div>
            <div class="content">
                ${photo ? `<div class="photo"><img src="${photo}" alt="Profile Photo"></div>` : ""}
                <div class="section"><h3>Name</h3><p>${name}</p></div>
                <div class="section"><h3>Contact</h3><p>${email} • ${phone}${address ? `<br>${address}` : ""}</p></div>
                <div class="section"><h3>Professional Summary</h3><p>${profile || "Experienced professional with skills in digital content creation and resume design."}</p></div>
                <div class="section"><h3>Languages</h3><p>${languages || "English"}</p></div>
                <div class="section"><h3>Education</h3><p>${education}</p></div>
                <div class="section"><h3>Experience</h3><p>${experience}</p></div>
                <div class="section"><h3>Skills</h3><p>${skills}</p></div>
                ${coverLetter ? `<div class="section"><h3>Cover Letter</h3><p>${coverLetter}</p></div>` : ""}
            </div>
        </body></html>`;
    }

    function downloadWord() {
        const content = createDocumentContent();
        const blob = new Blob(["\ufeff", content], { type: "application/msword" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${formData.resumeType.replace(/\s+/g, "_") || "resume"}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function downloadPdf() {
        const content = createDocumentContent();
        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert("PDF export is unavailable. Please make sure jsPDF is loaded.");
            return;
        }
        const doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" });
        const photo = formData.photoDataUrl;
        let y = 50;

        doc.setFontSize(18);
        doc.text(escapeHtml(formData.name), 40, y);
        y += 28;

        doc.setFontSize(11);
        doc.text(`Email: ${escapeHtml(formData.email)}`, 40, y);
        y += 16;
        doc.text(`Phone: ${escapeHtml(formData.phone)}`, 40, y);
        y += 16;
        if (formData.address) {
            doc.text(`Address: ${escapeHtml(formData.address)}`, 40, y);
            y += 16;
        }
        y += 12;

        if (photo) {
            const imageType = photo.startsWith("data:image/png") ? "PNG" : "JPEG";
            doc.addImage(photo, imageType, 420, 40, 120, 160);
        }

        const summary = [`Professional Summary`, formData.profile || "Experienced professional with skills in digital content creation and resume design."];
        const eduLines = [`Education`, formData.education];
        const expLines = [`Work Experience`, formData.experience];
        const skillLines = [`Skills`, formData.skills];
        const langLines = [`Languages`, formData.languages || "English"];

        const sections = [summary, expLines, eduLines, skillLines, langLines];
        sections.forEach(section => {
            y += 12;
            doc.setFontSize(13);
            doc.text(section[0], 40, y);
            y += 18;
            doc.setFontSize(11);
            const lines = doc.splitTextToSize(section[1], 520);
            doc.text(lines, 40, y);
            y += lines.length * 14;
        });

        if (formData.coverLetter) {
            y += 12;
            doc.setFontSize(13);
            doc.text(`Cover Letter`, 40, y);
            y += 18;
            doc.setFontSize(11);
            const lines = doc.splitTextToSize(formData.coverLetter, 520);
            doc.text(lines, 40, y);
            y += lines.length * 14;
        }

        doc.save(`${formData.resumeType.replace(/\s+/g, "_") || "resume"}.pdf`);
    }

    function getShareText() {
        return `${formData.resumeType} by ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}`;
    }

    function shareOnLinkedIn() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`${formData.resumeType} created with Creators Free`);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, "_blank");
    }

    function shareOnTwitter() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`${formData.resumeType} created with Creators Free`);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }

    function shareByEmail() {
        const subject = encodeURIComponent(`${formData.resumeType} from Creators Free`);
        const body = encodeURIComponent(`Hi,%0A%0APlease check out my resume created using Creators Free:%0A%0A${getShareText()}%0A%0A${window.location.href}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    function populateResumeTypes() {
        if (!resumeTypeSelect) return;
        const resumeTypes = ["Indian Style Resume", "Europass Resume", "Cover Letter"];
        resumeTypes.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            resumeTypeSelect.appendChild(option);
        });
    }

    if (resumeForm) {
        resumeForm.addEventListener("submit", function (event) {
            event.preventDefault();
            collectFormData();
            validateFormData();
        });
        resumeForm.addEventListener("input", updateLivePreview);
        resumeForm.addEventListener("change", updateLivePreview);
    }

    if (photoInput) {
        photoInput.addEventListener("change", function (event) {
            handlePhotoChange(event);
            updateLivePreview();
        });
    }

    typeButtons.forEach(button => {
        button.addEventListener("click", function () {
            selectResumeType(this.textContent.trim());
        });
    });

    if (downloadDocBtn) {
        downloadDocBtn.addEventListener("click", downloadWord);
    }
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener("click", downloadPdf);
    }
    if (shareResumeBtn) {
        shareResumeBtn.addEventListener("click", function () {
            if (shareButtons) {
                shareButtons.style.display = shareButtons.style.display === "grid" ? "none" : "grid";
            }
        });
    }
    if (shareLinkedIn) {
        shareLinkedIn.addEventListener("click", shareOnLinkedIn);
    }
    if (shareTwitter) {
        shareTwitter.addEventListener("click", shareOnTwitter);
    }
    if (shareEmail) {
        shareEmail.addEventListener("click", shareByEmail);
    }

    populateResumeTypes();
});
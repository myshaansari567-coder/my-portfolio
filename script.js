
// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

// Open and close mobile navigation
menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu when a navigation link is clicked
const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});


// DARK MODE

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const darkMode = document.body.classList.contains("dark-mode");

    themeToggle.textContent = darkMode ? "☀" : "☾";
    themeToggle.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
    );
});


// COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// WHATSAPP ACCESS REQUEST FORM

const toggleWhatsapp = document.getElementById("toggleWhatsapp");
const heartPopup = document.getElementById("heartPopup");
const whatsappForm = document.getElementById("whatsappForm");
const companyField = document.getElementById("companyField");
const companyInput = document.getElementById("requestCompany");
const flyingPlane = document.getElementById("flyingPlane");
const confettiContainer = document.getElementById("confettiContainer");


// OPEN AND CLOSE HEART FORM

toggleWhatsapp.addEventListener("click", function () {
    heartPopup.hidden = !heartPopup.hidden;

    const isOpen = !heartPopup.hidden;

    toggleWhatsapp.textContent = isOpen
        ? "Hide WhatsApp Request"
        : "Request WhatsApp Access ♡";

    toggleWhatsapp.setAttribute("aria-expanded", String(isOpen));
});


// SHOW COMPANY NAME ONLY IF YES

document.querySelectorAll('input[name="hasCompany"]').forEach(function (option) {
    option.addEventListener("change", function () {
        const hasCompany = option.value === "yes";

        companyField.hidden = !hasCompany;
        companyInput.disabled = !hasCompany;
        companyInput.required = hasCompany;

        if (!hasCompany) {
            companyInput.value = "";
        }
    });
});


// CONFETTI ANIMATION

function throwConfetti() {
    const colors = [
        "#F56B8A",
        "#FFD0C2",
        "#FF9A8B",
        "#B43F6D"
    ];

    confettiContainer.innerHTML = "";

    for (let i = 0; i < 65; i++) {
        const piece = document.createElement("span");

        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.8 + "s";

        confettiContainer.appendChild(piece);
    }

    setTimeout(function () {
        confettiContainer.innerHTML = "";
    }, 3500);
}


// SUBMIT EMAIL REQUEST

whatsappForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get visitor information
    const name = document.getElementById("requestName").value.trim();
    const company = companyInput.value.trim();
    const issue = document.getElementById("requestMessage").value.trim();

    const selected = document.querySelector(
        'input[name="hasCompany"]:checked'
    );

    // Validate name
    if (!name) {
        alert("Please enter your name.");
        return;
    }

    // Validate company selection
    if (!selected) {
        alert("Please choose Yes or No for company.");
        return;
    }

    const hasCompany = selected.value === "yes";

    // Validate company name
    if (hasCompany && !company) {
        alert("Please enter your company name.");
        return;
    }

    // Validate issue
    if (!issue) {
        alert("Please explain your issue or reason for contact.");
        return;
    }

    // Your email address
    const myEmail = "myshaansari567@gmail.com";

    // Automatic email subject
    const subject = "WhatsApp Access Request - " + name;

    // Automatic email body
    let body = "Hello Mysha,\n\n";

    body += "I would like to request permission ";
    body += "to contact you on WhatsApp.\n\n";

    body += "Name: " + name + "\n";

    body += "Do you have a company? ";
    body += (hasCompany ? "Yes" : "No") + "\n";

    body += "Company Name: ";
    body += (hasCompany ? company : "Not applicable") + "\n\n";

    body += "Issue / Reason for Contact:\n";
    body += issue + "\n\n";

    body += "Thank you!";

    // Create email link
    const emailLink =
        "mailto:" + myEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    // Open visitor's email application
    window.location.href = emailLink;

    // Close form
    heartPopup.hidden = true;

    toggleWhatsapp.textContent = "Request WhatsApp Access ♡";
    toggleWhatsapp.setAttribute("aria-expanded", "false");

    // Restart flying plane animation
    flyingPlane.classList.remove("fly");
    void flyingPlane.offsetWidth;
    flyingPlane.classList.add("fly");

    // Throw pink confetti
    throwConfetti();

    // Remove plane animation after it finishes
    setTimeout(function () {
        flyingPlane.classList.remove("fly");
    }, 2000);
});

/* =====================================
   CERTIFICATIONS GALLERY
   ===================================== */

// Add the exact image filenames here.
// IMPORTANT: Check whether each file is .jpg, .jpeg or .png.
// The extensions below are examples, so change them if needed.


const certificates = [
    "Computing Certificate with Heraldic Crest.png",
    "Linkden ai literacy certificate.png",
    "Microsoft intro to ai and consepts.jpg",
    "Microsoft intro to generative ai and agents.jpg",
    "WhatsApp Image 2025-04-10 at 20.05.32_a0627f5a.jpg",
    "WhatsApp Image 2025-04-10 at 20.05.33_8dc9a486.jpg",
    "WhatsApp Image 2025-04-10 at 20.06.11_2037e14f.jpg",
    "WhatsApp Image 2026-10-05 at 8.31.35 PM.jpeg",
    "WhatsApp Image 2026-10-05 at 8.33.30 PM.jpeg"
];


// Get HTML elements
const certificateGrid = document.getElementById("certificateGrid");
const certificateModal = document.getElementById("certificateModal");
const certificatePreview = document.getElementById("certificatePreview");
const closeCertificate = document.getElementById("closeCertificate");

let lastCertificateButton = null;

// Create a card for each certificate
certificates.forEach(function(filename, index) {

    const card = document.createElement("button");
    card.type = "button";
    card.className = "certificate-card";

    const image = document.createElement("img");

    // Images are stored directly in the images folder
    image.src = "images/" + encodeURIComponent(filename);
    image.alt = "Certificate " + (index + 1);
    image.loading = "lazy";

    const title = document.createElement("span");
    title.textContent = "View Certificate " + (index + 1) + " ↗";

    card.appendChild(image);
    card.appendChild(title);

    certificateGrid.appendChild(card);

    // Open certificate when clicked
    card.addEventListener("click", function() {

        lastCertificateButton = card;

        certificatePreview.src = image.src;
        


certificatePreview.style.transform =
    index === 3 ? "rotate(90deg) scale(0.85)" : "none";



        certificatePreview.alt = image.alt;

        certificateModal.hidden = false;

        document.body.style.overflow = "hidden";
        closeCertificate.focus();
    });
});

// Close the enlarged certificate
function closeCertificateViewer() {

    certificateModal.hidden = true;

    certificatePreview.removeAttribute("src");

    document.body.style.overflow = "";

    if (lastCertificateButton) {
        lastCertificateButton.focus();
    }
}

// Close using X button
closeCertificate.addEventListener("click", closeCertificateViewer);

// Close when clicking outside the image
certificateModal.addEventListener("click", function(event) {

    if (event.target === certificateModal) {
        closeCertificateViewer();
    }

});

// Close using Escape key
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape" && !certificateModal.hidden) {
        closeCertificateViewer();
    }

});

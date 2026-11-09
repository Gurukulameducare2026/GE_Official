
// MOBILE NAVIGATION

const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", function() {

    navLinks.classList.toggle("active");

    menuIcon.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";

});


// =================================
// CUSTOMER RATING SYSTEM
// =================================

let selectedRating = 0;

let reviews = JSON.parse(
    localStorage.getItem("pearlsReviews")
) || [];

// Select stars
document.querySelectorAll("#star-rating span").forEach(star => {

    star.addEventListener("click", function () {

        selectedRating = Number(this.dataset.value);

        updateStars();
    });

});

// Display selected stars
function updateStars() {

    document.querySelectorAll("#star-rating span").forEach(star => {

        const value = Number(star.dataset.value);

        star.classList.toggle(
            "active",
            value <= selectedRating
        );

    });
}

// Submit review
function submitReview() {

    const name = document.getElementById("customer-name").value.trim();

    const message = document.getElementById("review-message").value.trim();

    if (!name) {
        alert("Please enter your name!");
        return;
    }

    if (selectedRating === 0) {
        alert("Please select a star rating!");
        return;
    }

    if (!message) {
        alert("Please write your feedback!");
        return;
    }

    const review = {
        name: name,
        rating: selectedRating,
        message: message
    };

    reviews.push(review);

    localStorage.setItem(
        "pearlsReviews",
        JSON.stringify(reviews)
    );

    document.getElementById("customer-name").value = "";
    document.getElementById("review-message").value = "";

    selectedRating = 0;

    updateStars();
    displayReviews();

    alert("Thank you for rating Pearls Line!");

}

// Display reviews
function displayReviews() {

    const reviewList = document.getElementById("review-list");

    reviewList.innerHTML = "";

    reviews.forEach(review => {

        reviewList.innerHTML += `
            <div class="review-card">

                <h4>${escapeHTML(review.name)}</h4>

                <div class="review-stars">
                    ${"★".repeat(review.rating)}
                    ${"☆".repeat(5 - review.rating)}
                </div>

                <p>${escapeHTML(review.message)}</p>

            </div>
        `;

    });

    // Calculate average rating
    const total = reviews.reduce(
        (sum, review) => sum + review.rating, 0
    );

    const average = reviews.length
        ? (total / reviews.length).toFixed(1)
        : "0.0";

    document.getElementById("average-rating").textContent =
        average + " ⭐";

    document.getElementById("rating-count").textContent =
        reviews.length
        ? reviews.length + " customer reviews"
        : "No ratings yet";
}

// Escape customer input before displaying it
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Load existing reviews
displayReviews();


// CLOSE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");
        menuIcon.textContent = "☰";

    });

});


// WHATSAPP ENQUIRY FORM

const enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const email = document.getElementById("email").value.trim();

    const course = document.getElementById("course").value;

    const message = document.getElementById("message").value.trim();

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    const whatsappMessage =

        "Hello Gurukulam Educare!\n\n" +

        "I am interested in joining your course.\n\n" +

        "Name: " + name + "\n" +

        "Phone: " + phone + "\n" +

        "Email: " + email + "\n" +

        "Course: " + course + "\n" +

        "Message: " + message;

    const whatsappURL =
        "https://wa.me/919037535673?text=" +
        encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");

    enquiryForm.reset();

});


// WELCOME MESSAGE

console.log("Welcome to Gurukulam Educare Website!");

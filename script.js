let selectedEvent = "";

const servicePrices = {
  "Decoration": 5000,
  "Special Effects": 3000,
  "Sound & DJ": 7000,
  "Generator": 4000,
  "LED Wall": 12000,
  "Focus & Lighting": 3500,
  "Beauty & Makeup": 5000,
  "Tent House": 8000,
  "Pandit & Pujari": 2100,
  "Catering Services & Waiters": 15000,
  "Photography & Pre-Wedding": 8000,
  "Video Photography": 7000,
  "Additional Services": 2000
};

const eventServices = {
  "Wedding": [
    "Decoration",
    "Special Effects",
    "Sound & DJ",
    "Generator",
    "LED Wall",
    "Focus & Lighting",
    "Beauty & Makeup",
    "Tent House",
    "Pandit & Pujari",
    "Catering Services & Waiters",
    "Photography & Pre-Wedding",
    "Video Photography"
  ],

  "Birthday": [
    "Decoration",
    "Special Effects",
    "Sound & DJ",
    "LED Wall",
    "Focus & Lighting",
    "Photography & Pre-Wedding",
    "Video Photography",
    "Catering Services & Waiters"
  ],

  "Anniversary": [
    "Decoration",
    "Special Effects",
    "Sound & DJ",
    "Focus & Lighting",
    "Photography & Pre-Wedding",
    "Video Photography",
    "Catering Services & Waiters"
  ],

  "Baby Shower": [
    "Decoration",
    "Special Effects",
    "Sound & DJ",
    "Focus & Lighting",
    "Beauty & Makeup",
    "Pandit & Pujari",
    "Photography & Pre-Wedding",
    "Video Photography",
    "Catering Services & Waiters"
  ],

  "Name Ceremony": [
    "Decoration",
    "Sound & DJ",
    "Focus & Lighting",
    "Pandit & Pujari",
    "Catering Services & Waiters",
    "Photography & Pre-Wedding",
    "Video Photography"
  ],

  "Pre-Wedding": [
    "Decoration",
    "Photography & Pre-Wedding",
    "Video Photography",
    "Beauty & Makeup",
    "Sound & DJ",
    "LED Wall"
  ],

  "Corporate Event": [
    "Decoration",
    "Sound & DJ",
    "LED Wall",
    "Focus & Lighting",
    "Generator",
    "Photography & Pre-Wedding",
    "Video Photography",
    "Catering Services & Waiters"
  ],

  "Engagement": [
    "Decoration",
    "Special Effects",
    "Sound & DJ",
    "LED Wall",
    "Focus & Lighting",
    "Beauty & Makeup",
    "Pandit & Pujari",
    "Photography & Pre-Wedding",
    "Video Photography",
    "Catering Services & Waiters"
  ],

  "School/College Event": [
    "Decoration",
    "Sound & DJ",
    "Generator",
    "LED Wall",
    "Focus & Lighting",
    "Photography & Pre-Wedding",
    "Video Photography",
    "Catering Services & Waiters"
  ],

  "Special Event": [
    "Decoration",
    "Special Effects",
    "Sound & DJ",
    "Generator",
    "LED Wall",
    "Focus & Lighting",
    "Photography & Pre-Wedding",
    "Video Photography",
    "Additional Services"
  ],

  "Other": [
    "Decoration",
    "Special Effects",
    "Sound & DJ",
    "Generator",
    "LED Wall",
    "Focus & Lighting",
    "Beauty & Makeup",
    "Tent House",
    "Pandit & Pujari",
    "Catering Services & Waiters",
    "Photography & Pre-Wedding",
    "Video Photography",
    "Additional Services"
  ]
};


function selectEvent(button, eventName) {

  document.querySelectorAll(".event-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  selectedEvent = eventName;

  document.getElementById("selectedEvent").innerText =
    "Selected Event: " + eventName;

  showRecommendedServices(eventName);
}


function showRecommendedServices(eventName) {

  const container = document.getElementById("servicesContainer");

  if (!container) {
    return;
  }

  const services = eventServices[eventName] || [];

  container.innerHTML = "";

  if (services.length === 0) {
    container.innerHTML =
      "<p>No recommended services available.</p>";
    return;
  }

  services.forEach(serviceName => {

    const price = servicePrices[serviceName] || 0;

    const label = document.createElement("label");

    label.className = "service";

    label.innerHTML = `
      <input
        type="checkbox"
        data-name="${serviceName}"
        value="${price}"
      >
      <span>
        ${serviceName}
        <strong> — ₹${price.toLocaleString("en-IN")}</strong>
      </span>
    `;

    container.appendChild(label);
  });
}


function generateQuotation() {

  const name =
    document.getElementById("customerName").value.trim();

  const mobile =
    document.getElementById("mobile").value.trim();

  const date =
    document.getElementById("eventDate").value;

  const location =
    document.getElementById("location").value.trim();

  const guests =
    document.getElementById("guests").value;

  if (!name || !mobile || !date || !location || !selectedEvent) {

    alert(
      "Please fill customer details and select an event."
    );

    return;
  }

  document.getElementById("qName").innerText = name;

  document.getElementById("qMobile").innerText = mobile;

  document.getElementById("qEvent").innerText = selectedEvent;

  document.getElementById("qDate").innerText = date;

  document.getElementById("qLocation").innerText = location;

  document.getElementById("qGuests").innerText =
    guests || "Not specified";


  const checked =
    document.querySelectorAll(
      '#servicesContainer input[type="checkbox"]:checked'
    );


  let total = 0;

  let serviceHTML = "";


  checked.forEach(item => {

    const serviceName =
      item.dataset.name;

    const price =
      Number(item.value) ||
      servicePrices[serviceName] ||
      0;

    total += price;

    serviceHTML += `
      <p>
        • ${serviceName} —
        ₹${price.toLocaleString("en-IN")}
      </p>
    `;
  });


  document.getElementById("qServices").innerHTML =
    serviceHTML ||
    "<p>No services selected.</p>";


  const advance80 =
    Math.round(total * 0.80);

  const balance20 =
    total - advance80;


  document.getElementById("total").innerText =
    total.toLocaleString("en-IN");


  const quotation =
    document.getElementById("quotation");


  let paymentInfo =
    document.getElementById("paymentInfo");


  if (!paymentInfo) {

    paymentInfo =
      document.createElement("div");

    paymentInfo.id =
      "paymentInfo";

    paymentInfo.style.marginTop =
      "18px";

    quotation.insertBefore(
      paymentInfo,
      quotation.querySelector(".btn")
    );
  }


  paymentInfo.innerHTML = `
    <hr style="margin:18px 0;border-color:#444">

    <p>
      <strong>Booking Advance (80%):</strong>
      ₹${advance80.toLocaleString("en-IN")}
    </p>

    <p style="margin-top:8px">
      <strong>Remaining Balance (20%):</strong>
      ₹${balance20.toLocaleString("en-IN")}
    </p>

    <p style="margin-top:12px;color:#d4af37">
      Final payment terms will follow AV EVENT booking rules.
    </p>
  `;


  quotation.style.display = "block";


  quotation.scrollIntoView({
    behavior: "smooth"
  });
}


function bookingRequest() {

  const name =
    document.getElementById("customerName").value.trim();

  const mobile =
    document.getElementById("mobile").value.trim();


  if (!name || !mobile) {

    alert(
      "Please enter your name and mobile number first."
    );

    return;
  }


  alert(
    "Thank you " +
    name +
    "!\n\nYour AV EVENT booking request has been prepared.\n" +
    "Our team will contact you on " +
    mobile +
    " after reviewing the request."
  );
}

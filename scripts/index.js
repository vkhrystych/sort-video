const airtable_api_key = "keyfU8G0B8LTbCIK1";
const dbId = "appq2HC7SSA3rasiU";

const base = new Airtable({ apiKey: airtable_api_key }).base(dbId);

const tableId = "tbllcKAtFuCUhkoF0";
const tableEmailFieldId = "fldgKzvRxexpzn3FH";

let isSubsribePopupWasShown = false;

const headers = new Headers({
  Authorization: `Bearer ${airtable_api_key}`,
});

const openSubscribePopup = () => {
  const subscribePopup = document.querySelector("#subscribe-popup");

  subscribePopup.classList.remove("hidden");

  isSubsribePopupWasShown = true;
};

const closeSubscribePopup = () => {
  const subscribePopup = document.querySelector("#subscribe-popup");

  subscribePopup.classList.add("hidden");
};

const addEmailToAirtable = (emailValue) => {
  base("Emails").create(
    [
      {
        fields: {
          email: emailValue,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        alert("Thanks for subscribing!");

        const subscribeInput = document.querySelector("#subscribe-email");

        subscribeInput.value = "";
        closeSubscribePopup();
      });
    }
  );
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const onSubscribeBtnClick = (e) => {
  const subscribeInput = document.querySelector("#subscribe-email");
  const email = subscribeInput.value;

  const isEmailValid = validateEmail(email);

  if (!email || !isEmailValid) {
    return;
  }

  if (email) {
    e.preventDefault();

    addEmailToAirtable(email);
  }
};

const addSmoothScollToAnchorElements = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};

const addOnClickHandlers = () => {
  document.querySelector("#subscribe-btn").onclick = onSubscribeBtnClick;

  document.querySelector("#subscribe-close-btn").onclick = closeSubscribePopup;
};

const observer = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === true) {
      if (!isSubsribePopupWasShown) {
        openSubscribePopup();
      }
    }
  },
  { threshold: [0] }
);

observer.observe(document.querySelector("#info-heading"));

const initSlider = () => {
  new Glide(".glide", {
    rewind: true,
  }).mount();
};

const initApp = () => {
  initSlider();
  addOnClickHandlers();
  addSmoothScollToAnchorElements();
};

initApp();

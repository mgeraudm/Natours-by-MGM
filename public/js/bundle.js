import "axios";

const $e8aab4af92df3c33$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $e8aab4af92df3c33$export$de026b00723010c1 = (type, msg, time = 5)=>{
    $e8aab4af92df3c33$export$516836c6a9dfc573();
    //console.log('success alert');
    const markup = `<div class="alert alert--${type}>${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout($e8aab4af92df3c33$export$516836c6a9dfc573, time * 1000);
};


const $dc99f9b0db77d9e6$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        // console.log(res.data.status);
        alert("Logged in successfully!");
        (0, $e8aab4af92df3c33$export$de026b00723010c1)("success", "Logged in successfully!");
        window.setTimeout(()=>{
            location.assign("/");
        }, 500);
    } catch (err) {
        alert(err.response.data.message);
        (0, $e8aab4af92df3c33$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $dc99f9b0db77d9e6$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await axios({
            method: "GET",
            url: "/api/v1/users/logout"
        });
        location.reload(true);
        location.assign("/");
        // console.log(res.data.status);
        alert("Logged out successfully!");
        (0, $e8aab4af92df3c33$export$de026b00723010c1)("success", "Logged out successfully!");
        res.data.status;
    } catch (err) {
        //console.log(res.data.status);
        //console.log(err.response.data.message);
        alert("Error Logging out.");
        (0, $e8aab4af92df3c33$export$de026b00723010c1)("error", "Error Logging out");
    }
};


const $a44144c4cae2e2d6$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = "pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/jonasschmedtmann/cjvi9q8jd04mi1cpgmg7ev3dy",
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        // Create marker
        const el = document.createElement("div");
        el.className = "marker";
        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: "bottom"
        }).setLngLat(loc.coordinates).addTo(map);
        // Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};



const $1a5436cf184029dd$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === "password" ? "/api/v1/users/updateMyPassword" : "/api/v1/users/updateMe";
        const res = await axios({
            method: "PATCH",
            url: url,
            data: data
        });
        if (res.data.status === "success") {
            // console.log(`${type.toUpperCase()} updated successfully!`)
            alert("success", `${type.toUpperCase()} updated successfully!`);
            (0, $e8aab4af92df3c33$export$de026b00723010c1)("success", `${type.toUpperCase()} updated successfully!`);
        }
    } catch (err) {
        // console.log(`error ${err.response.data.message}`);
        alert("error", err.response.data.message);
        (0, $e8aab4af92df3c33$export$de026b00723010c1)("error", err.response.data.message);
    }
};



//const stripe = require('stripe')(  pk_test_51LLWEUJmJeA8lB0hIZAlatOx1tlBhNIrtReHcAUljPkFIX5M3m7IfWpnaxc8W0iBeEeopOAGGLpDsJYXVz7u3dXc00Kb92iYaV);
//const Stripe = require('stripe');
const $11388bf57d312a1a$var$stripe = Stripe("pk_test_51KWBrzSGKmkk3pD9EQE5Beo0E7TxDyIlg6lrNV41iHk4W0nRSrTcMZiVZTj87YKdX4xOtf1vTy8mY0aKR1BAhmVV0r1NcylZ");
const $11388bf57d312a1a$export$8d5bdbf26681c0c2 = async (tourId)=>{
    try {
        //get check out session from API
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
        //console.log(`SESSION ${session}`);
        /*create checkout form & creditcard
    await stripe.redirectToCheckout({
      sessionId: session.url
    });
    */ //workaround:
        window.location.replace(session.data.session.url);
    } catch (err) {
        // console.log(err);
        alert(err);
        (0, $e8aab4af92df3c33$export$de026b00723010c1)("error", err);
    }
};




//DOM ELEMENTS
const $ad003ad2cccc2e2f$var$mapBox = document.getElementById("map");
const $ad003ad2cccc2e2f$var$loginForm = document.querySelector(".form--login");
const $ad003ad2cccc2e2f$var$logOutBtn = document.querySelector(".nav__el--logout");
const $ad003ad2cccc2e2f$var$userDataForm = document.querySelector(".form-user-data");
const $ad003ad2cccc2e2f$var$userPasswordForm = document.querySelector(".form-user-password");
const $ad003ad2cccc2e2f$var$bookBtn = document.getElementById("book-tour");
// DELEGATION
if ($ad003ad2cccc2e2f$var$mapBox) {
    const locations = JSON.parse($ad003ad2cccc2e2f$var$mapBox.dataset.locations);
    (0, $a44144c4cae2e2d6$export$4c5dd147b21b9176)(locations);
}
if ($ad003ad2cccc2e2f$var$loginForm) $ad003ad2cccc2e2f$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $dc99f9b0db77d9e6$export$596d806903d1f59e)(email, password);
});
if ($ad003ad2cccc2e2f$var$logOutBtn) $ad003ad2cccc2e2f$var$logOutBtn.addEventListener("click", (0, $dc99f9b0db77d9e6$export$a0973bcfe11b05c9));
if ($ad003ad2cccc2e2f$var$userDataForm) $ad003ad2cccc2e2f$var$userDataForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--green").textContent = "Updating...";
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    //console.log(`FORM: ${form}`);
    await (0, $1a5436cf184029dd$export$f558026a994b6051)(form, "data");
    document.querySelector(".btn--green").textContent = "Save settings";
    location.reload();
});
if ($ad003ad2cccc2e2f$var$userPasswordForm) $ad003ad2cccc2e2f$var$userPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await (0, $1a5436cf184029dd$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, "password");
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
    document.querySelector(".btn--save-password").textContent = "Save password";
});
if ($ad003ad2cccc2e2f$var$bookBtn) $ad003ad2cccc2e2f$var$bookBtn.addEventListener("click", (e)=>{
    //console.log('button');
    e.target.textContent = "Processing...";
    const tourId = e.target.dataset.tourId;
    (0, $11388bf57d312a1a$export$8d5bdbf26681c0c2)(tourId);
// console.log(tourId);
});
const $ad003ad2cccc2e2f$var$alertMessage = document.querySelector("body").dataset.alert;
if (alert) (0, $e8aab4af92df3c33$export$de026b00723010c1)("success", $ad003ad2cccc2e2f$var$alertMessage, 10);


//# sourceMappingURL=bundle.js.map

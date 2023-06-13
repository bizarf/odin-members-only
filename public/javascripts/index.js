// function to make the new message form visible
const openNewMessageForm = function () {
    const form = document.querySelector(".newMessageFormDiv");
    const submitBtn = document.querySelector(".submitBtn");
    form.style.display = "flex";
    submitBtn.style.display = "none";
};

// cancel button function to remove the new message function
const cancelNewMessageForm = () => {
    const form = document.querySelector(".newMessageFormDiv");
    const submitBtn = document.querySelector(".submitBtn");
    form.style.display = "none";
    submitBtn.style.display = "block";
    document.querySelector("#newMessageTitle").value = "";
    document.querySelector("#newMessageText").value = "";
};

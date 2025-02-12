function likePost(button) {
    let currentText = button.innerText;
    if (currentText === "Like") {
        button.innerText = "Liked";
        button.style.color = "red";
    } else {
        button.innerText = "Like";
        button.style.color = "#1877f2";
    }
}

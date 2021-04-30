document.querySelectorAll(".wrapper").forEach((element, index) =>{
    element.addEventListener("click", e => {
        let titleMenu = document.querySelectorAll(".title-menu");
        document.querySelectorAll(".drop-down-list")[index].classList.toggle("open");
        titleMenu[index].textContent = e.target.textContent;
        let field = {
            Size: titleMenu[0].textContent,
            FirstGamer: titleMenu[1].textContent
        };
        localStorage.setItem("field", JSON.stringify(field));
    });
});
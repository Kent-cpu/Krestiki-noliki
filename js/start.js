const buttonOpen = document.querySelectorAll(".wrapper");
let sizeField, firstPlayer;

buttonOpen.forEach((el, index) =>{
    el.addEventListener("click", (e) =>{
        let titleMenu = document.querySelectorAll(".title-menu");
        document.querySelectorAll(".drop-down-list")[index].classList.toggle("open");
        titleMenu[index].textContent = e.target.textContent;
        sizeField = titleMenu[0].textContent;
        firstPlayer = titleMenu[1].textContent;
    })
})


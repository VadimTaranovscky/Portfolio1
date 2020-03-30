const sendOrderElement = document.getElementById("sendOrder");
const date = document.getElementById("date");
const burgerElement = document.querySelector(".burger");
const linkListElement = document.querySelector(".link-list");
const linksElements = linkListElement.querySelectorAll("li");

// only elements for animate
const infoBlock = document.querySelector(".info-block");
const newStuff = document.querySelector(".new-stuff");
const infoIntro = document.querySelector(".info-intro");
const pictureInfoBlock = document.querySelector(".picture-info");
const pictures = pictureInfoBlock.querySelectorAll(".img-item");
const arrItems = Array.from(
  pictureInfoBlock.querySelectorAll(".animated-info")
);

$(document).ready(function() {
  $('.parallax').parallax();
  $('.row-item').find('#people').formSelect();
  $(".animated-move").on("click", "a", function(event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top + 200;
    $("body,html").animate({ scrollTop: top }, 1000);
  });
  if (innerWidth > 1200) {
    arrItems.forEach(item => {
      item.style.opacity = 0;
    });
    for (let item of pictures) {
      item.style.opacity = 0;
    }
    newStuff.firstElementChild.style.opacity = 0;
    newStuff.lastElementChild.style.opacity = 0;
    for (let item of infoBlock.children) {
      item.style.opacity = 0;
    }
    infoIntro.firstElementChild.classList.add("fadeInRight");
    infoIntro.firstElementChild.nextElementSibling.classList.add("fadeInRight");
    infoIntro.lastElementChild.firstElementChild.classList.add("fadeInRight");
  } else {
    infoIntro.firstElementChild.classList.add("fadeInDown");
    infoIntro.firstElementChild.nextElementSibling.classList.add("fadeInDown");
    infoIntro.lastElementChild.firstElementChild.classList.add("fadeInUp");
  }
});

const checkDate = month => {
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};

const calendar = new Date();
const currentDate = `${calendar.getDate()}.${checkDate(
  calendar.getMonth() + 1
)}.${calendar.getFullYear()}`;
date.value = currentDate
  .split(".")
  .reverse()
  .join("-");

class Order {
  constructor(people, date, time, name, email, phone) {
    this.id = 1;
    this.people = people;
    this.date = date;
    this.time = time;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

const checkVal = list => {
  const checkArr = [...list];
  const checked = checkArr.some(element => {
    if (element.value == "" || element.value == null) {
      return true;
    } else {
      return false;
    }
  });
  return checked;
};

const checkEmail = str => {
  const mailRegex = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  return mailRegex.test(str);
};

const checkPhone = phone => {
  const phoneRegex = /^\d[\d\(\)\ -]{4,14}\d$/;
  return phoneRegex.test(phone);
};

const setAnimateClass = kids => {
  for (let item of kids) {
    item.style.opacity = 1;
    item.classList.add("animated");
  }
};

window.addEventListener("scroll", () => {
  if (pageYOffset >= 350 && innerWidth > 1200) {
    setAnimateClass(infoBlock.children);
    infoBlock.firstElementChild.classList.add("fadeInDown");
    infoBlock.lastElementChild.classList.add("fadeInUp");
  }
  if (pageYOffset >= 850 && innerWidth > 1200) {
    setAnimateClass(newStuff.children);
    newStuff.firstElementChild.classList.add("bounceInLeft");
    newStuff.lastElementChild.classList.add("bounceInRight");
  }
  if (pageYOffset >= 2050 && innerWidth > 1200) {
    for (let item of pictures) {
      item.style.opacity = 1;
      item.classList.add("fadeIn");
    }
    arrItems.forEach(item => {
      item.style.opacity = 1;
      item.classList.add("fadeInDown");
    });
  }
});

burgerElement.addEventListener("click", () => {
  linkListElement.classList.toggle("link-list-active");
  document.body.classList.toggle("scroll-false");
  linksElements.forEach((item, index) => {
    if (item.style.animation) {
      item.style.animation = "";
    } else {
      item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
        0.5}s`;
    }
  });
  burgerElement.classList.toggle("toggle");
});

sendOrderElement.addEventListener("click", () => {
  const inputNodeList = document.querySelectorAll(".book-section input");
  const peopleSelectElement = document.getElementById("people");
  const checked = checkVal(inputNodeList);
  const [date, time, name, eMail, phone] = inputNodeList;
  const mailChecked = checkEmail(eMail.value);
  const phoneChecked = checkPhone(phone.value);

  if (checked == true) {
    swal({
      title: "Некоторые поля не были заполнены!",
      text: "Попробуйте еще раз",
      icon: "error",
      button: true,
      closeOnClickOutside: false
    });
  } else {
    if (mailChecked == false || phoneChecked == false) {
      swal({
        title: "Некоторые поля были заполнены не корректно!",
        text: "Попробуйте еще раз",
        icon: "error",
        button: true,
        closeOnClickOutside: false
      });
    } else {
      const newOrder = new Order(
        peopleSelectElement.options[peopleSelectElement.selectedIndex].value,
        date.value,
        time.value,
        name.value,
        eMail.value,
        phone.value
      );
      console.log(newOrder);
      swal({
        title: "Заказ успешно принят!",
        icon: "success",
        button: true,
        closeOnClickOutside: false
      });
      for (let item of inputNodeList) {
        item.value = "";
      }
    }
  }
});

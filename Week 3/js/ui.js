document.addEventListener("DOMContentLoaded", function () {
  //Sidenav Initialization
  const menus = document.querySelector(".sidenav");
  M.Sidenav.init(menus, { edge: "right" });
  //Side Form
  const forms = document.querySelector(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});

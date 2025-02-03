$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
 });
 $("#menu-toggle-2").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled-2");
    $('#menu ul').hide();
 });
 

 const toggler = document.querySelector(".btn");
toggler.addEventListener("click", function() {
  document.querySelector("#sidebar").classList.toggle("collapsed");
});

const user_name = "Harsh"
const user_button = document.getElementById('user-name');
user_button.innerHTML = '<img src="../icons/sidebar/user.png" alt="User Image" class="rounded bg-secondary" style="margin-right: 5px; background-color: #fff; color: #6c757d"> ' + "    " +user_name;

 $(document).ready(function() {
    var currentPath = window.location.pathname;
    console.log("value of the currentPath",currentPath);
    let current_url = currentPath.split('/');
    current_url = '/' + current_url[current_url.length - 1];
    console.log("value of the currentPath",currentPath," ascsdasd ",current_url);
  
    // Highlight the active item based on the URL path
    $('#sidebar li a').each(function() {
        var linkPath = $(this).attr('href') + '.html';
        console.log("value of the currentPath",currentPath," ascsdasd ",current_url, " linkPath ",linkPath, " condition ",(current_url === linkPath),$(this),"parent -> ",$(this).parent());
        if (current_url === linkPath) {
          $(this).parent().css({"list-style": "none",
            "padding-left": "-1rem"
          });
          $(this).css({
                "text-decoration": "none",
                "color": "#fff",
                "background": "rgba(255, 255, 255, 0.2)",
                /* Uncomment the desired border style */
                // "border-left": "red 2px solid",
                "border-left": "#fff 2px solid",
            });
        }else{
            $(this).parent().css({"list-style": "none",
                "padding-left": "-1rem"
              });
        }
    });
 });
const balancePrice = document.getElementById("my-balance-price");
const monthTotalPrice = document.getElementById("bottom-row-price");
const percentageRatio = document.getElementById("bottom-row-percentage-span");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Weekdays
    const weekdays = document.querySelectorAll(".chart-label");

    data.forEach((item, index) => {
      if (weekdays[index]) {
        weekdays[index].textContent = item.day;
      }

      const bars = document.getElementsByClassName("chart-bar");
      const popup = document.querySelectorAll("#popup");

      data.forEach((value, index2) => {
        if (bars[index2]) {
          bars[index2].style.height = `${value.amount}%`;
        }

        bars[index].addEventListener("click", (e) => {
          // Clear previous click popups
          popup.forEach((popup) => {
            popup.textContent = "";
          });

          // Disable all bars
          for (let i = 0; i < bars.length; i++) {
            bars[i].classList.remove("active");
          }

          // Enable the clicked bar
          bars[index].classList.add("active");

          // Show the popup for the clicked bar
          popup[index].textContent = `$${item.amount}`;
        });
      });
    });
    const totalAmount = data.reduce((total, item) => total + item.amount, 0);

    // Update the textContent of monthTotalPrice
    monthTotalPrice.textContent = `$${totalAmount.toFixed(2)}`;
  })
  .catch((error) => {
    console.log("Error", error);
  });

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const images = document.querySelectorAll(".bike-img");

  const selectedFilters = {
    displacement: null,
    brand: null,
    type: null,
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const group = this.getAttribute("data-group");
      const filterValue = this.getAttribute("data-filter");

      // ✅ 再次點選取消該條件
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        selectedFilters[group] = null;
      } else {
        // ✅ 清除同 group 的 active 狀態
        buttons.forEach(b => {
          if (b.getAttribute("data-group") === group) {
            b.classList.remove("active");
          }
        });
        this.classList.add("active");
        selectedFilters[group] = filterValue;
      }

      // ✅ 判斷目前選了幾個條件
      const selectedCount = Object.values(selectedFilters).filter(v => v !== null).length;

      images.forEach((img) => {
        let matchCount = 0;

        if (
          selectedFilters.displacement &&
          img.getAttribute("data-displacement") === selectedFilters.displacement
        ) matchCount++;

        if (
          selectedFilters.brand &&
          img.getAttribute("data-brand") === selectedFilters.brand
        ) matchCount++;

        if (
          selectedFilters.type &&
          img.getAttribute("data-type") === selectedFilters.type
        ) matchCount++;

        // ✅ 顯示邏輯：
        // - 選了 N 個條件，就只顯示 match N 個條件的圖片
        // - 選 0 個條件則隱藏全部
        if (selectedCount > 0 && matchCount == selectedCount) {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });
    });
  });
});

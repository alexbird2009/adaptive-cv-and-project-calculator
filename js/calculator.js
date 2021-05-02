const technologiesSelect = document.querySelector(
    "#calculator-form-technologies"
);

const technologiesMultiSelect = new Choices(technologiesSelect, {
    allowSearch: false,
    silent: false,
    renderChoiceLimit: -1,
    maxItemCount: -1,
    removeItems: true,
    removeItemButton: true,
    editItems: false,
    duplicateItemsAllowed: false,
    delimiter: ",",
    paste: true,
    searchEnabled: false,
    searchChoices: true,
    searchResultLimit: -1,
    position: "auto",
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    placeholder: true,
    noChoicesText: "No available options",
    itemSelectText: "Click to select",
    classNames: {
        containerInner: "choices__inner tech-input-container",
        input: "choices__input",
    },
});

calculateSum();

const calculatorForm = document.querySelector(".calculator-form");
// console.log(calculatorForm);

function calculateSum() {
    // Selectors
    const websiteTypeSelect = document.querySelector(
        "#calculator-form-website-type"
    );
    const websiteCartSelect = document.querySelector(
        "#calculator-form-input-cart input:checked"
    );

    const websiteReceptionSelect = document.querySelector(
        "#calculator-form-input-reception input:checked"
    );
    // Values
    const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value);

    const technologiesValue = getTechnologiesSum(
        technologiesMultiSelect.getValue()
    );

    const websiteCartValue = getPriceFromCartOption(websiteCartSelect.value);

    const websiteReceptionValue = getPriceFromReceptionOption(
        websiteReceptionSelect.value
    );

    totalSum =
        websiteTypeValue +
        technologiesValue +
        websiteCartValue +
        websiteReceptionValue;

    renderTotalSum(totalSum);
}

calculatorForm.addEventListener("submit", function (event) {
    event.preventDefault();
    calculateSum();
});

function renderTotalSum(sum) {
    const totalCostValue = document.querySelector(
        ".calculator-form-total-cost"
    );
    totalCostValue.textContent = "Calculating...";
    setTimeout(() => (totalCostValue.textContent = `${sum}$`), 2000);
}

function getPriceFromCartOption(option) {
    if (option === "yes") {
        return 300;
    }
    return 0;
}

function getPriceFromReceptionOption(option) {
    if (option === "yes") {
        return 500;
    }
    return 0;
}

function getTechnologiesSum(technologiesValueArr) {
    let totalTechSum = 0;
    technologiesValueArr.forEach(
        (tech) =>
            (totalTechSum = totalTechSum + extractPriceFromValue(tech.value))
    );
    return totalTechSum;
}

function extractPriceFromValue(str) {
    const price = str.match(/:\d+/);

    if (price) {
        return Number(price[0].slice(1)) || 0;
    }

    return 0;
}

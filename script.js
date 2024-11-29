// Dummy unit data
const unitData = [
	{
		id: 1,
		title: '1 Unit',
		discount: '10% Off',
		type: 'Standard Price',
		price: 10,
		originalPrice: 24,
		options: [
			{ id: 1, size: ['S', 'M', 'L', 'XL'], color: ['Black', 'White', 'Red'] },
			{ id: 2, size: ['S', 'M', 'L', 'XL'], color: ['Black', 'White', 'Red'] },
		],
	},
	{
		id: 2,
		title: '2 Unit',
		discount: '20% Off',
		price: 18,
		type: '',
		originalPrice: 24,
		options: [
			{ id: 1, size: ['S', 'M', 'L', 'XL'], color: ['Black', 'White', 'Red'] },
			{ id: 2, size: ['S', 'M', 'L', 'XL'], color: ['Black', 'White', 'Red'] },
		],
		badge: 'MOST POPULAR',
	},
	{
		id: 3,
		title: '3 Unit',
		discount: '30% Off',
		price: 24,
		type: '',
		originalPrice: 24,
		options: [
			{ id: 1, size: ['S', 'M', 'L', 'XL'], color: ['Black', 'White', 'Red'] },
			{ id: 2, size: ['S', 'M', 'L', 'XL'], color: ['Black', 'White', 'Red'] },
		],
	},
];
// define elements
const unitContainer = document.getElementById('unit-container');
const totalPriceElement = document.querySelector('.total');

// render units
const renderUnits = units => {
	unitContainer.innerHTML = '';
	units.forEach(unit => {
		const unitDiv = document.createElement('label');
		unitDiv.className = 'unit-option';
		unitDiv.innerHTML = `
      <input type="radio" name="unit" value="${unit.id}" ${
			unit.id === 2 ? 'checked' : ''
		} class="hidden-radio" />
      ${
				unit.badge
					? `<div class="badge"><span class="triangle left"></span>${unit.badge}<span class="triangle right"></span></div>`
					: ''
			}
      <div class="details">
      <div class="title-label-container">
        <div class="top-row">
          <div class="checkbox-wrapper">
            <div class="round">
              <input type="checkbox" id="checkbox-${unit.id}" ${
			unit.id === 2 ? 'checked' : ''
		} />
              <label for="checkbox-${unit.id}"></label>
            </div>
          </div>
          <div>
            <div class="unit-details">
              <span class="unit-title">${unit.title}</span>
              <span class="discount">${unit.discount}</span>
             </div>
              <span class="type">${unit.type}</span>
          </div>
        </div>
        <div class="price-row">
        <span class="price">$${unit.price}.00 USD</span>
          <span class="original-price">$${unit.originalPrice}.00 USD</span>
        </div>    
      </div>
        <div class="options-container" style="display: ${
					unit.id === 2 ? 'block' : 'none'
				};">
        <div class="options-header">
          <p>Size</p>
          <p>Colour</p>
        </div>
          ${unit.options
						.map(
							(option, index) => `
           <div class="option-num-container">
            <span class="option-num">#${index + 1}</span>
            <div class="option">
              <select class="size-select">
                ${option.size
									.map(size => `<option value="${size}">${size}</option>`)
									.join('')}
              </select>
              <select class="color-select">
                ${option.color
									.map(color => `<option value="${color}">${color}</option>`)
									.join('')}
              </select>
            </div>
          </div>
          `
						)
						.join('')}
        </div>
      </div>
    `;
		unitContainer.appendChild(unitDiv);
	});
	// attach listeners
	attachListeners();
	const initialSelectedUnit = unitData.find(unit => unit.id === 2);
	updateTotalPrice(initialSelectedUnit.price);
	highlightActiveUnit(document.querySelector('input[name="unit"]:checked'));
};

const attachListeners = () => {
	const unitOptions = document.querySelectorAll('input[name="unit"]');
	unitOptions.forEach(option => {
		option.addEventListener('change', e => {
			const selectedUnitId = parseInt(e.target.value);
			const selectedUnit = unitData.find(unit => unit.id === selectedUnitId);

			// Update checkbox when radio is selected
			document
				.querySelectorAll('.round input[type="checkbox"]')
				.forEach(checkbox => {
					checkbox.checked = checkbox.id === `checkbox-${selectedUnitId}`;
				});

			updateTotalPrice(selectedUnit.price);
			highlightActiveUnit(e.target);
			toggleOptionsVisibility(selectedUnit, e.target);
		});
	});

	// Update radio when checkbox is selected
	const checkboxes = document.querySelectorAll('.round input[type="checkbox"]');
	checkboxes.forEach(checkbox => {
		checkbox.addEventListener('change', e => {
			const unitId = e.target.id.split('-')[1];
			const radioButton = document.querySelector(
				`input[name="unit"][value="${unitId}"]`
			);
			radioButton.checked = true;
			radioButton.dispatchEvent(new Event('change'));
		});
	});
};

// update total price
const updateTotalPrice = price => {
	totalPriceElement.innerHTML = `Total : $${price}<span class="price-updated-currency">.00 USD</span>`;
};

// highlight active unit
const highlightActiveUnit = selectedInput => {
	document
		.querySelectorAll('.unit-option')
		.forEach(option => option.classList.remove('active'));
	selectedInput.closest('.unit-option').classList.add('active');
};

// toggle options
const toggleOptionsVisibility = (selectedUnit, selectedInput) => {
	document
		.querySelectorAll('.options-container')
		.forEach(container => (container.style.display = 'none'));
	const optionsContainer = selectedInput
		.closest('.unit-option')
		.querySelector('.options-container');
	if (selectedUnit.options && selectedUnit.options.length) {
		optionsContainer.style.display = 'block';
	}
};

renderUnits(unitData);

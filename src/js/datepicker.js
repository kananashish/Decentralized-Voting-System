document.addEventListener('DOMContentLoaded', () => {
    const datePickerInputs = document.querySelectorAll('.date-picker-input');

    datePickerInputs.forEach(input => {
        const container = input.parentElement; // This is the .date-picker-container
        const datePickerElement = document.createElement('div');
        datePickerElement.className = 'date-picker';
        // Append the picker INSIDE the container, so it's positioned correctly.
        container.appendChild(datePickerElement);

        let currentDate = new Date();
        let selectedDate = null;
        
        const updatePickerPosition = () => {
            const containerRect = container.getBoundingClientRect();
            const pickerHeight = datePickerElement.offsetHeight;
            const spaceBelow = window.innerHeight - containerRect.bottom;

            if (spaceBelow < pickerHeight && containerRect.top > pickerHeight) {
                datePickerElement.classList.add('picker-above');
            } else {
                datePickerElement.classList.remove('picker-above');
            }
        };

        const renderCalendar = () => {
            datePickerElement.innerHTML = ''; 
            const header = document.createElement('div');
            header.className = 'date-picker-header';

            const prevMonthButton = document.createElement('button');
            prevMonthButton.innerHTML = '‹';
            prevMonthButton.onclick = (e) => {
                e.stopPropagation(); 
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            };

            const nextMonthButton = document.createElement('button');
            nextMonthButton.innerHTML = '›';
            nextMonthButton.onclick = (e) => {
                e.stopPropagation(); 
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            };

            const monthYearContainer = document.createElement('div');
            monthYearContainer.className = 'month-year-selectors';

            const monthSelect = document.createElement('select');
            monthSelect.className = 'month-select';
            for (let i = 0; i < 12; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = new Date(0, i).toLocaleString('default', { month: 'long' });
                if (i === currentDate.getMonth()) option.selected = true;
                monthSelect.appendChild(option);
            }
            monthSelect.onchange = (e) => {
                e.stopPropagation();
                currentDate.setMonth(e.target.value);
                renderCalendar();
            };
            monthSelect.onclick = (e) => e.stopPropagation();

            const yearSelect = document.createElement('select');
            yearSelect.className = 'year-select';
            const currentYear = new Date().getFullYear();
            for (let i = currentYear - 10; i <= currentYear + 10; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                if (i === currentDate.getFullYear()) option.selected = true;
                yearSelect.appendChild(option);
            }
            yearSelect.onchange = (e) => {
                e.stopPropagation();
                currentDate.setFullYear(e.target.value);
                renderCalendar();
            };
            yearSelect.onclick = (e) => e.stopPropagation();

            monthYearContainer.appendChild(monthSelect);
            monthYearContainer.appendChild(yearSelect);

            header.appendChild(prevMonthButton);
            header.appendChild(monthYearContainer);
            header.appendChild(nextMonthButton);
            datePickerElement.appendChild(header);

            const daysGrid = document.createElement('div');
            daysGrid.className = 'days-grid';

            const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            weekdays.forEach(day => {
                const weekdayElem = document.createElement('div');
                weekdayElem.className = 'weekday';
                weekdayElem.textContent = day;
                daysGrid.appendChild(weekdayElem);
            });

            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

            for (let i = 0; i < firstDayOfMonth; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'day empty';
                daysGrid.appendChild(emptyDay);
            }

            for (let i = 1; i <= daysInMonth; i++) {
                const dayElem = document.createElement('div');
                dayElem.className = 'day';
                dayElem.textContent = i;

                const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
                const today = new Date();
                if (thisDate.toDateString() === today.toDateString()) {
                    dayElem.classList.add('today');
                }
                
                if (selectedDate && thisDate.toDateString() === selectedDate.toDateString()) {
                    dayElem.classList.add('selected');
                }

                dayElem.onclick = (e) => {
                    e.stopPropagation();
                    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
                    input.value = selectedDate.toLocaleDateString();
                    datePickerElement.classList.remove('visible');
                };
                daysGrid.appendChild(dayElem);
            }

            datePickerElement.appendChild(daysGrid);
        };

        // Toggle calendar visibility when clicking the container (input or icon)
        container.addEventListener('click', (e) => {
            // Don't re-open if we are clicking inside an already open picker
            if (datePickerElement.contains(e.target)) return;
            
            const isVisible = datePickerElement.classList.toggle('visible');
            if (isVisible) {
                renderCalendar();
                updatePickerPosition();
            }
        });

        // Close picker when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                datePickerElement.classList.remove('visible');
            }
        });
    });
});

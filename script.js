    document.addEventListener('DOMContentLoaded', () => {
    const colorForm = document.getElementById('colorForm');
    const historyList = document.getElementById('historyList');
    const colorDetails = document.getElementById('colorDetails');
    const clearHistoryBtn = document.getElementById('clearHistory');

    colorForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const dateInput = document.getElementById('dateInput').value;

        const apiUrl = `https://colors.zoodinkers.com/api?date=${dateInput}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            displayColorDetails(data);

            saveToLocalStorage(dateInput);

            displaySearchHistory();
        } catch (error) {
            console.error('Error fetching color data:', error);
        }
    });

    clearHistoryBtn.addEventListener('click', () => {
        localStorage.removeItem('searchHistory');
        displaySearchHistory();
    });

    function displayColorDetails(data) {
        const colorBox = document.createElement('div');
        colorBox.className = 'colorBox';
        colorBox.style.backgroundColor = data.hex;
    
        const detailsHtml = `<p>Date: ${data.date}</p><p>Hex: ${data.hex}</p>`;
        
        colorDetails.innerHTML = '';
    
        colorDetails.appendChild(colorBox);
        colorDetails.innerHTML += detailsHtml;
    }
    
    function saveToLocalStorage(date) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory.push(date);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    function displaySearchHistory() {
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        historyList.innerHTML = '';

        if (searchHistory.length > 0) {
            searchHistory.forEach((date) => {
                const listItem = document.createElement('li');
                listItem.textContent = date;
                historyList.appendChild(listItem);
            });
        } else {
            historyList.innerHTML = '<li>No search history available</li>';
        }
    }

    displaySearchHistory();
});

async function displayTimezones() {
    const timezones = [
        { city: "America/Argentina/Buenos_Aires", flag: "🇦🇷" },
        { city: "America/La_Paz", flag: "🇧🇴" },
        { city: "America/Sao_Paulo", flag: "🇧🇷" },
        { city: "America/Santiago", flag: "🇨🇱" },
        { city: "America/Bogota", flag: "🇨🇴" },
        { city: "America/Costa_Rica", flag: "🇨🇷" },
        { city: "America/Havana", flag: "🇨🇺" },
        { city: "America/Guayaquil", flag: "🇪🇨" },
        { city: "America/El_Salvador", flag: "🇸🇻" },
        { city: "America/Guatemala", flag: "🇬🇹" },
        { city: "America/Tegucigalpa", flag: "🇭🇳" },
        { city: "America/Mexico_City", flag: "🇲🇽" },
        { city: "America/Managua", flag: "🇳🇮" },
        { city: "America/Panama", flag: "🇵🇦" },
        { city: "America/Asuncion", flag: "🇵🇾" },
        { city: "America/Lima", flag: "🇵🇪" },
        { city: "America/Santo_Domingo", flag: "🇩🇴" },
        { city: "America/Montevideo", flag: "🇺🇾" },
        { city: "America/Caracas", flag: "🇻🇪" },
        { city: "Europe/Madrid", flag: "🇪🇸" }
    ];

    const resultsDiv = document.getElementById('timezones');
    resultsDiv.innerHTML = '';

    const inputDateTime = document.getElementById('datetime').value;

    // Validar que se ingresó una fecha
    if (!inputDateTime) {
        alert("Por favor, ingrese una fecha y hora válidas.");
        return;
    }

    const localDate = new Date(inputDateTime);

    const groupedTimezones = {};

    for (const tz of timezones) {
        const localTime = localDate.toLocaleString('en-US', { timeZone: tz.city });
        const date = new Date(localTime);
        
        // Formatear a 12 horas con A.M./P.M.
        let options = { hour: '2-digit', minute: '2-digit', hour12: true };
        let timeString = date.toLocaleString('en-US', options).replace(',', '').trim();
        
        // Convertir a mayúsculas A.M./P.M.
        timeString = timeString.replace(/\s*(a\.m\.|p\.m\.)/gi, (match) => match.toUpperCase());

        if (!groupedTimezones[timeString]) {
            groupedTimezones[timeString] = [];
        }
        groupedTimezones[timeString].push(tz.flag);
    }

    resultsDiv.innerHTML += '<h2>🔔HORARIOS:</h2>';
    for (const [time, flags] of Object.entries(groupedTimezones)) {
        resultsDiv.innerHTML += `${time} ${flags.join(' ')}<br>`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const now = new Date();
    const formattedDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    document.getElementById('datetime').value = formattedDate;

    document.querySelector('button').addEventListener('click', displayTimezones);
});
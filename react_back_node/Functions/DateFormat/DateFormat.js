function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois en JavaScript commencent à 0 pour janvier
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}


module.exports = formatDateToDDMMYYYY;
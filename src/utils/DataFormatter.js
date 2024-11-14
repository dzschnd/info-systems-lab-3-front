export const formatDateArrayToInputValue = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 3) return '';
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day);
    return date.toISOString().split('T')[0];
};

export const formatUnixTimestampToInputValue = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toISOString().split('T')[0];
};

export const formatMillisecondsTimestampToInputValue = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp); // No need to multiply by 1000 since the input is in milliseconds
    return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
};
function prepareDate(date) {
    const dateArr = date.split('-');

    return new Date(dateArr).getTime();
}

export default prepareDate;

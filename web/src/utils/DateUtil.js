class DateUtil {

    newDateMessage(dateNow) {
        let day = dateNow.getDate().toString();
        day = (day.length === 1) ? '0'+day : day;
        let month = String(dateNow.getMonth() + 1);
        month = (month.length === 1) ? '0'+month : month;
        let fullYear = dateNow.getFullYear();
        return(day+ '-' + month + '-' + fullYear);
    }
    
    newHourMessage(dateNow) {
        let hour = dateNow.getHours().toString();
        hour = (hour.length === 1) ? '0' + hour : hour;
        let minute = dateNow.getMinutes().toString();
        minute = (minute.length === 1) ? '0' + minute : minute;
        return hour + ':' + minute;
    }
}

export default new DateUtil();
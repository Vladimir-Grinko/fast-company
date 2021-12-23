export function dateCreatedComment(createdAt) {
    let dateText = " ";
    const timePassed = new Date().valueOf() - Number(createdAt);
    const seconds = Math.floor(timePassed / 1000);
    const oneSecond = 1;
    const minute = oneSecond * 60;
    const oneDay = oneSecond * 60 * 60 * 24;
    const oneYear = oneSecond * 60 * 60 * 24 * 365;

    const dateComment = new Date(Number(createdAt));

    const optionsFullDate = { year: "numeric", month: "long", day: "numeric" };
    const optionsMonthDay = { month: "long", day: "numeric" };

    if (seconds <= minute) {
        dateText = " - 1 минуту назад";
    } else if (seconds > minute && seconds <= minute * 5) {
        dateText = " - 5 минут назад";
    } else if (seconds > minute * 5 && seconds <= minute * 10) {
        dateText = " - 10 минут назад";
    } else if (seconds > minute * 10 && seconds < minute * 30) {
        dateText = " - 30 минут назад";
    } else if (seconds > minute * 30 && seconds <= minute * 60) {
        dateText = " - 1 час назад";
    } else if (seconds > minute * 60 && seconds <= oneDay) {
        dateText = ` - ${dateComment.getHours()}:${dateComment.getMinutes()}`;
    } else if (seconds > oneDay && seconds <= oneYear) {
        dateText = ` - ${dateComment.toLocaleDateString("UTS", optionsMonthDay)}`;
    } else if (seconds > oneYear) {
        dateText = ` - ${dateComment.toLocaleDateString("UTS", optionsFullDate)}`;
    }
    return dateText;
}

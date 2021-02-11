const moment = require("moment");
moment.locale("pt-BR");

function FormatDuration (Formato) {
    let uptime = ``;

    let years = parseInt(moment.duration(Date.now() - Formato).asYears())
    years = years <= 1 ? years + ' ano' : years + ' anos';

    let months = parseInt(moment.duration(Date.now() - Formato).months())
    months = months <= 1 ? months + ' mês' : months + ' meses';

    let days = parseInt(moment.duration(Date.now() - Formato).days())
    days = days <= 1 ? days + ' dia' : days + ' dias';

    let hours = parseInt(moment.duration(Date.now() - Formato).hours())
    hours = hours <= 1 ? hours + ' hora' : hours + ' horas';

    let minutes = parseInt(moment.duration(Date.now() - Formato).minutes())
    minutes = minutes <= 1 ? minutes + ' minuto' : minutes + ' minutos';

    let seconds = parseInt(moment.duration(Date.now() - Formato).seconds())
    seconds = seconds <= 1 ? seconds + ' segundo' : seconds + ' segundos';

    Number(years.split(' ')[0]) > 0 ? uptime += `${years}, ${months} e ${days}` : Number(months.split(' ')[0]) > 0 ? uptime += `${months}, ${days} e ${hours}` : Number(hours.split(' ')[0]) > 0 ? uptime += `${hours}, ${minutes} e ${seconds}` : Number(minutes.split(' ')[0]) > 0 ? uptime += `${minutes} e ${seconds}` : Number(seconds.split(' ')[0]) > 0 ? uptime += `${seconds}` : uptime += `Alguns milissegundo`

    return uptime;
}

function Format(Formato) {
    let uptime = ``;

    let days = parseInt(moment.duration(Formato).days())
    days = days <= 1 ? days + ' dia' : days + ' dias';

    let hours = parseInt(moment.duration(Formato).hours())
    hours = hours <= 1 ? hours + ' hora' : hours + ' horas';

    let minutes = parseInt(moment.duration(Formato).minutes())
    minutes = minutes <= 1 ? minutes + ' minuto' : minutes + ' minutos';

    let seconds = parseInt(moment.duration(Formato).seconds())
    seconds = seconds <= 1 ? seconds + ' segundo' : seconds + ' segundos';

    Number(days.split(' ')[0]) > 0 ? uptime += `${days}, ${hours} e ${minutes}` : Number(hours.split(' ')[0]) > 0 ? uptime += `${hours}, ${minutes} e ${seconds}` : Number(minutes.split(' ')[0]) > 0 ? uptime += `${minutes} e ${seconds}` : Number(seconds.split(' ')[0]) > 0 ? uptime += `${seconds}` : uptime += `Alguns milissegundo`
}

module.exports.date = FormatDuration;
module.exports.other = Format;
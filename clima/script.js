document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()// desativa os evento padrao

    let input = document.querySelector('#searchInput').value

    if(input !== '') {
        showWarning('carrengando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b29dfff8baad1a3c0f0fd53ff4be030f&units=metric&lang=pt_br
        `
        let results = await fetch(url)//vai pegar o resultado da url
        let json = await results.json()

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            showWarning('não encontramos está localização')
            document.querySelector('.resultado').style.display = 'none'
        }
    }
})

const showInfo = (json) => {
    showWarning('')

    document.querySelector('.tempInfo').innerHTML = `${json.temp}<span>ºC</span>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`
    document.querySelector('.titulo').innerHTML = `${json.name}`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

const showWarning = (msg) => {
    document.querySelector('.aviso').innerHTML = msg
}
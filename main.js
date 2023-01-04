// FORNECENDO DADODS
const key = '3ZUP4TJR2DUTXLQQ4CEZSCQSA'

// IMPORTANDO COMPONENTES
const uvHtml = document.getElementById('uv')
const inputHtml = document.getElementById('input')
const buttonHtml = document.getElementById('enviar')
const addressHtml = document.getElementById('address')
const feelingHtml = document.getElementById('feeling')
const humidityHtml = document.getElementById('humidity')
const weatherIcon = document.getElementById('weatherIcon')
const windSpeedHtml = document.getElementById('windSpeed')
const temperatureHtml = document.getElementById('temperature')
const iconForecast = document.querySelectorAll('.icon-forecast')
const diaHtml = document.querySelectorAll('.forecast-days .dia')
const previsaoHtml = document.querySelectorAll('.forecast-days span')

// FUNÇÔES
async function getForecast() {
  try {
    const address = inputHtml.value
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
      address.charAt(0).toUpperCase() + address.slice(1)
    }?unitGroup=metric&key=${key}`
    const response = await fetch(url)
    const data = await response.json()
    updateHtml(data)
  } catch (error) {
    console.error(error)
  }
}

// ATUALIZA OS DADOS DO HTML
function updateHtml(data) {
  inputHtml.value = ''

  // EXIBIR VALORES NO HTML
  temperatureHtml.innerHTML = `${parseInt(
    data.currentConditions.temp
  )}<sup>°</sup>`
  addressHtml.innerHTML = data.resolvedAddress
  feelingHtml.textContent = `${data.currentConditions.feelslike}°`
  uvHtml.innerText = data.currentConditions.uvindex
  windSpeedHtml.innerHTML = `${data.currentConditions.windspeed} <small>km/h</small>`
  humidityHtml.innerHTML = `${data.currentConditions.humidity}%`

  // MUDAR ICONE DEPENDENDO DO CLIMA DO LOCAL
  switch (data.currentConditions.icon) {
    case 'rain': // chvua
      weatherIcon.src = './assets/chuva.svg'
      break
    case 'partly-cloudy-day': // parcialmente nublado dia
      weatherIcon.src = './assets/parcialmente-nublado.svg'
      break
    case 'partly-cloudy-night': // parcialmente nublado noite
      weatherIcon.src = './assets/parcialmente-nublado-noite.svg'
      break
    case 'cloudy': // nublado
      weatherIcon.src = './assets/nublado.svg'
      break
    case 'clear-day': // limpo
      weatherIcon.src = './assets/sol.svg'
      break
    case 'snow':
      weatherIcon[i].src = './assets/neve.svg'
      break
  }

  // MUDAR DIA E ICONE DA PREVISAO DO TEMPO
  for (let i = 0; i <= data.days.length; i++) {
    previsaoHtml[i].innerHTML = `${Math.ceil(
      data.days[i].tempmax
    )}°/<small>${Math.ceil(data.days[i].tempmin)}</small>°`

    const dia = new Date(data.days[i].datetime)
    const day = dia.getUTCDay()
    switch (day) {
      case 0:
        diaHtml[i].textContent = 'Sunday'
        break
      case 1:
        diaHtml[i].textContent = 'Monday'
        break
      case 2:
        diaHtml[i].textContent = 'Tuesday'
        break
      case 3:
        diaHtml[i].textContent = 'Wednesday'
        break
      case 4:
        diaHtml[i].textContent = 'Thursday'
        break
      case 5:
        diaHtml[i].textContent = 'Friday'
        break
      case 6:
        diaHtml[i].textContent = 'Saturday'
        break
    }

    switch (data.days[i].icon) {
      case 'rain': // chuva
        iconForecast[i].src = './assets/chuva.svg'
        break
      case 'partly-cloudy-day': // parcialmente nublado dia
        iconForecast[i].src = './assets/parcialmente-nublado.svg'
        break
      case 'cloudy': // nublado
        iconForecast[i].src = './assets/nublado.svg'
        break
      case 'clear-day': // limpo
        iconForecast[i].src = './assets/sol.svg'
        break
      case 'snow': // neve
        iconForecast[i].src = './assets/neve.svg'
        break
    }
  }
}

// EXECUÇÔES
inputHtml.addEventListener('keyup', function (e) {
  if (e.code === 'Enter') {
    getForecast()
  }
})

buttonHtml.addEventListener('click', getForecast)

window.addEventListener('load', function () {
  getForecast()
})


let button = document.getElementById("button")
let search = document.getElementById("search")

let random = Math.floor(Math.random() * 8)
console.log(random)
// EVENTO DE CLICK
button.addEventListener("click", () => {
    console.log(search.value)
    buscarclima()
})

//EVENTO DE CLICAR NO ENTER
addEventListener("keydown", (e) => {
    //console.log(search.value)

    if (e.key == "Enter") {
        buscarclima()
    }
})

function buscarclima() {
    const key3 = "I5Eam4abFvgdPJ2LF--MZRukOMCYA3tGucJO1VFpAWk"
    fetch(`https://api.unsplash.com/search/photos?query=${search.value}&client_id=${key3}`)
        .then(response => response.json())
        .then(dat => {
            let img = dat.results[random].urls.full
            document.body.style.backgroundImage = `url(${img})`;
            console.log(dat)
        })


    let nospace = search.value.trim()
    let key2 = "0de776d455fb8bc4ef0467a2ebf5dc57"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nospace}&appid=${key2}&units=metric&lang=pt_br`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("city").innerText = data.name + ", " + data.sys.country
            document.getElementById("temp").innerText = data.main.temp + " °C"
            document.getElementById("img").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            document.getElementById("stage").innerText = data.weather[0].description
            console.log(data)
        }).catch(error => {
            document.getElementById("city").innerText = "Cidade não encontrada"
            console.log("error", error)
        })

    search.value = ""



}
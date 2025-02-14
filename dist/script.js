"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* Captura os elementos do botão e do campo de pesquisa */
const button = document.getElementById("button");
const search = document.getElementById("search");
/* Adiciona eventos de clique e tecla Enter para iniciar a busca */
if (button && search) {
    button.addEventListener("click", handleSearch);
    search.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            handleSearch();
    });
}
/* Função para lidar com a pesquisa */
function handleSearch() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!search)
            return;
        const query = search.value.trim();
        if (!query) {
            alert("Inválido, escreva algo válido");
            return;
        }
        yield buscarClima(query);
        search.value = ""; // Limpa o campo de pesquisa após a busca
    });
}
/* Função para buscar informações do clima e imagem de fundo */
function buscarClima(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const unsplashKey = "I5Eam4abFvgdPJ2LF--MZRukOMCYA3tGucJO1VFpAWk";
        const weatherKey = "0de776d455fb8bc4ef0467a2ebf5dc57";
        try {
            // Busca uma imagem no Unsplash para definir como fundo
            const img = yield buscarImagem(query, unsplashKey);
            if (img)
                document.body.style.backgroundImage = `url(${img})`;
        }
        catch (error) {
            console.warn("Erro ao buscar imagem:", error);
        }
        try {
            // Busca os dados do clima na API OpenWeather
            const weatherData = yield buscarDadosClima(query, weatherKey);
            if (weatherData)
                atualizarClima(weatherData);
        }
        catch (error) {
            console.warn("Erro ao buscar clima:", error);
            exibirErro();
        }
    });
}
/* Função para buscar imagem no Unsplash */
function buscarImagem(query, unsplashKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashKey}`);
        if (!response.ok)
            throw new Error("Erro ao buscar imagem");
        const data = yield response.json();
        console.log(data);
        if (data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            return data.results[randomIndex].urls.regular; // Retorna a URL da imagem
        }
        return null;
    });
}
/* Função para buscar dados do clima na API OpenWeather */
function buscarDadosClima(query, weatherKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${weatherKey}&units=metric&lang=pt_br`);
        if (!response.ok)
            throw new Error("Erro ao buscar clima");
        return response.json(); // Retorna os dados do clima em formato JSON
    });
}
/* Função para atualizar a interface com os dados do clima */
function atualizarClima(weatherData) {
    const city = document.getElementById("city");
    if (city)
        city.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
    const temp = document.getElementById("temp");
    if (temp)
        temp.innerText = `${weatherData.main.temp} °C`;
    const imgElement = document.getElementById("img");
    if (imgElement)
        imgElement.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    const stage = document.getElementById("stage");
    if (stage)
        stage.innerText = weatherData.weather[0].description;
}
/* Função para exibir erro quando a cidade não for encontrada */
function exibirErro() {
    const city = document.getElementById("city");
    if (city)
        city.innerText = "Cidade não encontrada";
}

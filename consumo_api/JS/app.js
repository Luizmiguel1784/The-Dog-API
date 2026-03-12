const container = document.getElementById("container")
const buscarcachorros = document.getElementById("buscarCachorros")
const input = document.getElementById("pesquisa")

async function BuscarCachorros(){

const raca = input.value

try{

const resposta = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${raca}`,
    {
        headers:{
"x-api-key": "live_Hl67QVVE8lOWXGkEVuLTIbcLLxvQTX7OfEfaOzS6kYtSXmwaK5dwFopy7AHzH5ga"
        }
    }
)

const dados = await resposta.json()

// se não encontrar raça
if(dados.length === 0){
container.innerHTML = "<p>Raça não encontrada</p>"
return
}

const dog = dados[0]

// cria a url da imagem
let imagem = ""

const respostaImage = await fetch(
`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`
)

const dadosImage = await respostaImage.json()

const image = dadosImage.url

container.innerHTML = ""

const card = document.createElement("div")
card.classList.add("card")

card.innerHTML = `
<img src="${image}" alt="${dog.name}">
<h3>${dog.name}</h3>
<p><strong>Temperamento:</strong> ${dog.temperament}</p>
<p><strong>Expectativa de vida:</strong> ${dog.life_span}</p>
`

container.appendChild(card)

}catch(erro){

container.innerHTML = "<p>Erro ao conectar com a API</p>"
console.error(erro)

}

}

buscarcachorros.addEventListener("click", BuscarCachorros)

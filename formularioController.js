async function enviarDados(event) {
  event.preventDefault()
  /* Primeiro devemos prevenir o comportamento padrão do formulário !
    Mas, o que seria esse comportamento padrão?
    
    Bom, se você está utilizando a tag <form> sempre que houver um envio de um formulário
    seja pelo click do botão ou pela função onsubmit do formulário ele vai redirecionar o usuário para alguma rota
    
    com o  você vai prevenir esse comportamento, ou seja não vai redirecionar quando o formulario
    for enviado
  */

  /* -------------------------------------------------------------------------------------------------- */

  // Segundo procedimento: Buscar os valores dos inputs do HTML:

  /* Ficou com dúvida e não sabe buscar os valores ? 
 Consulte essa URL: https://pt.stackoverflow.com/questions/21860/como-pegar-input-usando-html-e-javascript

 Utilize as constantes abaixos para armazenar os valores dos inputs:
*/

  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value
  const telefone = document.getElementById('telefone').value
  const cidade = document.getElementById('cidade').value

  const regras = document.getElementById('regras').checked
  const termos = document.getElementById('termos').checked
  const variaveis = {
    nome,
    email,
    telefone,
    cidade,
    regras,
    termos
  }
  /* -------------------------------------------------------------------------------------------------- */

  /* Agora vamos para a parte mais divertida xD

Bom, para realizar as requisições vamos utilizar o método nativo do próprio JavaScript, utilizando esse método
não precisaremos instalar alguma biblioteca para fazer as requisições!

O Método se chama fetch, com ele conseguimos realizar todas os métodos HTTPS (GET, POST, DELETE, PUT, PATCH)

*/

  await fetch('https://api-show-de-premios.herokuapp.com/clientes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      /* 
        Aqui você deve dizer para o cabeçalho da requisão qual o método que o navegador vai aceitar:
        JSON ou XML!

        Nesse exemplo vamos utilizar o JSON, então são 2 linhas que vocês precisam adicionar!
        
        Tópico relacionado: https://stackoverflow.com/questions/29775797/fetch-post-json-data
      */
    },
    body: JSON.stringify(variaveis)
  }).then(resposta => {
    /* Por fim aqui convertemos a resposta da requisição para o formato JSON, pois no cabeçalho da requisição
      falamos que será em JSON */

    alert('Deu certo amigao') // Aqui vai ser a função que vai chamar o modal ou você pode usar o alert() para apresentar uma mensagem de sucesso
    return resposta.json()
  })
}

async function contador() {
  const quant = document.getElementById('quant')
  await fetch('https://api-show-de-premios.herokuapp.com/clientes/count')
    .then(res => {
      return res.json()
    })
    .then(data => {
      const valor = data
      quant.innerHTML = `Quantidade de pessoas: ${valor} pessoas`
    })
}

contador()
/* Última coisa:

Só vai cair nessa parte do .then() quando der sucesso na requisição.

Caso der erro você utiliza o .catch() 

E nesse catch você também pode informar o usuário que deu erro!

Mas não vou explicar como faz, pesquisem e tentem fazer sozinhos!

*/

/* ---------------------------------------------- */

async function realizarsorteio() {
  await fetch('https://api-show-de-premios.herokuapp.com/clientes')
    .then(res => {
      return res.json()
    })
    .then(data => {
      const numeroAleatorio = Math.floor(Math.random() * data.length + 1)
      const index = data.find(usuario => usuario.id === numeroAleatorio)
      const ganhador = document.getElementById('ganhador')
      ganhador.innerHTML = `id: ${index.id} nome: ${index.nome}`
    })
}

/* Desafio proposto por Agência Premium 

Organizadores:
  - Diego Lopes,
  - Gabriel Castilho
  - Rafael Carvalho
*/

/* ---------------------------------------------- */

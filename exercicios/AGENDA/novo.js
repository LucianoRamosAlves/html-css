// ============================
// SELETORES PRINCIPAIS
// ============================

// Formulário principal
const form = document.querySelector("#form-agenda");

// Botão gravar (não usamos submit)
const btnGravar = document.querySelector("#btn_Gravar");

// ============================
// EVENTO DO BOTÃO
// ============================

btnGravar.addEventListener("click", () => {
  validarFormulario();
});

// ============================
// FUNÇÃO PRINCIPAL
// ============================

function validarFormulario() {
  // Executa todas as validações
  validarTelefone();
  validarEmail();
  validarData();
  validarHora();
  validarCategoria();
}

// ============================
// FUNÇÕES DE ESTADO VISUAL
// ============================

// Marca o campo como erro
function setErro(input, mensagem) {
  // Pega a div pai (.campoform)
  const campo = input.closest(".campoform");

  // Aplica classe de erro
  campo.classList.add("erro");
  campo.classList.remove("sucesso");

  // Exibe mensagem
  const small = campo.querySelector("small");
  small.innerText = mensagem;
}

// Marca o campo como sucesso
function setSucesso(input) {
  const campo = input.closest(".campoform");

  campo.classList.remove("erro");
  campo.classList.add("sucesso");

  const small = campo.querySelector("small");
  small.innerText = "";
}

// ============================
// VALIDAÇÕES
// ============================

function validarTelefone() {
  const telefone = document.querySelector("#telefone");
  const valor = telefone.value.replace(/\D/g, "");

  if (valor === "") {
    setErro(telefone, "Telefone obrigatório");
  } else if (valor.length < 10) {
    setErro(telefone, "Telefone inválido");
  } else {
    setSucesso(telefone);
  }
}

const telefone = document.querySelector("#telefone");

// roda toda vez que o usuário digita
telefone.addEventListener("input", () => {
  formatarTelefone(telefone);
});

function formatarTelefone(input) {

  // 1️⃣ Remove tudo que NÃO for número
  // Ex: "(11) 9a87-6" vira "119876"
  let numeros = input.value.replace(/\D/g, "");

  // 2️⃣ Limita a no máximo 11 números
  // (DDD + celular brasileiro)
  numeros = numeros.substring(0, 11);

  // 3️⃣ Agora vamos montar o telefone AOS POUCOS
  // Só colocamos parênteses e traço se tiver número suficiente

  // Caso tenha 8 ou mais números
  // Ex: 11987654 → (11) 98765-4
  if (numeros.length > 7) {
    input.value =
      "(" + numeros.substring(0, 2) + ")" +     // DDD → (11)
      " " + numeros.substring(2, 7) +           // Parte do número → 98765
      "-" + numeros.substring(7, 11);           // Final → -4321
  }

  // Caso tenha entre 3 e 7 números
  // Ex: 11987 → (11) 987
  else if (numeros.length > 2) {
    input.value =
      "(" + numeros.substring(0, 2) + ")" +     // DDD → (11)
      " " + numeros.substring(2);               // resto do número
  }

  // Caso tenha 1 ou 2 números
  // Ex: 1 → (1 | 11 → (11
  else if (numeros.length > 0) {
    input.value = "(" + numeros;
  }

  // Caso não tenha nenhum número
  // Campo fica vazio
  else {
    input.value = "";
  }
}

function validarEmail() {
  const email = document.querySelector("#email");
  const valor = email.value.trim();

  if (valor === "") {
    setErro(email, "E-mail obrigatório");
  } else if (!valor.includes("@") || !valor.includes(".")) {
    setErro(email, "E-mail inválido");
  } else {
    setSucesso(email);
  }
}

function validarData() {
  const data = document.querySelector("#data");

  if (data.value === "") {
    setErro(data, "Informe a data");
  } else {
    setSucesso(data);
  }
}

function validarHora() {
  const hora = document.querySelector("#hora");

  if (hora.value === "") {
    setErro(hora, "Informe a hora");
  } else {
    setSucesso(hora);
  }
}

function validarCategoria() {
  const categoria = document.querySelector("#categoria");

  if (categoria.value === "") {
    setErro(categoria, "Selecione uma categoria");
  } else {
    setSucesso(categoria);
  }
}

const btn_Gravar = document.querySelector("#btn_Gravar");
const btn_cancelar = document.querySelector("#btn_cancelar");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const data = document.querySelector("#data");
const hora = document.querySelector("#hora");
const categoria = document.querySelector("#categoria");
const observacao = document.querySelector("#observacao");

btn_Gravar.addEventListener("click", (evt)=>{
  evt.preventDefault();
  const dados={
    "id": id.value,
  "nome": nome.value,
  "telefone": telefone.value,
  "email": email.value,
  "data": data.value,
  "hora": hora.value,
  "categoria": categoria.value,
  "observacao": observacao.value
}
 const cabecalho = {
  method:'post' ,
  body: JSON.stringify(dados)
 }


const endpoint = "http://127.0.0.1:1880/addcontatos"
fetch(endpoint , cabecalho)
.then(res=>{
 if(res.status==200){
   nome.value=""
   telefone.value=""
   email.value=""
   data.value=""
   hora.value=""
   categoria.value=""
   observacao.value=""
   nome.focus()
} else{
  alert("erro")
 }

})

});

if(typeof msg.payload === "string"){
  msg.payload = JSON.parse(msg.payload)
}




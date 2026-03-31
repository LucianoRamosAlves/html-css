const valor_pesquisar = document.getElementById("valor_pesquisar");
const pesquisa_tipo = document.getElementById("pesquisa_tipo");
const pesquisa_btn   = document.getElementById("pesquisa_btn");

pesquisa_btn.addEventListener("click", () => {
  const tipo  = pesquisa_tipo.value;   // id | nome | telefone | email
  const valor = valor_pesquisar.value;

  console.log("Tipo:", tipo);
  console.log("Valor:", valor);
});

const endpoint = `http://127.0.0.1:1880/pesquisarcontatotipo=${tipo}&valor=${valor}`;

fetch(endpoint)
  .then(res => res.json())
  .then(dados => {
    console.log(dados);
  });

if (tipo === "id") {
  console.log("Pesquisar por ID");
}

if (tipo === "nome") {
  console.log("Pesquisar por nome");
}

if (tipo === "telefone") {
  console.log("Pesquisar por telefone");
}

if (tipo === "email") {
  console.log("Pesquisar por email");
}


pesquisa_btn.addEventListener("click", () => {
  const tipo = pesquisa_tipo.value;
  const valor = valor_pesquisar.value.trim();

  console.log("Tipo:", tipo);
  console.log("Valor:", valor);

  if (!tipo || !valor) {
    console.warn("Tipo ou valor vazio");
    return;
  }

  const endpoint = `http://127.0.0.1:1880/pesquisarcontato?tipo=${encodeURIComponent(tipo)}&valor=${encodeURIComponent(valor)}`;

  console.log("Endpoint:", endpoint);

  fetch(endpoint)
    .then(res => {
      if (!res.ok) throw new Error("Erro HTTP");
      return res.json();
    })
    .then(dados => {
      console.log("Resposta Node-RED:", dados);
    })
    .catch(err => {
      console.error("Erro no fetch:", err);
    });
});
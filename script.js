'use strict';

//et banco =[
//'textoCriado' : 'teste1'},
//'textoCriado' : 'teste2'}
//
//
const getBanco = () => JSON.parse(localStorage.getItem('copiado')) ?? [];
const setBanco = (banco) => localStorage.setItem('copiado', JSON.stringify(banco))

const criarItem = (textoCriado, indice) =>{
  const item = document.createElement('label')
  item.classList.add('labelCopia')
  item.innerHTML = `<textarea rows="15" cols="34" value="Digite aqui seu texto" class="myInput" id="myInput" data-indice="${indice}" >${textoCriado}</textarea>
                    <input type="button" class="copia__botao" value="Copiar" data-indice="${indice}">
                    <input type="button" class="botao__excluir" value="Excluir" data-indice="${indice}">`
  document.getElementById('copiado').appendChild(item)
}

const limparTexto = () =>{
  const copiado = document.getElementById('copiado')
  while(copiado.firstChild){
    copiado.removeChild(copiado.lastChild)
  }
}

const atualizaTela= () =>{         
  limparTexto()

  const banco = getBanco()
  banco.forEach ((item,indice) => criarItem (item.textoCriado, indice))
}


const inserirItem = (evento) =>{
  const tecla = evento.key
  const texto = evento.target.value
  if (tecla === '¬'){
    const banco = getBanco()
    banco.push({'textoCriado' : evento.target.value})
    setBanco(banco)
    atualizaTela()
    evento.target.value =''
  }
}

const removerItem = (indice)=>{
  const banco = getBanco() 
  banco.splice(indice, 1);
  setBanco(banco)
  atualizaTela() 
}

const copiar = (indice) =>{
  /* Get the text field */
  const banco = getBanco()
  var copyText = banco[indice].textoCriado
   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText);
  /* Alert the copied text */
  alert("Texto copiado: " + copyText);
}

const clickItem = (evento) =>{
  const elemento =evento.target;
  if(elemento.className === 'botao__excluir'){
    const indice = elemento.dataset.indice
    removerItem(indice)
  } else if (elemento.className === 'copia__botao'){
    const indice = elemento.dataset.indice
    copiar(indice)
  }
}

document.getElementById('myText').addEventListener('keypress', inserirItem)
document.getElementById('copiado').addEventListener('click', clickItem)



atualizaTela();
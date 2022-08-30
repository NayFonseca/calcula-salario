const http = require('http');
const porta = 3000; 
const url =  require('url');
const aliquota = 7.5/*0.925*/;


function calculaSalario (salario) {
   let desconto = (salario * aliquota) / 100;
   let totalFinal = salario - desconto
   return (totalFinal);
}

function retornaResposta (salario){

    if (salario == ''|| salario == undefined || isNaN(salario) == true /* salario == null*/ ) {
        return 'Você não enviou nenhum salário';
    } else {
        return ('O seu salário com o abatimento é: ' + /*(salario - ((salario * 7.5) / 100))*/ calculaSalario(salario) + ' reais.') + (' Onde ' + /*( salario - ((salario * 7.5) / 100))*/calculaSalario(salario) + ' é o valor do salário menos a Alíquota do IR.');
    }
}

const server = http.createServer(function(req, res) {
    let params = url.parse(req.url, true);
    let salario = params.query.salario;

    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.end(retornaResposta(salario));

});

server.listen(porta, function(){
    console.log(`O servidor subiu na porta ${porta}`);
});
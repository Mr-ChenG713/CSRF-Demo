## CSRF DEMO

Depois de clone, é preciso executar comando **`npm install`** para instalar os pacotes.

## As contas

* Username 1: andre     password:123456	  montante inicial: 4000
* Username 2: joao      password:123456	  montante inicial: 10000
* Username 3: hacker    password:123456	  montante inicial: 100

## Iniciar o Demo normal

1.	Executar o comando **`node index`** para ligar o servidor 
2.	Abrir http://localhost:3000/login.html no broswer, iniciar com a conta do andre
3.	Utilizar a conta do andre para transferir 500 para joao, sair da conta
4.	Entrar na conta do joao e verifica o montante

## Iniciar o Demo de ataque CSRF

1.	Iniciar com a conta do andre ou joao
2.	Executar o comando **`node hackpage`** para ligar o servidor de ataque
3.	Sem terminar sessão abrir o link com vulnerabilidade http://localhost:3001/bank-fish.html , depois de 3 segundo, atualiza a página banco do andre ou joao, que pode ver o decremento de  2000
4.	Iniciar sessão na conta hacker, e verificar o montante
<br>
</br>
:books: Source Code: https://github.com/jerryOnlyZRJ/security-demo


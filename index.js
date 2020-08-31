const fetch = require('node-fetch');
const fs = require('fs');

async function geraUsuario () {
    const requisicao = await fetch ('http://randomuser.me/api/?results=20');
    if (requisicao.ok) {
        const data = await requisicao.json();

        fs.writeFile('usuarios.csv',(`primeiro_nome,sobrenome,email,idade,genero,username,password\n`), 'utf8', (err) => {
            if (err) throw err;    
        });

        for(let i=1; i<data.results.length;i++) {
            fs.createWriteStream("usuarios.csv",{flags: "a"})
            .write (`${data.results[i].name.first}, 
                     ${data.results[i].name.last},
                     ${data.results[i].email}, 
                     ${data.results[i].dob.age}, 
                     ${data.results[i].gender}, 
                     ${data.results[i].login.username}
                     ${data.results[i].login.password}\n`);
        }
        console.log("Requisição realizada")    
    } 
}
geraUsuario();

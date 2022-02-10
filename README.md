# API de games
Esta API é utilizada para uma loja de games.

## EndPoints
### GET /games
Esse endPoint é responsavel por retornar a listagem de todos os games cadastrados no BD.

#### Parametros
Nenhum

#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.

Exemplo de resposta:
```
[
    {
        "id": 23,
        "title": "call of duty",
        "year": 2019,
        "price": 60
    },
    {
        "id": 65,
        "title": "sea",
        "year": 2018,
        "price": 56
    },
    {
        "id": 2,
        "title": "minecratf",
        "year": 2012,
        "price": 20
    }
]
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Toke inválido,Token expirado.
Exemplo de resposta:
```
{
    "err": "token Invalido"
}
```


## EndPoints
### POST /auth
Esse endPoint é responsavel por o processo de login.

#### Parametros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail.

Exemplo:
```
{
    "email": "gabriel@gmail.com",
    "password": "123"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImVtYWlsIjoiZ2FicmllbEBnbWFpbC5jb20iLCJpYXQiOjE2NDQ1MDkzNTYsImV4cCI6MTY0NDUyMzc1Nn0.BoUYrWB8W32dXUPtjo4YVd3hf42hBSB7K1u3TUR0nbQ"
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: senha ou email incorretos.
```
{
    "err": "Credenciais invalidas"
}
```

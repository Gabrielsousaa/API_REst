const app = require('express')()
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const jwt = require('jsonwebtoken')



const secret = "sjkakaskllasjlasjljasklsfjlaskçdjladfgjkl"


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

function auth(req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken != undefined) {
        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token, secret, (err, data) => {
            if (err) {
                res.status(401)
                res.json({ err: "token Invalido" })
            } else {
                req.token = token;
                req.LoggedUser = { id: data.id, email: data.email }
                next();
            }
        })
    } else {

        res.status(401).json({ err: "Token inválido" })
    }

}


var db = {

    games: [
        {
            id: 23,
            title: "call of duty",
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: "sea",
            year: 2018,
            price: 56
        },
        {
            id: 2,
            title: "minecratf",
            year: 2012,
            price: 20
        },
    ]
    ,
    users: [
        {
            id: 23,
            mome: "gabriel",
            email: "gabriel@gmail.com",
            password: "123"
        },
        {
            id: 20,
            mome: "Joao",
            email: "Joao@gmail.com",
            password: "123"
        }
    ]
}


app.get('/games', auth, (req, res) => {
    res.statusCode = 200
    res.status(200).json(db.games );
})
app.get('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        var game = db.games.find(g => g.id == id)

        if (game != undefined) {
            res.status(200).json(game);
        } else {
            res.sendStatus(404)
        }
    }

})

app.post('/game', (req, res) => {
    var { title, year, price } = req.body

    db.games.push({
        id: 2323,
        title,
        price,
        year
    })

    res.sendStatus(200)
})

app.delete('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        var index = db.games.findIndex(g => g.id == id)

        if (index == -1) {
            res.sendStatus(404);
        } else {
            db.games.splice(index, 1)
            res.status(200).json("Deletado com sucesso")
        }
    }

})

app.put('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        var game = db.games.find(g => g.id == id)

        if (game != undefined) {

            var { title, price, year } = req.body

            if (title != undefined) {
                game.title = title
            }

            if (price != undefined) {
                game.price = price
            }

            if (year != undefined) {
                game.year = year
            }
            res.sendStatus(200)

        } else {
            res.sendStatus(404)
        }
    }
})

app.post('/auth', (req, res) => {
    var { email, password } = req.body

    if (email != undefined) {

        var user = db.users.find(u => u.email == email)

        if (user != undefined) {
            if (user.password == password) {
                jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '4h' }, (err, token) => {
                    if (err) {
                        res.status(400)
                        res.json({ err: "Falha interna" })
                    } else {
                        res.status(200)
                        res.json({ token: token })
                    }
                })
            } else {
                res.status(401);
                res.json({ err: "Credenciais invalidas" })
            }
        } else {
            res.status(404)
            res.json({ err: " o email enviado não exista na base de dados " })
        }
    } else {
        res.status(403)
        res.json({ err: "O e-mail enviado é inválido " })
    }
})




app.listen(400, () => {
    console.log('Api rodando')
})
const express = require('express')
const app = express()
const port = 3001
app.use(express.json())
const fs = require('fs')

app.post("/clientes/cadastro",(req,res) => {
    const cliente = req.body
    console.log(cliente)
    if(!cliente ||Object.keys(cliente).length === 0){
        res.status(400).json({resposta:"body não encontrada"})
    }
    else{
        try{
        const bd = JSON.parse(fs.readFileSync('bd.json','utf-8'))
        bd.push(cliente)
        fs.writeFileSync('bd.json', JSON.stringify(bd),'utf8')
        res.status(200).json({resposta:"Cliente cadastrado com sucesso!"})}
        catch(error){
        res.status(500).json({resposta: error.message})
        }
    }

})

app.listen(port, ()=> {
    console.log("API executando na porta" + port)
})


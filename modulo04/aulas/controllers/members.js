const fs = require('fs')
const data = require("../data.json")
const { date } = require('../utils')


// index
exports.index = function(req, res){
    return res.render('members/index', { members: data.members})
}

// create
exports.create = function(req, res){
    return res.render('members/create')
}

// post
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            //Meio de validar todos os campos
            return res.send('Please fill all fields')
        }
    }

    //Passando o data para o ./data.json
    birth = Date.parse(req.body.birth)

    let id = 1
    const lastMember = data.members[data.members.length -1]

    if (lastMember){
        id = lastMember.id + 1
    }


    // Insere dados no ./data.JSON sem apaga-los 
    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){ //calllback
        if (err) return res.send("Write file error!")

        return res.redirect(`/members/${id}`)
    })
    // return res.send(req.body)
}

// show
exports.show = function(req, res){

    //Meio de receber os dados no caso o ID, req.params
    const { id } = req.params

    const foundMember = data.members.find(function(member){

        return member.id == id

    })

    if(!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return res.render('members/show', { member })
}

// edit
exports.edit = function(req, res){

    const { id } = req.params

    const foundMember = data.members.find(function(member){

        return member.id == id

    })

    if(!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit', {member})
}

// put
exports.put = function(req, res){

    const { id } = req.body

    // Serve para saber a posição do objeto que já existe no data.json.
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){

        if(id == member.id){
            index = foundIndex

            return true 
        }
    })

    //Se não tiver um member com o id passado informaremos um erro.
    if(!foundMember) return res.send("Member not found!")


    // Jogando o foundMember (objetos já gravados) e req.body (campos alterados no form) e informando o que queremos alterar.
    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    // Passando o index, no caso qual é o objeto em especifico que está sendo alterado.
    data.members[index] = member
    

    // Tratando novamente onde iremos salvar os dados do objeto e caso de erro o Callback informará.
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error!')

        // Redirecionando para usuário que foi alterado.
        return res.redirect(`/members/${id}`)
    })
}   

// delete
exports.delete = function(req, res){

    const { id } = req.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file error!')

        return res.redirect('/members')
    })
}

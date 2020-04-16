const fs = require('fs')
const data = require("../data.json")
const { age, date } = require('../utils')


// index
exports.index = function(req, res){
    return res.render('instructors/index', { instructors: data.instructors})
}

// create
exports.create = function(req, res){
    return res.render('instructors/create')
}

// post
exports.post = function(req, res){
    // req.body - exemplo enviando somente o req.body no return
    // {
    //     "avatar_url": "http://localhost:3000/instructor2",
    //     "name": "Novo",
    //     "birth": "2020-02-02",
    //     "gender": "M",
    //     "services": "Musculação, Bodybuilder"
    // }
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            //Meio de validar todos os campos
            return res.send('Please fill all fields')
        }
    }

    let { avatar_url, birth, gender, services, name} = req.body

    //Passando o data para o ./data.json
    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)


    // Insere dados no ./data.JSON sem apaga-los 
    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){ //calllback
        if (err) return res.send("Write file error!")

        return res.redirect("/instructors")
    })
    // return res.send(req.body)
}

// show
exports.show = function(req, res){

    //Meio de receber os dados no caso o ID, req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){

        return instructor.id == id

    })

    if(!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
    }

    return res.render('instructors/show', { instructor })
}

// edit
exports.edit = function(req, res){

    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){

        return instructor.id == id

    })

    if(!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', {instructor })
}

// put
exports.put = function(req, res){

    const { id } = req.body

    // Serve para saber a posição do objeto que já existe no data.json.
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){

        if(id == instructor.id){
            index = foundIndex

            return true 
        }
    })

    //Se não tiver um instructor com o id passado informaremos um erro.
    if(!foundInstructor) return res.send("Instructor not found!")


    // Jogando o foundInstructor (objetos já gravados) e req.body (campos alterados no form) e informando o que queremos alterar.
    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    // Passando o index, no caso qual é o objeto em especifico que está sendo alterado.
    data.instructors[index] = instructor
    

    // Tratando novamente onde iremos salvar os dados do objeto e caso de erro o Callback informará.
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error!')

        // Redirecionando para usuário que foi alterado.
        return res.redirect(`/instructors/${id}`)
    })
}   

// delete
exports.delete = function(req, res){

    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file error!')

        return res.redirect('/instructors')
    })
}

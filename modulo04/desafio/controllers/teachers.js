const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')


// INDEX
exports.index = function(req, res){
    return res.render('teachers/index', {teachers: data.teachers})
}

// CREATE
exports.create = function(req, res){
    return res.render("teachers/create")
}

// POST
exports.post = function(req, res){

    // Inserindo o keys como todos os values do req.body
    const keys = Object.keys(req.body)

    // Passando em todos os campos e verificando se não está vazio, caso esteja teremos um erro e não será enviado para o JSON
    for(key of keys){
        if(req.body[key] == ''){
            return res.send('Please fill all fields')
        }
    }

    // Informando quais campos quero buscar do req.body para trata-los
    let { avatar_url, name, birth, school, type_class, area_occupation } = req.body

    //Trazendo os objetos abaixo como Date e o id como numeros sequenciais
    birth = Date.parse(req.body.birth)
    created_at = Date.now()
    id = Number(data.teachers.length + 1)


    //Quais campos estão sendo inserido no data.json que está sendo criado na raiz do projeto.
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        school,
        type_class,
        area_occupation,
        created_at
    })


    //Escrevendo quais locais será gravados nos campos do form na após a criação e tratando o erro com Call Back, parabéns Aleilson =]
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")


        //Após conclusão iremos redirecionar para a page teachers
        return res.redirect('/teachers')
    })
}

// SHOW
exports.show = function(req, res){
    //req.params
    const { id } = req.params

    //Buscando o id no data.json e trzendo os objetos
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    //Se não encontrar o id dara que não existe
    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        area_occupation: foundTeacher.area_occupation.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    
    return res.render("teachers/show", { teacher })
}

// EDIT
exports.edit = function(req, res){
    //req-params
    const { id } = req.params

    //Buscando o id no data.json e trzendo os objetos
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    //Se não encontrar o id dara que não existe
    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', {teacher})
}

// PUT 
exports.put = function(req, res){
    const { id } = req.body

    let index = 0 
    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        
       if(id == teacher.id){
           index = foundIndex

           return true
       }
    })

    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error!')

        return res.redirect(`/teachers/${id}`)
    })
}


// DELETE
exports.delete = function(req, res){

    const { id } = req.body
    
    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error')

        return res.redirect('/teachers')
    })
}

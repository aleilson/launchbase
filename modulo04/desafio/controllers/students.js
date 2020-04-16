const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')


// INDEX
exports.index = function(req, res){
    return res.render('students/index', {students: data.students})
}

// CREATE
exports.create = function(req, res){
    return res.render('students/create')
}

// POST
exports.post = function(req, res){

    // Inserindo o keys como todos os values do req.body
    const keys = Object.keys(req.body)

    // Passando em todos os campos e verificando se não está vazio, caso esteja teremos um erro e não será enviado para o JSON
    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Please fill all fields')
        }
    }

    //Trazendo os objetos abaixo como Date e o id como numeros sequenciais
    birth = Date.parse(req.body.birth)

    let id = 1
    const lastStudent = data.students[data.students.length -1]

    if (lastStudent){
        id = lastStudent.id + 1
    }


    //Quais campos estão sendo inserido no data.json que está sendo criado na raiz do projeto.
    data.students.push({
        id,
        ...req.body,
        birth
    })


    //Escrevendo quais locais será gravados nos campos do form na após a criação e tratando o erro com Call Back, parabéns Aleilson =]
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        //Após conclusão iremos redirecionar para a page students
        return res.redirect(`/students/${id}`)
    })
}

// SHOW
exports.show = function(req, res){
    //req.params
    const { id } = req.params

    //Buscando o id no data.json e trzendo os objetos
    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    //Se não encontrar o id dara que não existe
    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay
    }

    
    return res.render("students/show", { student })
}

// EDIT
exports.edit = function(req, res){
    //req-params
    const { id } = req.params

    //Buscando o id no data.json e trzendo os objetos
    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    //Se não encontrar o id dara que não existe
    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', {student})
}

// PUT 
exports.put = function(req, res){
    const { id } = req.body

    let index = 0 
    const foundStudent = data.students.find(function(student, foundIndex){
        
       if(id == student.id){
           index = foundIndex

           return true
       }
    })

    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error!')

        return res.redirect(`/students/${id}`)
    })
}


// DELETE
exports.delete = function(req, res){

    const { id } = req.body
    
    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error')

        return res.redirect('/students')
    })
}

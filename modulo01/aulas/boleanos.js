const classA = [{
        name: "Ale",
        grade: 9.8
    },
    {
        name: "Silva",
        grade: 10
    },
    {
        name: "Fulano",
        grade: 2
    },
    {
        name: "Augusto",
        grade: 6
    }
]

const classB = [{
        name: "Mika",
        grade: 8.8
    },
    {
        name: "Axe",
        grade: 5
    },
    {
        name: "Vio",
        grade: 8
    },
    {
        name: "NovoAluno",
        grade: 4
    }
]

function markAsFlunked(student) {
    student.flunked = false

    if (student.grade < 5) {
        student.flunked = true
    }
}

function sendFlunked(student) {
    if (student.flunked) {
        console.log(`o Aluno ${student.name} está reprovado!`)
    }
}

function studentsReprovados(students) {
    for (let student of students) {
        markAsFlunked(student)
        sendFlunked(student)
    }
}

studentsReprovados(classA)
studentsReprovados(classB)
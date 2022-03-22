function mainPage(todo, done, serverURL) {
    let page = `
<html>
<head>
    <title>ToDo List</title>
    <meta charset="utf-8" />
    <!--link rel="icon" href="favicon.png" /-->
    <link rel="stylesheet" href="mini-dark.css" />
</head>
<nav>
    <div class="container">
        <h2>Registo de Tarefas</h2>
    </div>

    <form class="container" action="/newEntry" method="POST">
        <div class="row">
            <label><b>Ator</b></label>
            <input class="col-sm-12" type="text" placeholder="Nome" name="Nome">

            <label><b>Descrição</b></label>
            <input class="col-sm-12" type="text" placeholder="Tarefa" name="Descricao">

            <label><b>Tipo de Tarefa</b></label>
            <input class="col-sm-12" type="text" placeholder="Tipo" name="Tipo">

            <div class="col-sm">
                <label><b>Data de início</b></label>
                <input type="date" name="Inicio">

                <label><b>Data de fim</b></label>
                <input type="date" name="Fim">
            </div>

            <input class="tertiary" type="submit" value="Registar" />
            <input class="secondary" type="reset" value="Limpar valores" />
        </div>
    </form>
</nav>

<body>
    <div class="container col-sm-offset-5">
        <h1>Tarefas</h1>
    </div>
    <div class="container row">
        <div class="container col-sm">

            <table class="hoverable">
                <caption>To Do</caption>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>tipo</th>
                        <th>Inicio</th>
                        <th>Fim</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
    `
    todo.forEach(row => {
        page +=
            `<tr id="${row.id}">
        <td class="Nome">${row.Nome}</td>
        <td class="Descricao">${row.Descricao}</td>
        <td class="Tipo">${row.Tipo}</td>
        <td class="Inicio">${row.Inicio}</td>
        <td class="Fim">${row.Fim}</td>
        <td>
            <div class="button-group">
                <button class="primary" onclick="openForm(this)">Editar</button>
                <a href="${serverURL}/tarefas/:${row.id}/done" class="button tertiary">Done</a>
            </div>
        </td>
    </tr>`
    });

    page += `
    </tbody>
            </table>

        </div>
        <div class="container col-sm">
            <table class="hoverable">
                <caption>Done</caption>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>tipo</th>
                        <th>Inicio</th>
                        <th>Fim</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>`

    done.forEach(row => {
        page +=
            `<tr>
                    <td class="Nome">${row.Nome}</td>
                    <td class="Descricao">${row.Descricao}</td>
                    <td class="Tipo">${row.Tipo}</td>
                    <td class="Inicio">${row.Inicio}</td>
                    <td class="Fim">${row.Fim}</td>
                    <td>
                        <a href="${serverURL}/tarefas/:${row.id}/delete" class="button secondary">Delete</a>
                    </td>
                </tr>`
    });

    page += `
    </tbody>
            </table>

        </div>
    </div>

</body>
<div class="form-popup" id="myForm">
    <form class="container" action="/editEntry" method="POST">
        <div class="row">
            <input class="col-sm-12 Id" style="display:none;" type="text" name="id">

            <label><b>Ator</b></label>
            <input class="col-sm-12 Nome" type="text" placeholder="Nome" name="Nome">

            <label><b>Descrição</b></label>
            <input class="col-sm-12 Descricao" type="text" placeholder="Tarefa" name="Descricao">

            <label><b>Tipo de Tarefa</b></label>
            <input class="col-sm-12 Tipo" type="text" placeholder="Tipo" name="Tipo">

            <div class="col-sm">
                <label><b>Data de início</b></label>
                <input type="date" class="Inicio" name="Inicio">

                <label><b>Data de fim</b></label>
                <input type="date" class="Fim" name="Fim">
            </div>

            <button type="submit" class="tertiary">Atualizar</button>
            <button type="button" class="secondary" onclick="closeForm()">Close</button>
        </div>
    </form>
</div>

<script>
    function openForm(objeto) {
        
        var formElement = document.getElementById("myForm");
        var idEntry = objeto.closest('tr').id;
        var rowElement = document.getElementById(idEntry);

        formElement.style.display = "block";
        formElement.getElementsByClassName("Id")[0].value = idEntry;
        formElement.getElementsByClassName("Nome")[0].value = rowElement.getElementsByClassName("Nome")[0].innerText;
        formElement.getElementsByClassName("Descricao")[0].value = rowElement.getElementsByClassName("Descricao")[0].innerText;
        formElement.getElementsByClassName("Tipo")[0].value = rowElement.getElementsByClassName("Tipo")[0].innerText;
        formElement.getElementsByClassName("Inicio")[0].value = rowElement.getElementsByClassName("Inicio")[0].innerText;
        formElement.getElementsByClassName("Fim")[0].value = rowElement.getElementsByClassName("Fim")[0].innerText;
    }

    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }
</script>


</html>
`
//console.log(page)
return page;
}

exports.mainPage = mainPage

function pageVoltar(name){
    return  `<html>
<head>
    <title>ToDo List</title>
    <meta charset="utf-8" />
    <!--link rel="icon" href="favicon.png" /-->
    <link rel="stylesheet" href="mini-dark.css" />
</head>
<body>
    <h2>${name}</h2>
    <p><a href="/">voltar</a></p>
</body>`
    
}

exports.pageVoltar = pageVoltar
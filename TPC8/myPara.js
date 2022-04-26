$(function () {
    $.get('http://localhost:7709/paras', function (data) {
        //console.log(data)
        data.forEach(p => {
            $("#paraList").append("<p>" + p.para + '<button class="delete secondary" id="' +p._id+ '">Delete</p>')
        });
    })
    $("#addPara").click(function () {
        //console.log("Texto")
        var form = $("#myParaForm").serialize()
        //console.log(form)
        $.post("http://localhost:7709/paras", form)
        alert('Record inserted: ' + JSON.stringify(form))
        var x = document.getElementById("paraList").innerHTML=""
        console.log(x)
        $.get('http://localhost:7709/paras', function (data) {
            //console.log(data)
            data.forEach(p => {
                $("#paraList").append("<p>" + p.para + '<button class="delete secondary" id="' +p._id+ '">Delete</p>')
            });
        })
        $("#paraText").val("");
    })

    $("#paraList").on('click', '.delete', function () {
        $.get('http://localhost:7709/paras/delete/'+$(this).attr('id'), function (data) {
        })
        console.log($(this).attr('id'))
        var x = document.getElementById("paraList").innerHTML=""
        $.get('http://localhost:7709/paras', function (data) {
            console.log(data)
            data.forEach(p => {
                $("#paraList").append("<p>" + p.para + '<button class="delete secondary" id="' +p._id+ '">Editar</p>')
            });
        })
    });
})



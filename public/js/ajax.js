'use strict'

$(document).ready(function (e){

    $("#newTaskForm").on("submit", function (e){
        $.ajax({
            url: "/new/task",
            data: $("#newTaskForm").serializeArray(),
            success: function (data, status, xhr) {
              // disparar um toast e dar refresh
            },
            error: function (jqXhr, textStatus, errorMessage) {
                // disparar um toast de erro
            }
        })
    })
});
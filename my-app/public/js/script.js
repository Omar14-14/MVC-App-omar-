$(document).ready(function() {
    $('#reg_Form').on('submit', function(event) {
        event.preventDefault(); 

        var formData = new FormData(this);

        $.ajax({
            url: '/api/form', 
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                
                alert('Registro exitoso');
               
                setTimeout(function() {
                    location.reload();
                }, 100); 
            },
            error: function(xhr, status, error) {
                
                alert('Error al registrar la carrera');
            }
        });
    });
});

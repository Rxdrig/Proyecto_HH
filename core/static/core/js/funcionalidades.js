function confirmDelete(id) {
    Swal.fire({
        title: "Estas seguro de querer eliminar este comentario?",
        text: "no podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, eliminalo!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: "El comentario ha sido eliminado.",
            icon: "success"
          }).then(()=>{
            window.location.href = "/deletecomentario/"+id+"/"
          });
        }
      });
}
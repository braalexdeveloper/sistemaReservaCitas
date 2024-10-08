import Swal from "sweetalert2";

export const swalAlert=(titulo,mensaje,tipo)=>{
    return Swal.fire({
        position:"top-end",
     title:titulo,
     text:mensaje,
     icon:tipo,
     showConfirmButton:false,
     timer:3000
    })
}

export const swalAlertConfirmDelete=(titulo,mensajeExito,funcion=()=>{})=>{
    return Swal.fire({
        title: titulo,
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          //dispatch(deleteProject(id));
           funcion();
          Swal.fire("Eliminado!", mensajeExito, "success");
        }
      });
}
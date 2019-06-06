/* Añadir elementos */

function signUp() {
    const userAdded = {
      nombre: this.nombre,
      pass: this.pass,
      activo: true,
      email: this.email
    };

    if (this.pass === this.confirmPass) {
      auth
        .createUserWithEmailAndPassword(this.email, this.pass)
        .then(user => {
          auth.onAuthStateChanged(user => {
            db.collection("usuarios")
              .doc(user.uid)
              .set(userAdded)
              .then(() => {
                console.log("Usuario añadido??????");
              });
          });
        })
        .then(this.$router.replace("/login"))
        .catch(err => {
          alert(err.message);
        });
    } else {
      alert("Las contraseñas no coinciden");
    }
  }
  
  /* Borrado */
  function deleteEntry(id) {
    this.idSeleccionado = id;
    db.collection("personajes")
      .doc(id)
      .delete()
      .then(() => {
        this.snackbar_delete = true;
        this.dialog_delete = false;
      });
  }


  /* ACtualizar */
  function updateEntry(id, nombre, raza, duenyo, con, des, fue, int, sab, car) {
    this.loading = true;
    const personaje = {
      nombre: nombre,
      raza: raza,
      duenyo: duenyo,
      con: con,
      des: des,
      fue: fue,
      int: int,
      sab: sab,
      car: car
    };

    db.collection("personajes")
      .doc(id)
      .set(personaje)
      .then(() => {
        this.loading = false;
        this.dialog_update = false;

        this.$emit("projectAdded");
      });
  }
<template>
  <div class="dashboard">
    <div>
      <Navbar/>
    </div>
    <v-snackbar v-model="snackbar_delete" :timeout="4000" top color="success">
      <span>You deleted a project</span>
      <v-btn flat color="white" @click="snackbar_delete = false">Close</v-btn>
    </v-snackbar>
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" v-on:click="sortBy('title')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">Ordenar por nombre</span>
          </v-btn>
          <span>Ordenar por nombre</span>
        </v-tooltip>

        <v-tooltip top>
          <v-btn small flat color="grey" v-on:click="sortBy('person')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">Ordenar por clase</span>
          </v-btn>
          <span>Ordenar por clase</span>
        </v-tooltip>
      </v-layout>

      <v-text-field append-icon="search" label="Filtrar" single-line hide-details v-model="search"></v-text-field>
      <v-spacer></v-spacer>
      <br>
      <v-card flat v-for="(personaje) in filteredValues" :key="personaje.nombre">
        <v-layout row wrap :class="`pa-3 personaje ${personaje.raza}`">
          <v-flex xs6 md2>
            <div class="caption grey--text">Nombre</div>
            <div>{{personaje.nombre}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Raza</div>
            <div>{{personaje.raza}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Dueño</div>
            <div>{{personaje.duenyo}}</div>
            <!-- <div>Index: {{ doMath(index) }}</div> -->
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div>
              <v-chip small :class="`${personaje.raza} white--text caption my-2`">{{personaje.raza}}</v-chip>
            </div>
          </v-flex>

          <!-- Delete Yon -->
          <!-- <v-flex xs6 sm4 md2>
            <div>
              <v-btn color="error" small class="right" @click="deleteEntry(personaje.id)">
                <v-icon small>close</v-icon>
              </v-btn>
            </div>
          </v-flex>-->

          <!-- Cuadro de dialogo al modificar un elemento  -->
          <v-flex xs6 sm4 md2>
            <v-dialog v-model="dialog_update" width="500">
              <template v-slot:activator="{ on }">
                <v-btn color="primary lighten-2" dark v-on="on">
                  <v-icon small>create</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Update this character:</v-card-title>
                <v-card-text>Id: {{personaje.id}}</v-card-text>
                <v-card-text id="update_nombre">Nombre: {{personaje.nombre}}</v-card-text>
                <v-card-text id="update_raza">Raza: {{personaje.raza}}</v-card-text>
                <v-text-field
                  v-model="personaje.con"
                  type="number"
                  label="Constitución"
                  append-outer-icon="add"
                  @click:append-outer="personaje.con++"
                  style="padding: 4%"
                  prepend-icon="remove"
                  @click:prepend="personaje.con--"
                  id="update_con"
                ></v-text-field>

                <v-text-field
                  v-model="personaje.des"
                  type="number"
                  label="Destreza"
                  append-outer-icon="add"
                  @click:append-outer="personaje.des++"
                  style="padding: 4%"
                  prepend-icon="remove"
                  @click:prepend="personaje.des--"
                  id="update_des"
                ></v-text-field>

                <v-text-field
                  v-model="personaje.fue"
                  type="number"
                  label="Fuerza"
                  append-outer-icon="add"
                  @click:append-outer="personaje.fue++"
                  style="padding: 4%"
                  prepend-icon="remove"
                  @click:prepend="personaje.fue--"
                  id="update_fue"
                ></v-text-field>

                <v-text-field
                  v-model="personaje.int"
                  type="number"
                  label="Inteligencia"
                  append-outer-icon="add"
                  @click:append-outer="personaje.int++"
                  style="padding: 4%"
                  prepend-icon="remove"
                  @click:prepend="personaje.int--"
                  id="update_int"
                ></v-text-field>

                <v-text-field
                  v-model="personaje.sab"
                  type="number"
                  label="Sabiduría"
                  append-outer-icon="add"
                  @click:append-outer="personaje.sab++"
                  style="padding: 4%"
                  prepend-icon="remove"
                  @click:prepend="personaje.sab--"
                  id="update_sab"
                ></v-text-field>

                <v-text-field
                  v-model="personaje.car"
                  type="number"
                  label="Carisma"
                  append-outer-icon="add"
                  @click:append-outer="personaje.car++"
                  style="padding: 4%"
                  prepend-icon="remove"
                  @click:prepend="personaje.car--"
                  id="update_car"
                ></v-text-field>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    flat
                    :loading="loading"
                    @click="updateEntry(personaje.id, personaje.nombre, personaje.raza, 
                                                                  personaje.duenyo, personaje.con, personaje.des, 
                                                                  personaje.fue, personaje.int, personaje.sab, personaje.car)"
                  >Update</v-btn>
                  <v-btn color="grey" flat @click="dialog_update = false">Decline</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>

          <!-- Cuadro de dialogo al borrar un elemento  -->
          <v-flex right>
            <v-dialog v-model="dialog_delete" width="500">
              <template v-slot:activator="{ on }">
                <v-btn color="red lighten-2" dark v-on="on">
                  <v-icon small>close</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Delete this character:</v-card-title>
                <v-card-text>Id: {{personaje.id}}</v-card-text>
                <v-card-text>Nombre: {{personaje.nombre}}</v-card-text>
                <v-card-text>Dueño: {{personaje.duenyo}}</v-card-text>
                <v-card-text>Raza: {{personaje.raza}}</v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey" flat @click="deleteEntry(personaje.id)">Accept</v-btn>
                  <v-btn color="error" flat @click="dialog_delete = false">Decline</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from "@/fb";
import Navbar from "../components/Navbar";
import { setTimeout } from 'timers';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      idSeleccionado: "",
      personajes: [],
      razas: [
        "elfo",
        "humano",
        "enano",
        "mediano",
        "orco",
        "semielfo",
        "gnomo"
      ],
      search: "",
      snackbar_delete: false,
      dialog_delete: false,
      dialog_update: false,
      loading: false,
      nombre: window.localStorage.getItem("nombre")
    };
  },

  methods: {
    sortBy(prop) {
      this.personajes.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },

    doMath(i) {
      return i++;
    },

    deleteEntry(id) {
      this.idSeleccionado = id;
      db.collection("personajes")
        .doc(id)
        .delete()
        .then(() => {
          this.snackbar_delete = true;
          this.dialog_delete = false;
        });
    },

    updateEntry(id, nombre, raza, duenyo, con, des, fue, int, sab, car) {
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
    },

    fillData(i, index) {
      for (i in index) {
        return i;
      }
    },

    myCharacters() {
      return this.personajes.filter(myCharacters => {
        return myCharacters.duenyo === this.nombre;
      });
    }
  },

  //Personajes filter
  computed: {
    filteredValues() {
      return this.myCharacters().filter(personaje => {
        return personaje.nombre.match(this.search);
      });
    }
  },

  //FIXME: El borrado solo funciona si se filtra y se queda con un solo resultado sino el indice va mal
  beforeCreate(){

    db.collection("personajes").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.personajes.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        } else if (change.type === "removed") {
          //TODO: utilizar splice y pasarle el indice seleccionado. Una vez se solucione el problema del indice loco...
          //console.log("borrado");
          this.$router.go();
          /* this.personajes.splice(this.idSeleccionado).then({
            ...change.doc.data(),
            id: change.doc.id
          }); */
        }
      });
      setTimeout(function(){}, 1000);
    });
  },
  created() {
    //this.$router.go();

  }
};
</script>

<style>
/* definir colores para cada raza */
.personaje.elfo {
  border-left: 4px solid #62929e;
}
.personaje.humano {
  border-left: 4px solid #cc8e35;
}
.personaje.enano {
  border-left: 4px solid #807182;
}
.personaje.mediano {
  border-left: 4px solid #f7b1ab;
}
.personaje.orco {
  border-left: 4px solid #009432;
}
.personaje.semielfo {
  border-left: 4px solid #833471;
}
.personaje.gnomo {
  border-left: 4px solid #c4e538;
}
/* --------------------- */
.v-chip.elfo {
  background-color: #62929e;
}
.v-chip.humano {
  background-color: #cc8e35;
}
.v-chip.enano {
  background-color: #807182;
}
.v-chip.mediano {
  background-color: #f7b1ab;
}
.v-chip.orco {
  background-color: #009432;
}
.v-chip.semielfo {
  background-color: #833471;
}
.v-chip.gnomo {
  background-color: #c4e538;
}
</style>


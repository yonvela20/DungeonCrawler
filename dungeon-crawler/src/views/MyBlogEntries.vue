<template>
  <div class="projects">
    <div>
      <Navbar/>
    </div>
    <h1 class="subheading grey--text">Tus posts</h1>
    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="blog in myBlogs" :key="blog.title">
          <div slot="header">
            <span>{{blog.titulo}}</span>
            <div>
              <v-icon small left>thumb_up</v-icon>
              <span>{{blog.like}}</span>

              <v-icon small right>thumb_down</v-icon>
              <span>{{blog.dislike}}</span>
            </div>
          </div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">{{blog.autor}}</div>
              <div>{{blog.contenido}}</div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import { db } from "@/fb";
import Navbar from "../components/Navbar";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      blog: []
    };
  },
  computed: {
    myBlogs() {
      return this.blog.filter(myBlog => {
        return myBlog.autor === "yon";
        //return myBlog.autor === window.localStorage.getItem("nombre");
      });
    }
  },
  created() {
    db.collection("blog").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.blog.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>

<template>
  <div class="team">
    <h1 class="subheading grey--text">Blog</h1>

    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="singleBlog in blog" :key="singleBlog.titulo">
          <div slot="header">{{singleBlog.titulo}}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div>{{singleBlog.contenido}}</div>
              <br>
              <br>
              <div class="font-weight-bold">Autor: {{singleBlog.autor}}</div>
            </v-card-text>
            <v-card-actions right class="mb-3">
              <!-- like -->
              <div v-if="thumb_up">
                <v-btn icon style="padding: 2%">
                  <v-icon color="green">thumb_up</v-icon>
                </v-btn>
              </div>
              <div v-else>
                <v-btn
                  icon
                  style="padding: 2%"
                  @click="like(), singleBlog.like++, singleBlog.dislike--, updateLikes(singleBlog.id, singleBlog.like, singleBlog.dislike, 
																	singleBlog.titulo, singleBlog.contenido, singleBlog.autor)"
                >
                  <v-icon>thumb_up</v-icon>
                </v-btn>
              </div>
              <span>{{singleBlog.like}}</span>
              <!-- dislikes -->
              <div v-if="thumb_down">
                <v-btn icon style="padding: 2%">
                  <v-icon color="red">thumb_down</v-icon>
                </v-btn>
              </div>
              <div v-else>
                <v-btn
                  icon
                  style="padding: 2%"
                  @click="dislike(), singleBlog.like--, singleBlog.dislike++, updateLikes(singleBlog.id, singleBlog.like, singleBlog.dislike, 
																	singleBlog.titulo, singleBlog.contenido, singleBlog.autor)"
                >
                  <v-icon>thumb_down</v-icon>
                </v-btn>
              </div>
              <span>{{singleBlog.dislike}}</span>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";
export default {
  data() {
    return {
      blog: [],
      thumb_up: true,
      thumb_down: false
    };
  },
  methods: {
    like() {
      if (!this.thumb_up) {
        this.thumb_up = true;
        this.thumb_down = false;
      }
    },
    dislike() {
      if (!this.thumb_down) {
        this.thumb_down = true;
        this.thumb_up = false;
      }
    },

    updateLikes(id, like, dislike, titulo, contenido, autor) {
      const blog = {
        like: like,
        dislike: dislike,
        titulo: titulo,
        contenido: contenido,
        autor: autor
      };

      db.collection("blog")
        .doc(id)
        .set(blog)
        .then(() => {
          console.log("likes updated");
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

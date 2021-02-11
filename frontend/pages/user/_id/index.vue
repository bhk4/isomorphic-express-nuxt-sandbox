<!-- ./pages/user/_id/index.vue -->

<template>
  <div class="main-content">
    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title is-centered">{{ user.name }}</p>
        </header>
        <div class="card-content has-background-dark">
          <figure class="image is-1by1">
            <img class :src="`${user.imageUrl}`" />
          </figure>
        </div>
        <br />
        <h4 class="title is-5 is-marginless">
          <p class="has-text-centered">About</p>
          <hr />
          <p class="has-text-centered">
            <strong>{{ user.description }}</strong>
          </p>
          <br />
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^[a-f\d]{24}$/i.test(params.id);
  },
  async asyncData({ params }) {
    try {
      let user = await fetch(`http://localhost:9000/api/user/${params.id}`)
        .then(res => res.json())
        .then(data => data);
      return { user };
    } catch (e) {
      console.error("SOMETHING WENT WRONG :" + e);
      return { user: {} };
    }
  },
  head() {
    return {
      title: this.user.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.user.description
        }
      ]
    };
  }
};
</script>